Slider = Class.create();
Slider.prototype = {
    initialize: function(elem) {
        
        this.width=100;
        this.position=0;
        this.activeln=null;
        this.autoPlay=false;
        this.straight=true;
        this.delay=4000;
        this.intv=null;

        this.wrapper = $$('#' + elem + ' .slider-images')[0];
        this.list = $$('#' + elem + ' .images-list')[0];
        this.items = this.list.select('img');
        this.loader = $$('#' + elem + ' #loader')[0];
        this.pager = $$('#' + elem + ' .slider-pager')[0];

        this.init();
    },
    init:function() {
        var _this=this;
        imhelper.addImages(this.items);
        imhelper.load(function() { _this.onLoad(); });  
    },
    onLoad:function() {
        TweenMax.fromTo(this.loader, .5, {opacity:1}, {opacity:0, display:'none'});
        TweenMax.fromTo(this.list, .5, {display:'block', opacity:0}, {opacity:1});

        this.config();
    },
    config:function() {
        this.wrapper.style.width=(this.width*this.items.length)+'%';
        
        var li=this.wrapper.select('li');
        var liWidth=(100/li.length);

        li.each(function(item) {
            item.style.width=liWidth+'%';
        });

        this.paginate();
    },

    paginate:function() 
    {
        var _this=this;
        var ul=new Element('ul');

        for(var i=0; i<this.items.length; i++) {
            ul.innerHTML+='<li><a id="ln_'+i+'"></a></li>';
        }

        this.activeln=ul.getElementsByTagName('a')[0];
        this.activeln.addClassName("active");

        this.pager.appendChild(ul);

        ul.observe('click', function(event) 
        {
            var src=event.target;
            if(src.nodeName=="A") 
            {
                var id=src.id;
                id=id.split('_')[1];
                    
                _this.activeln.removeClassName("active");
                _this.activeln=src;
                _this.activeln.addClassName("active");

                _this.getSlide(id);

                clearInterval(_this.intv);

                _this.autoplay();
            }
        });

        this.autoplay();
    },

    autoplay:function() 
    {
        var _this=this;
        this.intv=setInterval(function() 
        {
            _this.position=(_this.straight && (_this.position<2))?_this.position+1:_this.position-1;

            if((_this.position+1)===_this.items.length)
                _this.straight=false;
            else if(_this.position===0)
                _this.straight=true;

            //console.log("autoplay position: "+_this.position)

            _this.activeln.removeClassName('active');
            _this.activeln=$('ln_'+_this.position);
            _this.activeln.addClassName("active");

            TweenMax.to(_this.wrapper, 0.5, {left:-(_this.width*_this.position)+'%', ease: Sine.easeOut});

        }, this.delay);
    },

    getSlide:function(value) {
        this.position=parseInt(value);
        //console.log("get slide position: " + this.position);
        TweenMax.to(this.wrapper, 0.5, {left:-(this.width*this.position)+'%', ease: Sine.easeOut});
    }
}