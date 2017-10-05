import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.css';

import fetchJsonp from 'fetch-jsonp';

class LoadMore extends Component {
    constructor () {
        super();
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data: [],
            isLoadingMore: false
        }
    }
    render () {
        return (
            <div className="loadMore-container hide" ref={(ele) => this.loadMoreWrap = ele}>
                {
                    this.state.isLoadingMore ?
                        <span className="loadingMore">数据加载中。。。</span>:
                        <span className="loadingMore" onClick={this.loadMore.bind(this)}>加载更多数据</span>
                }
            </div>
        )
    }
    componentDidMount () {
        this.isBottom();
    }
    isBottom () {
        const listWrap = this.loadMoreWrap.previousElementSibling;
        listWrap.addEventListener('scroll', () => {
            if (listWrap.scrollHeight - listWrap.scrollTop === listWrap.clientHeight) {
                console.log("到达底部");
                this.loadMoreWrap.classList.remove('hide');
            } else {
               this.loadMoreWrap.classList.add('hide');
            }
        }, true);
    }
    loadMore () {
        this.setState({
            isLoadingMore: true
        })

        this.getData(() => {
            this.props.loadMoreFn(this.state.data);
            this.setState({
                isLoadingMore: false
            })
        })
    }

    getData (fn) {
        const result = fetchJsonp(`https://api.douban.com/v2/${this.props.type}/search?q=javascript&count=5`, {
            jsonpCallbackFunction: 'search_results'
        });
        this.dealData(result, fn);
    }

    dealData (result, fn) {
        result
            .then((response) => response.json())
            . then((json) => {
                const data = json[this.props.choice];

                this.setState({
                    data: data
                });
                fn && fn ();

            })
            .catch(function (err) {
                console.log('parsing false', err);
            })
    }
}

export default  LoadMore;
