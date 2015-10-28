import {Component, bootstrap, provide, UrlResolver} from 'angular2/angular2';
import {HTTP_PROVIDERS, Http} from "angular2/http";
import {EndPoint} from "./global/services/end-point";
import {RouteConfig, ROUTER_PROVIDERS, RouterOutlet, LocationStrategy, HashLocationStrategy, APP_BASE_HREF, Router} from 'angular2/router';

import {PopularList} from './popular/popular-list'
import {TrendsList} from './popular/trends-list'
import {PrimaryToolbar} from './global/primary-toolbar'


@Component({
    selector: 'my-app',    
    directives: [PrimaryToolbar, RouterOutlet],
    template: `
        <primary-toolbar></primary-toolbar>
        <h1>Main Page</h1>
        <router-outlet></router-outlet>    
    `    
})
@RouteConfig([
    { path: "/", redirectTo: "/Popular"},
    { path: "/social/popular/...", component: PopularList, as: "Popular" },
    { path: "/socila/trends/...", component: TrendsList, as: "Trends" },
])
export class AppComponent { 
    constructor(router: Router) {
    }			
}


bootstrap(AppComponent, [
    HTTP_PROVIDERS, ROUTER_PROVIDERS,  
    provide(APP_BASE_HREF, { useValue: '/' }),
    provide(EndPoint, {useClass: EndPoint}),
    provide(EndPoint, {
        //TODO: better way to configure service ? OpaqueToken ???
        useFactory: (http: Http, urlResolver: UrlResolver) => 
            new EndPoint("//dev.veevavoo.dev", http, urlResolver) 
        , deps: [Http, UrlResolver]}),                
    provide(LocationStrategy, {useClass: HashLocationStrategy})        
    
            
]);