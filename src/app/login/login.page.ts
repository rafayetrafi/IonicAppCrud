import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = {} as User;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController
    ) { }

  ngOnInit() {}

  async login(user: User){
    if(this.formValidation()){
      let loader = this.loadingCtrl.create({
        message: "Please wait....."
      });
      (await loader).present();
      try {
        await this.afAuth.signInWithEmailAndPassword(user.email, user.password).then(data => {
          console.log(data);
          this.navCtrl.navigateRoot("home");


        })
      } catch (e) {
        this.showToast(e);
      }
      (await loader).dismiss();


    }
  }

  formValidation(){
    if(!this.user.email){
      this.showToast("Enter email");
      return false;
    }

    if(!this.user.password){
      this.showToast("Enter Password");
      return false;
    }

    return true;
  }

  
  showToast(message: String) {
    this.toastCtrl.create({message: message, duration: 3000})
    .then(toastData => toastData.present());
  }

}
