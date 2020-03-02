import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { LoaderService } from './services/loader.service';



@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit {

    public show$=this.loaderService.show$;

    constructor(public loaderService: LoaderService) {
    }

    ngOnInit() {
    }

}
