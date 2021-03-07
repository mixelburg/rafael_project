import React from "react";
import CheckResultModal from "./CheckResultModal";

const WidgetCheckResult = props => (
    <div>
        <p>Positives: {props.checkResult["positives"]}/{props.checkResult["total"]}</p>
        <CheckResultModal data={props.checkResult}/>
    </div>
);

export default WidgetCheckResult
