import React from "react";
import { InfoIcon } from "../../utils/Icons";

interface InfoButtom {
    onClick(): void
}

export default function InfoButton(props: InfoButtom) {
    const { onClick } = props
  return <button className="bg-transparent border-none rounded-full  hover:bg-white" onClick={_ => onClick()}><InfoIcon/></button>
}
