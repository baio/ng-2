import {Component, Input, NgIf} from 'angular2/angular2';
import {RouteParams, Router} from 'angular2/router';
import {Modal} from "../global/modal"
import {IPost} from '../posts/post.types'

//https://github.com/angular/angular/issues/4934
const template = `
	<modal [is-shown]="!!post" (on-closing)="close()" *ng-if=!!post>
		<modal-header><h2>{{post.title}}</h2></modal-header>
		<modal-content><p>XXX</p></modal-content>
	</modal>
`

@Component({
    selector: 'post-modal',    
    template: template,
	directives: [Modal, NgIf]    
})
export class PostModal { 
		
	constructor(params: RouteParams, private router: Router) {
		//console.log("post modal", params);
		this.show({id : params.params["id"], title : params.params["id"]});		
	}
	
	private post: IPost;
	
	show(post: IPost) {
		this.post = post;
	}
	
	close() {		
		this.post = null;
		this.router.navigate(["../_"]);			
	}
	
				
}

