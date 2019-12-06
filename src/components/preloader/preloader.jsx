import React from 'react';

import './preloader.scss';

export default function Preloader(){
    return (
        <div className="cssload-loader">
            <div className="cssload-inner cssload-one"/>
            <div className="cssload-inner cssload-two"/>
            <div className="cssload-inner cssload-three"/>
        </div>
    )
}
