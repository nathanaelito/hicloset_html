/*var homeSlider=(function(_m, _tm, _ih) 
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

}(mediator, TweenMax, imhelper));*/


/*
 * Angular modules
 */
(function(_m, _tm, _ih) 
{
  	var app = angular.module('hicloset', []);

  	app.controller("HomeSlider", ['$scope', '$interval', function($scope, $interval) {

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

		var straight=true;
		var delay=2000;
		var intv=null;

		_ih.addImages(items);
		_ih.load(onload);

		function onload() {
			_tm.fromTo(loader, .5, {opacity:1}, {opacity:0, display:'none'});
			_tm.fromTo(list, .5, {display:'block', opacity:0}, {opacity:1});

			config();
		}

		function config() 
		{
			wrapper.style.width=(width*items.length)+'px';
		
			var li=wrapper.getElementsByTagName('li');
			var liWidth=(100/li.length);

			for (var i = 0; i < li.length; i++) {
				li[i].style.width=liWidth+'%';
			};

			paginate();
		}

		function paginate() 
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

					getSlide(id);
				}
			}

			autoplay();
		}

		function autoplay() 
		{
			intv=$interval(function() 
			{
				position=(straight)?position+1:position-1;

				if((position+1)===items.length)
					straight=false;
				else if(position===0)
					straight=true;

				activeln.className="";
				activeln=document.getElementById('ln_'+position);
				activeln.className="active";

				_tm.to(wrapper, 0.5, {left:-(width*position)});

			}, delay);
		}

		function getSlide(value) {
			position=value;
			_tm.to(wrapper, 0.5, {left:-(width*position)});
		}
	}]);

	app.controller("Search", function() {
		this.expression="";
		this.send=function(url) {
			console.log(url);
		};
	});

	app.controller("Newsletter", function() {
		this.email="";
		this.send=function(url) {
			console.log(url);
		};
	});

}(mediator, TweenMax, imhelper));