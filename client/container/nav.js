import React, {Component} from 'react';
import {Link} from 'react-router-dom'; 

class Nav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
         <div>
            <header>
                <nav className="nav">
                    <ul>
                        <li><Link to="/">Add Address</Link></li>
                        <li><Link to="/card">Add Card</Link></li>
                    </ul>
                </nav>
            </header>
         </div>   
        )
    }
}

export default Nav;