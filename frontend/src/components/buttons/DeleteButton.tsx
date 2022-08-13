import React from "react";
import { TrashIcon } from "../../utils/Icons";

interface DeleteButtom {
    onClick(): void
}

export default function DeleteButtom(props: DeleteButtom) {
    const { onClick } = props
  return <button className="bg-transparent border-none rounded-full  hover:bg-white" onClick={_ => onClick()}><TrashIcon/></button>
}
