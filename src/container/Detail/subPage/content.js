import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import '../style.css'

class Book extends Component {
    constructor (props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render () {
        const data = this.props.data,
              type = this.props.type;
        let smImg = '',
            bigImg = '',
            tags = [],
            authors = [],
            average = 0,
            publisher = '',
            pubdate = '',
            summary = '',
            director = '',
            actor = [],
            year = 0;

        if(JSON.stringify(data) !== '{}') {
            // 音乐、电影、书本共有的数据
            smImg = (type === 'music')? data.image: data.images.medium;
            tags = (type === 'movie'? data.genres: data.tags);
            authors = data.author;
            average = data.rating.average;
            publisher = (type === 'music')? data.attrs.publisher[0]: data.publisher;
            pubdate = (type === 'music')? data.attrs.pubdate[0]: data.pubdate;
            summary = data.summary;

            // 以下是电影才有的数据
            if(type === 'movie') {
                bigImg = data.images.large;
                director = data.directors[0]? data.directors[0].name: '未知';
                year = data.year;
                actor = data.casts;
            }
        }

        return (
            <div className="content-container">
                {
                    JSON.stringify(data) === '{}'?
                        <div>数据加载中</div>:
                        <div>
                            {
                                type !== 'movie'?
                                    // 音乐或者书本
                                    <div className="detail-info clearfix">
                                        <img className="item-img" src={smImg || '#'}/>
                                        <ul className="info">
                                            {/* 名称 */}
                                            <li className="info-item">{`名称：${data.title || '暂无数据'}`}</li>

                                            {/*作者*/}
                                            <li className="info-item">{`作者：${this.getAuthor(authors, type) || '暂无数据'}`}</li>

                                            {/* 出版社 */}
                                            <li className="info-item">{`出版社：${publisher || '暂无数据'}`}</li>

                                            {/* 日期 */}
                                            <li className="info-item">{`日期：${pubdate || '暂无数据'}`}</li>

                                            {/* 评分 */}
                                            <li className="info-item">{`评分：${average || '暂无数据'}`}</li>

                                            {/* 价钱 */}
                                            {
                                                type === 'book'? <li className="info-item">{`价钱：${data.price || '暂无数据'}`}</li>:''
                                            }

                                            {/* 标签 */}
                                            <li className="info-item info-tag">
                                                {
                                                    tags.map((item, index) => {
                                                        return <i key={index} className="tag-item">{item.name || '暂无数据'}</i>
                                                    })
                                                }
                                            </li>
                                        </ul>
                                    </div>:

                                    // 电影
                                    <div className="detail-info">
                                        <img className="movie-image" src={bigImg || '#'}/>
                                    </div>
                            }
                            {
                                type !== 'movie'?
                                    // 音乐或者书本的简介
                                    <div className="detail-content">
                                        <div className="content-item">
                                            <h2 className="item-title">简介</h2>
                                            <p  className="item-detail">{summary || '暂无简介'}</p>
                                        </div>
                                    </div> :

                                    // 电影的简介
                                    <div className="detail-content">
                                        <div className="content-item">
                                            <h2 className="item-title">简介</h2>
                                            <div className="movie-info">
                                                <ul className="info">
                                                    {/* 名称 */}
                                                    <li className="info-item">{`名称：${data.title || '暂无数据'}`}</li>

                                                    {/* 标签 */}
                                                    <li className="info-item info-tag">
                                                        {
                                                            tags.map((item, index) => {
                                                                return <i key={index} className="tag-item">{item|| '暂无数据'}</i>
                                                            })
                                                        }
                                                    </li>

                                                    {/* 上映时间 */}
                                                    <li className="info-item">{`上映时间：${year || '暂无数据'}`}</li>

                                                    {/* 导演 */}
                                                    <li className="info-item">{`导演：${director || '暂时无数据'}`}</li>

                                                    {/* 演员 */}
                                                    <li>
                                                        演员：
                                                        <ul className="actor-list">
                                                            {
                                                                actor.map((item, index) => {
                                                                    return (
                                                                        <li key={index} className="list-item">
                                                                            <i className="list-name">{item.name}</i>
                                                                            {
                                                                                item.avatars? <img className="list-img" src={item.avatars.medium || '#'}/>: ''
                                                                            }
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                            }
                        </div>
                }
            </div>
        )
    }

    getAuthor (data, type) {
        let authors = '';

        data.forEach((item) => {
            type === 'music'?
                authors += item.name + ' ':
                authors += item + '';
        });
        return authors;
    }
}

export default Book;
