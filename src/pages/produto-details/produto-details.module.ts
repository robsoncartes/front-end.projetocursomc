import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdutoDetailsPage } from './produto-details';

@NgModule({
  declarations: [
    ProdutoDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProdutoDetailsPage),
  ],
})
export class ProdutoDetailsPageModule {}
