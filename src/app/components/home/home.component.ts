import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ApiService } from '../../shared/service/api.service';
import { User } from '../../shared/utils/user';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, SpinnerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  isLoading: boolean = false;

  constructor(
    private apiService: ApiService,
    private notification: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.isLoading = true;
    this.apiService.getUsers().subscribe({
      next: (response) => {
        this.isLoading = false;
        this.users = response;
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error);
      },
    });
  }

  deleteUser(user: User) {
    if (confirm('Are you sure want to delete this user? ' + user.name)) {
      this.apiService.deleteUser(user.id).subscribe({
        next: (response) => {
          this.notification.success('User deleted.');
          this.users = this.users.filter((item) => item.id !== user.id);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
