import React from 'react';
import style from './Loading2.module.css'

export default function Loading2 () {

    return (
        <div className={style.center}>
            <div className={style.ring}> </div>
            <span> Loading ... </span>
        </div>
    )

}