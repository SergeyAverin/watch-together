import React from "react";

import './Center.sass'


interface ICenterProps {
    children: React.ReactNode
}

export const Center: React.FC<ICenterProps> = ({ children }) => {
    return (
        <div className="center">
            { children }
        </div>
    )
}
