import { Component,ViewChild } from '@angular/core';
import { NavController,Content,AlertController,PopoverController,LoadingController} from 'ionic-angular';
import * as firebase from 'Firebase';
import { Storage } from '@ionic/storage';
import { PaymentFormComponent } from '../../components/payment-form/payment-form';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;

  cartCollection = { name:'', email:'', ch_token:'',sendDate:'',amount:500,cart_id:0,order_status:'order placed',payment_status : 'proccesed' };
  chats = [];
  roomkey:string;
  nickname:string;
  offStatus:boolean = false;
  paymentStatus : boolean = false;
  ref = firebase.database().ref('carts/');
  tokenData : any;


  constructor(public navCtrl: NavController,private alertCtrl: AlertController,private storage: Storage,
    public popoverCtrl: PopoverController,public http: Http,public loadingCtrl: LoadingController) {
    // this.storage.get('credential').then(data=>{
    //   if(data!= null){
    //     this.chatCollection.nickname = data.nickname;
    //     this.chatCollection.uniqueId = data.uniqueId;
    //   }
    // })
    // firebase.database().ref('chatroom/').on('value', resp => {
    //   this.chats = [];
    //   this.chats = snapshotToArray(resp);
    //   console.log(this.chats);
    //   setTimeout(() => {
    //     if(this.offStatus === false) {
    //       this.content.scrollToBottom(300);
    //     }
    //   }, 1000);
    // });
  }
  presentPopover() {
    let popover = this.popoverCtrl.create(PaymentFormComponent,{},{ enableBackdropDismiss: false });
    popover.present({
    });
    popover.onDidDismiss(data=>{
      console.log(data);
      if(data != null){
        // this.presentAlert(data.userData.name,data.tokenDetail.id);
        this.getLongLiveToken(data);
        this.paymentStatus = true;
      }
    })
  }
  presentAlert(name,token) {
    let alert = this.alertCtrl.create({
      title: 'Successfull',
      subTitle: 'Hi,'+name+' your payment is Successfull, token : '+token,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  getLongLiveToken(cardData) {
    let sendData = {
      token : {
        "id":cardData.tokenDetail.id
      },
      "charge" : {
        "amount":500,
        "currency":"USD"
      }
    }
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.http.post('https://xradxx7qyl.execute-api.us-east-1.amazonaws.com/dev/charges',sendData).map(res => res.json()).subscribe(data => {
        this.tokenData = data.charge.id;
        this.sendMessage(cardData.userData,this.tokenData);
        loading.dismiss()
    },Error=>{
      console.log(Error.json());
      loading.dismiss();  
    });
  }
  sendMessage(userData,token) {
    this.cartCollection.sendDate = Date();
    this.cartCollection.name = userData.name;
    this.cartCollection.amount = 500;
    this.cartCollection.cart_id = 1;
    this.cartCollection.ch_token = token;
    this.cartCollection.email = userData.email;
    this.cartCollection.order_status = 'order placed';
    this.cartCollection.payment_status = 'order placed';
    console.log(this.cartCollection);
    if(token != '' && token != undefined){
      let newData = this.ref.push();
      newData.set(this.cartCollection);
    }
    else{
      console.log('please enter a message')
    }
   }
  // checkFocus() {
  //   if(this.chatCollection.nickname == ''){
  //     this.presentPrompt();
  //   }
  // }
  // presentPrompt() {
  //   let alert = this.alertCtrl.create({
  //     title: 'Nick Name',
  //     subTitle : 'Enter a name for this chat you are so keen on adding',
  //     inputs: [
  //       {
  //         name: 'username',
  //         placeholder: 'Please enter you nick name'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Login',
  //         handler: data => {
  //           if (data.username != '') {
  //             let token = this.IDGenerator(data.username);
  //               let storeData = {
  //                 nickname : data.username,
  //                 uniqueId : token
  //               }
  //               this.chatCollection.nickname = data.username;
  //               this.chatCollection.uniqueId = token;
  //               this.storage.set('credential',storeData);
  //               return true;
  //           } else {
  //             // invalid login
  //             return false;
  //           }
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }

  // IDGenerator(nickname) {
  //   let timestamp = nickname+new Date;
  //   var ts = timestamp.toString().replace(/[^a-zA-Z]/g, "");
  //   return ts.split("").reverse().join().replace(/[^a-zA-Z]/g, "");
  // }




  
}
// export const snapshotToArray = snapshot => {
//   let returnArr = [];
//   snapshot.forEach(childSnapshot => {
//       let item = childSnapshot.val();
//       item.key = childSnapshot.key;
//       returnArr.push(item);
//   });
//   return returnArr;
// };
