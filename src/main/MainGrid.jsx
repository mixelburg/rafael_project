import React, {useState} from "react";
import SearchHistory from "../history/SearchHistory";
import AttackCard from "../attack_card/AttackCard";
import {CSSTransition} from "react-transition-group";

const MainGrid = (props) => {
    const [searchHistory, setSearchHistory] = useState(new Set())

    const pushHistory = (data) => {
        setSearchHistory(prevState => new Set(prevState.add(data)))
    }

    const remHistory = (data) => {
        setSearchHistory(prevState => {
            prevState.delete(data)
            return new Set(prevState)
        })
    }

    const clearHistory = () => {
        setSearchHistory(prevState => {
            prevState.clear()
            return new Set(prevState)
        })
    }

    let attacks = props.attackPatterns.map(pattern => (
            <AttackCard data={pattern} key={pattern["id"]} onClick={pushHistory} />
        )
    )

    return(
        <div className="row g-4 mx-3">
            <div className="col col-10">
                <CSSTransition in={!props.isLoading} timeout={500} classNames="main-item">
                    <div className="row row-cols-md-3 g-3">
                        {attacks}
                    </div>
                </CSSTransition>
            </div>

            <div className="col col-2">
                <SearchHistory data={searchHistory} close={remHistory} clear={clearHistory}/>
            </div>
        </div>
    )
}

export default MainGrid