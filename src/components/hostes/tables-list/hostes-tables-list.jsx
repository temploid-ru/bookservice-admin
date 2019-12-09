import React from 'react';

import './hostes-tables-list.scss';

export default function HostesTablesList(props) {
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
                props.tablesList.map(table => <tr key={table.id}>
                    <td >{table.number}</td>
                    {
                        props.workTimeGrid.map(cell => <td key={cell.title} onClick={()=>props.onCellClick({tableId:table.id,cell})}/>)
                    }
                </tr>)
            }
            </tbody>
        </table>
    )

}
