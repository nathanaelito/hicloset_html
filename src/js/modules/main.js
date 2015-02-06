var homeSlider=(function(_m, _tm, _ih) 
{
	_m.installTo(this);

	var self=this;
	var width=980;
	var position=0;
	var activeln=null;
	var autoPlay=false;
	var list=document.getElementById('images-list');
	var items=list.getElementsByTagName('img');
	var loader=document.getElementById('loader');
	var wrapper=document.getElementById('slider-images');
	var pager=document.getElementById('slider-pager');

	this.init=function() 
	{
		_ih.addImages(items);
		_ih.load(function() {
			_tm.fromTo(loader, .5, {opacity:1}, {opacity:0, display:'none'});
			_tm.fromTo(list, .5, {display:'block', opacity:0}, {opacity:1});

			self.config();
			self.paginate();
		});
	}

	this.config=function() 
	{
		wrapper.style.width=(width*items.length)+'px';
	
		var li=wrapper.getElementsByTagName('li');
		var liWidth=(100/li.length);

		for (var i = 0; i < li.length; i++) {
			li[i].style.width=liWidth+'%';
		};
	}

	this.paginate=function() 
	{
		var ul=document.createElement('ul');
		
		for(var i=0; i<items.length; i++) {
			ul.innerHTML+='<li><a id="ln_'+i+'"></a></li>';
		}

		activeln=ul.getElementsByTagName('a')[0];
		activeln.className="active";

		pager.appendChild(ul);

		ul.onclick=function(event) 
		{
			var src=event.target;
			if(src.nodeName=="A") 
			{
				var id=src.id;
				id=id.split('_')[1];
					
				activeln.className="";
				activeln=src;
				activeln.className="active";

				self.getSlide(id);
			}
		}
	}


	this.getSlide=function(value) 
	{
		position=value;
		_tm.to(wrapper, 0.5, {left:-(width*position)});
	}

	this.init();

}(mediator, TweenMax, imhelper));


/*
 * Angular modules
 */
(function() 
{
  	var app = angular.module('hicloset', []);

	app.controller("Search", function() {
		this.send=function() {
			console.log("send");
		};
	});

})();