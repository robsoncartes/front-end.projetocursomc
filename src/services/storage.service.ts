import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local_user";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { Cart } from "../models/cart";


@Injectable()
export class StorageService {

    getLocalUser(): LocalUser{
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        return (usr == null) ? null : JSON.parse(usr);
    }

    setLocalUser(obj: LocalUser){
        obj == null ? localStorage.removeItem(STORAGE_KEYS.localUser) : localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
    }

    getCart() : Cart{
        let str = localStorage.getItem(STORAGE_KEYS.cart);
        return (str != null) ? JSON.parse(str) : null;
    }

    setCart(obj : Cart){
        (obj != null) ? localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj)) : localStorage.removeItem(STORAGE_KEYS.cart);
    }
}