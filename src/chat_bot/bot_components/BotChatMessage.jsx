import React from "react";

const BotChatMessage = (props) => {
    return (
        <div className="text-break bg-info rounded p-1">{props.message}</div>
    )
}

export default BotChatMessage