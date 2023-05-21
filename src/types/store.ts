export interface IRootState {
    user?: IUserState;
    lesson?: ILessonState;
}

export interface IUserState {
    id: number;
    email: string;
}

export interface ILessonState {
    data: ILessonData;
}

export interface ILessonData {
    id: number;
    title: string;
    description: string;
}
