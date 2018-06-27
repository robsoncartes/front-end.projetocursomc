import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDto } from '../../models/produto.dto';

@IonicPage()
@Component({
  selector: 'page-produto-details',
  templateUrl: 'produto-details.html',
})
export class ProdutoDetailsPage {

  item: ProdutoDto;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProdutoDetailsPage');
    this.item = {
      id: "1",
      nome: "Mouse",
      preco: 80.59
    }
  }
}
