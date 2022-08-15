import React from 'react'
import { CheckListIcon } from '../../utils/Icons'

interface CheckListButton {
    onClick(): void
}


export default function CheckListButton(props: CheckListButton) {
    const { onClick } = props
    return (
        <button onClick={_ => onClick()} className="rounded-full  hover:bg-white"><CheckListIcon/></button>
    )
}