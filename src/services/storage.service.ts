import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local_user";
import { STORAGE_KEYS } from "../config/storage_keys.config";

@Injectable()
export class StorageService {

    getLocalUser(): LocalUser{
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        return (usr == null) ? null : JSON.parse(usr);
    }

    setLocalUser(obj: LocalUser){
        obj == null ? localStorage.removeItem(STORAGE_KEYS.localUser) : localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
    }
}