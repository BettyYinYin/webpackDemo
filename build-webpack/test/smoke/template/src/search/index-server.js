// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import largeNumber from 'large-number-bty'
// import './index.less';
// import logo from './imgs/logo_pc.png';
// import {common} from '../../commons';
// import { a } from "./tree-shaking";

const React = require('react')
const largeNumber = require('large-number-bty')
require('./index.less')
const logo = require('./imgs/logo_pc.png')

console.log('logo', logo)
class Search extends React.Component {
  constructor(...args) {
    super(args)

    this.state = {
      Text: null,
    }

    this.loadComponent = this.loadComponent.bind(this)
  }

  loadComponent() {
    // import('./text').then((Text) => {
    //   this.setState({
    //     Text: Text.default,
    //   })
    // })
    console.log(11111111111)
    const Text = require('./text')
    console.log('Text', Text)
    this.setState({
      Text: Text
    })
  }

  render() {
    const { Text } = this.state

    return (
      <div className="search-text">
        Search text
        {
          largeNumber('9999999', '1')
        }
        {
            Text? <Text />: null
        }
        {/* {common()} */}
        <img src={logo} onClick={this.loadComponent} />
      </div>
    );
  }
}

// ReactDOM.render(<Search />, document.getElementById('app'));
module.exports = <Search />
