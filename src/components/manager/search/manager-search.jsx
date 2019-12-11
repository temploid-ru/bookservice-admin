import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';

import './manager-search.scss';
import {ManagerSearchItem, SearchField} from "./manager-search-views";
import {searchOrders} from "./manager-search-container";

function ManagerSearch(props) {

    const [searchText, setSearchText] = useState('e');

    const items = searchOrders(searchText,props.bookingInfo);

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
    return {
        bookingInfo: state.bookingInfo,
    }
};

export default connect(mapStateToProps,null)(ManagerSearch);
