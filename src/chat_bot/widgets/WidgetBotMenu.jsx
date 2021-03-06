import React from "react";

// main bot menu
const WidgetBotMenu = () => {
    return (
        <ul className="bg-info rounded">
            <li>/menu</li>
            <li>/find {"<query>"} - search db</li>
            <li>/check {"<md5>"} - check md5, sha1 or sha256</li>
            <li>/cuckooFile - check file</li>
        </ul>
    )
}

export default WidgetBotMenu