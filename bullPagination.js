/**
 * @alias bullPagination Implement bullControlMenu
 * @author Felipe Pupo Rodrigues
 * @classDescription classe para criar paginação
 */
 
 var bullPagination = new Class({
 	Extends: bullControlMenu,
 	pagination:{
 		actived:false,
 		recursive:false,
 		range:0
 	},
 	
	/**
	 * tambem inicializa bullControlMenu
	 */
 	initialize:function(options){
 		this.parent(options);
 		
 		this.nextElement.href = "javascript:void(0);";
		this.nextElement.addEvent('click',this.next.bind(this));
		
		this.previewElement.href = "javascript:void(0);";
		this.previewElement.addEvent('click',this.preview.bind(this));

		if(this.actived)
			for(var x = 0; x <= this.itens.length;x++){
				if(this.itens[x] === this.actived) this.pagination.actived = x;
			}
			
		this.updateNavigation();	
	},
	
	/**
	 * vai para o primeiro
	 */
	first:function(){
		this.pagination.actived = 0;
		this.updateNavigation();
 		this.onClick(this.itens[this.pagination.actived]);
 	},
 	
	/**
	 * vai para o proximo
	 */
	next:function(){
		if(this.pagination.recursive && this.pagination.actived+1 >= this.itens.length)
			return this.first();
		else if(this.pagination.actived+1 >= this.itens.length)
			return false;
			
		this.pagination.actived++;
		
		this.updateNavigation();
			
	 	this.onClick(this.itens[this.pagination.actived]);
 	},
 	
	/**
	 * vai para o ultimo
	 */
 	last:function(){
		this.pagination.actived = this.itens.length-1;
		this.updateNavigation();
 		this.onClick(this.itens[this.pagination.actived]);
 	},
 	
	/**
	 * vai para o anterior
	 */
 	preview:function(){
 		if(this.pagination.recursive && this.pagination.actived-1 < 0)
			return this.last();
		else if(this.pagination.actived-1 < 0)
			return false;
			
 		this.pagination.actived--;

 		this.updateNavigation();
			
 		this.onClick(this.itens[this.pagination.actived]);
 	},
 	
	/**
	 * atualiza o display
	 */
 	updateNavigation:function(){
 		if(this.pagination.range && this.pagination.range !== 0){
 			var first	= this.pagination.actived-this.pagination.range;
 			var last 	= this.pagination.actived+this.pagination.range;
 			
 			if(first<0){
 				last	= last+(0-(first));
 				first 	= 0;
 			}else if(last>=this.itens.length){
 				first 	= (this.itens.length-(last-first))-1;
 				last	= this.itens.length-1;
 			}
 			
 			this.itens.length.each(function(p){
 				if(p >=  first && p <= last)
 					this.itens[p].getParent().addClass('show');
 				else
 					this.itens[p].getParent().removeClass('show');
 			},this);
 		}
 		
 		if(!this.pagination.recursive){	
	 		if(this.pagination.actived+1 >= this.itens.length){
				this.nextElement.addClass('inative');
			}else if(this.pagination.actived <= 0){
				this.previewElement.addClass('inative');
			}else{
				this.nextElement.removeClass('inative');
				this.previewElement.removeClass('inative');
			}
		}
 	}
 });