import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account/account.service';
import { Router } from '@angular/router';

export interface userLogin {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  post: userLogin;
  hide = true;
  invalidErrorMsg = '';
  isError = true;
  invalidErrorLogin = false;
  @Output() isLogin = new EventEmitter();
  @Output() signUp = new EventEmitter();


  constructor( private router: Router, private formBuilder: FormBuilder, private accountService:AccountService ) { }

  ngOnInit() {
    localStorage.removeItem('username');
    this.createForm();
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)], this.checkInUseEmail],
      'password': [null, [Validators.required, this.checkPassword]],
    });
  }

  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  checkInUseEmail(control) {
    // mimic http database access
    let db = ['tony@gmail.com'];
    return new Observable(observer => {
      setTimeout(() => {
        let result = (db.indexOf(control.value) !== -1) ? { 'alreadyInUse': true } : null;
        observer.next(result);
        observer.complete();
      }, 4000)
    })
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Field is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
        this.formGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? 'Field is required' :
      this.formGroup.get('password').hasError('requirements') ? 'Must to contains 8 letter and at least 1 digit and one char anf big char' : '';
  }

  async onSubmit(post) {
    this.post = post;
    this.accountService.login(post).subscribe(res => {
      if(res) {
        this.invalidErrorLogin = false;
        localStorage.setItem('name', res.name);
        localStorage.setItem('email', post.email);
        this.router.navigate(['']);
      } else {
        this.invalidErrorLogin = true; 
        console.error(res);
      }
  });;
  }

  signUpRequest() {
    this.signUp.emit(true);
  }
}

