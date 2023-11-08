export type TActionS =
  | { type: 'created', payload: { id: string, courseId: string, lessonId: string, userId: string } }
  | { type: 'updated', payload: { id: string } };
