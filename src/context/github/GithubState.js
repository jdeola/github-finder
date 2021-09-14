import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types';

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    };

    const [ state, dispatch ] = useReducer(GithubReducer, initialState);

    // Search User
    const searchUsers = async text => {
        // this.setState({ loading: true });
        setLoading();
    
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        
        // this.setState({ users: res.data.items, loading: false });
        dispatch({ 
            type: SEARCH_USERS,
            payload: res.data.items
        });
      };

    // Get user

    // Get repos

    // clear users

    // set loading
    const setLoading = () => {
        dispatch({ type: SET_LOADING });
    };

    return <GithubContext.Provider 
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers 
        }}
        > {props.children}

    </GithubContext.Provider>
};

export default GithubState;
