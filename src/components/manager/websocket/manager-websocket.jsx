import React from 'react';
import {WEBSOKET_PONT} from "../../../constants";
import ManagerDashboard from "../dashboard/";
import Preloader from "../../preloader";

/**
 * Подключаем вэбсокеты чтобы слушать заказы на бронь
 */
export default class ManagerWebsocket extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ws: null,
            bookingInfo: null
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

            if (message.items !== undefined) this.setState({bookingInfo: message.items})
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
        if (!ws || ws.readyState == WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
    };

    render() {
        if (this.state.bookingInfo === null) {
            return <Preloader/>
        } else {
            return <ManagerDashboard {...this.props} bookingInfo={this.state.bookingInfo}/>
        }
    }

}
