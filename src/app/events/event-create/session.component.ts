import { Component, Input } from "@angular/core";

@Component({
    selector:"event-session",
    templateUrl: 'session.component.html',
    styles: [`
        input {
            color: black;
        }
    `]
})
export class EventSessionComponent {
    private edit:boolean = false;
    private editIndex: number;
    @Input("ev-sessions") sessions; 
    
    editEvent(index){
        this.editIndex =index;
        this.edit= true;
    }
    closeEditEvent(index){
        this.edit=false;
        this.editIndex = undefined;
    }
}