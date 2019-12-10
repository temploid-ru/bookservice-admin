import React from 'react';

import {connect} from 'react-redux';
import Auth from "./components/auth";

import './App.scss';
import ProjectsRouter from "./components/projects-router";

function App(props) {

    if (props.token === null)
        return (
            <Auth/>
        );
    else return (
        <ProjectsRouter/>
    );
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        token: state.auth.token,
    }
};


export default connect(mapStateToProps, null)(App);

