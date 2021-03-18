export class MessageParser {
    constructor(actionProvider, state) {
        this.actionProvider = actionProvider;
        this.state = state;
    }

    // main message parser
    parse(message) {
        // remove spaces form start and form the edn and split by space
        message = message.trim().split(" ")
        // get first part (should be the command)
        const command = message[0]
        // get the rest (should be the params)
        const param = message.slice(1).join(" ")

        // proceed according to the command
        switch (command) {
            case "/menu":
                this.actionProvider.menu()
                break
            case "/find":
                this.actionProvider.handleFind(param)
                break
            case "/check":
                this.actionProvider.handleCheck(param)
                break
            case "/cuckooFile":
                this.actionProvider.handleCuckooFile()
                break
            default:
                this.actionProvider.default(command)
                break
        }
    }
}