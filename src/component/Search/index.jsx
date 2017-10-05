import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import '../../static/css/font.css';
import './style.css';

import fetchJsonp from 'fetch-jsonp';

class Search extends Component {
    constructor (props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data: []
        }
    }
    render () {
        return (
            <div className="search-container clearfix">
                <div className="sc-input-container">
                    <span className="icon-search"></span>
                    <input
                        placeholder={this.props.placeholder}
                        type="text"
                        className="sc-input"
                        ref={(ele) => this.input = ele}
                    />
                </div>
                <button
                    type="button"
                    className="sc-btn"
                    onClick={this.clickHandler.bind(this)}
                >搜索</button>
            </div>
        )
    }

    clickHandler () {
        this.getData(this.input.value.trim(), () => {
            this.props.onClick && this.props.onClick(this.state.data);
        });
    }

    getData (keyword, fn) {
        const url = {
            music: `https://api.douban.com/v2/music/search?q=${keyword}`,
            book: `https://api.douban.com/v2/book/search?q=${keyword}`,
            movie: `https://api.douban.com/v2/movie/search?q=${keyword}`,
        }

        const result = fetchJsonp(url[this.props.type], {
            jsonpCallbackFunction: 'search_results'
        });

        this.dealData(result, fn);
    }

    dealData (result, fn) {
        const type = {
            music: 'musics',
            book: 'books',
            movie: 'subjects'
        }

        result
            .then((response) => response.json())
            . then((json) => {
                const data = json[type[this.props.type]];

                this.setState({
                    data: data
                })

                fn && fn ();
            })
            .catch(function (err) {
                console.log('parsing false', err);
            })
    }
}

module.exports = Search;
