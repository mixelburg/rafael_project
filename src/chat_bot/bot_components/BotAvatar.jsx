import React from "react";
import botAvatar from "./bot_image.jpg"

const BotAvatar = (props) => {
    return (
        <>
            <img
                src={botAvatar}
                alt="bot"
                height={"25%"}
                width={"25%"}
            />
        </>
    )
}

export default BotAvatar