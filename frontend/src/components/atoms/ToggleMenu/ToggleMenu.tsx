import React, { ReactNode, useState }  from "react";

import "./ToggleMenu.sass"


interface IToggleMenuProps {
    title: React.ReactNode,
    children: React.ReactNode,
    onItemClickFunction: Function
}

export const ToggleMenu: React.FC<IToggleMenuProps> = ({ title, children, onItemClickFunction }) => {
    const [isOpen, setIsOpen] = useState(false)
    const onClick = () => {
        setIsOpen((prev) => !prev)
    }
    const onItemClick = (event: React.MouseEvent) => {
        onItemClickFunction(event)
        setIsOpen(false)
    }
    return (
        <div className="toggle-menu">
            <div className="toggle-menu__title" onClick={onClick}>{title}</div>
            <div className={`toggle-menu__items ${isOpen && 'toggle-menu__active'}`} onClick={onItemClick}>{children}</div>
         </div>
    )
}
