import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SummaryComponent } from './summary/summary.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HelpComponent } from './help/help.component';
import { LogoutComponent } from './logout/logout.component';
import {LoaderModule} from './loader/loader.module';
// import { InfiniteScrollModule } from 'ngx-infinite-scroll';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SummaryComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ProfileComponent,
    ChangePasswordComponent,
    HelpComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LoaderModule
    // InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
