import React from "react";

const WidgetBotMenu = (props) => {
    return (
        <ul className="bg-info rounded">
            <li>/menu</li>
            <li>/find {"<query>"} - search db</li>
            <li>/check {"<md5>"} - check md5, sha1 or sha256</li>
        </ul>
    )
}

export default WidgetBotMenu