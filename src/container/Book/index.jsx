import React, {Component} from 'react';

import PureRenderMixin from 'react-addons-pure-render-mixin';
import '../../style.css';

import fetchJsonp from 'fetch-jsonp';

import Search from '../../component/Search';
import Tab from '../../component/Tab';
import List from '../../component/List';
import LoadMore from '../../component/LoadMore';


class Book extends Component {
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
                    placeholder = '请输入书名'
                    onClick={this.clickHandler.bind(this)}
                    type="book"
                />
                <List keyword={keyword} datas={this.state.data} type="book"/>
                <LoadMore loadMoreFn={this.loadMoreHandler.bind(this)} type="book" choice="books"/>
                <Tab type="book"/>
            </div>
        )
    }

    componentDidMount () {
        this.getData();
    }

    getData () {
        const result = fetchJsonp('https://api.douban.com/v2/book/search?q=javascript&count=5', {
            jsonpCallbackFunction: 'search_results'
        });
        this.dealData(result);
    }

    dealData (result) {
        result
            .then((response) => response.json())
            . then((json) => {
                const data = json.books;
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
    loadMoreHandler (data) {
        this.setState({
            data: this.state.data.concat(data)
        })
    }
}

export default Book;
