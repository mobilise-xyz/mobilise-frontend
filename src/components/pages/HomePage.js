import React from 'react';
import axios from 'axios';

export default class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: "",
        }
    }

    async componentDidMount() {
        const response = await axios.get('/users');
        this.setState( { data: response.data } );
    }

    render() {
        return (
            <div>
                { process.env.REACT_APP_API_URL }
                { this.state.data }
            </div>
        );
    }
}
