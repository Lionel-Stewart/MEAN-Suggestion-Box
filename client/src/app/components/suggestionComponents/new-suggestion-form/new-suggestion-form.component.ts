import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Models
import { Suggestion } from '../../../models/suggestion.model';

//Services
import { ValidateService } from '../../../services/validate.service';
import { SuggestionService } from '../../../services/suggestion.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-new-suggestion-form',
  templateUrl: './new-suggestion-form.component.html',
  styleUrls: ['./new-suggestion-form.component.css']
})
export class NewSuggestionFormComponent implements OnInit {
  title: string;
  description: string;

  constructor(
    private router: Router,
    private validateService: ValidateService, 
    private flashMessage: FlashMessagesService,
    private suggestionService: SuggestionService
  ) { }

  ngOnInit() {}

  preventEmptyFields(suggestion: Suggestion): void {
    this.validateService.validateFields(suggestion);

    if(!this.validateService.fieldsAreNotEmpty) {
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
    } 
  }

  addSuggestion(newSuggestion: Suggestion): void {
    this.suggestionService.addSuggestion(newSuggestion).subscribe(() => {
      this.flashMessage.show('Suggestion Added', {cssClass: 'alert-success', timeout: 5000});
      this.router.navigate(['suggestion']);
    });
  }

  onCreateSubmit(): void {
    const username: string = localStorage.getItem('username'); 

    const newSuggestion: Suggestion = {
      title: this.title,
      author: username,
      description: this.description
    }

    this.preventEmptyFields(newSuggestion);

    if(this.validateService.fieldsAreNotEmpty){
      this.addSuggestion(newSuggestion)
    }
  }
}