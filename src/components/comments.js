import React from 'react';
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
import './redditStyle.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Comment from './comment';

//Class is used to make a list of comments
class Comments extends React.Component{
    constructor() {
        super();
        this.state = {
            red: [],//For storingfetched data
            cUrl: window.location.href,//Gets the page url
            subreddit: '',//For storing post's subreddit
            id: '',//For storing post's id
            image: '',//For storing post's image
            postImage: '',//For displaying post's image
            title: '',//For storing post's title
            author: ''//For storing post's author
        };

        this.start = this.start.bind(this);
    };

    start(){
        //Creates a string of the url without the host 
        let afterHost = this.state.cUrl.substr(31);
        //Creates a substring to get the subreddit 
        let subredditV = afterHost.substring(0, afterHost.indexOf("/"));
        //Creates a substring to get the id 
        let idV = afterHost.substr(afterHost.indexOf("/")+1, 6);
        //Creates a substring to get the image url 
        let imageURL = afterHost.substr(afterHost.indexOf("/")+8);
        //Set the states with the substring values
        this.setState({
                subreddit: subredditV,
                id: idV,
                image: imageURL
            }, 
            function(){
                //Uses the states to fetch data
                fetch('http://www.reddit.com/r/' + this.state.subreddit + '/comments/' + this.state.id + '.json')
                .then(response => {
                    if(response.ok) return response.json();
                    throw new Error('Request failed.');
                })
                .then(json => {
                    //sets fetched data to states
                    this.setState({red: json[1].data.children});
                    this.setState({title: <h1 className='comment'>{json[0].data.children[0].data.title}</h1>})
                    this.setState({author: <h3 className='comment'>{json[0].data.children[0].data.author}</h3>})
                })
                .catch(error => {
                    console.log(error);
                })
                //Sorts the image variable to different types, could be extended for gifs, videos and gfycat posts
                let url = imageURL;
                let lastThree = url.substr(url.length-3);
                let streamable = url.substr(8,6);
                let imgur = url.substr(8, 5);
                if(lastThree=="jpg" || lastThree=="png"){
                    this.setState({postImage: <img className="comImage" src={imageURL}></img>});
                }
                else if(streamable=="stream"){
                    this.setState({postImage: <iframe src={imageURL}></iframe>});
                }
                else if(imgur=="imgur"){
                    this.setState({postImage: <img className="comImage" src={imageURL+".jpg"}></img>});
                }
                else{
                    this.setState({postImage: <p><a href={imageURL}></a></p>});
                }
            }
        );
    };
    
    componentWillMount() {
        //activates start function
        this.start();
    }
    
    render(){
        //sets values for display
        let mainImage;
        mainImage = this.state.postImage;
        let title = this.state.title;
        let author = this.state.author;
        let listItems;    
        listItems = this.state.red.map((u,index) => {
            return <Comment comment={u.data.body} author={u.data.author}/>
        });
        return(
            <div>
                <Row>
                    {title}
                </Row>
                <Row>
                    {author}
                </Row>
                <Row>
                    {mainImage}
                </Row>
                <Row>
                    {listItems}  
                </Row>
            </div>
        );
    }
}
export default Comments;