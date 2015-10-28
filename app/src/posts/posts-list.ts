import {Component, NgFor} from 'angular2/angular2'
import {RouteConfig, RouterOutlet, RouterLink} from 'angular2/router';
import {PostsEP} from '../posts/services/posts-ep'
import {IPost} from '../posts/post.types'
import {Observable} from "@reactivex/rxjs/dist/cjs/Rx"
import {PostModal} from '../posts/post-modal'
import {Empty} from '../global/empty'

@Component({
    selector: 'popular-list',
	directives: [NgFor, RouterLink, RouterOutlet],
    template: `
		<h2>Popular list</h2>		
		<ul>
			<li *ng-for="#post of posts" [router-link]="['./Post', {id : post.id}]">
				<span> {{post.title}} </span>
			</li>			
		</ul>
		<router-outlet></router-outlet>
	`,
	providers: [PostsEP]
})

@RouteConfig([
    { path: "/", component: Empty, as : "_" },
	{ path: "/post/:id", component: PostModal, as : "Post" }
])
export class PostsList {
	
	posts: IPost[]
	isModalShown : boolean
	
	constructor(private postsEP: PostsEP) {
				
		//https://github.com/angular/angular/issues/4588
		//async pipe not working for now
		postsEP.load().subscribe(val => {
			this.posts = val;
		}); 
										 
	}		
}



// import {Component, NgFor} from 'angular2/angular2';
// import {PostsEP} from '../posts/services/posts-ep'
// import {IPost} from '../posts/post.types'
// import {Observable} from "@reactivex/rxjs/dist/cjs/Rx"
// import {PostModal} from "../posts/post-modal"
// 
// @Component({
//     selector: 'popular-list',
// 	directives: [NgFor, PostModal],
//     template: `
// 		<post-modal #post-modal></post-modal>
// 		<h2>Popular list</h2>		
// 		<ul>
// 			<li *ng-for="#post of posts" (click)="postModal.show(post)">
// 				<span> {{post.title}} </span>
// 			</li>			
// 		</ul>
// 	`,
// 	providers: [PostsEP]
// })
// export class PopularList {
// 	
// 	posts: IPost[]
// 	isModalShown : boolean
// 	
// 	constructor(private postsEP: PostsEP) {
// 				
// 		//https://github.com/angular/angular/issues/4588
// 		//async pipe not working for now
// 		postsEP.load().subscribe(val => {
// 			this.posts = val;
// 		}); 
// 										 
// 	}		
// }
// 
