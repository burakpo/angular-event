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
   
    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit(): void {
     
    }
    cancel() {
        this.router.navigate(['/events']);
    }
    
    
}