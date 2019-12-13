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

                    <AdminHomeItem title={"Адрес заведения"} value={companyInfo.address}
                                   changeHandler={value => updateCompanyInfo({...companyInfo, address:value},setCompanyInfo,props.token)}
                    />
                    <AdminHomeItem title={"Номер телефона"} value={companyInfo.phone}
                                   changeHandler={value => updateCompanyInfo({...companyInfo, phone:value},setCompanyInfo,props.token)}
                    />
                    <AdminHomeItem title={"Минимальное бронирование, час"} value={companyInfo.bookingDuration}
                                   changeHandler={value => updateCompanyInfo({...companyInfo, bookingDuration: +value},setCompanyInfo,props.token)}
                    />

                    <AdminHomeEditWorkTime workTimeList={companyInfo.workdays} updateWorkTime={value => updateCompanyInfo({...companyInfo,workdays:value},setCompanyInfo,props.token)}/>

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
