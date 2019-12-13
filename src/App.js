import React from 'react';

import {connect} from 'react-redux';
import Auth from "./components/auth";

import './App.scss';
import ProjectsRouter from "./components/projects-router";

// ставим локаль moment.js для всего проекта
import 'moment/locale/ru';
import moment from "moment";

function App(props) {
    // ставим локаль moment.js для всего проекта
    moment.locale('ru');

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

