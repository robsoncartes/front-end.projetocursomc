import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDto } from '../../models/endereco.dto';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDto[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PickAddressPage');

    this.items = [
      {
        id: "1",
        logradouro: "Rua Califórnia",
        numero: "42",
        complemento: "Apto 42",
        bairro: "Santa Mônica",
        cep: "1234070",
        cidade: {
          id: "1",
          nome: "São Paulo",
          estado: {
            id: "1",
            nome: "São Paulo"
          }
        }
      },
      {
        id: "2",
        logradouro: "Rua Nações Unidas",
        numero: "2011",
        complemento: null,
        bairro: "Manhatan",
        cep: "23456789",
        cidade: {
          id: "3",
          nome: "São José dos Campos",
          estado: {
            id: "2",
            nome: "São Paulo"
          }
        }
      }
    ];
  }

}
