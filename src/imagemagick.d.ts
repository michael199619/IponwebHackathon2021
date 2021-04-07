interface OptionsResize {
  srcPath: string,
  srcData?: string,
  srcFormat?: string,
  dstPath?: string,
  quality?: number = 0.8,
  format?: string = 'jpg',
  progressive?: boolean = false,
  width?: number = 0,
  height?: number = 0,
  strip?: boolean = true,
  filter?: string = 'Lagrange',
  sharpening?: number = 0.2,
  customArgs?: string[] = []
}

declare module 'imagemagick' {
    const readMetadata: (path: string, fn: (err: Error, metadata: Record<string, any>) => void) => void
    const resize: (options: OptionsResize, fn: (err: Error, stdout: any, stdin: any) => void) => void
}

