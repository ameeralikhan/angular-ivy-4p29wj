import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

// rxjs
import { Subscription } from 'rxjs';

// constants
import {
  CONSTANT_MESSAGES,
  DefaultPagination,
} from '../helper/constants';

// interfaces
import { IPosts } from './IPost.interface';

// services
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {

  subscription: Subscription[] = [];
  displayedColumns: string[] = ['id', 'userId', 'title', 'body'];
  totalRecords: number = 0;
  postId: string = '';
  posts: IPosts[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private postService: PostsService,
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Posts Lists');
    this.getPosts();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(subs => subs.unsubscribe());
  }

  getPosts() {
    try {
      this.subscription.push(this.postService.getPosts().subscribe((res) => {
        this.posts = res.posts;
        this.totalRecords = res.totalRecords;
      }));
    } catch (ex) {
      this.snackBar.open(CONSTANT_MESSAGES.ERROR);
    }
  }

  gotoDetails(id: number) {
    if (id) {
      this.router.navigate(['posts', id]);
    }
    else {
      this.snackBar.open(CONSTANT_MESSAGES.INVALID_SEARCH);
    }
  }
}
