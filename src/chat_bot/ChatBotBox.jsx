import React from "react";
import {Chatbot} from "react-chatbot-kit";
import { createChatBotMessage } from "react-chatbot-kit";


const ChatBotBox = () => (
    <div className="mb-4 pe-3">
        <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider}/>
    </div>
);

export default ChatBotBox

class MessageParser {
    constructor(actionProvider, state) {
        this.actionProvider = actionProvider;
        this.state = state;
    }

    parse(message) {
        console.log(message)
    }
}


class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.createClientMessage = createClientMessage;
    }
}


const botName = "PAPA"
const config = {
    botName: `the ${botName}`,
    initialMessages: [createChatBotMessage(`Hi I'm ${botName}`)],

    customStyles: {

    },


}
