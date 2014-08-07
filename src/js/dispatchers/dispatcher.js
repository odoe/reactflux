var merge = require('react/lib/merge');
var Bacon = require('baconjs').Bacon;

var registerStream = new Bacon.Bus();
var streamCount = 0;

var Dispatcher = function() {};
Dispatcher.prototype = merge(Dispatcher.prototype, {

  /**
   * Subscribe to a Store's callback so that it may be invoked by an action.
   * @param {function} callback The callback to be registered.
   * @return {number} The count of the callbacks within the stream.
   */
  register: function(callback) {
    registerStream.subscribe(callback);
    streamCount += 1;
    return streamCount; // index
  },

  /**
   * dispatch
   * @param  {object} payload The data from the action.
   */
  dispatch: function(payload) {
    registerStream.push(payload);
  }

});

module.exports = Dispatcher;
