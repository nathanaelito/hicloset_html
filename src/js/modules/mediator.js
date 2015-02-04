/*
 * @author Noizee makenoizee@gmail.com
 */
define('mediator', function() 
{
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

	return {
		publish: publish,
		subscribe: subscribe,
		installTo: function(obj){
			obj.subscribe = subscribe;
			obj.publish = publish;
		}
	}
});