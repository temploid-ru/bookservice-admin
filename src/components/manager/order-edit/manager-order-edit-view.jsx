import React, {useState} from 'react';
import moment from "moment";
import {declOfNum} from "../utils/utils";
import {SvgDelete, SvgSelectBoxArrow} from "../../../assets/svg";

/**
 * Календарь дат
 *
 * @param props
 * @return {*}
 * @constructor
 */
export function OrderDate(props) {

    console.log('props.orderDate',props);

    const orderDate = moment(props.orderDate).startOf('day').format();

    const currentDayText = 'Сегодня • ' + moment(props.currentDate).format('DD MMM, dddd');

    return (
        <div className="order-date">
            <div className="order-date__head">
                <div className="order-date__title">Дата</div>
                <div className="order-date__current-date">{currentDayText}</div>
            </div>
            <ul className="order-date__body">
                {
                    props.items.map((item, index) => {
                        const isCurrentDate = (item.value === orderDate) ? 'is-active' : '';
                        return (
                            <li key={index} className={isCurrentDate} onClick={() => props.updateHandler(item.value)}>
                                <span>{item.title}</span></li>)
                    })
                }

            </ul>

        </div>
    )
}

/**
 * Вывод времени
 *
 * @param props
 * @return {*}
 * @constructor
 */
export function OrderTime(props) {
    return (
        <div className="order-time">
            <div className="order-time__title">Время</div>
            <ul>
                {props.workTime.map(item => {

                    const event = item.active === '' ? (value) => props.updateHandler(value) : null;

                    const isActive = item.value === props.value ? 'is-active' : '';

                    return <li className={item.active + ' ' + isActive} key={item.value}
                               onClick={() => event(item.value)}><span>{item.title}</span></li>
                })}
            </ul>
        </div>
    )
}

export function OrderGuestCounter(props) {

    const countGuestText = props.countGuests + declOfNum(props.countGuests, [" гость", ' гостя', ' гостей']);

    function updateValue(value) {
        value = value === 0 ? 1 : value;

        props.updateHandler(value);
    }

    return (
        <div className="order-guest-counter">
            <div className="order-guest-counter__value">{countGuestText}</div>
            <div className="order-guest-counter__buttons">
                <div className="order-guest-counter__btn dec"
                     onClick={() => updateValue(props.countGuests - 1)}/>
                <div className="order-guest-counter__btn inc"
                     onClick={() => updateValue(props.countGuests + 1)}/>
            </div>
        </div>
    )
}

export function OrderDuration(props) {

    const [isOpened, setIsOpened] = useState(false);

    const isOpenedClass = (isOpened) ? "is-opened" : '';
    let durationText = props.duration / 3600;
    durationText = durationText + declOfNum(durationText, [' час', ' часа', ' часов']);

    const variants = [
        {title: "2 часа", value: 2 * 3600},
        {title: "3 часа", value: 3 * 3600},
        {title: "4 часа", value: 4 * 3600},
        {title: "5 часов", value: 5 * 3600},
        {title: "6 часов", value: 6 * 3600},
        {title: "7 часов", value: 7 * 3600},
    ];

    return (
        <div className="order-duration">
            <div className="order-duration__title">Длительность</div>
            <div className={"order-duration__select-box select-box " + isOpenedClass}>
                <div className="select-box__current" onClick={() => setIsOpened(!isOpened)}>
                    <div className="select-box__value">{durationText}</div>
                    <div className="select-box__arrow"><SvgSelectBoxArrow/></div>
                </div>
                <ul className="select-box__values">
                    {
                        variants.map(item => (item.value === props.duration)
                            ? null
                            : <li key={item.title} onClick={() => props.updateHandler(item.value)}>
                                {item.title}
                            </li>)
                    }
                </ul>
            </div>
        </div>
    )
}

export function OrderTableSelect(props) {

    const tableNumber = true;

    if (tableNumber === false) {

        const available = '2 свободно';
        const selected = 'Добавить столик ';

        return (
            <div className="order-table-select">
                <div className="order-table-select__header">
                    <div className="order-table-select__title">Столик</div>
                    <div className="order-table-select__available">{available}</div>
                </div>
                <div className="order-table-select__body">
                    <div className="order-table-select__button"/>
                    <div className="order-table-select__button-text">Добавить столик</div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="order-table-select">
                <div className="order-table-select__header">
                    <div className="order-table-select__title">Столик</div>
                    <div className="order-table-select__сurrent-table">22</div>
                </div>
                <div className="order-table-select__body-choose">
                    <div className="order-table-select__number">22 cтолик</div>
                    <div className="order-table-select__edit">Изменить</div>
                    <div className="order-table-select__delete"><SvgDelete/></div>
                </div>
            </div>
        )
    }
}

export function OrderClientInfo(props) {
    return (
        <div className="order-client-info">
            <div className="order-client-info__title">Клиент</div>
            <div className="order-client-info__body">
                <input type="text" value={props.clientName} onChange={e => props.setName(e.target.value)}/>
                <input type="text" value={props.clientPhone} onChange={e => props.setPhone(e.target.value)}/>
            </div>
        </div>
    )
}

export function OrderDeposit(props) {
    return (
        <div className='order-deposit'>
            <div className="order-deposit__title">Депозит</div>
            <div className="order-deposit__body">
                <input type="text" value={props.deposit} onChange={e => props.updateHandler(e.target.value)}/>
                <div className="order-deposit__icon">₽</div>
            </div>
        </div>
    )
}

export function OrderComment(props) {
    return (
        <div className='order-comment'>
            <div className="order-comment__title">Комментарий к брони</div>
            <div className="order-comment__body">
                <textarea type="text" value={props.comment} onChange={e => props.updateHandler(e.target.value)}/>
            </div>
        </div>
    )
}
