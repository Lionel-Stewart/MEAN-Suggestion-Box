import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//Models
import { Suggestion } from '../../../models/suggestion.model';

//Services
import { AuthService } from '../../../services/auth.service';
import { PageService } from '../../../services/page.service';
import { SuggestionService } from '../../../services/suggestion.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrls: ['./suggestion-list.component.css']
})
export class SuggestionListComponent implements OnInit, AfterContentChecked {
  user: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private pageService: PageService,
    private flashMessage: FlashMessagesService,
    private suggestionService: SuggestionService
  ) { }

  ngOnInit() {
    this.user = localStorage.getItem('username');
    
    this.pageService.getCurrentPage(); 

    this.getNumberOfSuggestions();
    this.getSuggestion(this.pageService.currentPage);
  }

  ngAfterContentChecked() { 
    this.redirectOnFirstPage();
  }

  redirectOnFirstPage(): void {
    if(parseInt(this.route.snapshot.queryParams.page) === 1) {
      this.getSuggestion(); 
    }
  }
 
  checkIfEmptyPage(suggestionList: Suggestion[], pageNumber: number): void {
      if(suggestionList.length === 0 && pageNumber !== 1) { 
        this.getSuggestion();
      }
  }

  changePageNumber(pageNumber: number): void {
    if(pageNumber === 1) {
      this.pageService.currentPage = 1;
      this.router.navigate(['/suggestions']);
    } else {
      this.pageService.currentPage = pageNumber;
      this.router.navigate(['suggestions'], { queryParams: { page: pageNumber } });
    }
  }
  
  getSuggestion(pageNumber: number = 1): void {
    this.changePageNumber(pageNumber);

    this.suggestionService.getSuggestion(pageNumber).subscribe(suggestionList => {
      this.checkIfEmptyPage(suggestionList, pageNumber);

      this.suggestionService.suggestionList = suggestionList;
    });
  }

  getNumberOfSuggestions(): void {
    this.suggestionService.getSuggestionLength().subscribe(numberOfSuggestions => {
      this.suggestionService.numberOfSuggestions = numberOfSuggestions;
    });
  }

  deleteSuggestion(id: string): void { 
    this.suggestionService.deleteSuggestion(id).subscribe(() => {
      this.flashMessage.show('Suggestion Deleted', {cssClass: 'alert-success', timeout: 3000});
      this.getSuggestion(this.pageService.currentPage);
    });
  }
}