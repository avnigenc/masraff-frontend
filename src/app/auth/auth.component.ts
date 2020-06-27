import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
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
    private toastr: ToastrService
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
    if (!this.registerForm.valid) {
      this.fail('HATA', 'Form geçerli değil');
      return;
    }
    console.log(this.registerForm.value);
  }


  login() {
    if (!this.loginForm.valid) {
      this.fail('HATA', 'Form geçerli değil');
      return;
    }
    console.log(this.loginForm.value);
  }

  fail(title: string, description: string) {
    this.toastr.error(title, description);
  }
}
