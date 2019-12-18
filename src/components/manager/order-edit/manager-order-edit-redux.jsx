import moment from "moment";

export const mapStateToProps = (state, ownProps/*, ownProps*/) => {

    const activeDate = (ownProps.hasOwnProperty('match')) ? ownProps.match.params.date : moment().format('YYYY-MM-DD');

    const {orderId, tableId} = ownProps.match.params;

    let bookingInfo = state.bookingInfo[activeDate];

    if (bookingInfo === undefined) {
        bookingInfo = false;
    } else {
        bookingInfo = bookingInfo.filter(item => item.id === orderId)[0] || false;
    }

    return {
        activeDate,

        bookingDuration: state.info.companyInfo.bookingDuration,
        bookingInterval: state.info.companyInfo.bookingInterval,
        workTime: state.info.companyInfo.workdays,
        bookingInfo,
        showDate: state.showDate,
        token: state.auth.token,
        tablesList: state.info.tablesList,
        tableId,
    }
};
