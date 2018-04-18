import React from 'react';
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
import './redditStyle.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Comments from './comments';
import Post from './post';

//Creates a Page, this is used by the soccer subreddit to create a second page, this is just a proof of concept each page needs a different id. This uses a hardcoded id.
class Page extends React.Component{
    constructor() {
        super();
        this.state = {
            red: [],//Fetched data will be stored
        };
    };

    componentWillMount() {
        //Fetchs a new page of data relating to the id
        fetch('https://www.reddit.com/r/' + this.props.subreddit +'.json?count=25&after=t3_8ca5ve')
        .then(response => {
            if(response.ok) return response.json();
            throw new Error('Request failed.');
        })
        .then(json => {
            //data is stored
            this.setState({red: json.data.children});
        })
        .catch(error => {
            console.log(error);
        });
    }
  render(){
    let listItems;    
    listItems = this.state.red.map((u,index) => {
        //posts are created
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
export default Page;