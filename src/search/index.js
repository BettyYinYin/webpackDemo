import React, {Component} from 'react'
import ReactDom from 'react-dom'
import './index.less'
import logo from './imgs/logo_pc.png'

class Search extends Component{
    render(){
        return (
            <div className="search-text">Search text
                <img src={logo}/>
            </div>
        )
    }
}

ReactDom.render(<Search />, document.getElementById('app'))