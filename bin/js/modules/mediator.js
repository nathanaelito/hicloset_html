/*! html - v1.0.0 - 2015-02-10
* Copyright (c) 2015 ; Licensed  */
!function(a){"use strict";var b={},c=function(a,c){b[a]||(b[a]=[]),b[a].push({context:this,callback:c})},d=function(a){if(!b[a])return!1;for(var c=Array.prototype.slice.call(arguments,1),d=0,e=b[a].length;e>d;d++){var f=b[a][d];f.callback.apply(f.context,c)}},e={publish:d,subscribe:c,installTo:function(a){a.subscribe=c,a.publish=d}};"function"==typeof define&&define.amd?define("mediator",function(){return e}):a.mediator=e}(window,document);