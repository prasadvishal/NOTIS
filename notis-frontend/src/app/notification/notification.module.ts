import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NotificationComponent } from './notification.component';
import { NotificationService } from './services/notification.service';

@NgModule({
    declarations: [NotificationComponent],
    exports: [NotificationComponent],
    imports: [
        CommonModule
    ],
    providers: [NotificationService]
})
export class NotificationModule { }
