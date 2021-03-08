import fetchData from "../../util";
import WidgetSearchResult from "../widgets/search/WidgetSearchResult";
import WidgetCheckResult from "../widgets/check/WidgetCheckResult";
import WidgetCuckoo from "../widgets/cuckoo/WidgetCuckoo";

export class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.createClientMessage = createClientMessage;
    }

    setChatBotMessage = (message) => {
        this.setState(prevState => ({...prevState, messages: [...prevState.messages, message]}))
    }

    default = (command) => {
        this.setChatBotMessage(this.createChatBotMessage(`unknown command: "${command}"`))
    }

    menu = () => {
        this.setChatBotMessage(this.createChatBotMessage("command list: ", {widget: "mainMenu"}))
    }

    handleFind = (query) => {
        fetchData(query, 0).then(data => {

            const msg = <WidgetSearchResult searchResult={data}/>
            this.setChatBotMessage(this.createChatBotMessage(msg))
        })
    }

    handleCheck = (param) => {
        let url = new URL("https://www.virustotal.com/vtapi/v2/file/report")
        let params = {
            apikey: "f23be2e9a0d8c6b7f13c0dd27384f16e61ceca128df566845938cad3e3459d2f",
            resource: param
        }
        url.search = new URLSearchParams(params).toString()
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data["response_code"] === 0) {
                    this.setChatBotMessage(this.createChatBotMessage(`nothing on: ${param}`))
                }
                else {
                    const msg = <WidgetCheckResult checkResult={data}/>
                    this.setChatBotMessage(this.createChatBotMessage(msg))
                }
            })
    }

    handleCuckooFile = () => {
        const msg = <WidgetCuckoo/>
        this.setChatBotMessage(this.createChatBotMessage(msg))
    }
}