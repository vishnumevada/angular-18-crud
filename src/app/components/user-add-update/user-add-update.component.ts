import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ApiService } from '../../shared/service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../shared/utils/user';
import { ToastrService } from 'ngx-toastr';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-user-add-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SpinnerComponent],
  templateUrl: './user-add-update.component.html',
  styleUrl: './user-add-update.component.scss',
})
export class UserAddUpdateComponent implements OnInit {
  userForm: FormGroup;
  submitted: boolean = false;
  userId: any = null;
  isLoading: boolean = false;
  isSubmit: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private notification: ToastrService
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      company: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    if (this.userId) {
      this.getUserDetail(this.userId);
    }
  }

  getUserDetail(userId: string) {
    this.isLoading = true;
    this.apiService.getUserDetails(userId).subscribe({
      next: (response: User) => {
        this.userForm.patchValue({ ...response });
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  onSubmit() {
    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isSubmit = true;

    const payload = { ...this.userForm.value };

    if (this.userId) {
      this.apiService.updateUser(this.userId, payload).subscribe({
        next: (response) => {
          this.isSubmit = false;
          this.notification.success('User updated.');
          this.userForm.reset();
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.isSubmit = false;
          console.log(error);
        },
      });
    } else {
      this.apiService.createUser(payload).subscribe({
        next: (response) => {
          this.isSubmit = false;
          this.notification.success('User created.');
          this.userForm.reset();
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.isSubmit = false;
          console.log(error);
        },
      });
    }
  }
}
