import React from "react";

interface IRewindButtonProps {
  video: HTMLVideoElement | null;
  second: number,
  icon: React.ReactNode
}
export const RewindButton: React.FC<IRewindButtonProps> = ({ video, second, icon }) => {
    const rewind =  () => {
        if (video) {
            video.currentTime = video.currentTime + second; 
        }
    }
    return (
        <div onClick={rewind}>
            { icon }
        </div>
    )
}
