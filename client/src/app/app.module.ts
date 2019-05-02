//Modules
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages';

//Ngx Bootstrap
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';

//Guards
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

//Services
import { AuthService } from './services/auth.service';
import { ValidateService } from './services/validate.service';

//Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PaginationComponent } from './components/pagination/pagination.component';

import { CommentBodyComponent } from './components/comment-body/comment-body.component';
import { CommentHeaderComponent } from './components/comment-header/comment-header.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { SuggestionListComponent } from './components/suggestionComponents/suggestion-list/suggestion-list.component';
import { NewSuggestionFormComponent } from './components/suggestionComponents/new-suggestion-form/new-suggestion-form.component';
import { EditSuggestionFormComponent } from './components/suggestionComponents/edit-suggestion-form/edit-suggestion-form.component';
import { SelectedSuggestionComponent } from './components/suggestionComponents/selected-suggestion/selected-suggestion.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    PaginationComponent,
    CommentBodyComponent,
    CommentHeaderComponent,
    SuggestionListComponent,
    NewSuggestionFormComponent,
    EditSuggestionFormComponent,
    SelectedSuggestionComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    FlashMessagesModule.forRoot()﻿
  ],
  providers: [ValidateService, AuthService, AuthGuard, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }