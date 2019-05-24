import React from 'react';
import axios from 'axios';

export default class HomePage extends React.Component {

    componentDidMount() {
        const response = axios.get('/users');
        console.log(response);
    }

    render() {
        return (
            <div>
                Smart volunteer management!
            </div>
        );
    }
}