import React from 'react';

import {connect} from 'react-redux';
import Auth from "./components/auth";
import Admin from "./components/admin";

import './App.scss';

function App(props) {

    if (props.token === null)
        return (
            <Auth/>
        );
    else return (
        <Admin/>
    );
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        token: state.auth.token,
    }
};


export default connect(mapStateToProps, null)(App);

