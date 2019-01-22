import { Component, Input } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ISession, IEvent } from "../shared/event.model";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Component({
    templateUrl: "./create.event.component.html",
    selector: "ev-create-update-event"
})
export class CreateUpdateEventComponent {
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
    private updateForm: boolean = false;
    @Input("event-function") eventFunction: Subject<IEvent>;
    constructor(private http: HttpClient) {
    }
    ngAfterViewInit(): void {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
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

        if (this.eventFunction) {
            this.eventFunction.subscribe(v => {
                this.eventForm.controls["eventName"].setValue(v.name);
                this.eventForm.controls["date"].setValue(new Date(v.date).toISOString().substring(0, 10));
                this.eventForm.controls["price"].setValue(v.price);
                this.eventForm.controls["imageUrl"].setValue(v.imageUrl);
                this.eventForm.controls["onlineUrl"].setValue(v.onlineUrl);
                this.eventForm.controls["address"].setValue(v.location.address);
                this.eventForm.controls["city"].setValue(v.location.city);
                this.eventForm.controls["country"].setValue(v.location.country);
                this.Sessions = v.sessions;
                this.updateForm = true;
            });
        }
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
        if (this.updateForm) {
            this.http.put("http://localhost:21888/api/events", event).toPromise<any>().then(e => {
                if (e.value.isSuccess) {
                    alert("update başarılı");
                }
            });
        }
        else {
            this.http.post("http://localhost:21888/api/events", event).toPromise<any>().then(e => {
                if (e.value.isSuccess) {
                    alert("kayıt başarılı");
                    this.eventForm.reset();
                    this.Sessions = [];
                }
            });
            this.showSession = false;
        }
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