import React from 'react';
import {SvgGuest} from "../../../../assets/svg";
import {declOfNum} from "../../utils/utils";
import {getFilterVariants} from "./manager-order-edit-table-list-container";

export function OrderTablesListTabs(props) {

    const items = ["Список", "Карта"];

    return (
        <ul className="order-table-list-tabs">
            {
                items.map((item, index) => {
                    const isActive = index === props.activeTab ? 'is-active' : '';
                    return <li className={isActive} key={item} onClick={() => props.setActiveTab(index)}>{item}</li>
                })
            }
        </ul>
    )
}

export function OrderTablesListFilter(props) {

    const isActive = props.current === false ? 'is-active' : '';

    const filterVariants = getFilterVariants(props.tablesList);

    return (
        <ul className="order-table-list-filter">
            <li className={isActive} onClick={() => props.setFilter(false)} key="defaultValue">Все</li>
            {
                filterVariants.map(item => {
                    const isActive = props.current === item ? "is-active" : "";

                    return <li className={isActive} key={item} onClick={() => props.setFilter(item)}>
                        <div className="order-table-list-filter__icon"><SvgGuest/></div>
                        <div className="order-table-list-filter__value">{item}</div>
                    </li>
                })
            }
        </ul>
    )
}

export function OrderTablesListItems(props) {

    return (
        <ul className="order-table-list-items">
            {
                props.tablesList.map(item => {

                    const deposit = {};

                    if (item.default_deposit === 0) {
                        deposit.class = 'is-free';
                        deposit.text = 'Без депозита';
                    } else {
                        deposit.class = '';
                        deposit.text = item.default_deposit + ' ₽';
                    }

                    const guestText = item.number_of_persons + declOfNum(item.number_of_persons, [" гость", " гостя", " гостей"]);

                    return (
                        <li key={item.id} onClick={()=>props.setTable(item.id)}>
                            <div className="order-table-list-items__table-number">{item.number}</div>
                            <div className="order-table-list-items__count-persons">{guestText}</div>
                            <div className={"order-table-list-items__deposit " + deposit.class}>{deposit.text}</div>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export function OrderTablesListMap(props) {
    return (
        <div>MAP</div>
    )
}
