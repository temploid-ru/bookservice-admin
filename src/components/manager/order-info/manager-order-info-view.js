import React from 'react';
import moment from "moment";
import {SvgDelete, SvgEdit, SvgOk} from "../../../assets/svg";
import {Link} from "react-router-dom";
import {deleteOrder, updateState} from "./manager-order-info-controller";

export function ManagerOrderInfoButtons(props) {

    if (moment(props.activeDate).format() >= props.currentDate) {

        const buttons = [];

        // Кнопка редактирования
        buttons.push(
            <Link to={"/manager/order-edit/" + props.activeDate + "/" + props.tableId + "/" + props.orderId} key="edit"
                  className="order-info__btn">
                <div className="order-info__icon"><SvgEdit/></div>
                <div className="order-info__text">Изменить</div>
            </Link>
        );

        if (props.nextStatus) {
            buttons.push(
                <div className="order-info__btn order-info__status-color" key='changeStatus'
                     onClick={() => updateState(props.orderId, props.nextStatus, props.token)}>
                    <div className="order-info__icon"><SvgOk/></div>
                    <div className="order-info__text">{props.buttonText}</div>
                </div>
            );
        }


        // Кнопка Удаления
        buttons.push(
            <div className="order-info__btn" key="delete">
                <div className="order-info__icon"><SvgDelete/></div>
                <div className="order-info__text"
                     onClick={() => deleteOrder(props.orderId, props.token)}>Удалить
                </div>
            </div>
        );

        const countButtons = buttons.length;

        return (
            <div className={"order-info__footer-block grid-" + countButtons}>
                {buttons}
            </div>
        )
    } else {
        return (null)
    }
}
