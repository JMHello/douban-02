import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.css';

import ListItem from './ListItem';

class List extends Component {
    constructor () {
        super();
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render () {
        let arr = this.props.datas;

        return (
            <div className="list-container">
                {
                    !arr[0]?
                        <div className="loading">数据加载中...</div>:
                        arr.map((item, index) => {
                            return <ListItem key={index} content={item} type={this.props.type}/>
                        })
                }
            </div>
        )
    }
}

module.exports = List;
