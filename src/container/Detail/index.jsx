import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.css'

import ReturnNav from './subPage/ReturnNav';
import Content from './subPage/Content';


import fetchJsonp from 'fetch-jsonp';

class Detail extends Component {
    constructor (props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data: {},
            type: ''
        }
    }

    render () {
        const data = this.state.data,
            type = this.props.params.type;

        return (
            <div className="detail-container">
                <ReturnNav type={type} title={this.state.data.title}/>
                <Content data={data} type={type}/>
            </div>
        )
    }

    componentDidMount () {
        this.getData(this.props.params.id);
    }

    getData (id) {
        const url = {
            music: `https://api.douban.com/v2/music/${id}`,
            book: `https://api.douban.com/v2/book/${id}`,
            movie: `https://api.douban.com/v2/movie/subject/${id}`,
        }
        const result = fetchJsonp(url[this.props.params.type], {
            jsonpCallbackFunction: 'search_results'
        });
        this.dealData(result);
    }

    dealData (result) {
        result
            .then((response) => response.json())
            . then((json) => {
                const data = json;
                this.setState({
                    data: data
                })
            })
            .catch(function (err) {
                console.log('parsing false', err);
            })
    }
}

export default Detail;
