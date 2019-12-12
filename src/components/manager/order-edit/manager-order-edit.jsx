import React from 'react';
import {Link} from 'react-router-dom';

function ManagerOrderEdit() {
    return(
        <div>
            ManagerNewOrder
            <Link to={"/manager/"}>Отмена</Link>
        </div>
    )
}

export default ManagerOrderEdit;
