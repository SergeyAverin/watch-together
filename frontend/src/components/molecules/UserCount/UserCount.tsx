import React from "react";

import { Flex, IconButton } from "@atoms/index";


import CopyLinkIcon from '@public/CopyLinkIcon.svg'


export const UserCount: React.FC = () => {
    return (
        <Flex alignItems="center" justifyContent="center" flexDirection="column">
            <IconButton icon={<CopyLinkIcon />} clickFunction={() => {}} />
            0
        </Flex>
    )
}
