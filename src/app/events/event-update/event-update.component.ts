import { Component, OnInit } from "@angular/core";
import { EventService, IEvent } from "../shared";
import { Subject } from "rxjs";

@Component({
    templateUrl: "./event-update.component.html"
})
export class EventUpdate implements OnInit{
    private events: IEvent[] = [];
    private updateEventItem : IEvent;
    private eventSelected:boolean= false;
    private changingValue: Subject<any> = new Subject();
    constructor(private eventService: EventService){

    }

    ngOnInit(): void {
        this.getEvents();
    }
    getEvents(){
        this.eventService.getEvents().toPromise().then(e => {
            this.events = e.value.entity;
        });
    }
    eventUpdate(id: number){
        this.updateEventItem = this.eventService.getEvent(id);
        this.changingValue.next(this.updateEventItem);
        this.eventSelected = true;
    }
    updateSuccess(event){
        this.eventSelected = false;
        this.getEvents();
    }
}