/**
 * @fileoverview Defines the EventEmitter class that manages communication between objects.
 */


/**
 * EventEmitter class constructor constructs a new instance of the class with a clean events array.
 * @constructor
 */
var EventEmitter = function() {

  /**
   * Map of events and their associated callbacks.
   * @type {Object.<Array>.Function}
   * @private
   */
  this.events_ = {};
};

/**
 * Associates a method to an event. Each method is added to the end of the events array.
 * @param  {string} event Name of the event to which the method should be associated.
 * @param  {Function} callback The method to bind to the event.
 * @return {Array} An array containing the event name at key 0 and the subscribed method at key 1. This is
 *                 useful for ignoring an event/method combination.
 */
EventEmitter.prototype.listen = function(event, callback) {
  if (typeof event !== 'string') {
    throw new TypeError('Expected `event` to be a srting but received a ' + (typeof event));
  }

  if (typeof callback !== 'function') {
    throw new TypeError('Expected `callback` to be a function but received a ' + (typeof callback));
  }

  if (!(event in this.events_)) {
    this.events_[event] = [];
  }

  this.events_[event].push(callback);

  return [event, callback];
};

/**
 * Disassociated a method from an event. The method received must match the bound method exactly. This can be
 * cause issues when passing anonymous metods. In this case use the results returned from the listen method.
 * @param  {string} event Name of the event from which the method should be disassociated.
 * @param  {Function} callback The method to remove from the event.
 * @return {Array|Void} An array containing the event name at key 0 and the disassociated method at key 1.
 */
EventEmitter.prototype.ignore = function(event, callback) {
  if (typeof event !== 'string') {
    throw new TypeError('Expected `event` to be a srting but received a ' + (typeof event));
  }

  if (typeof callback !== 'function') {
    throw new TypeError('Expected `callback` to be a function but received a ' + (typeof callback));
  }

  if (this.events_[event] instanceof Array) {
    var callbackFound = false;
    this.events_[event].forEach(function(elem, index, arr) {
      if (callback === elem) {
        arr.splice(index, 1);
        callbackFound = true;

        return [event, callback];
      }
    });
    if (!callbackFound) {
      console.warn('The requested event/method combination cannot be ignored because it is not set');
    }
  } else {
    console.warn('The event \'' + event + '\' is either undefined or not an array.');
  }

  return;
};

/**
 * [broadcast description]
 * @param  {string} event Name of the event to trigger.
 * @param  {*} data Optional argument containing data to pass to each associated method.
 * @return {Void}
 */
EventEmitter.prototype.broadcast = function(event, data) {
  if (typeof event !== 'string') {
    throw new TypeError('Expected `event` to be a srting but received a ' + (typeof event));
  }

  if (this.events_[event] instanceof Array) {
    this.events_[event].forEach(function(elem) {
      elem(data);
    });
  } else {
    console.warn('The event \'' + event + '\' is either undefined or not an array.');
  }

  return;
};