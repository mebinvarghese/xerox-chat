import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import * as firebase from 'Firebase';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the StorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-store',
  templateUrl: 'store.html',
})
export class StorePage {

  ref = firebase.database().ref('carts/');
  cartItems :any;
  response : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,public http: Http,) {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    firebase.database().ref('carts/').on('value', resp => {
      this.cartItems = [];
      this.cartItems = snapshotToArray(resp);
      loading.dismiss();
      console.log(this.cartItems);
    });
  }
  completePayment(order) {
    let sendData = {
      charge : {
        id : order.ch_token,
        amount : order.amount
      }
    }
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.http.post('https://4bpbkkc71l.execute-api.us-east-1.amazonaws.com/dev/charges',sendData).map(res => res.json()).subscribe(data => {
          this.response = data;
          console.log(this.response);
          order.order_status = 'completed';
          order.payment_status = 'completed';
          order.update_time = new Date();
          if(this.response.message){
            firebase.database().ref().child('/carts/' + order.key)
              .update(order);
              alert('updated');
          }
          else{
            console.log('please enter a message')
         }
        loading.dismiss()
    },Error=>{
      console.log(Error.json());
      loading.dismiss();  
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad StorePage');
  }

}


export const snapshotToArray = snapshot => {
  let returnArr = [];
  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });
  return returnArr;
};