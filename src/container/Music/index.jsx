import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import '../../style.css';

import fetchJsonp from 'fetch-jsonp';

import Search from '../../component/Search';
import Tab from '../../component/Tab';
import List from '../../component/List';

class Music extends Component {
    constructor (props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data: [],
        }
    }

    render () {
        return (
            <div className="inner-wrap">
                <Search
                    placeholder = '请输入音乐名称'
                    onClick={this.clickHandler.bind(this)}
                    type="music"
                />,
                <List datas={this.state.data} type="music"/>,
                <Tab type="music"/>
            </div>
        )
    }

    componentDidMount () {
        this.getData();

    }

    getData () {
        const result = fetchJsonp('https://api.douban.com/v2/music/search?q=爱&count=5', {
            jsonpCallbackFunction: 'search_results'
        });
        this.dealData(result);
    }

    dealData (result) {
        result
            .then((response) => response.json())
            . then((json) => {
                const data = json.musics;
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

export default Music;
