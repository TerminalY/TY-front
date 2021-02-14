import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/services/account/account.service';
import { ClothesService } from 'src/app/services/clothes/clothes.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  @Output() isLogin = new EventEmitter();
  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  hide = true;
  cartData: any;
  

  constructor(private formBuilder: FormBuilder,
    private router: Router, private clothService: ClothesService) {
      
     }

  async ngOnInit() {
    this.createForm();
    this.cartData = await this.clothService.getCartByEmail(localStorage.getItem('email'));

  }

  createForm() {
    const addressregex: RegExp = /^\d+\s[A-z]+\s[A-z]+/;
    const creditCardRegex: RegExp = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
    this.formGroup = this.formBuilder.group({
      'username': [localStorage.getItem('name'), Validators.required],
      'address': [null, [Validators.required, Validators.pattern(addressregex)]],
      'creditcard': [null, [Validators.required, Validators.pattern(creditCardRegex)]],
    });
  }

  get username() {
    return this.formGroup.get('username') as FormControl
  }

  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }


  getErrorAddress() {
    return this.formGroup.get('address').hasError('required') ? 'Field is required' :
      this.formGroup.get('address').hasError('pattern') ? 'Not a valid address' :
        this.formGroup.get('address').hasError('alreadyInUse') ? 'This address is already in use' : '';
  }

  getErrorCredit() {
    return this.formGroup.get('creditcard').hasError('required') ? 'Field is required' :
    this.formGroup.get('creditcard').hasError('pattern') ? 'creditcard format invalid': '';
  }

  async changeSum(sum: number) {
    this.cartData = await this.clothService.getCartByEmail(localStorage.getItem('email'));
  }

  async onSubmit(post) {
    await this.clothService.payment(localStorage.getItem('email'), post.address);
    this.router.navigate(['']);
  }
}
