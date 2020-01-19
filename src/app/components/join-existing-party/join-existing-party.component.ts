import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {FormBuilder} from '@angular/forms';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Party} from '../../services/party.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-join-existing-party',
  templateUrl: './join-existing-party.component.html',
  styleUrls: ['./join-existing-party.component.css']
})
export class JoinExistingPartyComponent implements OnInit {

  userId: string;
  joinPartyForm;

  constructor(private auth: AuthenticationService,
              private firebase: AngularFirestore,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => this.userId = user.uid);

    this.joinPartyForm = this.formBuilder.group({
        passCode: '',
    });
  }

  onSubmit(party) {
    console.log('join party');
    const partyRef = this.firebase.collection(`parties/`).ref.where('passCode', '==', party.passCode);
    partyRef
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size === 1) {
          console.log(querySnapshot.docs[0].get('name'));
          this.router.navigate(['/party_view'], {state: {data: {
            passCode: querySnapshot.docs[0].get('passCode')
          }}});
        }
      })
      .catch(error => {
        console.log('something went wrong', error);
      });
  }

}
