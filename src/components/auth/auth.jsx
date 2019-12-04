import React, {useState} from 'react';
import './auth.scss';
import {connect} from 'react-redux';
import {AUTH__SET_DATA} from "../../constants";

function Auth(props) {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

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
                         onClick={() => props.setToRedux({token: 'getToken'})}>Авторизоваться
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        setToRedux: payload => dispatch({type: AUTH__SET_DATA, payload})
    }
};

export default connect(null, mapDispatchToProps)(Auth);

