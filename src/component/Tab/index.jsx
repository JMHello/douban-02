import React, {Component} from "react";
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.css';
import config from '../../config/config'
import TabItem from './TabItem';

class Tab extends Component {
    constructor () {
        super();
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render () {
        const tabInfos = config.tabs;

        return (
            <ul className="tab-container">
                {
                    tabInfos.map((item, index) => {
                        return <TabItem key={index} infos={item} type={this.props.type}/>
                    })
                }
            </ul>
        )
    }
}

module.exports = Tab;
