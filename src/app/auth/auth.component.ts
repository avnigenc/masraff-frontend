import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { LoginRequest } from '../models/api/request-models/login-request.model';
import { RegisterRequest } from '../models/api/request-models/register-request.model';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public loading = false;

  forRegister = false;
  forLogin = false;

  tabs = ['Giriş yap', 'Üye ol'];
  selected = new FormControl(0);

  hide1 = true;
  hide2 = true;
  hide3 = true;

  registerForm: FormGroup;
  loginForm: FormGroup;
  // tslint:disable-next-line:max-line-length
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private storageService: StorageService
  ) {
    this.route.queryParams.subscribe(params => {
      this.forRegister = !!this.route.snapshot.queryParamMap.get('register');
      this.forLogin = !!this.route.snapshot.queryParamMap.get('login');
      if (this.forLogin) { this.selected.setValue(0); }
      if (this.forRegister) { this.selected.setValue(1); }

    });
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailRegx)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      // validator: MustMatch('password', 'confirmPassword')
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailRegx)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
  }

  register() {
    this.loading = true;
    if (!this.registerForm.valid) {
      this.loading = false;
      this.fail('', 'Form geçerli değil');
      return;
    }
    const registerRequest = new RegisterRequest();
    registerRequest.email = this.registerForm.get('email').value;
    registerRequest.firstName = this.registerForm.get('firstName').value;
    registerRequest.lastName = this.registerForm.get('lastName').value;
    registerRequest.password = this.registerForm.get('password').value;

    this.authService.register(registerRequest)
      .subscribe((response) => {
        this.success('Kayıt başarılı', '');
        this.loading = false;
      }, (error: any) => {
        this.loading = false;
        this.fail('Kayıt başarısız', '');
      });
  }

  login() {
    this.loading = true;
    if (!this.loginForm.valid) {
      this.loading = false;
      this.fail('', 'Form geçerli değil');
      return;
    }
    const loginRequest = new LoginRequest();
    loginRequest.email = this.loginForm.get('email').value;
    loginRequest.password = this.loginForm.get('password').value;
    this.authService.login(loginRequest)
      .subscribe((response) => {
        console.log(response);
        this.storageService.setCurrentUser(response.user, response.token);
        this.success('Giriş başarılı', '');
        this.loading = false;
        this.router.navigate(['']);
    }, (error: any) => {
        this.loading = false;
        this.fail('Giriş başarısız', '');
    });
  }

  fail(title: string, description: string) {
    this.toastr.error(title, description);
  }

  success(title: string, description: string) {
    this.toastr.success(title, description);
  }
}
