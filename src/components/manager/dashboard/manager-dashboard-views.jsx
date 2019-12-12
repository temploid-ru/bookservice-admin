import React from 'react';
import {SvgCalendar, SvgGuest, SvgLeftAngle, SvgRightAngle, SvgSearch} from "../../../assets/svg";
import {Link} from "react-router-dom";

export function SearchButton() {
    return (
        <Link to="/manager/search/" className="search-button">
            <div className="search-button__icon"><SvgSearch/></div>
            <div className="search-button__text">Поиск брони</div>
        </Link>
    )
}

export function Calendar(props) {
    return (
        <div className="calendar">
            <div className="calendar__button" onClick={() => props.changeDay(-1)}>
                <div className="calendar__icon"><SvgLeftAngle/></div>
            </div>
            <div className="calendar__body">
                <div className="calendar__text">{props.text}</div>
                <div className="calendar__icon"><SvgCalendar/></div>
            </div>
            <div className="calendar__button" onClick={() => props.changeDay(1)}>
                <div className="calendar__icon"><SvgRightAngle/></div>
            </div>
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
                props.items.map(item => <TableGridRow key={item.tableId} {...item}/>)
            }
            </tbody>
        </table>
    )
}

export function TableGridRow(props) {

    const cells = [];

    for (let cellId in props.cells) {
        cells.push(<TableGridCell key={cellId} {...props.cells[cellId]}/>);
    }

    return (
        <tr>
            <td>{props.tableNumber}</td>
            {cells}
        </tr>
    )
}

export function TableGridCell(props) {

    const info = {};


    info.colSpan = (props.gridSpan !== undefined) ? props.gridSpan : 1;


    if (props.bookingInfo !== undefined) {

        switch (props.bookingInfo.status) {
            case 'booked':
                info.statusClass='status--booked';
                break;
            case 'locked':
                info.statusClass='status--locked';
                break;
            case 'arrived':
                info.statusClass='status--arrived';
                break;
            default:
        }

        info.bookedText = props.bookingInfo.numGuests;

        info.body = <div className={"gantt " + info.statusClass}>
            <div className="gantt__icon"><SvgGuest/></div>
            <div className="gantt__text">{info.bookedText}</div>
        </div>
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
            <Link to={"/manager/new-order/"} className="new-order__button"/>
        </div>
    )
}
