import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { GroupsComponent } from './groups/groups.component';
import { AccountComponent } from './account/account.component';
import { StatsComponent } from './stats/stats.component';
import { GroupComponent } from './group/group.component';

export const router: Routes = [
	{ path: '', redirectTo: 'homepage', pathMatch: 'full' },
	{ path: 'homepage', component: HomepageComponent },
	{ path: 'main', component: MainpageComponent },
	{ path: 'groups', component: GroupsComponent },
	{ path: 'account', component: AccountComponent },
	{ path: 'stats', component: StatsComponent },
	{ path: 'group/:id', component: GroupComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);