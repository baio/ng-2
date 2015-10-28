import {Component, Input, NgIf, Output, EventEmitter} from 'angular2/angular2';

const modalStyles = [
	`
	.modal {
		position: fixed;
		font-family: Arial, Helvetica, sans-serif;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.8);
		z-index: 99999;
		opacity:1;
		-webkit-transition: opacity 400ms ease-in;
		-moz-transition: opacity 400ms ease-in;
		transition: opacity 400ms ease-in;
		pointer-events: none;
		pointer-events: auto;
	}
	`,
	`
	.modal > div {
		width: 400px;
		position: relative;
		margin: 10% auto;
		padding: 5px 20px 13px 20px;
		border-radius: 10px;
		background: #fff;
		background: -moz-linear-gradient(#fff, #999);
		background: -webkit-linear-gradient(#fff, #999);
		background: -o-linear-gradient(#fff, #999);
	}
	`
];

const template = `
	<div class="modal" *ng-if="isShown">
		<div (click)="closing()">
			<ng-content select="modal-header"></ng-content>
			<ng-content select="modal-content"></ng-content>
		</div>
	</div>
`

@Component({
    selector: 'modal',    
    template: template,
	styles: modalStyles,
	directives: [NgIf]    
})
export class Modal { 
	
	@Input() isShown: boolean
	@Output() onClosing: EventEmitter = new EventEmitter(); 
	
	constructor() {
	}
	
	closing() {
		this.onClosing.next(null);
	}
				
}

