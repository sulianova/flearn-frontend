import { firebaseService } from 'services/firebase.service';
import type { ArgumentTypes } from 'types';

export function dateDB2FR(date: string): Date {
  return new Date(date);
}

export function dateFR2DB(date: Date): string {
  return date.toISOString();
  // const [dateTime, milliseconds] = date.toISOString().split('.');
  // return [
  //   dateTime,
  //   milliseconds.slice(0, 3) + '0'
  // ].join('-');
}

type TGetImageUrlArgs = ArgumentTypes<typeof firebaseService.getImageURL>;
export async function addImageSrc<T extends { id: string }>(data: T, getImageProps: TGetImageUrlArgs[0]): Promise<T & { src: string }> {
  return {
    ...data,
    src: (await firebaseService.getImageURL(getImageProps)) ?? '',
  };
}

export function removeImageSrc<T extends { src: string }>(data: T): Omit<T, 'src'> {
  const { src, ...rest } = data;
  return rest;
}
