import React, {useState} from "react";
import CuckooModal from "./CuckooModal";
import config from "../../../config.json"

const WidgetCuckoo = () => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [phase, setPhase] = useState("init");

    const serverIp = config["cuckoo_server_url"]

    // file setter
    const handleChange = (event) => {
        setSelectedFile(event.target.files[0])
    }

    // handles file submition (loads data form cuckoo server)
    const handleSubmition = async () => {
        // break if no file selected
        if (!selectedFile) return

        setPhase("uploaded")

        let formData = new FormData()
        formData.append("file", selectedFile)

        // create file task on server
        const response = await fetch(serverIp + "tasks/create/file", {
            method: "POST",
            body: formData
        })
        // convert response to json
        const data = await response.json()
        setPhase("processing")

        // timer to handle refresh
        const timer = ms => new Promise(res => setTimeout(res, ms))
        while (true) {
            const result_response = await fetch(serverIp + "tasks/summary/" + data["task_id"].toString(), {
                method: "GET"
            })
            const result_data = await result_response.json()

            // check if the check has completed
            if(result_response.status !== 404) {
                setSelectedFile(result_data)
                setPhase("finished")
                break
            }

            // refresh every 3 seconds
            await timer(3000)
        }
    }

    return (
        <>
            {/*switch to handle status*/}
            {(() => {
                switch (phase) {
                    // initial state with file upload button
                    case "init":
                        return (
                            <div>
                                <div className="file-input mb-1">
                                    <input className="file" id="file" type="file" onChange={handleChange}/>
                                    <label htmlFor="file" className="rounded">select file</label>
                                </div>
                                {
                                    selectedFile &&
                                    <div>
                                        <div style={{fontSize: "0.9rem"}}>name: {selectedFile.name}</div>
                                        <div style={{fontSize: "0.9rem"}}>type: {selectedFile.type}</div>
                                    </div>
                                }
                                <button className="btn-sm btn-primary" onClick={handleSubmition}>submit</button>
                            </div>
                        )
                    // second phase with blue spinner (data is uploading to the server)
                    case "uploaded":
                        return (
                            <div>
                                <div className="spinner-border" style={{width: "4rem", height: "4rem"}} role="status"/>
                                <div>Loading...</div>
                            </div>
                        )
                    // third phase with green spinner (cuckoo is processing the file)
                    case "processing":
                        return (
                            <div>
                                <div className="spinner-border text-success" style={{width: "4rem", height: "4rem"}} role="status"/>
                                <div>Processing...</div>
                            </div>
                        )
                    // final state with results (cuckoo has processed the file and returned a response)
                    case "finished":
                        return (
                            <div>
                                <p className="text-success">{selectedFile["info"]["score"]}/10</p>
                                <CuckooModal data={selectedFile} server={serverIp}/>
                            </div>
                        )
                    default:
                        return null
                }
            })()}
        </>
    )
}


export default WidgetCuckoo