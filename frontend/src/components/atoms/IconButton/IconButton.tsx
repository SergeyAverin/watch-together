import React from "react";

import './IconButton.sass'

interface IIconButtonProps {
    icon: React.ReactNode,
    clickFunction: Function
}


export  const IconButton: React.FC<IIconButtonProps> = ({ icon, clickFunction }) => {
    return (
        <div className="icon-button" onClick={() => clickFunction()}>
            {icon}
        </div>
    )
}
