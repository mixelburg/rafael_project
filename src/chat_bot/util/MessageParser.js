export class MessageParser {
    constructor(actionProvider, state) {
        this.actionProvider = actionProvider;
        this.state = state;
    }

    parse(message) {
        message = message.trim().split(" ")
        const command = message[0]
        const param = message.slice(1).join(" ")

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
            default:
                this.actionProvider.default(command)
                break
        }
    }
}