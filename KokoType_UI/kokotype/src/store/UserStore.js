import { makeAutoObservable } from "mobx"

export default class UserStore {
    constructor () {
        this._isAuth = false;
        this._user = {}
        makeAutoObservable(this);
    }

    setIsAuth(bool){
        this._isAuth = bool
    }

    setUser(userData) {
        this._user = userData ; // Обновляем только поля, которые приходят
    }

    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user
    }
}