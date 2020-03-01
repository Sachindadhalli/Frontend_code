/**
 * Created by cjpl on 4/17/19.
 */
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import "rxjs/add/observable/of";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import axios from "axios";
import handleLocalStorage from "../Utilities/handleLocalStorage";
import {SERVER_API_URL, SERVER_API_PATH} from "../../config/constants";

const header = {
    'authorization': handleLocalStorage("get", "employerLogin"),
    'content-Type': 'application/json',
}
export class SearchService {
    constructor() {
        this.searchTerm = new Subject();
    }

    search({term, url, method, otherData}) {
        this.searchTerm.next({term, url, method, otherData});
    }

    dummyAPI() {
        return new Promise((resolve, reject) => {
            resolve([]);
        });
    }

    doSearch = (query) => {
        const apiUrl = SERVER_API_URL + SERVER_API_PATH + query.url;
        let promise = axios.get(apiUrl, {params: {search: query.term, ...query.otherData}, headers: header})
        //axios.get(apiUrl, {params:sendingData, headers: header})
        //let promise =apiCall(query.method,{search: query.term} ,query.url,header)
        return Observable
            .fromPromise(promise)
    };

    getResults() {
        return this.searchTerm
            .debounceTime(500)
            .distinctUntilChanged()
            .switchMap((query) => query
                ? this.doSearch(query) : Observable.of([]))
            .catch(error => {
                return Observable.of([]);
            });
    }
}
