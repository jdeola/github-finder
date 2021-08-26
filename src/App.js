import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';

import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
  };

  async componentDidMount() {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users?
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    this.setState({ users: res.data, loading: false });
  };

  // Search Github users
  searchUsers = async text => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    this.setState({ users: res.data.items, loading: false });
  };
  
  // clear users from state
  clearUsers = () => this.setState({ users: [], loading: false });
  
  // Set Alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } }) 
      // note: shorthand for {msg: msg, type: type}

    setTimeout(() => this.setState({ alert: null }), 5000); 
      // note: could also have 'x' button and click event to clear
  };

  render() {

    const {users, loading, alert} = this.state;

    return (
      <div className="App">
        <nav className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert}/>
            <Search 
              searchUsers={this.searchUsers} 
              clearUsers={this.clearUsers}
              showClear={users.length > 0 ? true: false }
              setAlert={this.setAlert}
            />
            <Users loading={loading} users={users}/>
          </div>
        </nav>
      </div>
    );
  }
}

export default App;
