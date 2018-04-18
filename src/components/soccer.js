import React from 'react';
import Post from './post';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
import Page from './page';

//Used to create the soccer subreddit
export default class Soccer extends React.Component {
    constructor() {
        super();
        this.state = {
            red: [],//for storing fetched data
            subreddit: 'soccer',//Name of subreddit
            nextpage: ''//Used for creating a second page of posts
        };
        //handles when load more button is pressed
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleSubmit(event) {
        //next page's value set
        this.setState({nextpage: <Page subreddit={this.state.subreddit}/>});
        //Page is not reset
        event.preventDefault();
    }

    componentWillMount() {
        //data is fetched
        fetch('https://www.reddit.com/r/' + this.state.subreddit +'.json')
        .then(response => {
            if(response.ok) return response.json();
            throw new Error('Request failed.');
        })
        .then(json => {
            //red is set
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
        let nextpage = this.state.nextpage;
        return (
            <div>
                <Row>
                    {listItems}
                    <form className='form' onSubmit={this.handleSubmit}>
                        <input type="submit"  value="Load More"/>
                    </form>
                    {nextpage}
                </Row>
            </div>
        );
    }
}