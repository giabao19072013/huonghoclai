import { initializeApp, getApp, getApps } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  deleteDoc, 
  getDoc,
  getDocFromServer
} from 'firebase/firestore';
import { LessonProgress, DocumentAsset, StudyNote, StudySchedule } from './types';
import fallbackConfig from '../firebase-applet-config.json';

// Error Handler definitions mandated by system skills
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: 'anonymous-or-pin-admin',
      email: null,
      emailVerified: false,
      isAnonymous: true,
    },
    operationType,
    path
  };
  console.error('Firestore Error Detailed: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// 1. Determine configuration (from file or dynamic localstorage override)
const getActiveConfig = () => {
  let customConfig = localStorage.getItem('HUONG_FIREBASE_CONFIG');
  if (!customConfig) {
    try {
      localStorage.setItem('HUONG_FIREBASE_CONFIG', JSON.stringify(fallbackConfig));
      customConfig = JSON.stringify(fallbackConfig);
    } catch (e) {
      console.warn('Unable to store fallbackConfig into localStorage', e);
    }
  }
  if (customConfig) {
    try {
      const parsed = JSON.parse(customConfig);
      if (parsed.apiKey && parsed.apiKey.trim() !== '') {
        return parsed;
      }
    } catch (e) {
      console.warn('Custom config corrupt, falling back to file config', e);
    }
  }
  return fallbackConfig;
};

const activeConfig = getActiveConfig();
const isFirebaseEnabled = activeConfig && activeConfig.apiKey && activeConfig.apiKey.trim() !== '';

let db: any = null;

if (isFirebaseEnabled) {
  try {
    const app = getApps().length === 0 ? initializeApp(activeConfig) : getApp();
    const dbId = activeConfig.firestoreDatabaseId && activeConfig.firestoreDatabaseId !== '(default)' 
      ? activeConfig.firestoreDatabaseId 
      : undefined;
    db = dbId ? getFirestore(app, dbId) : getFirestore(app);
    
    // Quick validation of connection to Firestore as mandated
    const testConnection = async () => {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration or internet connection.");
        }
      }
    };
    testConnection();
  } catch (e) {
    console.error('Firebase initialization failed!', e);
    db = null;
  }
}

export { db };

// Sanitization utilities to satisfy strict security rules of Firestore
function sanitizeProgress(prog: any): any {
  return {
    lessonId: String(prog.lessonId || ''),
    completed: Boolean(prog.completed),
    updatedAt: String(prog.updatedAt || new Date().toISOString())
  };
}

function sanitizeDocument(docItem: any): any {
  const allowedTypes = ['video', 'pdf', 'word', 'image'];
  const typeValue = allowedTypes.includes(docItem.type) ? docItem.type : 'pdf';
  return {
    id: String(docItem.id || ''),
    lessonId: String(docItem.lessonId || ''),
    title: String(docItem.title || ''),
    type: typeValue,
    url: String(docItem.url || ''),
    createdAt: String(docItem.createdAt || new Date().toISOString())
  };
}

function sanitizeNote(note: any): any {
  const sanitized: any = {
    id: String(note.id || ''),
    lessonId: String(note.lessonId || ''),
    content: String(note.content || ''),
    date: String(note.date || new Date().toISOString().split('T')[0]),
    time: String(note.time || new Date().toTimeString().split(' ')[0].substring(0, 5)),
    updatedAt: String(note.updatedAt || new Date().toISOString())
  };
  if (note.fileAttachment) {
    sanitized.fileAttachment = {
      name: String(note.fileAttachment.name || ''),
      url: String(note.fileAttachment.url || ''),
      type: String(note.fileAttachment.type || '')
    };
  }
  return sanitized;
}

function sanitizeSchedule(sched: any): any {
  const validSubjects = ['Toán', 'Hóa', 'Sinh', 'Lý', 'Khác'];
  const subjectValue = validSubjects.includes(sched.subject) ? sched.subject : 'Khác';
  const sanitized: any = {
    id: String(sched.id || ''),
    title: String(sched.title || ''),
    subject: subjectValue,
    date: String(sched.date || new Date().toISOString().split('T')[0]),
    startTime: String(sched.startTime || '08:00'),
    endTime: String(sched.endTime || '09:00')
  };
  if (sched.lessonId !== undefined && sched.lessonId !== null && sched.lessonId !== '') {
    sanitized.lessonId = String(sched.lessonId);
  }
  if (sched.completed !== undefined) {
    sanitized.completed = Boolean(sched.completed);
  }
  return sanitized;
}

