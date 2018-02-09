import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import  { routes } from './app.routes';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { GroupsComponent } from './groups/groups.component';
import { StatsComponent } from './stats/stats.component';
import { AccountComponent } from './account/account.component';
import { GroupComponent } from './group/group.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    MainpageComponent,
    GroupsComponent,
    StatsComponent,
    AccountComponent,
    GroupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
