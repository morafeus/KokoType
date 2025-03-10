import { makeAutoObservable } from "mobx";

export default class ParamsStore{
    constructor() {
        this._params = {};
        makeAutoObservable(this);
    }

    get params() {
        return this._params;
    }

    setParams(value) {
        this._params = value;
    }
}