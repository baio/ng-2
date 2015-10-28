import {Http, URLSearchParams, Response} from "angular2/http"
import {UrlResolver, Injectable, OpaqueToken} from "angular2/angular2"

//export const APP_BASE_URL: OpaqueToken = new OpaqueToken("appBaseUrl");

export interface IEndPointParams {
	query?: {[id: string] : any}
	map?<D, S>(source: S) : D
}

interface IServerResponse {
	code: string[]
	data: any 
} 

function mapServerResponse(response: Response) : any {
	if (response.status != 200) {
		throw {message : "Response Error", error : {status : response.status}}
	}
	else {
		var resp = <IServerResponse>response.json(); 
		if (resp.code[0] != "INF_OK") {
			throw {message : "Server Error", error : resp.code}
		}
		else {
			return resp.data;
		}	
	}
}

function mapResponseData(data: any, params: IEndPointParams) : any {
	if (params && params.map) {
		return Array.isArray(data) ? data.map(params.map) : params.map(data)
	}
	else {
		return data;
	}
}

@Injectable()
export class EndPoint {
	
	constructor(private APP_BASE_URL: string, private http: Http, private urlResolver: UrlResolver) {		
		console.log(APP_BASE_URL);			
	}
		
	get<T>(url: string, params?: IEndPointParams) {	
		
		var searchParams: URLSearchParams;
		
		if (params && params.query) {
			searchParams = new URLSearchParams();
			for (var q in params.query) {
				searchParams.append(q, params.query[q])
			}
		}
		
		return this.http.request(this.urlResolver.resolve(this.APP_BASE_URL, url), {search: searchParams})
			.map(mapServerResponse)
			.map(data => mapResponseData(data, params));		
		
	}
}