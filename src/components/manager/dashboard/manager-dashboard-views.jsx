import React from 'react';
import {SvgCalendar, SvgGuest, SvgLeftAngle, SvgRightAngle, SvgSearch} from "../../../assets/svg";
import {Link} from "react-router-dom";
import moment from "moment";

export function SearchButton(props) {
    return (
        <Link to={"/manager/search/"+props.activeDate + '/'} className="search-button">
            <div className="search-button__icon"><SvgSearch/></div>
            <div className="search-button__text">Поиск брони</div>
        </Link>
    )
}

export function Calendar(props) {
    const m = moment(props.activeDate);
    const prevLink = '/manager/dashboard/' + m.clone().add(-1, 'd').format('YYYY-MM-DD') + '/';
    const nextLink = '/manager/dashboard/' + m.clone().add(1, 'd').format('YYYY-MM-DD') + '/';

    let dayText = '';

    dayText += (m.format() === props.currentDate) ? 'Сегодня • ' : '';
    dayText += m.format('DD MMM, ddd');

    return (
        <div className="calendar">
            <Link to={prevLink} className="calendar__button">
                <div className="calendar__icon"><SvgLeftAngle/></div>
            </Link>
            <div className="calendar__body">
                <div className="calendar__text">{dayText}</div>
                <div className="calendar__icon"><SvgCalendar/></div>
            </div>
            <Link to={nextLink} className="calendar__button">
                <div className="calendar__icon"><SvgRightAngle/></div>
            </Link>
        </div>
    )
}

export function TableGrid(props) {
    return (
        <table className="dashboard">
            {/*<thead>*/}
            {/*<tr>*/}
            {/*    <th></th>*/}
            {/*    {*/}
            {/*        props.tHead.items.map( (value, index)=><th colSpan={props.tHead.colSpan} key={index}>{value}</th>)*/}
            {/*    }*/}
            {/*</tr>*/}
            {/*</thead>*/}
            <tbody>
            {
                props.items.map(item => <TableGridRow key={item.tableId} activeDate={props.activeDate} {...item}/>)
            }
            </tbody>
        </table>
    )
}

export function TableGridRow(props) {

    const cells = [];

    for (let cellId in props.cells) {
        cells.push(<TableGridCell key={cellId} activeDate={props.activeDate} {...props.cells[cellId]}/>);
    }

    return (
        <tr>
            <td className="table-number">{props.tableNumber}</td>
            {cells}
        </tr>
    )
}

export function TableGridCell(props) {

    const info = {};

    info.colSpan = (props.gridSpan !== undefined) ? props.gridSpan : 1;

    if (props.bookingInfo !== undefined) {
        // TODO Артур что-то нахимичил со статусами. ставим пока костыль, блин
        if (props.bookingInfo.status.status !== undefined) props.bookingInfo.status = props.bookingInfo.status.status;

        switch (props.bookingInfo.status) {
            case 'booked':
                info.statusClass = 'status--booked';
                break;
            case 'locked':
                info.statusClass = 'status--locked';
                break;
            case 'arrived':
                info.statusClass = 'status--arrived';
                break;
            default:
        }

        info.bookedText = props.bookingInfo.numGuests;

        info.body = <Link to={"/manager/order-info/" + props.activeDate + "/" + props.bookingInfo.id}
                          className={"gantt " + info.statusClass}>
            <div className="gantt__icon"><SvgGuest/></div>
            <div className="gantt__text">{info.bookedText}</div>
        </Link>
    } else {
        info.body = null;
    }

    return (
        <td colSpan={info.colSpan}>{info.body}</td>
    )
}

export function NewOrder() {
    return (
        <div className="new-order">
            <Link to={"/manager/order-edit/"} className="new-order__button"/>
        </div>
    )
}
