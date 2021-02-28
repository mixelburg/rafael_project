import React from "react";

import AttackCard from "./AttackCard";

class Search extends React.Component{
    state = {
        searchText: "",
        toLoad: 20,
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
                <div className="jumbotron-fluid">
                    <form className="mx-4 mt-2 mb-3">
                        <div className="row">
                            <div className="form-group col-md-6">
                                <input
                                    name="searchText"
                                    value={this.state.searchText}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    type="search"
                                    placeholder="Type to search"
                                />
                            </div>
                            <div className="form-group col-md-auto">
                                <div className="input-group">
                                    <span className="input-group-text">cards to load: </span>
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
                    </form>
                </div>

                <div className="row row-cols-1 row-cols-md-4 g-3 mx-3 mb-4">
                    {attacks}
                </div>


            </>

        )
    }
}

export default Search