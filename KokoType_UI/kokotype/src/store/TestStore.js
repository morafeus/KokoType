import { makeAutoObservable} from "mobx";

export default class TestStore {

    constructor () {
        this._isTyping = 0;
        this._testStats = {};
        makeAutoObservable(this);
    }

    get testStats() {
        return this._testStats;
    }
    
    get isTyping() {
        return this._isTyping;
    } 

    setTestStats(testData) {
        this._testStats = testData;
    }

    setIsTyping(num){
        this._isTyping = num;
    }
}
