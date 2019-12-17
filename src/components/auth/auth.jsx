import React, {useState} from 'react';
import './auth.scss';
import {connect} from 'react-redux';
import {API_POINT, AUTH__SET_DATA} from "../../constants";

function Auth(props) {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const token = sessionStorage.getItem('token');
    if (token !== null) props.setToRedux(JSON.parse(token));

    return (
        <div className="auth">
            <div className="auth__container">
                <div className="auth__title">Авторизация</div>
                <div className="auth__body">
                    <div className="auth__form-control">
                        <input type="text" placeholder="Логин" value={login} onChange={e => setLogin(e.target.value)}/>
                    </div>
                    <div className="auth__form-control">
                        <input type="password" placeholder="Пароль" value={password}
                               onChange={e => setPassword(e.target.value)}/>
                    </div>
                </div>
                <div className="auth__submit">
                    <div className="btn btn--primary-color btn--block" role="button"
                         onClick={() => authInServer({login,password}, props.setToRedux)}>Авторизоваться
                    </div>
                </div>
            </div>

            {/*<div>supadmin</div>*/}
            {/*<div>MOOp+pjA4P9K</div>*/}

        </div>
    )
}

function authInServer(body,dispatchAction){
    body['method'] = 'authorize';
    fetch(API_POINT , {method: 'post', body: JSON.stringify(body)})
        .then(res => res.json()).then(json => saveAuthdata(json,dispatchAction));
}

function saveAuthdata(json, dispatchAction) {
    setDataInLocal(json);

    dispatchAction(json);
}

function setDataInLocal(json){
    sessionStorage.setItem('token', JSON.stringify(json));
}

const mapDispatchToProps = dispatch => {
    return {
        setToRedux: payload => dispatch({type: AUTH__SET_DATA, payload})
    }
};

export default connect(null, mapDispatchToProps)(Auth);

