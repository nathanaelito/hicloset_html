var homeSlider=(function(_m, _tm) 
{
	_m.installTo(this);

	var autoPlay=false,
	list=document.getElementById('images-list'),
	items=list.getElementsByTagName('img'),
	loader=document.getElementById('loader');

	imhelper.addImages(items);
	imhelper.load(function() {
		_tm.fromTo(loader, .5, {opacity:1}, {opacity:0, display:'none'});
		_tm.fromTo(list, .5, {display:'block', opacity:0}, {opacity:1});
	});

}(mediator, TweenMax));