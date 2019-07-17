import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { RegisterUserComponent } from './register.user/register.user.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupComponent } from './group/group.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'registerUser', component: RegisterUserComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'group/:id', component: GroupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
