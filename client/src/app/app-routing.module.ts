import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { FeaturesComponent } from './components/features/features.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MultimediaComponent } from './components/multimedia/multimedia.component';
import { TeamComponent } from './components/team/team.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'features',
    component:FeaturesComponent
  },
  {
    path:'team',
    component:TeamComponent
  },
  {
    path:'multimedia',
    component:MultimediaComponent
  },
  {
    path:'contact',
    component:ContactComponent
  },
  {
    path:'users',
    component:UsersComponent
  },
  {
    path:'login',
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
