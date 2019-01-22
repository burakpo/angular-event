import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  EventsListComponent,
  EventThumbnailComponent,
  EventService,
  EventDetailsComponent,
  CreateEventComponent,
  EventRouteActivator,
  EventListResolver,
  SessionListComponent
} from './events/index'
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav/nav-bar.component'
import { ToastrService } from './common/toastr.service';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../routes';
import { Error404Component } from './errors/404.component';
import { AuthService } from './user/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './user/auth.guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventSessionComponent } from './events/event-create/session.component';
import { EventDelete } from './events/event-delete/event-delete.component';
import { CreateUpdateEventComponent } from './events/event-create/create.event.component';
import { EventUpdate } from './events/event-update/event-update.component';


@NgModule({
  declarations: [
    AppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    NavBarComponent,
    SessionListComponent,
    EventSessionComponent,
    EventDelete,
    EventUpdate,
    CreateUpdateEventComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  providers: [EventService, 
    ToastrService,
    EventRouteActivator,
    AuthGuard,
    {provide:'canDeactivateCreateEvent',useValue:checkDirtyState},
    EventListResolver,
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function checkDirtyState(component:CreateEventComponent){
  if(component.isDirty){
    return window.confirm("You haven't saved this event, do you really want to cancel?")
  }
  return true; 
}
