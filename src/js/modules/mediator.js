
/*
 * @author Noizee makenoizee@gmail.com
 */
(function(window, document, undefined) {
	'use strict';


	/*// ****************************************** //*/
	/*// MEDIATOR									//*/
	/*// ****************************************** //*/

	// Storage for our topics/events
	var channels = {};
	// Subscribe to an event, supply a callback to be executed
	// when that event is broadcast
	var subscribe = function(channel, fn)
	{
		if (!channels[channel]) 
			channels[channel] = [];

		channels[channel].push({ context: this, callback: fn });
	}

	// Publish/broadcast an event to the rest of the application
	var publish = function(channel)
	{
		if (!channels[channel]) return false;
		
		var args = Array.prototype.slice.call(arguments, 1);
		
		for (var i = 0, l = channels[channel].length; i < l; i++) {
			var subscription = channels[channel][i];
			subscription.callback.apply(subscription.context, args);
		}
	}

	var mediator = {
		publish: publish,
		subscribe: subscribe,
		installTo: function(obj){
			obj.subscribe = subscribe;
			obj.publish = publish;
		}
	}

	//Expose mediator module as either a global variable or a require.js module
	if(typeof define === 'function' && define.amd) {
		define('mediator', function () {
			return mediator;
		});
	} else {
		window.mediator = mediator;
	}

}(window, document));