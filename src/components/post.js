import React from 'react';
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
import './redditStyle.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Comments from './comments';

//Used to create posts
class Post extends React.Component{
  render(){
    //These values are used for creating comments
    let postId = this.props.id;
    let subreddit = this.props.subreddit;
    let image = this.props.image;
    return(
      <Col xs={12} md={2} className='box'>
        <h4><a href={'https://www.reddit.com/r/' + subreddit + '/comments/' + postId}>{this.props.title}</a></h4>
        <img  src={this.props.thumbnail}></img>
        <p>{this.props.author}</p>
        <Link to={`/comments/${subreddit}/${postId}/${image}`}>comments</Link>          
      </Col>   
    );
  }
}
export default Post;