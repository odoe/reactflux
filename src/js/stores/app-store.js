var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('react/lib/merge');
var Bacon = require('baconjs').Bacon;

var _catalog = [
  {id:1, title: 'Widget #1', cost: 1},
  {id:2, title: 'Widget #2', cost: 2},
  {id:3, title: 'Widget #3', cost: 3}
];

var _cartItems = [];

var updateStream = new Bacon.Bus();
var eventStreams = [];

function _removeItem(index){
  _cartItems[index].inCart = false;
  _cartItems.splice(index, 1);
}

function _increaseItem(index){
  _cartItems[index].qty++;
}

function _decreaseItem(index){
  if(_cartItems[index].qty>1){
    _cartItems[index].qty--;
  }
  else {
    _removeItem(index);
  }
}

function _addItem(item){
  if(!item.inCart){
    item['qty'] = 1;
    item['inCart'] = true;
    _cartItems.push(item);
  }
  else {
    _cartItems.forEach(function(cartItem, i){
      if(cartItem.id===item.id){
        _increaseItem(i);
      }
    });
  }
}

var _AppStore = function() {};

var AppStore = merge(_AppStore.prototype, {
  addChangeListener: function(callback){
    eventStreams.push({
      callback: callback,
      dispose: updateStream.subscribe(callback)
    });
  },

  removeChangeListener: function(callback){
    eventStreams = eventStreams.filter(function(stream) {
      if (stream.callback === callback) {
        stream.dispose();
        return false;
      }
      return true;
    });
  },

  getCart: function(){
    return _cartItems;
  },

  getCatalog: function(){
    return _catalog;
  },

  // I can't even figure out where this method is initalized
  // but it works
  dispatcherIndex: AppDispatcher.register(function(next){
    var value = next.value();
    var action = value.action; // this is our action from handleViewAction
    // since next event is emitted to all subscribers
    // verify action exists on value incase a different
    // payload was sent intended for another subscriber
    if (action) {
      switch(action.actionType){
        case AppConstants.ADD_ITEM:
          _addItem(action.item);
        break;

        case AppConstants.REMOVE_ITEM:
          _removeItem(action.index);
        break;

        case AppConstants.INCREASE_ITEM:
          _increaseItem(action.index);
        break;

        case AppConstants.DECREASE_ITEM:
          _decreaseItem(action.index);
        break;
      }
      updateStream.push(action);
    }

    return true;
  })
});

module.exports = AppStore;
