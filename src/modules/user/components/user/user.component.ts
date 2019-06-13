import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInterface } from '../../../../interfaces';
import { ApiService } from '../../../core/services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() user: UserInterface;

  users: UserInterface[] = [];

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const userId: number = this.activatedRoute.snapshot.params['id'];
    this.apiService.fetchUserById(userId).subscribe((user: UserInterface) => {
      this.users.push(user);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}
  back(): void {
    this.router.navigate(['./users']);
  }
}
