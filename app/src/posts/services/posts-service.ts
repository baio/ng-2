// import {Http} from "angular2/http"
// import {Injectable} from "angular2/angular2"
// import {Observable} from "@reactivex/rxjs/dist/cjs/Rx"
// 
// 
// 
// @Injectable()
// export class PostsService {
// 	
// 	constructor(private http: Http) {
// 	}
// 	
// 	load() : Observable<IPost[]> {
// 		////dev.veevavoo.dev/post/feed/popular/?from=0
// 		return this.http.request("//dev.veevavoo.dev/post/feed/popular/?from=0")
// 			.map((p: any) => p.json().data)
// 			.do(val => console.log(val))
// 			.map((m: any) => m.map(p => ({title: p.uuid})));		
// 	}	 
// } 
// 
// 
