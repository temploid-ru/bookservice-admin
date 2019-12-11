import React from 'react';
import {Link} from 'react-router-dom';

function ManagerNewOrder() {
    return(
        <div>
            ManagerNewOrder
            <Link to={"/manager/"}>Отмена</Link>
        </div>
    )
}

export default ManagerNewOrder;
