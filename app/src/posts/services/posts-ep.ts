import {Injectable, Inject} from "angular2/angular2"
import {Observable} from "@reactivex/rxjs/dist/cjs/Rx"
import {EndPoint} from "../../global/services/end-point"
import {IPost} from "../post.types"

@Injectable()
export class PostsEP {
	
	constructor(private endPoint: EndPoint) {
		
	}
	
	load() : Observable<IPost[]> {
				
		return this.endPoint.get("post/feed/popular/", {
			query : {from : 0}, 
			map(res: any) {
				return {id: res.uuid, title: res.uuid}
			}
		});
	}	 
} 


@Injectable()
export class PostsFakeEP {
	
	constructor() {		
	}
	
	load() : Observable<IPost[]> {				
		return Observable.of([{title : "one"}, {title: "two"}]);
	}	 
} 


