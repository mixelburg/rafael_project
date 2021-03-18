import React, {useState} from "react";
import {Chatbot} from "react-chatbot-kit";
import chatBotConfig from "../chat_bot/util/config";
import {MessageParser} from "../chat_bot/util/MessageParser";
import {ActionProvider} from "../chat_bot/util/ActionProvider";

const ChatBotWindow = () => {
    let [visible, setVisible] = useState(false)

    // chows the chatbot
    const handleClick = () => {
        setVisible(!visible)
    }

    return (
        <>
            <div className="d-flex flex-column position-fixed bottom-0 end-0 w-auto mb-2 me-2">
                {/*bot window*/}
                <div className="mb-3 pe-3">
                    {visible &&
                    <Chatbot config={chatBotConfig} messageParser={MessageParser} actionProvider={ActionProvider}/>}
                </div>
                {/*bot button*/}
                <div className="align-self-end">
                    <button className="btn btn-danger btn-lg shadow-none rounded-pill" onClick={handleClick}>Bot
                    </button>
                </div>
            </div>

        </>
    )
}

export default ChatBotWindow