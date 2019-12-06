import React from 'react';
import AdminHomeItem from "./item/";
import './admin-home.scss';
import AdminHomeEditWorkTime from "./edit-work-time";


function AdminHome() {

    const items = [
        {title: "Название заведения", value: "Тестовый текст"},
        {title: "Адрес заведения", value: "Тестовый текст"},
        {title: "Номер телефона", value: "Тестовый текст"},
        {title: "Минимальное бронирование, час", value: "Тестовый текст"},
    ];

    return (
        <div className="admin-home">
            <h1>Общие настройки</h1>
            <div className="admin-home__items">
                {
                    items.map((item, key) => {
                        let result;
                        switch (item.componentName) {
                            // case 'rengePicker':
                            //     const a= 'a';
                            //     break;
                            case "datePicker":
                                break;
                            default :
                                result = <AdminHomeItem key={key} {...item}/>
                        }
                        return result
                    })
                }

                <AdminHomeEditWorkTime/>

            </div>
        </div>
    )
}

export default AdminHome;
