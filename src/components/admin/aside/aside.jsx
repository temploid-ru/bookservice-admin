import React, {useState} from 'react';
import {Link} from "react-router-dom";

import './aside.scss';
import {SvgClose, SvgMenu} from "../../../assets/svg";

function AdminAside() {

    const [mobileOpenClass, setMobileOpenClass] = useState('');

    const button = mobileOpenClass === '' ? <SvgMenu/> : <SvgClose/>;

    return (
        <aside className={"aside " + mobileOpenClass}>
            <div className="aside__button"
                 onClick={() => setMobileOpenClass(mobileOpenClass === '' ? 'is-mobile-opened' : '')}>{button}</div>
            <div className="aside__container">
                <div className="aside__title">Панель навигации</div>
                <ul className="aside__menu">
                    <li><Link to="/">Главная</Link></li>
                    <li><Link to="/edit-tables">Редактирование столов</Link></li>
                    <li><br/><br/><br/><br/></li>
                    <li><a href="https://api.domoed.su:65480/mdDocs" target="_blank" rel="noopener noreferrer">Доки от методов (чтобы под рукой были)</a></li>
                </ul>
            </div>
        </aside>
    )
}

export default AdminAside;

