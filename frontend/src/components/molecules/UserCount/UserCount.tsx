import React from "react";

import { Flex, IconButton } from "@atoms/index";


import UserCountIcon from '@public/UserCountIcon.svg'


export const UserCount: React.FC = () => {
    return (
        <Flex alignItems="center" justifyContent="center" flexDirection="column">
            <IconButton icon={<UserCountIcon />} clickFunction={() => {}} />
            0
        </Flex>
    )
}
