import React from "react";

const BotChatMessage = (props) => {
    return (
        <p className="text-break bg-info rounded p-1">{props.message}</p>
    )
}

export default BotChatMessage