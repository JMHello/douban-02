import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import '../../style.css';

import fetchJsonp from 'fetch-jsonp';

import Search from '../../component/Search';
import Tab from '../../component/Tab';
import List from '../../component/List';

class Movie extends Component {
    constructor (props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data: [],
        }
    }

    render () {
        const keyword = this.state.keyword;
        return (
            <div className="inner-wrap">
                <Search
                    placeholder = '请输入电影名称'
                    onClick={this.clickHandler.bind(this)}
                    type="movie"
                />,
                <List keyword={keyword} datas={this.state.data} type="movie"/>,
                <Tab type="movie"/>
            </div>
        )
    }

    componentDidMount () {
        this.getData();
    }

    getData () {
        const result = fetchJsonp('https://api.douban.com/v2/movie/search?q=成龙&count=5', {
            jsonpCallbackFunction: 'search_results'
        });
        this.dealData(result);
    }

    dealData (result) {
        result
            .then((response) => response.json())
            . then((json) => {
                const data = json.subjects;
                this.setState({
                    data: data
                })
            })
            .catch(function (err) {
                console.log('parsing false', err);
            })
    }

    clickHandler (data) {
        this.setState({
            data: data
        })
    }
}

export default Movie;
