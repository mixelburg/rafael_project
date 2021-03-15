import React from "react";
import Modal from "react-bootstrap/Modal";
import {buildStyles, CircularProgressbarWithChildren} from "react-circular-progressbar";

const CuckooModal = (props) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };

    const score = props.data["info"]["score"]
    const file = props.data["target"]["file"]

    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    return (
        <>
            <button className="btn-primary rounded" onClick={showModal}>show more</button>
            <Modal show={isOpen} onHide={hideModal} size="lg" centered>
                <div className="modal-content bg-main-blue">
                    <div className="modal-header text-main-secondary">
                        <p>id: {props.data["info"]["id"]}</p>
                        <div className="modal-title">
                            <p className="text-white">Scan results</p>
                        </div>
                    </div>
                    <div className="modal-body text-main bg-main-darkblue">
                        <div className="d-flex flex-row">
                            <div className="me-auto">
                                <p>name: {file["name"]}</p>
                                <p>size: {formatBytes(file["size"])}</p>
                                <p>category: {props.data["target"]["category"]}</p>
                                <p>type: {file["type"]}</p>
                                <p>md5: {file["md5"]}</p>
                                <p>duration: {props.data["info"]["duration"]}s</p>
                            </div>
                            <div style={{width: "20%", height: "20%"}}>
                                <CircularProgressbarWithChildren value={score} maxValue={10}
                                                                 styles={buildStyles({
                                                                     // Rotation of path and trail, in number of turns (0-1)
                                                                     rotation: 0,

                                                                     // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                                     strokeLinecap: 'round',

                                                                     // How long animation takes to go from one percentage to another, in seconds
                                                                     pathTransitionDuration: 0.5,

                                                                     // Colors
                                                                     pathColor: `rgba(187, 0, 0, ${100})`,
                                                                     textColor: '#000000',
                                                                     trailColor: '#ffffff',
                                                                     backgroundColor: '#000000',
                                                                 })}
                                >
                                    <p className="text-white fs-1">{score}/10</p>
                                </CircularProgressbarWithChildren>
                            </div>
                        </div>
                        <a href={props.server + "tasks/screenshots/" + props.data["info"]["id"]}
                           className="btn btn-primary">
                            Download screenshot(s)
                        </a>

                    </div>
                </div>
            </Modal>
        </>
    )
}

export default CuckooModal