/** @jsx React.DOM */
/*jshint ignore:start*/
var React = require('react');
var Catalog = require('../components/app-catalog.js');
var Cart = require('../components/app-cart.js');

var APP = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Shop!</h1>
        <Catalog />
        <h1>Cart</h1>
        <Cart />
      </div>
    );
  }
});

module.exports = APP;

/*jshint ignore:end*/

