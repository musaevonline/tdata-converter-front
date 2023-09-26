import StorageSession from "./StorageSession";

class LocalStorageSession extends StorageSession {
    _delete() {
        return localStorage.removeItem(this._storageKey);
    }

    _fetchFromCache() {
        return localStorage.getItem(this._storageKey);
    }

    _saveToCache(data) {
        return localStorage.setItem(this._storageKey, data);
    }
}

export default LocalStorageSession;
