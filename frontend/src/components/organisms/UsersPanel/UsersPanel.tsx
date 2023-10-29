import React from "react";

import { PanelWrapper } from "@atoms/index";
import { useUser } from "../../../providers/UserProvIder";


export const UsersPanel: React.FC = () => {
    const user = useUser()

    return (
        <PanelWrapper>
            {user.userId}
        </PanelWrapper>
    )
}
