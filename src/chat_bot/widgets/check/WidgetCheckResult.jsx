import React from "react";
import CheckResultModal from "./CheckResultModal";

const WidgetCheckResult = props => (
    <>
        <p>Positives: {props.checkResult["positives"]}/{props.checkResult["total"]}</p>
        <CheckResultModal data={props.checkResult}/>
    </>
);

export default WidgetCheckResult
