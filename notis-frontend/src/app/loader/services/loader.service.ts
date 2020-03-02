import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {

    public show$ = new BehaviorSubject(false);
    constructor() {

    }

    public show() {
        this.show$.next(true);
    }

    public hide() {
        this.show$.next(false);

    }
}
