import React, { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

const LOG_FILE = 'workerconnect-log.txt';

const Logs: React.FC = () => {
  const [logs, setLogs] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      if (Capacitor.isNativePlatform()) {
        const result = await Filesystem.readFile({
          path: LOG_FILE,
          directory: Directory.Documents,
          encoding: Encoding.UTF8,
        });
        // Ensure result.data is a string
        setLogs(typeof result.data === 'string' ? result.data : String(result.data));
      } else {
        setLogs('Log file is only available on a native device.');
      }
    } catch (err: any) {
      setError('Could not read log file: ' + (err?.message || String(err)));
      setLogs('');
    }
    setLoading(false);
  };

  const shareLogs = async () => {
    try {
      if (Capacitor.isNativePlatform()) {
        await Share.share({
          title: 'WorkerConnect Log File',
          text: logs,
          dialogTitle: 'Share WorkerConnect Log File',
        });
      }
    } catch (err) {
      alert('Could not share log file.');
    }
  };

  useEffect(() => {
    loadLogs();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">App Logs</h2>
        {loading ? (
          <div className="text-gray-500">Loading logs...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <pre className="bg-gray-100 rounded p-4 text-xs overflow-x-auto max-h-96 whitespace-pre-wrap mb-4">{logs}</pre>
        )}
        <div className="flex gap-2">
          <button
            onClick={loadLogs}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Refresh
          </button>
          {Capacitor.isNativePlatform() && logs && (
            <button
              onClick={shareLogs}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Share Log
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Logs; 