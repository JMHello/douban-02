import React, {Component} from "react";
import '../../../static/css/font.css';
import './style.css';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import {Link} from 'react-router';

class TabItem extends Component {
    constructor () {
        super();
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render () {
        const infos = this.props.infos,
              url = infos.url,
              cName = 'icon-' + infos.type;

        return (
            <li
                className="tc-item"
                data-type={infos.type}
                ref={(a) => this.aLi = a}
                onMouseOver={this.mouseOverHandler.bind(this)}
                onMouseOut={this.mouseOutHandler.bind(this)}
            >
                <Link to={url}>
                    <i className={'icon ' + cName}></i>
                    <span className="item-title">{infos.name}</span>
                </Link>
            </li>
        )
    }

    componentDidMount () {
        this.showState();
    }

    showState () {
        if(this.props.infos.type === this.props.type) {
           this.mouseOverFn();
        }
    }
    mouseOverHandler () {
        this.mouseOverFn();
    }

    mouseOverFn () {
        const li = this.aLi,
            icon = li.querySelector('.icon'),
            type = li.getAttribute('data-type');

        li.classList.add('tc-item-hover');
        icon.classList.add(`icon-${type}-hover`);
    }

    mouseOutHandler () {
        if(this.props.infos.type !== this.props.type) {
            const li = this.aLi,
                icon = li.querySelector('.icon'),
                type = li.getAttribute('data-type');

            li.classList.remove('tc-item-hover');
            icon.classList.remove(`icon-${type}-hover`);
        }
    }
}

module.exports = TabItem;
