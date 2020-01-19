import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import {environment} from '../environments/environment';

/* Auth service */
import {AuthenticationService} from './services/authentication.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import {AuthGuard} from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { JoinExistingPartyComponent } from './components/join-existing-party/join-existing-party.component';
import { CreateNewPartyComponent } from './components/create-new-party/create-new-party.component';
import { PartyViewComponent } from './components/party-view/party-view.component';
import { PlayerBarComponent } from './components/player-bar/player-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    TopBarComponent,
    JoinExistingPartyComponent,
    CreateNewPartyComponent,
    PartyViewComponent,
    PlayerBarComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    RouterModule.forRoot(
      [
        {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
        {path: '', component: LoginComponent},
        {path: 'party_view', component: PartyViewComponent, canActivate: [AuthGuard]},
      ]
    ),
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
