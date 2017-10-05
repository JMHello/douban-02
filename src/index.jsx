import React from 'react';
import ReactDOM from 'react-dom';

import './static/css/reset.css';

import RouteMap from './router/routeMap';

import {hashHistory} from 'react-router';

ReactDOM.render(
    <RouteMap history={hashHistory}/>,
    document.getElementById('root')
);
