// IndexedDB utility to store and retrieve user-uploaded custom videos
const DB_NAME = "ApexVideoStorage";
const STORE_NAME = "videos";
const DB_VERSION = 1;

export function initVideoDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
}

export async function storeCustomVideo(file: File): Promise<void> {
  const db = await initVideoDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(file, "custom-bg-video");

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function getCustomVideo(): Promise<File | null> {
  try {
    const db = await initVideoDb();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get("custom-bg-video");

      request.onsuccess = () => {
        resolve(request.result || null);
      };
      request.onerror = () => {
        resolve(null);
      };
    });
  } catch (e) {
    return null;
  }
}

export async function removeCustomVideo(): Promise<void> {
  const db = await initVideoDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete("custom-bg-video");

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
