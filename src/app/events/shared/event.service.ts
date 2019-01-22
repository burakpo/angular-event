import { Injectable } from '@angular/core'
import { Subject, Observable } from 'rxjs'
import { IEvent } from './event.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EventService {

  private EVENTS: IEvent[] = [];

  constructor(private http: HttpClient) {
  }

  getEvents(): Observable<IEvent[]> {
    let subject = new Subject<IEvent[]>();
    setTimeout(() => {
      this.http.get("http://localhost:21888/api/events").toPromise<any>().then(e => {
        this.EVENTS = e.value.events;
        subject.next(e.value.events);
        subject.complete();
      })
    }, 200);
    return subject;
  }

  getEvent(id: number): IEvent {
    return this.EVENTS.find(event => event.eventID === id)
  }

  deleteEvent(id: number): Observable<boolean> {
    let subject = new Subject<boolean>();
    this.http.delete("http://localhost:21888/api/events/" + id).toPromise<any>().then(e => {
      subject.next(e);
      subject.complete();
    });
    return subject;
  }
}