import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Models
import { Comment } from '../../models/comment.model';

//Services
import { AuthService } from '../../services/auth.service';
import { PageService } from '../../services/page.service';
import { CommentService } from '../../services/comment.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-comment-header',
  templateUrl: './comment-header.component.html',
  styleUrls: ['./comment-header.component.css']
})
export class CommentHeaderComponent {
  user: string;
  content: string;
  parentId: string;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private pageService: PageService,
    private commentService: CommentService,
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.user      = localStorage.getItem('username');
    this.parentId  = this.route.snapshot.params.id;

    this.getComments();
  }

  getComments(pageNumber: number = 1): void {
    this.commentService.getComment(this.parentId, pageNumber).subscribe(commentList => { 
      this.commentService.commentList = commentList;
      this.getNumberOfComments();
    });
  }

  getNumberOfComments(): void {
    this.commentService.getCommentLength(this.parentId).subscribe(numberOfComments => {
      this.commentService.numberOfComments = numberOfComments;
    });
  }

  addComment(newComment: Comment): void {
    this.commentService.addComment(newComment).subscribe(() => {
      this.flashMessage.show('Comment Added', {cssClass: 'alert-success', timeout: 3000});
      this.getComments();
      this.content = ''; 
    });
  }

  preventEmptyFields(comment: Comment): void {
    this.validateService.validateFields(comment);

    if(!this.validateService.fieldsAreNotEmpty) {
      this.flashMessage.show('Comment cannot be empty', {cssClass: 'alert-danger', timeout: 3000});
    } 
  }

  onCommentSubmit(event: KeyboardEvent): void { 
    if (event.keyCode === 13) {
      const newComment: Comment = {
        author: this.user,
        content: this.content,
        parentId: this.parentId
      }

      this.preventEmptyFields(newComment);

      if(this.validateService.fieldsAreNotEmpty){
        this.addComment(newComment);
      }
    }
  }
}