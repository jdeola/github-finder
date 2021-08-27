import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import './App.css';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Search Github users
  const searchUsers = async text => {
    // this.setState({ loading: true });
    setLoading(true);

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    // this.setState({ users: res.data.items, loading: false });
    setUsers(res.data.items);
    setLoading(false);
  };
  
  // Get a single user
  const getUser = async (username) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    setUser(res.data);
    setLoading(false);
  };

  // Get users Repos
  const getUserRepos = async (username) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:ascending&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    setRepos(res.data)
    setLoading(false);
  };

  // clear users from state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };
    
  // Set Alert
  const showAlert = (msg, type) => {
    setAlert({ msg, type }); 
      // note: shorthand for {msg: msg, type: type}
    setTimeout(() => setAlert(null), 5000); 
      // note: could also have 'x' button and click event to clear
  };

    return (
      <Router>
        <div className="App">
          <nav className="App">
            <Navbar />
            <div className="container">
              <Alert alert={alert}/>
              <Switch>
                <Route 
                  exact
                  path='/' 
                  render={props => (
                    <Fragment>
                      <Search 
                        searchUsers={searchUsers} 
                        clearUsers={clearUsers}
                        showClear={users.length > 0 ? true: false }
                        setAlert={showAlert}
                      />
                      <Users loading={loading} users={users} />
                    </Fragment>
                  )}  
                />
                <Route 
                  exact 
                  path='/about'
                  component={About}
                />
                <Route 
                  exact 
                  path='/user/:login'
                  render={props => (
                    <User 
                    { ...props } 
                    getUser={getUser}
                    getUserRepos={getUserRepos} 
                    user={user}
                    repos={repos}
                    loading={loading} 
                    />
                  )}
                />
              </Switch>

            </div>
          </nav>
        </div>
      </Router>
    );

}

export default App;
