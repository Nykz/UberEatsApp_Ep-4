import { Injectable } from '@angular/core';

import { Storage } from '@capacitor/storage';

export const INTRO_KEY = 'intro-slides';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async setStorage(key, value) {
    return Storage.set({
      key,
      value
    });
  }

  getStorage(key) {
    return Storage.get({key});
  }

  removeStorage(key) {
    return Storage.remove({key});
  }
  
}
