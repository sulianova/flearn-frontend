export function isImage(fileName: string): boolean {
  return /\.(png|jpe?g|heic|webp)$/i.test(fileName)
}

export function getFileExtension(fileName: string): string {
  return fileName.split('.').pop() || ''
}
