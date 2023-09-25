import { createExtractorFromData } from 'node-unrar-js';
import jszip from 'jszip/dist/jszip.min.js';
import { IFile } from './types';
import { fileTypeFromBuffer } from 'file-type';
import { Buffer } from 'buffer';

const unrarPromise = fetch('/tdata-converter-front/unrar.wasm', {
  credentials: 'same-origin',
});

export async function unrar(archive: Buffer) {
  const wasmBinary = await (await unrarPromise).arrayBuffer();
  const extractor = await createExtractorFromData({
    wasmBinary,
    data: archive,
  });
  const { files } = extractor.extract();
  const filesArr = Array.from(files);
  const result = filesArr
    .filter((file) => file.extraction)
    .map((file) => ({
      name: file.fileHeader.name,
      buffer: Buffer.from(file.extraction || []),
    }));
  return result as IFile[];
}

export async function unzip(zip: Buffer) {
  const jszipInstance = new jszip();
  const result = await jszipInstance.loadAsync(zip);
  const files: IFile[] = [];
  const names = Object.keys(result.files);
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const buffer = await result.files[name].async('nodebuffer');
    if (!result.files[name].dir) {
      files.push({ name, buffer });
    }
  }

  return files;
}

export async function uncompress(compressed: Buffer) {
  const { ext = 'none' } = (await fileTypeFromBuffer(compressed)) || {};
  if (ext === 'zip') {
    return await unzip(compressed);
  } else if (ext === 'rar') {
    return await unrar(compressed);
  }
}

export async function zip(files: IFile[]) {
  const jszipInstance = new jszip();
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    jszipInstance.file(file.name, file.buffer);
  }
  return jszipInstance.generateAsync({ type: 'nodebuffer' });
}
