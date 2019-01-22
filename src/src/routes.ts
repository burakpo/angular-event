import { Routes } from '@angular/router'
import {
    EventsListComponent,
    EventDetailsComponent,
    CreateEventComponent,
    EventRouteActivator,
    EventListResolver
} from './app/events/index'
import { Error404Component } from './app/errors/404.component';
import { EventDelete } from './app/events/event-delete/event-delete.component';
import { EventUpdate } from './app/events/event-update/event-update.component';

export const appRoutes: Routes = [
    { path: 'events/create', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] },
    { path: 'events/delete', component: EventDelete},
    { path: 'events/update', component: EventUpdate},
    { path: 'events', component: EventsListComponent, resolve: { events: EventListResolver } },
    { path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouteActivator] },
    { path: '404', component: Error404Component },
    { path: 'user', loadChildren: './user/user.module#UserModule' },
    { path: '', redirectTo: '/events', pathMatch: 'full' },


]