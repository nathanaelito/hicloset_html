/*! html - v1.0.0 - 2015-02-05
* Copyright (c) 2015 ; Licensed  */
var homeSlider=function(a,b){a.installTo(this);var c=document.getElementById("images-list"),d=c.getElementsByTagName("img"),e=document.getElementById("loader");imhelper.addImages(d),imhelper.load(function(){b.fromTo(e,.5,{opacity:1},{opacity:0,display:"none"}),b.fromTo(c,.5,{display:"block",opacity:0},{opacity:1})})}(mediator,TweenMax);