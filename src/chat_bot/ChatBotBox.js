import React from "react";


function ChatBotBox() {
    return (
        <div className="mb-4 pe-3">
            <article className="card bg-main-blue stretched-link">
                <div className="card-header">
                    <p className="text-main-secondary">id: some id</p>
                </div>
                <div className="card-body rounded bg-main-darkblue text-main">
                    <h5 className="card-title">some name</h5>

                    <div className="card-text">
                        <label>description: </label>
                        <p>some description</p>

                        <label>platforms: </label>
                        <p>some data</p>

                        <label>detection: </label>
                        <p>some detection</p>

                        <label>phases: </label>
                        <p>some phases</p>
                    </div>
                </div>
            </article>
        </div>
    )
}

export default ChatBotBox