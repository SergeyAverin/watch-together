import React from "react";

import { Flex, IconButton } from "@atoms/index";


import UserCountIcon from '@public/UserCountIcon.svg'


interface IUserCountProps {
    userCount: number
}

export const UserCount: React.FC<IUserCountProps> = ({ userCount }) => {
    return (
        <Flex alignItems="center" justifyContent="center" flexDirection="column">
            <IconButton icon={<UserCountIcon />} clickFunction={() => {}} />
            {userCount}
        </Flex>
    )
}
