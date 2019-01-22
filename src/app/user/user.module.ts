import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'

import { ProfileComponent } from 'src/app/user/profile.component';
import { LoginComponent } from 'src/app/user/login.component';
import { userRoutes } from 'src/app/user/user.routes';



@NgModule({
  declarations: [
    ProfileComponent,
    LoginComponent

  ],
  imports: [
      CommonModule,
      FormsModule, 
      ReactiveFormsModule,
      RouterModule.forChild(userRoutes)
  ],
  providers: [],
})
export class UserModule { }

