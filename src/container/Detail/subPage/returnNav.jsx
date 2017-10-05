import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import '../style.css'
import {Link} from 'react-router';

import config from '../../../config/config';

class ReturnNav extends Component {
    constructor () {
        super();
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render () {
        let url = '',
            name = '';

        config.tabs.forEach((item) => {
            if (item.type === this.props.type) {
                url = item.url;
                name = item.name;
            }
        })

        return (
            <div className="reNav-container clearfix">
                <Link to={url} className="reNav-left">
                    &lt;<span>{name}</span>
                </Link>
                <h1 className="reNav-right">{this.props.title}</h1>
            </div>
        )
    }
}

export default ReturnNav;
