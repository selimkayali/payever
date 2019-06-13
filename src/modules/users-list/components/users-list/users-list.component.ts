import { Component, OnInit, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserInterface } from '../../../../interfaces';
import { ApiService, PaginationApiService } from '../../../core/services';
import { UsersResolver } from '../../resolvers';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  displayedColumns = ['first_name', 'last_name', 'email'];
  userList: any[] = [];
  pagesCount: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private usersResolver: UsersResolver
  ) {
    // this.router.navigate(['./users'], { queryParams: { page: 1 } });
  }

  onInitFunction() {
    this.activatedRoute.data.pipe(map(data => data.users)).subscribe((users: UserInterface[]) => {
      this.userList = users;
    });

    this.activatedRoute.data.pipe(map(data => data.paginationInfo)).subscribe(paginationInfo => {
      this.pagesCount = paginationInfo.total;
    });
  }

  ngOnInit() {
    this.onInitFunction();
  }

  pageChanged(event: PageEvent): void {
    let page: number = event.pageIndex + 1;
    this.router.navigate(['./users'], { queryParams: { page } }).then(() => {
      this.userList = this.usersResolver.resolve(this.activatedRoute.snapshot);
    });
  }

  userSelected(user: UserInterface): void {
    this.router.navigate(['./user', user.id]);
  }
}
