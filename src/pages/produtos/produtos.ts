import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDto } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDto[] = [];
  page : number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public produtoService: ProdutoService,
    public loadingControl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
    let categoriaId = this.navParams.get("categoriaId");
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(categoriaId, this.page, 10)
      .subscribe(response => {
        let start = this.items.length;
        this.items = this.items.concat(response["content"]);
        let end = this.items.length - 1;
        loader.dismiss();
        console.log(this.page);
        console.log(this.items);
        this.loadImageUrls(start, end);
      }, 
      error => {
        loader.dismiss();
      });
  }
  
  loadImageUrls(start: number, end: number){
    for(var i = start; i < end; i++){
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
      .subscribe(response => {
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
      }, 
      error => {});
    }
  }

  showDetails(produtoId : string){
    this.navCtrl.push("ProdutoDetailsPage", {produtoId : produtoId});
  }

  presentLoading(){
    let loader = this.loadingControl.create({
      content: "Loading...",
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher){
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll){
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}
