import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDto } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-produto-details',
  templateUrl: 'produto-details.html',
})
export class ProdutoDetailsPage {

  item: ProdutoDto;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public produtoService: ProdutoService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProdutoDetailsPage');
    let produtoId = this.navParams.get('produtoId');
    this.produtoService.findById(produtoId)
      .subscribe(response => {
        this.item = response;
        this.getUrlImageIfExists();
      },
      error => {});
  }

  getUrlImageIfExists(){
    this.produtoService.getmageFromBucket(this.item.id)
      .subscribe(response => {
        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
      }, 
      error => {});
  }

  addToCart(produto: ProdutoDto) {
    this.cartService.addProduto(produto);
    this.navCtrl.setRoot("CartPage");
  }
  
}
