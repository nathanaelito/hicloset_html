window.sliders=[];

ProductSlider = Class.create();
ProductSlider.prototype = {
	initialize: function(elem) 
	{
		var _this=this;
		this.sliders=$$('.'+elem);
		this.slider=[];
		this.sliders.each(function(slider) 
		{
			var self=this;
			this.wrap=slider.select("ul")[0];
			this.list=slider.select("li");
			this.list_width=0;
			this.arrows=slider.select(".arrows")[0];
			this.alnks=null;

			this.init=function() 
			{
				this.resize();
				this.setListWidth();

				window.onresize=function() {
					self.resize();
				};
			}

			this.resize=function() 
			{
				var bound=this.imageBound();
				this.list_width=this.getListWidth(bound);

				this.wrap.style.width=(this.list_width+'%');
				this.wrap.style.marginLeft=0;

				this.initArrows();
			}

			this.setListWidth=function(list) {
				var li_width=(100/this.list.length);
				for (var i = 0; i < this.list.length; i++)
					this.list[i].style.width=(li_width+'%');
			}

			this.getListWidth=function(value) {
				return (((this.list.length-value)*100/value)+100);
			}


			this.initArrows=function() 
			{
				this.position=(this.imageBound()-1);
				this.percent=0;

				if(this.alnks==null) {
					this.alnks=this.arrows.getElementsByTagName('a');
					this.alnks[0].style.display='none';

					this.checkArrowVisibility();

					this.arrows.observe('click',function(event) 
					{
						console.log(self.list_width);
						event.preventDefault();

						self.position=((event.target.id=="right-arrow")?self.position+1:self.position-1);
						self.percent=((event.target.id=="right-arrow")?self.percent+1:self.percent-1);
						TweenMax.to(self.wrap, 0.5, {marginLeft:-((self.list_width/self.list.length)*self.percent)+'%'})

						self.checkArrowVisibility(true);
					});
				} else {
					this.checkArrowVisibility();
				}
			}

			this.checkArrowVisibility=function(check) 
			{
				if(check) 
				{
					this.alnks[0].style.display=((this.position==(this.imageBound()-1))?"none":"block");
					this.alnks[1].style.display=((this.position==(this.list.length-1))?"none":"block");
				} 
				else 
				{
					if(this.list.length>this.imageBound()) {
						this.alnks[1].style.display='block';
					} else {
						this.alnks[1].style.display='none';
					}
				}		
			}
			
			this.imageBound=function() 
			{
				var w_width=window.outerWidth, bound=0;

				if(w_width>1024) bound=4;
				else if((w_width>767)&&(w_width<1024)) bound=3;
				else if((w_width>640)&&(w_width<767)) bound=2;
				else if(w_width<640) bound=1;

				return bound;
			}

			this.init();
		});
		
    }
}

			