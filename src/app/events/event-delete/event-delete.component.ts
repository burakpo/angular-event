import { Component, OnInit } from "@angular/core";
import { EventService } from "../shared/event.service";
import { IEvent } from "../shared/event.model";


@Component({
    templateUrl: "./event-delete.component.html"
})
export class EventDelete implements OnInit {
    private events: IEvent[] = [];
    constructor(private eventService: EventService) {

    }
    ngOnInit(): void {
        this.getEvents();
    }
    deleteEvent(id: number) {
        if (this.checkDirtyState()) {
            this.eventService.deleteEvent(id).toPromise<any>().then(e => {
                if (e.value.isSuccess) {
                    console.log("başarılı")
                    this.getEvents();
                }
                else {
                    console.log("başarılı")
                }
            });
        }
    }
    getEvents() {
        this.eventService.getEvents().toPromise().then(e => {
            this.events = e.value.entity;
        });
    }
    checkDirtyState(): boolean {
        return window.confirm("Do you really want to delete this event?");
    }
}