// Helper to determine if we are active on Firebase
export function isUsingFirebase(): boolean {
  return db !== null;
}

// === API SYNC METHODS (With automatic localStorage fallback) ===

// 1. LESSON PROGRESS STATUS
export async function getLessonsProgress(): Promise<LessonProgress[]> {
  const pathName = 'progress';
  if (db) {
    try {
      const querySnapshot = await getDocs(collection(db, pathName));
      const list: LessonProgress[] = [];
      querySnapshot.forEach((docSnap) => {
        const d = docSnap.data();
        list.push({
          lessonId: docSnap.id,
          completed: d.completed ?? false,
          updatedAt: d.updatedAt ?? new Date().toISOString(),
        });
      });
      return list;
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, pathName);
      return [];
    }
  } else {
    const local = localStorage.getItem('huong_lessons_progress');
    return local ? JSON.parse(local) : [];
  }
}

export async function saveLessonProgress(lessonId: string, completed: boolean): Promise<void> {
  const pathName = 'progress';
  const data: LessonProgress = {
    lessonId,
    completed,
    updatedAt: new Date().toISOString()
  };

  // Always write to local storage first for resilient local cache
  try {
    const local = localStorage.getItem('huong_lessons_progress');
    const current: LessonProgress[] = local ? JSON.parse(local) : [];
    const idx = current.findIndex(p => p.lessonId === lessonId);
    if (idx > -1) {
      current[idx] = data;
    } else {
      current.push(data);
    }
    localStorage.setItem('huong_lessons_progress', JSON.stringify(current));
  } catch (err) {
    console.warn('LocalStorage save progress error:', err);
  }

  // Sync to database if available
  if (db) {
    try {
      await setDoc(doc(db, pathName, lessonId), sanitizeProgress(data));
    } catch (e) {
      console.warn('Firestore progress write err (fell back to local-only):', e);
    }
  }
}

// 2. DOCUMENT ASSETS (Videos & Files)
export async function getDocumentAssets(): Promise<DocumentAsset[]> {
  const pathName = 'documents';
  if (db) {
    try {
      const querySnapshot = await getDocs(collection(db, pathName));
      const list: DocumentAsset[] = [];
      querySnapshot.forEach((docSnap) => {
        const d = docSnap.data();
        list.push({
          id: docSnap.id,
          lessonId: d.lessonId,
          title: d.title,
          type: d.type,
          url: d.url,
          createdAt: d.createdAt || new Date().toISOString(),
        });
      });
      return list;
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, pathName);
      return [];
    }
  } else {
    const local = localStorage.getItem('huong_document_assets');
    return local ? JSON.parse(local) : [];
  }
}

export async function saveDocumentAsset(asset: DocumentAsset): Promise<void> {
  const pathName = 'documents';
  
  // Always write to local storage first for resilient local cache
  try {
    const local = localStorage.getItem('huong_document_assets');
    const current: DocumentAsset[] = local ? JSON.parse(local) : [];
    const idx = current.findIndex(a => a.id === asset.id);
    if (idx > -1) {
      current[idx] = asset;
    } else {
      current.push(asset);
    }
    localStorage.setItem('huong_document_assets', JSON.stringify(current));
  } catch (err) {
    console.warn('LocalStorage save document error:', err);
  }

  // Sync to database if available
  if (db) {
    try {
      await setDoc(doc(db, pathName, asset.id), sanitizeDocument(asset));
    } catch (e) {
      console.warn('Firestore document write err (fell back to local-only):', e);
    }
  }
}

export async function deleteDocumentAsset(assetId: string): Promise<void> {
  const pathName = 'documents';
  
  // Always update local storage first
  try {
    const local = localStorage.getItem('huong_document_assets');
    const current: DocumentAsset[] = local ? JSON.parse(local) : [];
    const filtered = current.filter(a => a.id !== assetId);
    localStorage.setItem('huong_document_assets', JSON.stringify(filtered));
  } catch (err) {
    console.warn('LocalStorage delete document error:', err);
  }

  // Sync to database if available
  if (db) {
    try {
      await deleteDoc(doc(db, pathName, assetId));
    } catch (e) {
      console.warn('Firestore document delete err (fell back to local-only):', e);
    }
  }
}

