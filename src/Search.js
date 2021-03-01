import React from "react";

import AttackCard from "./AttackCard";
import ChatBot from "./ChatBot";

class Search extends React.Component{
    state = {
        searchText: "",
        toLoad: 10,
        isLoading: false,
        attackPatterns: [],
    }

    serverUrl = "http://localhost:5000"

    componentDidMount() {
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

    render() {
        let attacks = this.state.attackPatterns.map(pattern =>
            <AttackCard data={pattern} key={pattern["id"]} />)

        console.log(this.state.toLoad)



        return (
            <>
                <div className="rounded bg-main-dark mt-2 mb-3 mx-2">
                    <div className="row g-0 px-4 py-3">
                        <div className="col-6 d-flex">
                            <input
                                name="searchText"
                                value={this.state.searchText}
                                onChange={this.handleChange}
                                className="form-control me-1"
                                type="search"
                                placeholder="Type to search"
                            />
                        </div>
                        <div className="col-auto d-flex align-items-center ms-2">
                            <div className="spinner-border text-primary" role="status"
                                 style={{visibility: this.state.isLoading ? "visible" : "hidden"}}/>
                        </div>
                        <div className="col-auto d-flex ms-2">
                            <label className="col-form-label text-white me-1">cards to load: </label>
                            <select
                                value={this.state.toLoad}
                                onChange={this.handleChange}
                                name="toLoad"
                                className="form-select w-auto"
                            >
                                <option value={50}>50</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={100}>100</option>
                                <option value={0}>All</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="row row-cols-md-4 g-3 px-5">
                    {attacks}
                </div>

                <ChatBot/>
            </>

        )
    }
}

export default Search