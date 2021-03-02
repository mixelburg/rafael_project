import React from "react";

import ChatBot from "./chat_bot/ChatBot";
import MainNavbar from "./main/MainNavbar";
import MainGrid from "./main/MainGrid";

class App extends React.Component{
    state = {
        searchText: "",
        toLoad: 10,
        isLoading: false,
        attackPatterns: [],
        searchHistory: new Set(),
    }

    serverUrl = "http://localhost:5000"

    componentDidMount = () => {
        this.fetchData("", this.state.toLoad)
    }

    handleChange = (event) => {
        let {name, value} = event.target

        if (name === "toLoad") {
            value = parseInt(value, 10)
            this.fetchData(this.state.searchText, value)
        } else {
            this.fetchData(value, this.state.toLoad)
        }

        this.setState(prevState => {
            prevState[name] = value
            return prevState
        })
    }

    fetchData = (key, lim) => {
        this.setState(prevState => {
            prevState.isLoading = true
            return prevState
        })
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ key: key, lim: lim })
        };

        fetch(this.serverUrl, requestMetadata)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState(prevState => {
                    prevState.isLoading = false
                    prevState.attackPatterns = data
                    return prevState
                })
            })
    }

    pushHistory = (data) => {
        this.setState(prevState => {
            prevState.searchHistory.add(data)
            return prevState
        })
    }

    remHistory = (data) => {
        this.setState(prevState => {
            prevState.searchHistory.delete(data)
            return prevState
        })
    }

    clearHistory = () => {
        this.setState(prevState => {
            prevState.searchHistory.clear()
            return prevState
        })
    }

    render() {
        console.log(this.state.toLoad)

        return (
            <>
                <MainNavbar data={this.state} handleChange={this.handleChange}/>

                <MainGrid attackPatterns={this.state.attackPatterns}/>

                <ChatBot/>
            </>

        )
    }
}

export default App