import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../css/main.less';
import {Link} from 'react-router-dom';

import Address from './address';

//console.log(style);
class Main extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <main>
                    <section>
                    <div id="main" className="main">
                        <Address />
                    </div>
                    </section>
                </main>
            </div>
        )
    }
}

export default Main;