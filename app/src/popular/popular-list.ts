import {Component, NgFor} from 'angular2/angular2'
import {RouteConfig, RouterOutlet, RouterLink} from 'angular2/router';
import {PostsEP} from '../posts/services/posts-ep'
import {IPost} from '../posts/post.types'
import {Observable} from "@reactivex/rxjs/dist/cjs/Rx"
import {PostModal} from '../posts/post-modal'
import {Empty} from '../global/empty'
import {PostsList} from '../posts/posts-list'

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
export class PopularList extends PostsList {
	
	constructor(postsEP: PostsEP) {
		super(postsEP)										 
	}		
}
