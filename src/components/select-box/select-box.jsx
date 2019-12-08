import React, {useState} from 'react';

export default function SelectBox(props) {

    const [value, setValue] = useState(props.currentValue);

    function changeHandler(value) {
        setValue(value);
    }

    return (
        <select name={props.name} id={props.id} value={value} disabled={props.disabled}
                onChange={e => changeHandler(e.target.value)}>
            { props.values.map(value => <option value={value} key={value}>{value}</option>)}
        </select>
    )
}

