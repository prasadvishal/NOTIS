import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NotificationService {

    public message$ = new BehaviorSubject('');
    constructor() {

    }

    public show(message: string) {
        this.message$.next(message);
        setTimeout(() => {
            this.close();
        }, 20000);
    }

    private close() {
        this.message$.next('');
    }
}
