/*! html - v1.0.0 - 2015-02-08
* Copyright (c) 2015 ; Licensed  */
!function(a,b,c){var d=angular.module("hicloset",[]);d.controller("HomeSlider",["$scope","$interval",function(a,d){function e(){b.fromTo(o,.5,{opacity:1},{opacity:0,display:"none"}),b.fromTo(m,.5,{display:"block",opacity:0},{opacity:1}),f()}function f(){p.style.width=j*n.length+"px";for(var a=p.getElementsByTagName("li"),b=100/a.length,c=0;c<a.length;c++)a[c].style.width=b+"%";g()}function g(){for(var a=document.createElement("ul"),b=0;b<n.length;b++)a.innerHTML+='<li><a id="ln_'+b+'"></a></li>';l=a.getElementsByTagName("a")[0],l.className="active",q.appendChild(a),a.onclick=function(a){var b=a.target;if("A"==b.nodeName){var c=b.id;c=c.split("_")[1],l.className="",l=b,l.className="active",i(c)}},h()}function h(){t=d(function(){k=r?k+1:k-1,k+1===n.length?r=!1:0===k&&(r=!0),l.className="",l=document.getElementById("ln_"+k),l.className="active",b.to(p,.5,{left:-(j*k)})},s)}function i(a){k=a,b.to(p,.5,{left:-(j*k)})}var j=980,k=0,l=null,m=document.getElementById("images-list"),n=m.getElementsByTagName("img"),o=document.getElementById("loader"),p=document.getElementById("slider-images"),q=document.getElementById("slider-pager"),r=!0,s=2e3,t=null;c.addImages(n),c.load(e)}]),d.controller("Search",function(){this.expression="",this.send=function(a){console.log(a)}}),d.controller("Newsletter",function(){this.email="",this.send=function(a){console.log(a)}})}(mediator,TweenMax,imhelper);