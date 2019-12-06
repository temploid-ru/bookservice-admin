import React, {useState} from 'react';
import AdminEditTablesItem from './item';
import {connect} from 'react-redux';

import './admin-edit-tables.scss';
import Preloader from "../../preloader";

import getDataFromServer from "./admin-edit-tables-container";

function AdminEditTables(props) {



    const [tablesList, setTablesList] = useState([]);

    if (tablesList.length === 0) {

        getDataFromServer(props.token,setTablesList);

        return (<Preloader/>)
    } else {
        return (
            <div className="admin-edit-tables">
                <h1>Редактирование столиков</h1>
                <div className="admin-edit-tables__content">
                    <div className="admin-edit-tables__header aet-row">
                        <div className="aet-row__table-number">Номер столика</div>
                        <div className="aet-row__table-name">Название столика</div>
                        <div className="aet-row__guests-count">Кол-во гостей</div>
                        <div className="aet-row__deposit-count">Депозит столика</div>
                        <div className="aet-row__photos disabled">Фотографии</div>
                        <div className="aet-row__edit"/>
                    </div>
                    <div className="admin-edit-tables__items">
                        {
                            tablesList.map((item, key) => <AdminEditTablesItem key={item.id} token={props.token} table={item} idKey={key}/>)
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        token: state.auth.token,
    }
};

export default connect(mapStateToProps, null)(AdminEditTables);