// 3. LESSON STUDY NOTES
export async function getStudyNotes(): Promise<StudyNote[]> {
  const pathName = 'notes';
  if (db) {
    try {
      const querySnapshot = await getDocs(collection(db, pathName));
      const list: StudyNote[] = [];
      querySnapshot.forEach((docSnap) => {
        const d = docSnap.data();
        list.push({
          id: docSnap.id,
          lessonId: d.lessonId || '',
          content: d.content || '',
          date: d.date || new Date().toISOString().split('T')[0],
          time: d.time || new Date().toTimeString().split(' ')[0].substring(0, 5),
          updatedAt: d.updatedAt || new Date().toISOString(),
        });
      });
      return list;
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, pathName);
      return [];
    }
  } else {
    const local = localStorage.getItem('huong_study_notes');
    return local ? JSON.parse(local) : [];
  }
}

export async function saveStudyNote(note: StudyNote): Promise<void> {
  const pathName = 'notes';
  
  // Always write to local storage first
  try {
    const local = localStorage.getItem('huong_study_notes');
    const current: StudyNote[] = local ? JSON.parse(local) : [];
    const idx = current.findIndex(n => n.id === note.id);
    if (idx > -1) {
      current[idx] = note;
    } else {
      current.push(note);
    }
    localStorage.setItem('huong_study_notes', JSON.stringify(current));
  } catch (err) {
    console.warn('LocalStorage save note error:', err);
  }

  // Sync to database if available
  if (db) {
    try {
      await setDoc(doc(db, pathName, note.id), sanitizeNote(note));
    } catch (e) {
      console.warn('Firestore note write err (fell back to local-only):', e);
    }
  }
}

export async function deleteStudyNote(noteId: string): Promise<void> {
  const pathName = 'notes';
  
  // Always update local storage first
  try {
    const local = localStorage.getItem('huong_study_notes');
    const current: StudyNote[] = local ? JSON.parse(local) : [];
    const filtered = current.filter(n => n.id !== noteId);
    localStorage.setItem('huong_study_notes', JSON.stringify(filtered));
  } catch (err) {
    console.warn('LocalStorage delete note error:', err);
  }

  // Sync to database if available
  if (db) {
    try {
      await deleteDoc(doc(db, pathName, noteId));
    } catch (e) {
      console.warn('Firestore note delete err (fell back to local-only):', e);
    }
  }
}

// 4. STUDY SCHEDULE TIMETABLES (Event schedule)
export async function getStudySchedules(): Promise<StudySchedule[]> {
  const pathName = 'schedules';
  if (db) {
    try {
      const querySnapshot = await getDocs(collection(db, pathName));
      const list: StudySchedule[] = [];
      querySnapshot.forEach((docSnap) => {
        const d = docSnap.data();
        list.push({
          id: docSnap.id,
          title: d.title,
          subject: d.subject,
          lessonId: d.lessonId,
          date: d.date || new Date().toISOString().split('T')[0],
          startTime: d.startTime,
          endTime: d.endTime,
          completed: d.completed ?? false,
        });
      });
      return list;
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, pathName);
      return [];
    }
  } else {
    const local = localStorage.getItem('huong_study_schedules');
    if (local) {
      return JSON.parse(local);
    } else {
      const initialSchedules: StudySchedule[] = [];
      localStorage.setItem('huong_study_schedules', JSON.stringify(initialSchedules));
      return initialSchedules;
    }
  }
}

export async function saveStudySchedule(event: StudySchedule): Promise<void> {
  const pathName = 'schedules';
  
  // Always write to local storage first
  try {
    const local = localStorage.getItem('huong_study_schedules');
    const current: StudySchedule[] = local ? JSON.parse(local) : [];
    const idx = current.findIndex(s => s.id === event.id);
    if (idx > -1) {
      current[idx] = event;
    } else {
      current.push(event);
    }
    localStorage.setItem('huong_study_schedules', JSON.stringify(current));
  } catch (err) {
    console.warn('LocalStorage save schedule error:', err);
  }

  // Sync to database if available
  if (db) {
    try {
      await setDoc(doc(db, pathName, event.id), sanitizeSchedule(event));
    } catch (e) {
      console.warn('Firestore schedule write err (fell back to local-only):', e);
    }
  }
}

