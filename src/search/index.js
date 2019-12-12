import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './index.less'
import logo from './imgs/logo_pc.png'
// import {common} from '../../commons'
import { a } from './tree-shaking'

class Search extends Component{
    render(){
        if(false){
            console.log(a())
        }
        return (
            <div className="search-text">Search text
                {common()}
                <img src={logo}/>
            </div>
        )
    }
}

ReactDOM.render(<Search />, document.getElementById('app'))