import React from "react";

import { Flex, IconButton } from "@atoms/index";

import { isPanelShowSelector } from "@redux/selectors/followSelector";
import UserCountIcon from '@public/UserCountIcon.svg'
import { useAppDispatch, useAppSelector } from "@hooks/storeHooks";
import { setIsFollowPanelShow } from "@redux/features/followSlice";


export const FollowPanelButton: React.FC = () => {
    const dispatch = useAppDispatch()
    const isPanelShow = useAppSelector(isPanelShowSelector)

    const onClick = () => {
        dispatch(setIsFollowPanelShow(!isPanelShow))
    }
    
    return (
        <Flex alignItems="center" justifyContent="center" flexDirection="column">
            <IconButton icon={<UserCountIcon />} clickFunction={onClick} />
            {0}
        </Flex>
    )
}
