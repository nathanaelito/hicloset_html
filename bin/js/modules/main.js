/*! html - v1.0.0 - 2015-02-17
* Copyright (c) 2015 ; Licensed  */
!function(a,b,c,d){var e=angular.module("hicloset",[]);e.controller("Header",function(){var a=!1;this.showMobileMenu=function(){var b=document.getElementById("menu-mobile");b.style.display=a?"none":"block",a=a?!1:!0}}),e.controller("HomeSlider",["$scope","$interval",function(a,d){function e(){b.fromTo(o,.5,{opacity:1},{opacity:0,display:"none"}),b.fromTo(m,.5,{display:"block",opacity:0},{opacity:1}),f()}function f(){p.style.width=j*n.length+"%";for(var a=p.getElementsByTagName("li"),b=100/a.length,c=0;c<a.length;c++)a[c].style.width=b+"%";g()}function g(){for(var a=document.createElement("ul"),b=0;b<n.length;b++)a.innerHTML+='<li><a id="ln_'+b+'"></a></li>';l=a.getElementsByTagName("a")[0],l.className="active",q.appendChild(a),a.onclick=function(a){var b=a.target;if("A"==b.nodeName){var c=b.id;c=c.split("_")[1],l.className="",l=b,l.className="active",i(c)}},h()}function h(){t=d(function(){k=r?k+1:k-1,k+1===n.length?r=!1:0===k&&(r=!0),l.className="",l=document.getElementById("ln_"+k),l.className="active",b.to(p,.5,{left:-(j*k)+"%",ease:Sine.easeOut})},s)}function i(a){k=parseInt(a),b.to(p,.5,{left:-(j*k)+"%",ease:Sine.easeOut})}var j=100,k=0,l=null,m=document.getElementById("images-list"),n=m.getElementsByTagName("img"),o=document.getElementById("loader"),p=document.getElementById("slider-images"),q=document.getElementById("slider-pager"),r=!0,s=4e3,t=null;c.addImages(n),c.load(e)}]),e.controller("ProductSlider",function(){function a(a){this.wrap=a.getElementsByTagName("ul")[0],this.list=a.getElementsByTagName("li"),this.init=function(){var a=this;this.resize(),this.setListWidth(),window.onresize=function(){a.resize()}},this.resize=function(){var a=window.outerWidth,b=0;a>1024?b=this.getListWidth(4):a>767&&1024>a?b=this.getListWidth(3):a>640&&767>a?b=this.getListWidth(2):640>a&&(b=this.getListWidth(1)),this.wrap.style.width=b+"%"},this.setListWidth=function(){for(var a=100/this.list.length,b=0;b<this.list.length;b++)this.list[b].style.width=a+"%"},this.getListWidth=function(a){return 100*(this.list.length-a)/a+100},this.init()}for(var b=document.getElementsByClassName("slider"),c=0;c<b.length;c++)new a(b[c])}),e.controller("Search",["$location",function(){this.expression={},this.send=function(a){location.href=d.get(a,this.expression)}}]),e.controller("Newsletter",["$http",function(a){this.data={},this.send=function(b){a.post(b,this.data).success(function(){alert("Has sido suscrito.")}).error(function(a){console.log(a)})}}]),e.controller("Panels",function(){this.panel=1,this.setPanel=function(a){this.panel=a},this.isSelected=function(a){return this.panel===a}})}(mediator,TweenMax,imhelper,_u);