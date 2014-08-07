/** @jsx React.DOM */
/*jshint ignore:start*/
var React = require('react');
var AppActions = require('../actions/app-actions.js');

var AddToCart = React.createClass({
  handleClick: function() {
    AppActions.addItem(this.props.item);
  },
  render: function() {
    return (
      <button onClick={this.handleClick}>Add to cart</button>
    );
  }
});

module.exports = AddToCart;

/*jshint ignore:end*/


