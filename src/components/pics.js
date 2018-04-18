import React from 'react';
import Post from './post';
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';

//Creates Pics subreddit, more comments in the soccer.js file
export default class Pics extends React.Component {
    constructor() {
        super();
        this.state = {
            red: [],
            subreddit: 'pics'
        };
    };
  

    componentWillMount() {
        fetch('https://www.reddit.com/r/' + this.state.subreddit +'.json')
        .then(response => {
            if(response.ok) return response.json();
            throw new Error('Request failed.');
        })
        .then(json => {
            this.setState({red: json.data.children});
        })
        .catch(error => {
            console.log(error);
        });
    }

    render() {
        let listItems;    
        listItems = this.state.red.map((u,index) => {
            return <Post thumbnail={u.data.thumbnail} title={u.data.title} author={u.data.author} id={u.data.id} subreddit={u.data.subreddit} image={u.data.url}/>
        });
        return (
            <div>
                <Row>
                    {listItems}  
                </Row>
            </div>
        );
    }
}