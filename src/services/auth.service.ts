import { Injectable } from "@angular/core";
import { CredenciaisDto } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";
import { JwtHelper } from 'angular2-jwt';
import { CartService } from "./domain/cart.service";

@Injectable()
export class AuthService {
    
    jwtHelper: JwtHelper = new JwtHelper();

    constructor(
        public http: HttpClient, 
        public storageService: StorageService,
        public cartService: CartService){
    }

    authenticate(creds : CredenciaisDto){
        return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {observe: 'response', responseType: 'text'});
    }

    refreshToken(){
        return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`, {}, {observe: 'response', responseType: 'text'});
    }

    successFulLogin(authorizationValue : string){
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {token: tok, email: this.jwtHelper.decodeToken(tok).sub};
        this.storageService.setLocalUser(user);
        this.cartService.createOrClearCart();
    }

    logout(){
        this.storageService.setLocalUser(null);
    }
}