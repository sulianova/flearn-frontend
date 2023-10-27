export type TActionS =
  | { type: 'created', payload: { courseId: string, lessonId: string, userId: string } }
  | { type: 'updated', payload: { courseId: string, lessonId: string, userId: string } };
