import {
    ProfileComponent,
    LoginComponent
} from './index'
import { AuthGuard } from './auth.guard.service';


export const userRoutes =[
    {path:'profile', component: ProfileComponent,canActivate: [AuthGuard]},
    {path:'login',component:LoginComponent},
    {path:'logout',component:LoginComponent}

]