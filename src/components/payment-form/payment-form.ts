import { Component,ViewChild,
  ElementRef,
  ChangeDetectorRef } from '@angular/core';
  import { ViewController } from 'ionic-angular'
import { NgForm } from '@angular/forms';

/**
 * Generated class for the PaymentFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'payment-form',
  templateUrl: 'payment-form.html'
})
export class PaymentFormComponent {

  text: string;
  submitted : boolean = false;

  user : any = {
    name: '',
    email : ''
  }
  
  @ViewChild('cardInfo') cardInfo: ElementRef;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;

  constructor(private cd: ChangeDetectorRef, public viewCntrl : ViewController) {
    console.log('Hello PaymentFormComponent Component');
    this.text = 'Hello World';
  } 

  ngAfterViewInit() {
    this.card = elements.create('card',{
      base: {
        color: '#32325d',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        },
        ':-webkit-autofill': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
        ':-webkit-autofill': {
          color: '#fa755a',
        },
      }
    });
    this.card.mount(this.cardInfo.nativeElement);

    this.card.addEventListener('change', this.cardHandler);
  }

  
  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }
  async onSubmit(form: NgForm) {
    if(this.user.name != '' && this.user.name != ''){
      this.submitted = false;
      const { token, error } = await stripe.createToken(this.card);
      if (error) {
        console.log('Something is wrong:', error);
      } else {
        console.log('Success!', token);
        this.viewCntrl.dismiss({userData : this.user, tokenDetail : token}).then(data=>{
          this.card.removeEventListener('change', this.cardHandler);
          this.card.destroy();
        });
        // ...send the token to the your backend to process the charge
      }
    }
    else{
      console.log('form error');
      this.submitted = true;
    }
   

  }
  closePopover() {
    this.viewCntrl.dismiss().then(data=>{
      this.card.removeEventListener('change', this.cardHandler);
      this.card.destroy();
    });
  }

}
