import React from "react";
import Modal from "react-bootstrap/Modal";

const CheckResultModal = (props) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <button className="btn-primary rounded" onClick={showModal}>show more</button>
            <Modal show={isOpen} onHide={hideModal} size="lg" centered>
                <div className="modal-content bg-main-blue">
                    <div className="modal-header text-main-secondary">
                        <div className="modal-title">
                            <p className="text-white">Scan results</p>
                        </div>
                    </div>
                    <div className="modal-body text-main bg-main-darkblue">
                        <p>md5: {props.data["md5"]}</p>
                        <p>sha1: {props.data["sha1"]}</p>
                        <p>sha265: {props.data["sha256"]}</p>
                        <hr/>
                        {
                            Object.keys(props.data["scans"]).map(key => {
                                return (

                                    <div className="container bg-main-blue rounded" key={key}>
                                        <p>{key}</p>
                                        <p>detected: {props.data["scans"][key]["detected"] ? "Yes" : "No"}</p>
                                        {
                                            props.data["scans"][key]["detected"] &&
                                            <p>result: {props.data["scans"][key]["result"]}</p>
                                        }

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default CheckResultModal