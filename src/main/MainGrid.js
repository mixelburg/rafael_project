import React from "react";
import SearchHistory from "../history/SearchHistory";
import AttackCard from "../attack_card/AttackCard";

class MainGrid extends React.Component {

    state = {searchHistory: new Set()}

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
        let attacks = this.props.attackPatterns.map(pattern =>
            <AttackCard data={pattern} key={pattern["id"]} onClick={this.pushHistory} />)

        return(

            <div className="row g-4 mx-3">
                <div className="col col-10">
                    <div className="row row-cols-md-3 g-3">
                        {attacks}
                    </div>
                </div>

                <div className="col col-2">
                    <SearchHistory data={this.state.searchHistory} close={this.remHistory} clear={this.clearHistory}/>
                </div>
            </div>
        )
    }
}

export default MainGrid