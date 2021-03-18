import fetchData from "../../util";
import WidgetSearchResult from "../widgets/search/WidgetSearchResult";
import WidgetCheckResult from "../widgets/check/WidgetCheckResult";
import WidgetCuckoo from "../widgets/cuckoo/WidgetCuckoo";
import config from "../../config.json"

export class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.createClientMessage = createClientMessage;
    }

    // creates new bot message
    setChatBotMessage = (message) => {
        this.setState(prevState => ({...prevState, messages: [...prevState.messages, message]}))
    }

    // default unknown command state
    default = (command) => {
        this.setChatBotMessage(this.createChatBotMessage(`unknown command: "${command}"`))
    }

    // send menu to user
    menu = () => {
        this.setChatBotMessage(this.createChatBotMessage("command list: ", {widget: "mainMenu"}))
    }

    // gets data from server (same to main search functionality)
    handleFind = (query) => {
        fetchData(query, 0).then(data => {

            const msg = <WidgetSearchResult searchResult={data}/>
            this.setChatBotMessage(this.createChatBotMessage(msg))
        })
    }

    // checks given hash on VirusTotal
    handleCheck = (param) => {
        let url = new URL(config["virusTotal_api_url"])
        let params = {
            apikey: config["virusTotal_api_key"],
            resource: param
        }
        url.search = new URLSearchParams(params).toString()
        // fetch data form server and send message with result to user
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data["response_code"] === 0) {
                    // nothing was found
                    this.setChatBotMessage(this.createChatBotMessage(`nothing on: ${param}`))
                }
                else {
                    // VirusTotal got something
                    const msg = <WidgetCheckResult checkResult={data}/>
                    this.setChatBotMessage(this.createChatBotMessage(msg))
                }
            })
    }

    // sends message to user with cuckoo file check widget
    handleCuckooFile = () => {
        const msg = <WidgetCuckoo/>
        this.setChatBotMessage(this.createChatBotMessage(msg))
    }
}