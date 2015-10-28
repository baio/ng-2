import {Component, Input, ContentChild, NgFor} from 'angular2/angular2';
import {Directive, TemplateRef, ViewContainerRef, Inject} from 'angular2/angular2';

export interface IAttribute {
  [name: string]: any;
}

@Directive({
  selector: '[ng-transclude]',
  properties: ['ngTransclude']
})
export class NgTransclude {
  private _ngTransclude: TemplateRef;
  //@Input() index: number;

  
  private set ngTransclude(templateRef:TemplateRef) {
    this._ngTransclude = templateRef;
    if (templateRef) {
		console.log(templateRef);						
      	this.viewRef.createEmbeddedView(templateRef);
    }
  }

  private get ngTransclude() {
    return this._ngTransclude;
  }
  
  constructor(@Inject(ViewContainerRef) public viewRef:ViewContainerRef) {	  
  }
  
}

const template = `				
	
	<div class="left">
		<ul>
			<div *ng-for="#item of leftItems">
				Left ( {{item.id}} )
				<!--<template [ng-transclude]="itemTmpl">-->
			</div>							  
		<ul>
	</div>
	
	<div class="right">
		<ul>
			<div *ng-for="#item of rightItems">
				Right ( {{item.id}} )
				<!--<template [ng-transclude]="itemTmpl">-->
			</div>							  
		<ul>
	</div>		
`;

@Component({
	directives: [NgFor, NgTransclude],
    selector: 'masonry',    
    template: template	    
})
export class Masonry {
	@Input() items: any;  				
	@ContentChild(TemplateRef) itemTmpl: TemplateRef;
	
	leftItems: any[];
	rightItems: any[];
	
	constructor() {		
	}
	
	onChanges(changedRecord) {
		
		var items: any[] = changedRecord.items.currentValue; 
		if (items) {
			this.leftItems = items.filter((_, i) => !!(i % 2)); 
			this.rightItems = items.filter((_, i) => !(i % 2));
		}
		
		console.log(this.leftItems, this.rightItems);				
	}
			
	//ViewContainerRef and TemplateRef should be powerful enough, I think, without digging that low		
}

