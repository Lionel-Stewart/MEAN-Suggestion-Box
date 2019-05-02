import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  currentPage: number;

  constructor(private route: ActivatedRoute) { }

  getCurrentPage() {
    this.currentPage = parseInt(this.route.snapshot.queryParams.page) || 1;
  }
}