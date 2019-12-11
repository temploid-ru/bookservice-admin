import React from 'react';
import {SvgSearch} from "../../../assets/svg";

export function SearchField(props) {
    return (
        <div className="search-field">
            <div className="search-field__icon"><SvgSearch/></div>
            <input type="text"
                   autoFocus={true}
                   value={props.value}
                   onChange={e => props.onChange(e.target.value)}
            />
        </div>
    )
}


export function ManagerSearchItem(props) {

    const button = props.buttonText ? <div className="search-item__button">{props.buttonText}</div> : null;

    return (
        <div className={"search-item " + props.statusClass}>
            <div className="search-item__status">{props.statusText}</div>
            <div className="search-item__name">{props.name}</div>
            <div className="search-item__phone">{props.phone}</div>
            <div className="search-item__row">
                <div className="search-item__date">{props.timeText}</div>
                <div className={"search-item__deposit " + props.depositClass}>{props.depositText}</div>
            </div>
            {button}

        </div>
    )
}


