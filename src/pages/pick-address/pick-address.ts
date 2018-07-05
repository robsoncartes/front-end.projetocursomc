import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDto } from '../../models/endereco.dto';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDto[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storageService: StorageService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PickAddressPage');
    let localUser = this.storageService.getLocalUser();
    if (localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos'];
        },
        error => {
          if (error.status == 403){
            this.navCtrl.setRoot('HomePage');
          }  
      });
    }
    else{
      this.navCtrl.setRoot('HomePage');
    }
  }

}
