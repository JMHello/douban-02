import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.css';
import {Link} from 'react-router'

class ListItem extends Component {
    constructor () {
        super();
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const data = this.props.content,
              type = this.props.type

        let img = '',
            tags = [],
            author = [],
            title = '',
            rating = 0,
            pubdate,
            id = 0;

        if(data) {
             img = type === 'music' ? data.image: data.images.medium;
             tags = type === 'movie'? data.genres: data.tags;
             author = type === 'movie'? data.casts: data.author;
             id = data.id;
             title = data.title;
             rating =data.rating.average;
             pubdate = data.pubdate;
        }

        return (
            <div className="list-item clearfix">
                <img className="item-img" src={img}/>
                <ul className="info">
                    {/* 名称 */}
                    <li className="info-item">
                        {type !=='movie'? '名称：': ''}
                        <Link to={`/detail/${type}/${id}`} className="info-name-link">{title || '暂无数据'}</Link>
                    </li>
                    {/* 标签 */}
                    {
                        type === 'music'? '':
                            <li className="info-item info-tag">
                            {
                                tags.map((item, index) => {
                                    return <i key={index} className="tag-item">{(type !== 'movie'? item.name : item)||'暂无数据'}</i>
                                })
                            }
                            </li>
                    }

                    {/*作者*/}
                    <li className="info-item">{this.getAuthor(author, type) || '暂无数据'}</li>

                    {/* 评分 */}
                    <li className="info-item">{`评分：${rating || 0}`}</li>

                    {/* 出版时间 */}
                    {
                        type === 'book'? <li className="info-item">{`出版时间：${pubdate || '暂无数据'}`}</li>: ''
                    }
                </ul>
            </div>
        );
    }

    getAuthor (data, type) {
        let authors = '';

        data.map((item) => {
            type === 'book'?
                authors += item + '':
                authors += item.name + '';
        })

        return authors;
    }
}

export default ListItem;


