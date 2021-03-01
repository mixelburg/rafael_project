import React, {useState} from "react";
import ChatBotBox from "./ChatBotBox";

const ChatBot = () => {
    let [visible, setVisible] = useState(true)


    const handleClick = () => {
        setVisible(!visible)
    }

    return (
        <>
            <div className="d-flex flex-column position-fixed bottom-0 end-0 w-auto mb-2 me-2">
                {visible && <ChatBotBox/>}
                <div className="align-self-end">
                    <button className="btn btn-danger btn-lg shadow-none rounded-pill" onClick={handleClick}>Bot</button>
                </div>
            </div>

        </>
    )
}

export default ChatBot