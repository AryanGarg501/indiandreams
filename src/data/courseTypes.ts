export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  title: string;
  emoji: string;
  description: string;
  totalLessons: number;
  totalHours: number;
  modules: Module[];
}
