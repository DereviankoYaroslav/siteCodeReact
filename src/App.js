import React, {Component} from "react";
import axios from "axios";
import {Loading} from "./Loading";

class App extends Component{
  constructor(props){
    super(props);
    //state
    this.state = {
      users: [],
      loading: false
    }
    //bind
    this.getUsers = this.getUsers.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getUsers(){
    this.setState({
      loading: true
    })
    axios('https://api.randomuser.me/?nat=US&results=5')
    .then(response => this.setState({
      users: [...this.state.users, ...response.data.results],
      loading: false
    }));
  }

  handleSubmit(event){
    event.preventDefault();
    this.getUsers();
    console.log('more users loaded');
  }


  componentDidMount(){
    this.getUsers();
  } 

  render(){
    const {loading, users} = this.state; 
    return (
    <div className="App">
      <form onSubmit={this.handleSubmit}>
              <input type='submit' value='load users'/>
      </form>
      <hr/>
        {!loading ? users.map((user, idx) => (
          <div key={idx}>
            <h3 style={{color: 'red'}}>{user.name.first} {user.name.last}</h3>
            <p>{user.email}</p>
            <hr/>
          </div>
        )): <Loading message="Loading..."/>}
    </div>
    );
  }
}

export default App;
