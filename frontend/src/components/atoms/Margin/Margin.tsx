import React from "react";

interface IMarginProps {
    marginLeft?: string,
    marginTop?: string,
    marginRight?: string,
    marginBottom?: string,
    children: React.ReactNode
}

export const Margin: React.FC<IMarginProps> = ({ marginTop, marginRight, marginBottom, marginLeft, children }) => {
    const style = {
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
      };

    return (
        <div style={style}>
            { children }
        </div>
    )
}

Margin.defaultProps = {
    marginLeft: '0px',
    marginTop: '0px',
    marginRight: '0px',
    marginBottom: '0px',
}
