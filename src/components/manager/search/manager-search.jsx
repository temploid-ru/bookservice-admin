import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';

import './manager-search.scss';
import {ManagerSearchItem, SearchField} from "./manager-search-views";
import {searchOrders} from "./manager-search-container";
import moment from "moment";

function ManagerSearch(props) {

    const [searchText, setSearchText] = useState('');

    const items = searchOrders(
        searchText,
        props.bookingInfo.itemsx[moment(props.activeDate).format('YYYY-MM-DD')],
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

const mapStateToProps = (state /*, ownProps*/) => {

    const tableId2Number = {};
    state.info.tablesList.map(table => tableId2Number[table.id] = table.number);

    return {
        bookingInfo: state.bookingInfo,
        activeDate: state.showDate.activeDate,
        tablesList: tableId2Number,
    }
};

export default connect(mapStateToProps, null)(ManagerSearch);
