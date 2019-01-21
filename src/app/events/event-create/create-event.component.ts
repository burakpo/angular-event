import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IEvent, ISession } from '../shared/event.model';
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: 'create-event.component.html',
    styles: [`
    em { float:right; color:#E05C65; padding-left:10px;}
`]
})

export class CreateEventComponent implements OnInit {

    isDirty: boolean = true;
    eventForm: FormGroup;
    private EventName: FormControl;
    private EventDate: FormControl;
    private Price: FormControl;
    private ImageUrl: FormControl;
    private OnlineUrl: FormControl;
    private Address: FormControl;
    private City: FormControl;
    private Country: FormControl;
    private SessionName: FormControl;
    private Presenter: FormControl;
    private Duration: FormControl;
    private Level: FormControl;
    private Abstract: FormControl;
    private Sessions: ISession[] = [];
    private showSession: boolean = false;
    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit(): void {
        this.EventDate = new FormControl();
        this.EventName = new FormControl();
        this.Price = new FormControl();
        this.ImageUrl = new FormControl();
        this.OnlineUrl = new FormControl();
        this.Address = new FormControl();
        this.City = new FormControl();
        this.Country = new FormControl();
        this.SessionName = new FormControl();
        this.Presenter = new FormControl();
        this.Duration = new FormControl();
        this.Level = new FormControl();
        this.Abstract = new FormControl();

        this.eventForm = new FormGroup({
            eventName: this.EventName,
            date: this.EventDate,
            price: this.Price,
            imageUrl: this.ImageUrl,
            address: this.Address,
            onlineUrl: this.OnlineUrl,
            city: this.City,
            country: this.Country,
            sessionName: this.SessionName,
            presenter: this.Presenter,
            duration: this.Duration,
            level: this.Level,
            abstract: this.Abstract
        });
    }
    cancel() {
        this.router.navigate(['/events']);
    }
    saveEvent(formValues) {
        let event = <IEvent>{
            id: 1,
            name: formValues.eventName,
            date: formValues.date,
            price: formValues.price,
            imageUrl: formValues.imageUrl,
            onlineUrl: formValues.onlineUrl,
            location: {
                city: formValues.city,
                address: formValues.address,
                country: formValues.country
            },
            sessions: this.Sessions
        };
        this.http.post("http://localhost:21888/api/events", event).toPromise<any>().then(e => {
            if (e.value.isSuccess) {
                alert("başarılı");
                this.eventForm.reset();
                this.Sessions = [];
            }
        });
        this.showSession = false;
    }
    addSession(formValues) {
        let session = <ISession>{
            name: formValues.sessionName,
            presenter: formValues.presenter,
            duration: formValues.duration,
            level: formValues.level,
            abstract: formValues.abstract
        };
        this.clearSessionBoxes();
        this.showSession = false;
        this.Sessions.push(session);
    }
    clearSessionBoxes() {
        this.eventForm.controls["sessionName"].reset();
        this.eventForm.controls["presenter"].reset();
        this.eventForm.controls["duration"].reset();
        this.eventForm.controls["level"].reset();
        this.eventForm.controls["abstract"].reset();
    }
}