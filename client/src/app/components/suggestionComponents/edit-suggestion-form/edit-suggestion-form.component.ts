import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

//Models
import { Suggestion } from '../../../models/suggestion.model';

//Services
import { ValidateService } from '../../../services/validate.service';
import { SuggestionService } from '../../../services/suggestion.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-suggestion-form',
  templateUrl: './edit-suggestion-form.component.html',
  styleUrls: ['./edit-suggestion-form.component.css']
})
export class EditSuggestionFormComponent implements OnInit {
  id: string;
  title: string;
  description: string;
  selectedSuggestion: Suggestion;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private validateService: ValidateService, 
    private flashMessage: FlashMessagesService,
    private suggestionService: SuggestionService
  ) { }

  ngOnInit() { 
    this.id = this.route.params['value'].id;
    this.suggestionService.getSuggestionById(this.id).subscribe(selectedSuggestion => {
      this.title = selectedSuggestion[0].title;
      this.description = selectedSuggestion[0].description;
      this.selectedSuggestion = selectedSuggestion;
    });
  }

  preventEmptyFields(suggestion: Suggestion): void {
    this.validateService.validateFields(suggestion);

    if(!this.validateService.fieldsAreNotEmpty) {
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
    } 
  }

  updateSuggestion(updatedSuggestion: Suggestion): void { 
    this.suggestionService.updateSuggestion(updatedSuggestion, this.id).subscribe(() => {
      this.flashMessage.show('Suggestion Updated', {cssClass: 'alert-success', timeout: 5000});
      this.router.navigate(['suggestion']);
    });
  }

  onEditSubmit(): void {
    const user: string = localStorage.getItem('username'); 

    const updatedSuggestion: Suggestion = {
      title: this.title,
      author: user,
      description: this.description
    }

    this.preventEmptyFields(updatedSuggestion);

    if(this.validateService.fieldsAreNotEmpty){
      this.updateSuggestion(updatedSuggestion)
    }
  }
}