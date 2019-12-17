export const getFilterVariants = (tablesList) => {

    const groups = {};

    tablesList.map(table => groups[table.number_of_persons] = true);

    const result = [];

    for (let key in groups){
        result.push(+key);
    }

    return result;
}
