import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire/compat'
import { environment } from '../environments/environment';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { VarifyEmailComponent } from './component/varify-email/varify-email.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    VarifyEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp({"projectId":"mecanica-fluxo","appId":"1:996659053641:web:62198aa31199a205a82b98","storageBucket":"mecanica-fluxo.appspot.com","apiKey":"AIzaSyBSdF4JU0iC3OzAzctaxizkiENFUXR9wRw","authDomain":"mecanica-fluxo.firebaseapp.com","messagingSenderId":"996659053641","measurementId":"G-Y0LPEKP0KX"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
