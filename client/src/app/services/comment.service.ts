import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';

//Models
import { Comment } from '../models/comment.model';

//Services
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  commentList: Comment[];

  numberOfComments: number;
  
  commentsPerPage: number = 5;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getComment(parentId: string, pageNumber: number): any { 
    return this.http.get(`/api/comments?parentId=${parentId}&page=${pageNumber}`)
      .pipe(map(res => {return res}));
  }

  getCommentLength(parentId: string): any {
    return this.http.get(`/api/comments/length?parentId=${parentId}`)
      .pipe(map(res => {return res}));
  }

  addComment(newComment: Comment): any {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.authToken
    });
    return this.http.post('api/comments', newComment, {headers: headers})
      .pipe(map(res => {return res}));
  }

  updateComment(updatedComment: Comment, id: string): any {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.authToken
    });
    return this.http.put(`api/comments/${id}`, updatedComment, {headers: headers})
      .pipe(map(res => {return res}));
  }

  deleteComment(id: string): any {  
    const headers = new HttpHeaders({'Authorization': this.authService.authToken});
    return this.http.delete(`api/comments/${id}`, {headers: headers})
      .pipe(map(res => {return res}));
  }
}