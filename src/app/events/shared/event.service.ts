import { Injectable } from '@angular/core'
import { Subject, Observable } from 'rxjs'
import { IEvent, IResponseModel } from './event.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EventService {

  private EVENTS: IEvent[] = [];

  constructor(private http: HttpClient) {
  }

  getEvents(): Observable<IResponseModel<IEvent[]>> {
    let subject = new Subject<IResponseModel<IEvent[]>>();
    setTimeout(() => {
      this.http.get<IResponseModel<IEvent[]>>("http://localhost:21888/api/events").toPromise().then(e => {
        this.EVENTS = e.value.entity;
        subject.next(e);
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
  createEvent(event: IEvent): Observable<IResponseModel<IEvent>> {
    let subject = new Subject<IResponseModel<IEvent>>();
    this.http.post<IResponseModel<IEvent>>("http://localhost:21888/api/events", event).toPromise().then(e => {
      subject.next(e);
      subject.complete();
    });
    return subject;
  }
  updateEvent(event: IEvent): Observable<IResponseModel<IEvent>> {
    let subject = new Subject<IResponseModel<IEvent>>();
    this.http.put<IResponseModel<IEvent>>("http://localhost:21888/api/events", event).toPromise().then(e => {
      subject.next(e);
      subject.complete();
    });
    return subject;
  }
}