import React from 'react'
import { EditIcon } from '../../utils/Icons'

interface EditButtom {
    onClick(): void
}


export default function EditButton(props: EditButtom) {
    const { onClick } = props
    return (
        <button onClick={_ => onClick()} className=" rounded-full hover:bg-white"><EditIcon/></button>
    )
}