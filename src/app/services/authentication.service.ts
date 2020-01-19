import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from './user.model';
import {switchMap} from 'rxjs/operators';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {auth} from 'firebase/app';
import {Router} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  user$: Observable<User>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
  ) {
    this.user$ = this.angularFireAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
}

  async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    const credentials = await this.angularFireAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credentials.user);
  }

  private updateUserData({ uid, email, displayName, photoURL}: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      email,
      displayName,
      photoURL
    };
    userRef.set(data, {merge: true});
    this.router.navigate(['/home']);
  }

  async signOut() {
    await this.angularFireAuth.auth.signOut();
    this.router.navigate(['/']);
  }

}