export async function deleteStudySchedule(eventId: string): Promise<void> {
  const pathName = 'schedules';
  
  // Always update local storage first
  try {
    const local = localStorage.getItem('huong_study_schedules');
    const current: StudySchedule[] = local ? JSON.parse(local) : [];
    const filtered = current.filter(s => s.id !== eventId);
    localStorage.setItem('huong_study_schedules', JSON.stringify(filtered));
  } catch (err) {
    console.warn('LocalStorage delete schedule error:', err);
  }

  // Sync to database if available
  if (db) {
    try {
      await deleteDoc(doc(db, pathName, eventId));
    } catch (e) {
      console.warn('Firestore schedule delete err (fell back to local-only):', e);
    }
  }
}

// 5. PURGE ALL SANDBOX & MOCK DATA (Administrative clearance action)
export async function clearAllFirebaseCollections(): Promise<void> {
  const collectionsToClear = ['progress', 'documents', 'notes', 'schedules'];
  if (db) {
    try {
      for (const colName of collectionsToClear) {
        const querySnapshot = await getDocs(collection(db, colName));
        const deletePromises: Promise<void>[] = [];
        querySnapshot.forEach((docSnap) => {
          deletePromises.push(deleteDoc(doc(db, colName, docSnap.id)));
        });
        await Promise.all(deletePromises);
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, 'all-collections-clear');
    }
  } else {
    localStorage.removeItem('huong_lessons_progress');
    localStorage.removeItem('huong_document_assets');
    localStorage.removeItem('huong_study_notes');
    localStorage.removeItem('huong_study_schedules');
  }
}

