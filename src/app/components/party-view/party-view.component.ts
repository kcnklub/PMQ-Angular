import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Party} from '../../services/party.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-party-view',
  templateUrl: './party-view.component.html',
  styleUrls: ['./party-view.component.css']
})
export class PartyViewComponent implements OnInit {

  partyPassCode;
  partyDocumentRef;
  partyObservable$: Observable<Party>;

  constructor(private firebase: AngularFirestore,
              public auth: AuthenticationService) { }

  ngOnInit() {
    console.log(history.state.data);
    this.getPartyObservable();
    this.addMemberToParty();
  }

  getPartyObservable() {
    if (history.state.data.passCode !== undefined) {
      this.partyPassCode = history.state.data.passCode;
    }
    this.partyDocumentRef = this.firebase.collection<Party>(`parties`, ref => ref.where('passCode', '==', this.partyPassCode));
    this.partyObservable$ = this.partyDocumentRef
      .valueChanges()
      .pipe(
        map(party => {
          const currentParty = party[0];
          console.log(currentParty.owner);
          return currentParty;
        })
      );
  }

  addMemberToParty() {
    this.partyObservable$.subscribe(party => {
      this.auth.user$.subscribe(currentUser => {
        if (currentUser.uid !== party.owner) {
          const membersRef = this.partyDocumentRef.doc(`${party.uid}/members/${currentUser.uid}`);
          membersRef.set(currentUser, {merge: true});
        }
      });
    });
  }
}
