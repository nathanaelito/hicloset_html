(function(window, document, undefined) {
	'use strict';

	Element.prototype.addClass=function(clss, rlc) {
		if(rlc) this.className=clss;
		else this.className+=' '+clss;

		return this;
	}

	Element.prototype.removeClass=function(clss) {
		var cln=this.className;
		this.className=cln.replace(clss,'');

		return this;
	}

	Element.prototype.hasClass=function(clss) {
		var reg=new RegExp(clss, "gi");
		if(this.className.match(reg))
			return true;

		return false;
	}

	/*
	function extend(destination, source) {
	    for (var property in source)
	      destination[property] = source[property];
	    return destination;
	}

	extend(Object, {
		addClass : addClass,
		removeClass : removeClass,
		hasClass : hasClass, 
	});*/

	var utils = 
	{
		xhr: function(ty, url, dt, cb, ct) 
		{
			var xhr=null;

			if (window.XMLHttpRequest) xhr=new XMLHttpRequest();
		  	else xhr=new ActiveXObject("Microsoft.XMLHTTP");

		  	xhr.open(ty,url,true);
		  	xhr.onreadystatechange = function() {
		      	if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
		         	//console.log(xhr.responseText);
		         	cb(this.response);
		      	}
		   	}
	        xhr.send(dt);
		},
		checkEmail : function(ve) {
	        var flt = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	        if (flt.test(ve)) {
	            return true;
	        }
	         
	        return false;
	    },
	    serialize : function(obj) {
		   	var str = [];
		   	for(var p in obj){
		       	if (obj.hasOwnProperty(p)) {
		           	str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		       	}
		   	}
		   	return str.join("&");
		},
		queryString : function () {
		  	var query_string = {};
		  	var query = window.location.search.substring(1);
		  	var vars = query.split("&");
		  	for (var i=0;i<vars.length;i++) {
		    	var pair = vars[i].split("=");
		    	// If first entry with this name
		    	if (typeof query_string[pair[0]] === "undefined") {
		      		query_string[pair[0]] = pair[1];
		    	} 
		    	else if (typeof query_string[pair[0]] === "string") 
		    	{
		      		var arr = [ query_string[pair[0]], pair[1] ];
		      		query_string[pair[0]] = arr;
		    	} else 
		    	{
		      		query_string[pair[0]].push(pair[1]);
		    	}
		  	} 
		    return query_string;
		},
		addClass:function(elm, clss, rlc) 
		{
			if(typeof elm == 'object') {
				if(elm.length===undefined) {
					if(rlc) elm.className=clss;
					else elm.className+=' '+clss;
				} else {
					for (var i = 0; i < elm.length; i++) {
						if(rlc) elm[i].className=clss;
						else elm[i].className+=' '+clss;
					};
				}
			}
			else {
				if(rlc) document.getElementById(elm).className=clss;
				else document.getElementById(elm).className+=' '+clss;
			}
		},
		removeClass:function(elm, clss) {
			var cln='';
			if(typeof elm == 'object') {
				if(elm.length===undefined) {
					cln=elm.className;
					elm.className=cln.replace(clss,'');
				} else {
					for (var i = 0; i < elm.length; i++) {
						cln=elm[i].className;
						elm[i].className=cln.replace(clss,'');
					};
				}
			} else {
				cln=document.getElementById(elm).className;
				document.getElementById(elm).className=cln.replace(clss,'');
			}
		},
		hasClass:function(elm, clss) {
			var reg=new RegExp(clss, "gi");
			if(elm.className.match(reg))
				return true;

			return false;
		},
		htmlspecialchars_decode : function (string, quote_style) {
		  //       discuss at: http://phpjs.org/functions/htmlspecialchars_decode/
		  //      original by: Mirek Slugen
		  //      improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		  //      bugfixed by: Mateusz "loonquawl" Zalega
		  //      bugfixed by: Onno Marsman
		  //      bugfixed by: Brett Zamir (http://brett-zamir.me)
		  //      bugfixed by: Brett Zamir (http://brett-zamir.me)
		  //         input by: ReverseSyntax
		  //         input by: Slawomir Kaniecki
		  //         input by: Scott Cariss
		  //         input by: Francois
		  //         input by: Ratheous
		  //         input by: Mailfaker (http://www.weedem.fr/)
		  //       revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		  // reimplemented by: Brett Zamir (http://brett-zamir.me)
		  //        example 1: htmlspecialchars_decode("<p>this -&gt; &quot;</p>", 'ENT_NOQUOTES');
		  //        returns 1: '<p>this -> &quot;</p>'
		  //        example 2: htmlspecialchars_decode("&amp;quot;");
		  //        returns 2: '&quot;'

		  var optTemp = 0,
		    i = 0,
		    noquotes = false;
		  if (typeof quote_style === 'undefined') {
		    quote_style = 2;
		  }
		  string = string.toString()
		    .replace(/&lt;/g, '<')
		    .replace(/&gt;/g, '>');
		  var OPTS = {
		    'ENT_NOQUOTES': 0,
		    'ENT_HTML_QUOTE_SINGLE': 1,
		    'ENT_HTML_QUOTE_DOUBLE': 2,
		    'ENT_COMPAT': 2,
		    'ENT_QUOTES': 3,
		    'ENT_IGNORE': 4
		  };
		  if (quote_style === 0) {
		    noquotes = true;
		  }
		  if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
		    quote_style = [].concat(quote_style);
		    for (i = 0; i < quote_style.length; i++) {
		      // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
		      if (OPTS[quote_style[i]] === 0) {
		        noquotes = true;
		      } else if (OPTS[quote_style[i]]) {
		        optTemp = optTemp | OPTS[quote_style[i]];
		      }
		    }
		    quote_style = optTemp;
		  }
		  if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
		    string = string.replace(/&#0*39;/g, "'"); // PHP doesn't currently escape if more than one 0, but it should
		    // string = string.replace(/&apos;|&#x0*27;/g, "'"); // This would also be useful here, but not a part of PHP
		  }
		  if (!noquotes) {
		    string = string.replace(/&quot;/g, '"');
		  }
		  // Put this in last place to avoid escape being double-decoded
		  string = string.replace(/&amp;/g, '&');

		  return string;
		}
	}

	//Expose utils as either a global variable or a require.js module
	if(typeof define === 'function' && define.amd) {
		define('utils', function () {
			return utils;
		});
	} else {
		window._u = utils;
	}

}(window, document));