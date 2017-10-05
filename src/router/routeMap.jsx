import React, {Component} from 'react';
import { Router, Route, IndexRoute} from 'react-router';

import App from '../container/App';
import Book from '../container/Book';
import Movie from '../container/Movie';
import Music from '../container/Music';
import Detail from '../container/Detail';

class RouteMap extends Component {
    render () {
        return (
            <Router history={this.props.history}>
                <Route path="/" component={App}>
                    <IndexRoute component={Book}/>
                    <Route path="movie" component={Movie}/>
                    <Route path="music" component={Music}/>
                    <Route path='/detail/:type/:id' component={Detail}/>
                </Route>
            </Router>
        )
    }
}

export default RouteMap;
