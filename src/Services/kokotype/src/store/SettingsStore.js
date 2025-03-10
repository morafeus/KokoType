import { makeAutoObservable } from "mobx";

export default class SettingsStore{
    constructor() {
        this._settings = {};
        makeAutoObservable(this);
    }

    get settings() {
        return this._settings;
    }

    setParams(value) {
        this._settings = value;
    }
}