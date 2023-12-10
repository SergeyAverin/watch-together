import React from "react";

import { Flex, IconButton } from "@atoms/index";
import { useSelector } from "react-redux";

import { usersCountSelector } from "@redux/selectors/usersListSelectores";
import UserCountIcon from '@public/UserCountIcon.svg'


interface IUserCountProps {
}

export const UserCount: React.FC<IUserCountProps> = () => {
    const userCount = useSelector(usersCountSelector)
    return (
        <Flex alignItems="center" justifyContent="center" flexDirection="column">
            <IconButton icon={<UserCountIcon />} clickFunction={() => {}} />
            {userCount}
        </Flex>
    )
}
