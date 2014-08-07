/** @jsx React.DOM */
/*jshint ignore:start*/
var React = require('react');
var AppActions = require('../actions/app-actions.js');

var RemoveFromCart = React.createClass({
  handleClick: function() {
    AppActions.removeItem(this.props.index);
  },
  render: function() {
    return (
      <button onClick={this.handleClick}>x</button>
    );
  }
});

module.exports = RemoveFromCart;

/*jshint ignore:end*/