// 6. AUTOMATIC BIDIRECTIONAL LOCAL-CLOUD SYNC SYSTEM
export async function synchronizeLocalAndCloud(): Promise<void> {
  if (!db) return;
  
  try {
    console.log("Starting automatic background Local-Cloud synchronization...");
    
    // We check if we have already migrated offline data to the cloud.
    // If we have, or after initial run, Firestore acts as the absolute source of truth.
    // This stops the classic resurrection loop where local deletes or remote deletes got undone by the other party.
    const isMigrated = localStorage.getItem('HUONG_FIREBASE_MIGRATED_V3') === 'true';

    // --- 1. LESSON PROGRESS SYNC ---
    const localProgressRaw = localStorage.getItem('huong_lessons_progress');
    const localProgressList: LessonProgress[] = localProgressRaw ? JSON.parse(localProgressRaw) : [];
    
    const firebaseProgressSnapshot = await getDocs(collection(db, 'progress'));
    const firebaseProgressList: LessonProgress[] = [];
    firebaseProgressSnapshot.forEach((docSnap) => {
      const d = docSnap.data();
      firebaseProgressList.push({
        lessonId: docSnap.id,
        completed: d.completed ?? false,
        updatedAt: d.updatedAt ?? new Date().toISOString(),
      });
    });
    
    if (!isMigrated) {
      // Migrate offline items to cloud once if they don't exist yet
      for (const prog of localProgressList) {
        const exists = firebaseProgressList.some(f => f.lessonId === prog.lessonId);
        if (!exists) {
          await setDoc(doc(db, 'progress', prog.lessonId), sanitizeProgress(prog));
          firebaseProgressList.push(prog);
        }
      }
    }
    // Update local cache to match exactly the cloud's truths
    localStorage.setItem('huong_lessons_progress', JSON.stringify(firebaseProgressList));
    
    // --- 2. DOCUMENT ASSETS SYNC ---
    const localAssetsRaw = localStorage.getItem('huong_document_assets');
    const localAssetsList: DocumentAsset[] = localAssetsRaw ? JSON.parse(localAssetsRaw) : [];
    
    const firebaseAssetsSnapshot = await getDocs(collection(db, 'documents'));
    const firebaseAssetsList: DocumentAsset[] = [];
    firebaseAssetsSnapshot.forEach((docSnap) => {
      const d = docSnap.data();
      firebaseAssetsList.push({
        id: docSnap.id,
        lessonId: d.lessonId,
        title: d.title,
        type: d.type,
        url: d.url,
        createdAt: d.createdAt || new Date().toISOString()
      });
    });
    
    if (!isMigrated) {
      for (const asset of localAssetsList) {
        const exists = firebaseAssetsList.some(f => f.id === asset.id);
        if (!exists) {
          await setDoc(doc(db, 'documents', asset.id), sanitizeDocument(asset));
          firebaseAssetsList.push(asset);
        }
      }
    }
    localStorage.setItem('huong_document_assets', JSON.stringify(firebaseAssetsList));
    
    // --- 3. STUDY NOTES SYNC ---
    const localNotesRaw = localStorage.getItem('huong_study_notes');
    const localNotesList: StudyNote[] = localNotesRaw ? JSON.parse(localNotesRaw) : [];
    
    const firebaseNotesSnapshot = await getDocs(collection(db, 'notes'));
    const firebaseNotesList: StudyNote[] = [];
    firebaseNotesSnapshot.forEach((docSnap) => {
      const d = docSnap.data();
      firebaseNotesList.push({
        id: docSnap.id,
        lessonId: d.lessonId || '',
        content: d.content || '',
        date: d.date || new Date().toISOString().split('T')[0],
        time: d.time || new Date().toTimeString().split(' ')[0].substring(0, 5),
        updatedAt: d.updatedAt || new Date().toISOString()
      });
    });
    
    // TARGETED DETECT & DESTROY JUNK: check for old "kk" or blank placeholder notes and delete them from Firestore!
    const cleanNotesList: StudyNote[] = [];
    for (const note of firebaseNotesList) {
      const contentLower = (note.content || '').toLowerCase();
      const isJunk = contentLower.includes('kk') || contentLower.trim() === 'kk' || contentLower.trim() === '';
      if (isJunk) {
        console.log(`Auto purges junk note from Firestore: ${note.id}`);
        await deleteDoc(doc(db, 'notes', note.id));
      } else {
        cleanNotesList.push(note);
      }
    }
    
    if (!isMigrated) {
      for (const note of localNotesList) {
        const exists = cleanNotesList.some(f => f.id === note.id);
        const contentLower = (note.content || '').toLowerCase();
        const isJunk = contentLower.includes('kk') || contentLower.trim() === 'kk' || contentLower.trim() === '';
        if (!exists && !isJunk) {
          await setDoc(doc(db, 'notes', note.id), sanitizeNote(note));
          cleanNotesList.push(note);
        }
      }
    }
    localStorage.setItem('huong_study_notes', JSON.stringify(cleanNotesList));
    
    // --- 4. STUDY SCHEDULE TIMETABLES SYNC ---
    const localSchedulesRaw = localStorage.getItem('huong_study_schedules');
    const localSchedulesList: StudySchedule[] = localSchedulesRaw ? JSON.parse(localSchedulesRaw) : [];
    
    const firebaseSchedulesSnapshot = await getDocs(collection(db, 'schedules'));
    const firebaseSchedulesList: StudySchedule[] = [];
    firebaseSchedulesSnapshot.forEach((docSnap) => {
      const d = docSnap.data();
      firebaseSchedulesList.push({
        id: docSnap.id,
        title: d.title,
        subject: d.subject,
        lessonId: d.lessonId,
        date: d.date || new Date().toISOString().split('T')[0],
        startTime: d.startTime,
        endTime: d.endTime,
        completed: d.completed ?? false
      });
    });
    
    // TARGETED DETECT & DESTROY JUNK: check for "học nhóm", "lượng giác", or "kk" in schedules and delete them from Firestore!
    const cleanSchedulesList: StudySchedule[] = [];
    for (const sched of firebaseSchedulesList) {
      const titleLower = (sched.title || '').toLowerCase();
      const isJunk = titleLower.includes('học nhóm') || titleLower.includes('lượng giác') || titleLower.includes('kk') || titleLower.trim() === '';
      if (isJunk) {
        console.log(`Auto purges junk schedule from Firestore: ${sched.id} - ${sched.title}`);
        await deleteDoc(doc(db, 'schedules', sched.id));
      } else {
        cleanSchedulesList.push(sched);
      }
    }
    
    if (!isMigrated) {
      for (const sched of localSchedulesList) {
        const exists = cleanSchedulesList.some(f => f.id === sched.id);
        const titleLower = (sched.title || '').toLowerCase();
        const isJunk = titleLower.includes('học nhóm') || titleLower.includes('lượng giác') || titleLower.includes('kk') || titleLower.trim() === '';
        if (!exists && !isJunk) {
          await setDoc(doc(db, 'schedules', sched.id), sanitizeSchedule(sched));
          cleanSchedulesList.push(sched);
        }
      }
    }
    localStorage.setItem('huong_study_schedules', JSON.stringify(cleanSchedulesList));
    
    // Set migration flag to tell the app subsequent reloads should just mirror current cloud state
    localStorage.setItem('HUONG_FIREBASE_MIGRATED_V3', 'true');
    console.log("Automatic Local-Cloud synchronization & active cleanup completed successfully!");
  } catch (err) {
    console.error("Failed automatic local-cloud sync:", err);
  }
}
