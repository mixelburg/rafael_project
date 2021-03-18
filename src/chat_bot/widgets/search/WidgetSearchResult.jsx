import React from "react";
import WidgetSearchResultItem from "./WidgetSearchResultItem";

// search result in bot chat
const WidgetSearchResult = props => {
    const res = props.searchResult.map(elem => <WidgetSearchResultItem key={elem["id"]} data={elem}/>)
    return (
        <div className="bg-info rounded p-1">
            {res}
        </div>
    )
};

export default WidgetSearchResult