import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

const LOG_FILE = 'workerconnect-log.txt';

async function writeLog(message: string) {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] ${message}\n`;

  if (Capacitor.isNativePlatform()) {
    try {
      // Append to the log file
      await Filesystem.appendFile({
        path: LOG_FILE,
        data: logLine,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
    } catch (err) {
      // If file doesn't exist, create it
      try {
        await Filesystem.writeFile({
          path: LOG_FILE,
          data: logLine,
          directory: Directory.Documents,
          encoding: Encoding.UTF8,
        });
      } catch (e) {
        // Fallback to console
        console.error('Logger failed to write file:', e);
        console.log(logLine);
      }
    }
  } else {
    // Fallback to console in web
    console.log(logLine);
  }
}

export async function log(message: string) {
  await writeLog('[INFO] ' + message);
}

export async function error(message: string) {
  await writeLog('[ERROR] ' + message);
}

export async function getLogFileUri() {
  if (Capacitor.isNativePlatform()) {
    try {
      const uri = await Filesystem.getUri({
        path: LOG_FILE,
        directory: Directory.Documents,
      });
      return uri.uri;
    } catch (e) {
      return null;
    }
  }
  return null;
} 