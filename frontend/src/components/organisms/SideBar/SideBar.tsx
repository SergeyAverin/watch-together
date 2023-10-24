import React from "react";

import { Flex, Margin, IconButton } from "@atoms/index";

import './SideBar.sass'
import CopyLinkIcon from '@public/CopyLinkIcon.svg'


const SideBar: React.FC = () => {
    const copyLink  = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
      }
    return (
        <div className="side-bar">
            <Flex justifyContent="space-around" alignItems="center" flexDirection="column">
                <div>
                    <IconButton icon={<CopyLinkIcon />} clickFunction={(copyLink)} />
                </div>
                <div>sdf</div>
                <div>sdf</div>
            </Flex>
        </div>
    )
}

export default SideBar;
