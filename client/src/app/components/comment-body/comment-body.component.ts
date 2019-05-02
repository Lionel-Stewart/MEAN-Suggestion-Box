import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

//Models
import { Comment } from '../../models/comment.model';

//Services
import { AuthService } from '../../services/auth.service';
import { CommentService } from '../../services/comment.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-comment-body',
  templateUrl: './comment-body.component.html',
  styleUrls: ['./comment-body.component.css']
})
export class CommentBodyComponent {
  @Input() comment: Comment;

  @Output() commentAction = new EventEmitter();

  user: string
  content: string;
  parentId: string;
  commentId: string;
  showEditForm: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private commentService: CommentService,
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.user      = localStorage.getItem('username');
    this.content   = this.comment.content;
    this.parentId  = this.comment.parentId; 
    this.commentId = this.comment._id;
  }

  toggleShowEditForm(): void { 
    this.showEditForm = !this.showEditForm; 
  }

  preventEmptyFields(comment: Comment): void {
    this.validateService.validateFields(comment);

    if(!this.validateService.fieldsAreNotEmpty) {
      this.flashMessage.show('Comment cannot be empty', {cssClass: 'alert-danger', timeout: 3000});
    } 
  }


  updateComment (updatedComment: Comment): void {
    this.commentService.updateComment(updatedComment, this.commentId).subscribe(() => {
      this.flashMessage.show('Comment Updated', {cssClass: 'alert-success', timeout: 3000});
      this.commentAction.emit();
    });
  }

  onEditSubmit(event: KeyboardEvent): void { 
    if (event.keyCode === 13) {
      const updatedComment: Comment = {
        author: this.user,
        content: this.content,
        parentId: this.parentId
      }

      this.preventEmptyFields(updatedComment); 
      
      if(this.validateService.fieldsAreNotEmpty){
        this.updateComment(updatedComment);
      }
    }
  }

  deleteComment(id: string): void {
    this.commentService.deleteComment(id).subscribe(() => {
      this.flashMessage.show('Comment Deleted', {cssClass: 'alert-success', timeout: 3000});
      this.commentAction.emit();
    });
  }

  addLike(comment: Comment): void {
    if(this.authService.loggedIn()) {
      const updatedComment: Comment = {
        author: comment.author,
        content: comment.content,
        parentId: comment.parentId,

        score: comment.score + 1,
        likes: comment.likes + 1
      }

      this.commentService.updateComment(updatedComment, comment._id).subscribe(() => {
        this.commentAction.emit(); 
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  addDislike(comment: Comment): void {
    if(this.authService.loggedIn()) {
      const updatedComment: Comment = {
        author: comment.author,
        content: comment.content,
        parentId: comment.parentId,

        score: comment.score - 1,
        dislikes: comment.dislikes + 1
      }

      this.commentService.updateComment(updatedComment, comment._id).subscribe(() => {
        this.commentAction.emit();
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}