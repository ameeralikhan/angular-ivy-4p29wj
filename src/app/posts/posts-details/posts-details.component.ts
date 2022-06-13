import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CONSTANT_MESSAGES } from '../../helper/constants';
import { IPosts } from '../IPost.interface';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-posts-details',
  templateUrl: './posts-details.component.html',
  styleUrls: ['./posts-details.component.scss']
})
export class PostsDetailsComponent implements OnInit, OnDestroy {

  subscription: Subscription[] = [];
  post: IPosts = {
    userId: 0,
    id: 0,
    title: '',
    body: ''
  };

  constructor(
    private snackBar: MatSnackBar,
    private postService: PostsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.getPostsById(+id);
    } else {
      this.snackBar.open(CONSTANT_MESSAGES.NOT_FOUND);
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(subs => subs.unsubscribe());
  }

  getPostsById(id: number) {
    try {
      this.subscription.push(this.postService.getPostsById(id).subscribe((res) => {
        this.post = res.post;
        this.titleService.setTitle(this.post.title);
      }));
    } catch (ex) {
      this.snackBar.open(CONSTANT_MESSAGES.ERROR);
    }
  }

  gotoBack() {
    this.router.navigate(['/posts']);
  }
}
