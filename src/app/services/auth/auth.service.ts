import { Injectable } from '@angular/core';
import { 
  Auth, createUserWithEmailAndPassword, 
  onAuthStateChanged, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { StorageService } from '../storage.service';

export const user_key = 'maza_eats_user_id';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _fireAuth: Auth,
    private _firestore: Firestore,
    private storage: StorageService
  ) { }

  async register(formValue) {
    try {
      const registeredUser = await createUserWithEmailAndPassword(this._fireAuth, formValue.email, formValue.password);
      console.log('registered user: ', registeredUser);
      const uid = registeredUser.user.uid;
      const dataRef = doc(this._firestore, `users/${uid}`);
      const data = {
        email: formValue.email,
        username: formValue.username
      };
      setDoc(dataRef, data);
      await this.storage.setStorage(user_key, uid);
      return uid;
    } catch(e) {
      throw(e);
    }
  }

  async login(formValue) {
    try {
      const response = await signInWithEmailAndPassword(this._fireAuth, formValue.email, formValue.password);
      console.log('login user: ', response);
      if(response?.user) {
        const uid = response.user.uid;
        await this.storage.setStorage(user_key, uid);
        return uid;
      } else {
        return false;
      }
    } catch(e) {
      throw(e);
    }
  }

  checkAuth() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this._fireAuth, user => {
        console.log(user);
        if(user) resolve(true);
        resolve(false);
      }); 
    });
  }

  async logout() {
    try {
      await signOut(this._fireAuth);
      await this.storage.removeStorage(user_key);
      return true;
    } catch(e) {
      throw(e);
    }
  }
}
