export function getTableGrid (){

    const stepInHour = 2;

    const arHours = ["11:00","11:00","11:00","11:00","11:00","11:00","11:00","11:00","11:00","11:00","11:00","11:00","11:00","11:00","11:00","11:00",];

    const arItables = [];

    for (let table=1;table <=60; table++){
        const obTable = {name: table};
        const cells = [];
        for (let i=0; i < arHours.length * stepInHour; i++) {
            cells.push({id:table + "_" + i});
        }
        obTable.cells = cells;

        arItables.push(obTable);
    }

    return {
        tHead: {
            items: arHours ,
            colSpan: stepInHour,
        },
        tables: arItables
    }
}

