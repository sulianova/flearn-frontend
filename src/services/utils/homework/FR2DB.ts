import { removeImageSrc } from '../shared';

import type { IHomeworkData, IHomeworkDataDB } from 'types';

export function homeworkDataFR2DB(homeworkDB: IHomeworkData): IHomeworkDataDB {
    const images = homeworkDB.images ? homeworkDB.images.map(removeImageSrc) : undefined;

    return { ...homeworkDB, images };
}
