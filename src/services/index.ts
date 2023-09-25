import { uncompress, zip } from './archives';
import {
  downloadFromDrive,
  downloadFromMega,
  downloadFromYandex,
} from './clouds';
import { convert, getFiles } from './converter';
import { buildSession } from './sqlite';
import { IFile } from './types';

export async function process(urlss: any, uploadedFiles: any) {
  const files = uploadedFiles.map((file: any) => file.buffer);
  const urls = Array.isArray(urlss) ? urlss : [urlss].filter(Boolean);

  for (let i = 0; i < urls.length; i++) {
    try {
      const url = urls[i];
      if (
        url.startsWith('https://disk.yandex.ru/') ||
        url.startsWith('https://yadi.sk')
      ) {
        const file = await downloadFromYandex(url);
        files.push(file);
      } else if (url.startsWith('https://mega.nz/')) {
        const file = await downloadFromMega(url);
        files.push(file);
      } else if (url.startsWith('https://drive.google.com/')) {
        const file = await downloadFromDrive(url);
        files.push(file);
      }
    } catch (e) {
      console.error(e);
    }
  }

  const result: IFile[] = [];
  for (let i = 0; i < files.length; i++) {
    try {
      const archive = files[i];
      const archiveFiles = await uncompress(archive);
      if (!archiveFiles) throw new Error();
      const { keyFile, baseFile } = getFiles(archiveFiles as any);
      if (!keyFile || !baseFile) throw new Error();
      const session = await convert(keyFile, baseFile);
      if (!session) throw new Error();
      const sqlite = await buildSession(
        session.dcId,
        session.serverAddress,
        session.port,
        session.authKey?.getKey() as any,
      );

      result.push({ name: `${i + 1}.session`, buffer: sqlite as Buffer });
      result.push({
        name: `${i + 1}.json`,
        buffer: Buffer.from(
          JSON.stringify({
            session_file: i + 1,
            phone: undefined,
            register_time: undefined,
            app_id: 17349,
            app_hash: '344583e45741c457fe1862106095a5eb',
            sdk: 'Telegram Desktop',
            app_version: '4.7.1',
            device: 'Telegram Desktop',
            last_check_time: undefined,
            avatar: undefined,
            first_name: undefined,
            last_name: undefined,
            sex: undefined,
            lang_pack: 'en',
            system_lang_pack: 'en-us',
            success_registred: true,
            twoFA: undefined,
            ipv6: undefined,
            server_address6: undefined,
          }),
        ),
      });
    } catch (e) {
      console.error(e);
    }
  }
  const resultZip = result.length > 0 ? await zip(result) : null;
  return {
    count: Math.floor(result.length / 2),
    zip: resultZip,
  };
}
