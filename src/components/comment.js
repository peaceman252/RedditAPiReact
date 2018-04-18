import React from 'react';
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
import './redditStyle.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

//Class is used to create a single comment  
class Comment extends React.Component{
  render(){
    return(
      <Col xs={12} md={8}>
        <h5 className='comment'>{this.props.author}</h5>
        <p className='comment'>{this.props.comment}</p>
      </Col>
    );
  }
}
export default Comment;