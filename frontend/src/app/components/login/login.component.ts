import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loading: boolean = false;
  form: any;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.form.valid) {
      this.api.login(this.form.value).subscribe(
        (value: any) => {
          if (value.status == 'success') {
            alert('Login Success');
            localStorage.setItem('nf_token', value.token);
            this.api.setProfile();

            this.router.navigate(['/']);
          } else {
            alert(value.msg);
            this.loading = false;
          }
          // this.router.navigate(['/']);
        },
        (err: any) => {
          alert(
            err.error?.msg ||
              'Something went wrong while logging in, try again later...'
          );
          this.loading = false;
        }
      );
    }
  }
}
