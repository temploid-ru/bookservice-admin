import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';

import './manager-search.scss';
import {ManagerSearchItem, SearchField} from "./manager-search-views";
import {searchOrders} from "./manager-search-container";
import moment from "moment";
import Preloader from "../../preloader/preloader";
import {getBookingInfo} from "../utils/utils";
import {BOOKING__SET_DATA} from "../../../constants/manager";

function ManagerSearch(props) {

    const [searchText, setSearchText] = useState('');

    const {bookingInfo} = props;

    //Если мы еще не получили данные из websocket (например когда обновили страницу)
    if (Object.keys(bookingInfo).length === 0 && bookingInfo.constructor === Object) {
        return <Preloader/>
    } else {
        // Если нет данных по текущему дню (данные из вэбсокета обновляются за 2 недели от текущего дня а мы запрашиваем данные по позавчерашнему дню)
        if (bookingInfo[props.activeDate] === undefined) {
            getBookingInfo(
                props.activeDate, //Активная дата на dashboard
                props.token, //token пользователя
                props.updateBookingInfo // dispatcher redux'а
            );
            return <Preloader/>
        } else {
            const items = searchOrders(
                searchText,
                bookingInfo[props.activeDate],
                props.tablesList
            );

            return (
                <div className="search">
                    <div className="search__request">
                        <SearchField value={searchText} onChange={value => setSearchText(value)}/>
                        <Link to="/manager/" className="search__cancel">Отмена</Link>
                    </div>

                    {
                        items.map(item => <ManagerSearchItem {...item} key={item.id}/>)
                    }

                </div>
            )
        }
    }
}


const mapStateToProps = (state, ownProps) => {

    const activeDate = (ownProps.hasOwnProperty('match')) ? ownProps.match.params.date : moment().format('YYYY-MM-DD');

    const tableId2Number = {};
    state.info.tablesList.map(table => tableId2Number[table.id] = table.number);

    return {
        activeDate: activeDate,
        bookingInfo: state.bookingInfo,
        tablesList: tableId2Number,
        token: state.auth.token,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateBookingInfo: payload => dispatch({type: BOOKING__SET_DATA, payload})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerSearch);
