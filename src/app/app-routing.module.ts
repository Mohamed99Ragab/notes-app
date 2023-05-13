import { CheckValidTokenGuard } from './Guards/check-valid-token.guard';
import { GuestGuard } from './Guards/guest.guard';
import { AuthGuard } from './Guards/auth.guard';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { MyProfileComponent } from './component/my-profile/my-profile.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'signin',pathMatch:'full'},
  {path:'signin',component:SignInComponent,canActivate:[GuestGuard]},
  {path:'signup',component:SignUpComponent,canActivate:[GuestGuard]},
  {path:'myprofile',component:MyProfileComponent,canActivate:[AuthGuard]},
  {path:'**',component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
