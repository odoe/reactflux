/** @jsx React.DOM */
/*jshint ignore:start*/
var React = require('react');
var AppStore = require('../stores/app-store.js')
var AddToCart = require('./app-addtocart.js');

function getCatalog() {
  return { items: AppStore.getCatalog() };
}

function itemRows(item) {
  return (
    <tr key={item.title}>
      <td>{item.title}</td>
      <td>${item.cost}</td>
      <td><AddToCart item={item}/></td>
    </tr>
  );
}

var Catalog = React.createClass({
  getInitialState: function() {
    return getCatalog();
  },
  render: function() {
    var items = this.state.items.map(itemRows);
    return (
      <table className='table table-hover'>
        {items}
      </table>
    );
  }
});

module.exports = Catalog;

/*jshint ignore:end*/

