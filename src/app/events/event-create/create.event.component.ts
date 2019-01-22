import { Component, Input,ChangeDetectionStrategy ,ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ISession, IEvent } from "../shared/event.model";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Component({
    templateUrl: "./create.event.component.html",
    selector: "ev-create-update-event",changeDetection:ChangeDetectionStrategy.OnPush
})
export class CreateUpdateEventComponent {

    private name: string;
    private date: Date;
    private price: number;
    private imageUrl: string;

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
    @Input("event-function") eventFunction: Subject<any>;
    constructor(private http: HttpClient,private cdRef:ChangeDetectorRef) {
    }
    ngAfterViewInit(): void {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        this.cdRef.detectChanges();
    }
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
        this.eventFunction.subscribe(v => {
            this.name = v.name;
            this.price = v.price;
            this.date = new Date (v.date);
            this.imageUrl = v.imageUrl;

        });
    }

    saveEvent(formValues) {
        let event = <IEvent>{
            eventID: 0,
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