import React from "react";

import ChatBotWindow from "./main/ChatBotWindow";
import MainNavbar from "./main/MainNavbar";
import MainGrid from "./main/MainGrid";
import fetchData from "./util";

class App extends React.Component{
    state = {
        searchText: "",
        toLoad: 10,
        isLoading: false,
        attackPatterns: [],
    }

    componentDidMount = () => {
        this.getData("", this.state.toLoad)
    }

    handleChange = (event) => {
        let {name, value} = event.target

        if (name === "toLoad") {
            value = parseInt(value, 10)
            this.getData(this.state.searchText, value)
        } else {
            this.getData(value, this.state.toLoad)
        }

        this.setState(prevState => {
            prevState[name] = value
            return prevState
        })
    }

    getData = async (key, lim) => {
        this.setState(prevState => {
            prevState.isLoading = true;
            return prevState
        })
        const data = await fetchData(key, lim)
        this.setState(prevState => {
            prevState.isLoading = false;
            prevState.attackPatterns = data
            return prevState
        })
    }

    render() {
        return (
            <>
                <MainNavbar data={this.state} handleChange={this.handleChange}/>
                <MainGrid attackPatterns={this.state.attackPatterns} isLoading={this.state.isLoading}/>
                <ChatBotWindow/>
            </>
        )
    }
}

export default App