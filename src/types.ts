export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  updatedAt: string;
}

export interface DocumentAsset {
  id: string;
  lessonId: string;
  title: string;
  type: 'pdf' | 'word' | 'image'; // Removed 'video' based on owner preference
  url: string;
  createdAt: string;
}

export interface StudyNote {
  id: string;
  lessonId: string;
  content: string;
  date: string; // YYYY-MM-DD format
  time: string; // HH:MM format
  updatedAt: string;
  fileAttachment?: {
    name: string;
    url: string; // base64 or storage url
    type: string; // MIME type or category
  };
}

export interface StudySchedule {
  id: string;
  title: string;
  subject: 'Toán' | 'Hóa' | 'Sinh' | 'Lý' | 'Khác';
  lessonId?: string; // Associated lesson identifier from select dropdown
  date: string; // Specific day "YYYY-MM-DD" style
  startTime: string; // "HH:MM"
  endTime: string;   // "HH:MM"
  completed?: boolean; // Tích hoàn thành đổi trạng thái mờ
}

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  firestoreDatabaseId?: string;
}
