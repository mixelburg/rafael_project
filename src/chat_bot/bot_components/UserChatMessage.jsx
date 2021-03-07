import React from "react";

const UserChatMessage = (props) => {
    return (
        <p className="text-white bg-primary rounded text-break p-1">{props.message}</p>
    )
}

export default UserChatMessage