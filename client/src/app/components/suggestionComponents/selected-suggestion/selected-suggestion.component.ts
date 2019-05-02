import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//Models
import { Suggestion } from '../../../models/suggestion.model';

//Services
import { AuthService } from '../../../services/auth.service';
import { PageService } from '../../../services/page.service';
import { CommentService } from '../../../services/comment.service';
import { ValidateService } from '../../../services/validate.service';
import { SuggestionService } from '../../../services/suggestion.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-selected-suggestion',
  templateUrl: './selected-suggestion.component.html',
  styleUrls: ['./selected-suggestion.component.css']
})
export class SelectedSuggestionComponent implements OnInit {
  id: string;
  user: string;
  content: string;
  showComments: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private pageService: PageService,
    private commentService: CommentService,
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private suggestionService: SuggestionService
  ) { }

  ngOnInit() {
    this.id   = this.route.snapshot.params.id;
    this.user = localStorage.getItem('username');

    this.pageService.getCurrentPage();

    this.getSuggestionById();
    this.getNumberOfComments(); 
  }

  checkIfSuggestionExists(res) {
    if(res.success===false){
      this.flashMessage.show('An error has occured', {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['suggestion']);
    }
  }

  getSuggestionById(): void {
    this.suggestionService.getSuggestionById(this.id).subscribe(selectedSuggestion => {
      this.checkIfSuggestionExists(selectedSuggestion);
      
      this.suggestionService.selectedSuggestion = selectedSuggestion;
    });
  }

  getNumberOfComments(): void {
    this.commentService.getCommentLength(this.id).subscribe(numberOfComments => {
      this.commentService.numberOfComments = numberOfComments;
    });
  }

  addLike(suggestion: Suggestion): void {
    if(this.authService.loggedIn()) {
      const updatedSuggestion: Suggestion = {
        title: suggestion.title,
        author: suggestion.author,
        description: suggestion.description,

        score: suggestion.score + 1,
        likes: suggestion.likes + 1
      }

      this.suggestionService.updateSuggestion(updatedSuggestion, suggestion._id).subscribe(() => {
        this.getSuggestionById() 
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  addDislike(suggestion: Suggestion): void {
    if(this.authService.loggedIn()) {
      const updatedSuggestion: Suggestion = {
        title: suggestion.title,
        author: suggestion.author,
        description: suggestion.description,

        score: suggestion.score - 1,
        dislikes: suggestion.dislikes + 1
      }

      this.suggestionService.updateSuggestion(updatedSuggestion, suggestion._id).subscribe(() => {
        this.getSuggestionById();
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  toggleShowComments(): void {
    this.showComments = !this.showComments;
    this.getSuggestionById();
  }

  deleteSuggestion(id: string): void {
    this.suggestionService.deleteSuggestion(id).subscribe(() => {
      this.flashMessage.show('Suggestion Deleted', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['suggestion']);
    });
  }
}