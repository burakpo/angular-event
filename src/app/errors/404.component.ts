import {Component} from '@angular/core'

@Component({
    templateUrl:'404.html',
    styles:[`
        .errorMessage {
            margin-top: 150px;
            font-size: 170px;
            text-align: center;
        }
    `]
})

export class Error404Component{
    constructor(){

    }
}