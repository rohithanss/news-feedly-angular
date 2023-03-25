import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  form: any;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}'),
        ],
      ],
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.form.valid) {
      this.api.signup(this.form.value).subscribe(
        (value: any) => {
          if (value.status == 'success') {
            alert('Signup Success');
            localStorage.setItem('nf_token', value.token);
            this.api.setProfile();
            this.router.navigate(['/']);
          } else {
            alert(value.msg);
            this.loading = false;
          }
        },
        (err: any) => {
          alert(
            err.error?.msg ||
              'Something went wrong while creating account, try again later...'
          );

          this.loading = false;
        }
      );
    }
  }
}
