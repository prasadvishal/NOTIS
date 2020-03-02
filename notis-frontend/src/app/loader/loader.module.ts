import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoaderComponent } from './loader.component';
import { LoaderService } from './services/loader.service';

@NgModule({
    declarations: [LoaderComponent],
    exports: [LoaderComponent],
    imports: [
        CommonModule
    ],
    providers: [LoaderService]
})
export class LoaderModule { }
