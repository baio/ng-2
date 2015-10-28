import {Component} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'primary-toolbar',    
    template: `
        <a [router-link]="['/Popular', '_']">Popular</a>
        <a [router-link]="['/Trends', '_']">Trends</a>    
    `,
    directives: [ROUTER_DIRECTIVES]    
})
export class PrimaryToolbar { 
			
}

