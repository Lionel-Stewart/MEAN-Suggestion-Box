import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//services
import { AuthService } from '../../services/auth.service';
import { PageService } from '../../services/page.service'
import { SuggestionService } from '../../services/suggestion.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: string;
  isCollapsed: boolean = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private pageService: PageService,
    private flashMessage: FlashMessagesService,
    private suggestionService: SuggestionService
  ) { }

  ngOnInit() {
    this.user = localStorage.getItem('username');
  }

  getSuggestions(): void {
    this.suggestionService.getSuggestion().subscribe(suggestionList => {
      this.suggestionService.suggestionList = suggestionList;
    });
    
    this.pageService.currentPage = 1;
  }

  toggleCollaspe(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  onLogoutClick(): void {
    this.authService.logout();
    this.flashMessage.show('You are logged out', {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['/']);
  }
}