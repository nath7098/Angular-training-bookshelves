import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    // tslint:disable-next-line: variable-name
    private _authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;

    this._authService.signInUser(email, password).then(
      () => {
        this.router.navigate(['/books']);
        this.toastr.success('Welcome 😃 !', 'Connected', { timeOut: 1000 });
      },
      (error) => {
        this.toastr.error('😒 ' + error, 'Error', {
          timeOut: 3000,
        });
      }
    );
  }
}
