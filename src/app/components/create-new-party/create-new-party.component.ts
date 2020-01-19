import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Party} from '../../services/party.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-new-party',
  templateUrl: './create-new-party.component.html',
  styleUrls: ['./create-new-party.component.css']
})
export class CreateNewPartyComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private auth: AuthenticationService,
              private firestore: AngularFirestore,
              private router: Router) { }

  creatPartyForm;
  userName: string;

  private static makePassCode() {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < 6; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  ngOnInit() {
    this.creatPartyForm = this.formBuilder.group({
      name: '',
    });
    this.auth.user$.subscribe(user => this.userName = user.uid);
  }

  onSubmit(partyData) {
    console.log('creating the party');
    const id = this.firestore.createId();
    const partyRef: AngularFirestoreDocument<Party> = this.firestore.collection('parties').doc(id);
    const data = {
      owner: this.userName,
      name: partyData.name,
      passCode: this.generateUniquePassCode(),
      uid: id
    };
    partyRef.set(data);
    this.router.navigate(['/party_view'], {state: {data: {
      passCode: data.passCode
    }}});
  }

  generateUniquePassCode() {
    console.log('creating a unique passCode');
    let returnValue = '';
    while (returnValue === '' && this.firestore.collection(`parties`).ref.where('passCode', '==', returnValue)) {
      returnValue = CreateNewPartyComponent.makePassCode();
    }
    return returnValue;
  }

}
