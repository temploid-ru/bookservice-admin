import React from 'react';
import {SvgCalendar, SvgLeftAngle, SvgRightAngle, SvgSearch} from "../../../assets/svg";
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
        <table>
            <thead>
            <tr>
                <th></th>
                {
                    props.tHead.items.map( (value, index)=><th colSpan={props.tHead.colSpan} key={index}>{value}</th>)
                }
            </tr>
            </thead>
            <tbody>
                {props.tables.map( table => <tr key={table.name}>
                    {table.cells.map(cell=><td key={cell.id} />)}
                </tr>)}
            </tbody>
        </table>
    )
}

export function NewOrder() {
    return (
        <div className="new-order">
            <Link to={"/manager/new-order/"} className="new-order__button"/>
        </div>
    )
}
