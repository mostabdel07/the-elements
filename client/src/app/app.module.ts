import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { FeaturesComponent } from './components/features/features.component';
import { TeamComponent } from './components/team/team.component';
import { MultimediaComponent } from './components/multimedia/multimedia.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ObjToArrayPipe } from './pipes/obj-to-array.pipe';
import { UsersComponent } from './components/users/users.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RegisterComponent } from './components/register/register.component';
import { MatchPasswordDirective } from './directives/match-password.directive';
import { RecordComponent } from './components/record/record.component';

// Interceptors
import { AuthInterceptorService } from './auth-interceptor.service';
import { CheckRatingDirective } from './directives/check-rating.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ContactComponent,
    FeaturesComponent,
    TeamComponent,
    MultimediaComponent,
    LoginComponent,
    FooterComponent,
    ObjToArrayPipe,
    UsersComponent,
    RegisterComponent,
    RecordComponent,
    MatchPasswordDirective,
    CheckRatingDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi:true //allow to add more interceptors if is needed
  },
    CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
