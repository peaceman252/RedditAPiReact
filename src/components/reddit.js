import React from 'react';
import Post from './post';
import Gaming from './gaming';
import Pics from './pics';
import Soccer from './soccer';
import Funny from './funny';
import Ireland from './ireland';
import Comments from './comments';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';

//Main component of application
export default class Reddit extends React.Component {
    constructor() {
        super();
        this.state = {
            red: [],//For storing fetched data
            subreddit: ''//Used when searching for a subreddit
        };
        //Needed for search functionality
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(event) {
        this.setState({subreddit: event.target.value});
    }

    handleSubmit(event) {
        //Sets value and fetches data, when activated on a subreddit page the new posts are placed underneath the existing ones
        this.setState({subreddit: event.target.value});
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
        if(this.state.subreddit!=''){
            event.preventDefault();
        }
    }

    handleReset(event) {
        event.location.reload();
    }

    render() {
        let listItems;    
        listItems = this.state.red.map((u,index) => {
            //data is sent to create posts and comments
            return <Post thumbnail={u.data.thumbnail} title={u.data.title} author={u.data.author} id={u.data.id} subreddit={u.data.subreddit} image={u.data.url}/>
        });
        return (
            <Router>
                <div>
                    <h1>Reddit API Project</h1>
                    <div>
                        {/*navbar*/}
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/pics">Pics</Link></li>
                            <li><Link to="/funny">Funny</Link></li>
                            <li><Link to="/ireland">Ireland</Link></li>
                            <li><Link to="/gaming">Gaming</Link></li>
                            <li><Link to="/soccer">Soccer</Link></li>
                            <li>
                                <form onSubmit={this.handleSubmit}>
                                    <input type="text"  value={this.state.value} onChange={this.handleChange}/>
                                    <input type="submit"  value="Submit"/>
                                </form>
                            </li>
                            <li>
                                <form onSubmit={this.handleReset}>
                                    <input type="submit"  value="Reset"/>
                                </form>
                            </li>
                        </ul> 
                        <hr/>
                        {/* The exact keyword ensures the '/' route matches only '/' and not '/anything-else'--> */}
                        <Route path="/pics" component={Pics}/>
                        <Route path="/funny" component={Funny}/>
                        <Route path="/ireland" component={Ireland}/>
                        <Route path="/gaming" component={Gaming}/>
                        <Route path="/soccer" component={Soccer}/>
                        <Route path="/comments" component={Comments}/>
                    </div>
                    <Row>
                        <h1 className='comment'>Search Results</h1> 
                    </Row>  
                    <Row>
                        {listItems}  
                    </Row>
                </div>
            </Router>
        );
    }
}
