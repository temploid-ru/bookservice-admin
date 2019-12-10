import React from 'react';

import './hostes-tables-list.scss';
import moment from "moment";

export default function HostesTablesList(props) {

    console.log('HostesTablesList', props);

    return (
        <table className="hostes-tables">
            <thead>
            <tr className="hostes-tables__header">
                <th/>
                {
                    props.workTimeGrid.map(cell => <th key={cell.title}>{cell.title}</th>)
                }
            </tr>
            </thead>
            <tbody>
            {
                props.tablesList.map(table => {
                    const booking = props.bookingInfo[table.id];
                    return <tr key={table.id}>
                        <td>{table.number}</td>
                        {
                            props.workTimeGrid.map(cell => {
                                let ganttClass = ''; // Класс для отрисовки диаграммы ганта
                                let bookingId = false; // id брони

                                if (booking !== undefined) {
                                    for (let id in booking) {
                                        const bookingItem = booking[id];
                                        if (cell.value >= bookingItem.startTime && cell.value <bookingItem.endTime){
                                            ganttClass += 'gantt gantt--booking';
                                            bookingId = id;
                                        }
                                    }
                                }

                                return <td key={cell.title}
                                           className={ganttClass}
                                           onClick={() => props.onCellClick({tableId: table.id, cell, bookingId})}/>
                            })
                        }
                    </tr>
                })
            }

            </tbody>
        </table>
    )

}
