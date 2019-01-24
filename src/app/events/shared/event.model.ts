import { DatePipe } from "@angular/common";

export interface IEvent {
    eventID: number
    name:string
    date:Date
    time?:string
    price : number
    imageUrl: string
    location ?: { 
        address:string
        city:string
        country:string
    },
    onlineUrl?: string
    sessions: ISession []
}
export interface ISession {
    id?: number
    name:string
    presenter:string
    duration : number
    level :string
    abstract: string
    voters: string []
}

export interface IResponseModel<T> {
    contentTypes: any[];
    declaredTypes: any;
    formatters: any[];
    statusCode: number;
    value : IValue<T>;
}
export interface IValue<T>{
    entity : T;
    isSuccess: boolean;
}