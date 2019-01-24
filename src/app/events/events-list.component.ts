import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { IEvent, EventService } from './shared';

@Component({
  template: `
  <div>
    <h1>Upcoming Angular Events</h1>
    <hr/>
    <div class="row">
    <div *ngFor="let event of events" class="col-md-5">
      <event-thumbnail  (click)="handleThumbnailClick(event.name)" [event]="event"></event-thumbnail>
    </div>
  </div>
  `
})
export class EventsListComponent {
  events:IEvent[]

  constructor(private eventService: EventService,private router:ActivatedRoute) {
    
  }

  ngOnInit() {
   this.events = this.router.snapshot.data['events'];
  }

  handleThumbnailClick(eventName) {
    
  }
}