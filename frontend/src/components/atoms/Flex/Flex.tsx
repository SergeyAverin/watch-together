import React from "react";

interface IFlexProps {
    justifyContent: string,
    alignItems: string,
    flexDirection?:  "row" | "column",
    children: React.ReactNode
}

export const Flex: React.FC<IFlexProps> = ({ justifyContent, alignItems, flexDirection, children}) => {
    const style = {
        display: 'flex',
        justifyContent,
        alignItems,
        height: '100%',
        width: '100%',
        flexDirection,
      };
    return (
        <div style={style}>
            {children}
        </div>
    )
}

Flex.defaultProps = {
    flexDirection: 'row',
};
