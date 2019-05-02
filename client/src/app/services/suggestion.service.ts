import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

//Models
import { Suggestion } from '../models/suggestion.model';

//Services
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  suggestionsPerPage: number = 6;

  numberOfSuggestions: number; 
  suggestionList: Suggestion[];
  selectedSuggestion: Suggestion;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getSuggestion(pageNumber: number = 1): any { 
    return this.http.get(`/api/suggestions?page=${pageNumber}`)
      .pipe(map(res => {return res}));
  }

  getSuggestionLength(): any {
    return this.http.get('/api/suggestions/length')
      .pipe(map(res => {return res}));
  }

  getSuggestionById(id: string): any {
    return this.http.get(`/api/suggestions/${id}`)
      .pipe(map(res => {return res}));
  }

  addSuggestion(newSuggestion: Suggestion): any {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.authToken
    });
    return this.http.post('api/suggestions', newSuggestion, {headers: headers})
      .pipe(map(res => {return res}));
  }

  updateSuggestion(updatedSuggestion: Suggestion, id: string): any {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.authToken
    });
    return this.http.put(`api/suggestions/${id}`, updatedSuggestion, {headers: headers})
      .pipe(map(res => {return res}));
  }

  deleteSuggestion(id: string): any {
    const headers = new HttpHeaders({'Authorization': this.authService.authToken});
    return this.http.delete(`api/suggestions/${id}`, {headers: headers})
      .pipe(map(res => {return res}));
  }
}