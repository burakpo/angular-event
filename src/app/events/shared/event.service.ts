import { Injectable } from '@angular/core'
import { Subject,Observable } from 'rxjs'
import { IEvent } from './event.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';

@Injectable()
export class EventService extends BaseService {
  constructor(private http: HttpClient){
    super();
  }
  private EventArray: IEvent[] = [];
  getEvents() :Observable<IEvent[]> {

    let subject = new Subject<IEvent[]>();
    setTimeout(() => {
      this.http.get(`${this.BaseApiUri}/events`).toPromise<any>().then(e => {
        this.EventArray = e.value.events;
        subject.next(e.value.events);
        subject.complete();
      })
    },200);
   return subject;
  }

  getEvent(id: number) :IEvent {
    return this.EventArray.find(event => event.eventID === id)
  }
}