import {createChatBotMessage} from "react-chatbot-kit";
import WidgetBotMenu from "../widgets/WidgetBotMenu";
import React from "react";
import BotChatMessage from "../bot_components/BotChatMessage";
import UserChatMessage from "../bot_components/UserChatMessage";
import BotAvatar from "../bot_components/BotAvatar";

const botName = "PAPA"
const chatBotConfig = {
    botName: `the ${botName}`,
    initialMessages: [
        createChatBotMessage(`Hi I'm ${botName}`, {widget: "mainMenu"}),
    ],

    customComponents: {
        botChatMessage: (props) => <BotChatMessage {...props}/>,
        userChatMessage: (props) => <UserChatMessage {...props}/>,
        botAvatar: (props) => <BotAvatar {...props}/>,
    },

    widgets: [
        {
            widgetName: "mainMenu",
            widgetFunc: (props) => <WidgetBotMenu {...props}/>,
        },
    ],
}

export default chatBotConfig
