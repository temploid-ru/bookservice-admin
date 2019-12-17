import moment from "moment";

export const mapStateToProps = (state, ownProps/*, ownProps*/) => {

    const {orderId, tableId} = ownProps.match.params;

    const currentDate = moment(state.showDate.activeDate).format("YYYY-MM-DD");

    let bookingInfo = state.bookingInfo.itemsx[currentDate];
    bookingInfo = bookingInfo.filter(item => item.id === orderId)[0] || false;

    return {
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
