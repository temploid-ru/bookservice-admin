import React from 'react';
import {WEBSOKET_PONT} from "../../../constants";
import Preloader from "../../preloader";
import {connect} from 'react-redux';
import {BOOKING__SET_DATA} from "../../../constants/manager";
import ManagerRouter from "../router/manager-router";

/**
 * Подключаем вэбсокеты чтобы слушать заказы на бронь
 */
class ManagerWebsocket extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ws: null,
        };
    }

    // single websocket instance for the own application and constantly trying to reconnect.

    componentDidMount() {
        this.connect();
    }

    timeout = 250; // Initial timeout duration as a class variable

    /**
     * @function connect
     * This function establishes the connect with the websocket and also ensures constant reconnection if connection closes
     */
    connect = () => {
        var ws = new WebSocket(WEBSOKET_PONT);
        let that = this; // cache the this
        var connectInterval;

        // websocket onopen event listener
        ws.onopen = () => {
            // console.log("connected websocket main component");

            this.setState({ws: ws});

            ws.send(JSON.stringify({
                method: "authorize",
                args: this.props.token
            }));

            that.timeout = 250; // reset timer to 250 on open of websocket connection
            clearTimeout(connectInterval); // clear Interval on on open of websocket connection
        };

        ws.onmessage = evt => {
            // listen to data sent from the websocket server
            const message = JSON.parse(evt.data);
            // console.log('message',message);
            if (message.kind === "BookingStateMessage" ) this.props.setToRedux(message.itemsx)
        }

        // websocket onclose event listener
        ws.onclose = e => {
            console.log(
                `Socket is closed. Reconnect will be attempted in ${Math.min(
                    10000 / 1000,
                    (that.timeout + that.timeout) / 1000
                )} second.`,
                e.reason
            );

            that.timeout = that.timeout + that.timeout; //increment retry interval
            connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
        };

        // websocket onerror event listener
        ws.onerror = err => {
            console.error(
                "Socket encountered error: ",
                err.message,
                "Closing socket"
            );

            ws.close();
        };
    };

    /**
     * utilited by the @function connect to check if the connection is close, if so attempts to reconnect
     */
    check = () => {
        const {ws} = this.state;
        if (!ws || ws.readyState === WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
    };


    render() {
        if (this.props.bookingInfo === null) {
            return <Preloader/>
        } else {
            return <ManagerRouter/>
        }
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        token: state.auth.token,
        bookingInfo:state.bookingInfo
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setToRedux: payload => dispatch({type: BOOKING__SET_DATA, payload})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerWebsocket);
