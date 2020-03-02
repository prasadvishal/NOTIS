import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { NotificationService } from './services/notification.service';



@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent implements OnInit {

    public message$;
    constructor(private notificationService: NotificationService) {
        this.message$ = this.notificationService.message$;
    }

    ngOnInit() {
    }

}
