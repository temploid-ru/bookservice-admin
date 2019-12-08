import React, {useState} from 'react';
import AdminHomeItem from "./item/";
import './admin-home.scss';
import AdminHomeEditWorkTime from "./edit-work-time";
import {connect} from 'react-redux';
import getDataFromServer, {updateCompanyInfo} from "./admin-home-container";
import Preloader from "../../preloader";

function AdminHome(props) {

    const [companyInfo, setCompanyInfo] = useState({});


    // because Object.entries(new Date()).length === 0;
    // we have to do some additional check
    if (Object.entries(companyInfo).length === 0 && companyInfo.constructor === Object) {

        getDataFromServer(props.token, setCompanyInfo);
        return <Preloader/>

    } else {
        return (
            <div className="admin-home">
                <h1>Общие настройки</h1>
                <div className="admin-home__items">

                    <AdminHomeItem title={"Название заведения"} value={companyInfo.name}
                                   changeHandler={value => updateCompanyInfo({...companyInfo, name:value},setCompanyInfo,props.token)}/>

                    <AdminHomeItem title={"Адрес заведения"} value={companyInfo.address}/>
                    <AdminHomeItem title={"Номер телефона"} value={companyInfo.phone}/>
                    <AdminHomeItem title={"Минимальное бронирование, час"} value={companyInfo.bookingDuration}/>

                    <AdminHomeEditWorkTime workTimeList={companyInfo.workdays}/>

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

export default connect(mapStateToProps, null)(AdminHome);
