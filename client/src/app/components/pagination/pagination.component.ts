import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() totalItems: number;
  @Input() currentPage: number;
  @Input() itemsPerPage: number;

  @Output() pageChange = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() { }
 
  pageChanged(event: PageChangedEvent): void {
    this.pageChange.emit(event.page); 
  }
}