import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../../shared/service/api.service';
import { User } from '../../shared/utils/user';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  user: User;
  isLoading: boolean = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id') || '';
    this.getUser(userId);
  }

  getUser(id: string) {
    this.isLoading = true;
    this.apiService.getUserDetails(id).subscribe({
      next: (response: User) => {
        this.user = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }
}
