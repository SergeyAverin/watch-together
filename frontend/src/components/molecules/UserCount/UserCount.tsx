import React from "react";

import { Flex, IconButton } from "@atoms/index";

import { isPanelShowSelector, usersCountSelector } from "@redux/selectors/usersListSelectores";
import UserCountIcon from '@public/UserCountIcon.svg'
import { useAppDispatch, useAppSelector } from "@hooks/storeHooks";
import { setIsPanelShow } from "@redux/features/userListSlice";


export const UserCount: React.FC = () => {
    const userCount = useAppSelector(usersCountSelector)
    const dispatch = useAppDispatch()
    const isPanelShow = useAppSelector(isPanelShowSelector)

    const onClick = () => {
        dispatch(setIsPanelShow(!isPanelShow))
    }
    
    return (
        <Flex alignItems="center" justifyContent="center" flexDirection="column">
            <IconButton icon={<UserCountIcon />} clickFunction={onClick} />
            {userCount}
        </Flex>
    )
}
