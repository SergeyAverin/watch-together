import React from "react";

import { PanelWrapper } from "@atoms/index";
import { useAppSelector } from "@hooks/storeHooks";
import { isPanelShowSelector } from "@redux/selectors/followSelector";


export const FollowPanel: React.FC = () => {
  const isPanelShow = useAppSelector(isPanelShowSelector)

  return (
    <>
    {isPanelShow &&
    <PanelWrapper>
        <h2>Users follow on you</h2>
        s
        <h2>Follow tree</h2>
    </PanelWrapper>
    }
    </>
  );
};
