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
  const customConfig = localStorage.getItem('HUONG_FIREBASE_CONFIG');
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
    db = getFirestore(app);
    
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

  if (db) {
    try {
      await setDoc(doc(db, pathName, lessonId), data);
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `${pathName}/${lessonId}`);
    }
  } else {
    const current = await getLessonsProgress();
    const idx = current.findIndex(p => p.lessonId === lessonId);
    if (idx > -1) {
      current[idx] = data;
    } else {
      current.push(data);
    }
    localStorage.setItem('huong_lessons_progress', JSON.stringify(current));
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
  if (db) {
    try {
      await setDoc(doc(db, pathName, asset.id), asset);
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `${pathName}/${asset.id}`);
    }
  } else {
    const current = await getDocumentAssets();
    current.push(asset);
    localStorage.setItem('huong_document_assets', JSON.stringify(current));
  }
}

export async function deleteDocumentAsset(assetId: string): Promise<void> {
  const pathName = 'documents';
  if (db) {
    try {
      await deleteDoc(doc(db, pathName, assetId));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `${pathName}/${assetId}`);
    }
  } else {
    const current = await getDocumentAssets();
    const filtered = current.filter(a => a.id !== assetId);
    localStorage.setItem('huong_document_assets', JSON.stringify(filtered));
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
  if (db) {
    try {
      await setDoc(doc(db, pathName, note.id), note);
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `${pathName}/${note.id}`);
    }
  } else {
    const current = await getStudyNotes();
    const idx = current.findIndex(n => n.id === note.id);
    if (idx > -1) {
      current[idx] = note;
    } else {
      current.push(note);
    }
    localStorage.setItem('huong_study_notes', JSON.stringify(current));
  }
}

export async function deleteStudyNote(noteId: string): Promise<void> {
  const pathName = 'notes';
  if (db) {
    try {
      await deleteDoc(doc(db, pathName, noteId));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `${pathName}/${noteId}`);
    }
  } else {
    const current = await getStudyNotes();
    const filtered = current.filter(n => n.id !== noteId);
    localStorage.setItem('huong_study_notes', JSON.stringify(filtered));
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
  if (db) {
    try {
      await setDoc(doc(db, pathName, event.id), event);
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `${pathName}/${event.id}`);
    }
  } else {
    const current = await getStudySchedules();
    const idx = current.findIndex(s => s.id === event.id);
    if (idx > -1) {
      current[idx] = event;
    } else {
      current.push(event);
    }
    localStorage.setItem('huong_study_schedules', JSON.stringify(current));
  }
}

export async function deleteStudySchedule(eventId: string): Promise<void> {
  const pathName = 'schedules';
  if (db) {
    try {
      await deleteDoc(doc(db, pathName, eventId));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `${pathName}/${eventId}`);
    }
  } else {
    const current = await getStudySchedules();
    const filtered = current.filter(s => s.id !== eventId);
    localStorage.setItem('huong_study_schedules', JSON.stringify(filtered));
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
