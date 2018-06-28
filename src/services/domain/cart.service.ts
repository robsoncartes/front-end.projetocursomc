import { StorageService } from "../storage.service";
import { Injectable } from "@angular/core";
import { Cart } from "../../models/cart";
import { ProdutoDto } from "../../models/produto.dto";

@Injectable()
export class CartService {

    constructor(public storageService : StorageService){
    }

    createOrClearCart() : Cart {
        let cart: Cart = {items: []};
        this.storageService.setCart(cart);
        return cart;
    }

    getCart(): Cart {
        let cart: Cart = this.storageService.getCart();
        return (cart == null) ? this.createOrClearCart() : cart;
    }

    addProduto(produto: ProdutoDto): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position == -1){
            cart.items.push({quantidade: 1, produto: produto});
        }
        this.storageService.setCart(cart);
        return cart;
    }
}