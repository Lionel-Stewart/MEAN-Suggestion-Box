import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Guards
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

//Components
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { SuggestionListComponent } from './components/suggestionComponents/suggestion-list/suggestion-list.component';
import { NewSuggestionFormComponent } from './components/suggestionComponents/new-suggestion-form/new-suggestion-form.component';
import { EditSuggestionFormComponent } from './components/suggestionComponents/edit-suggestion-form/edit-suggestion-form.component';
import { SelectedSuggestionComponent } from './components/suggestionComponents/selected-suggestion/selected-suggestion.component';

const routes: Routes = [
  //Private
  {path: 'suggestions/new', component: NewSuggestionFormComponent, canActivate:[AuthGuard]},
  {path: 'suggestions/:id/edit', component: EditSuggestionFormComponent, canActivate:[AuthGuard]},

  //Public
  {path: 'suggestions', component: SuggestionListComponent, pathMatch: 'full'},
  {path: 'suggestions/:id', component: SelectedSuggestionComponent, pathMatch: 'full'},

  {path: 'login', component: LoginComponent, canActivate:[LoginGuard]},
  {path: 'register', component: RegisterComponent},

  //Redirects
  {path: '', redirectTo: 'suggestions', pathMatch: 'full'},
  {path: '**', redirectTo: 'suggestions' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }