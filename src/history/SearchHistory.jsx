import React from "react";
import SearchHistoryCard from "./SearchHistoryCard";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const SearchHistory = props => {
    // get the search history cards
    const cards = props.data.map(pattern => (
            <CSSTransition timeout={500} classNames="main-item" key={pattern["id"]}>
                <SearchHistoryCard data={pattern} close={props.close}/>
            </CSSTransition>
        )
    )
    return (
        <>
            <div className="d-flex bg-main-dark rounded mb-3 p-2">
                {/*clear button*/}
                <label className="fs-3 text-main me-auto">history: </label>
                <button className="btn btn-danger btn-main-danger-outline" onClick={props.clear}>
                    clear
                    <span className="badge">{cards.length}</span>
                </button>
            </div>

            {/*cards*/}
            <TransitionGroup>
                {cards}
            </TransitionGroup>
        </>
    )
}

export default SearchHistory