import React, { useRef, useState, useEffect } from 'react'
import './history.css'
import { useDownloadExcel } from 'react-export-table-to-excel'
import { Link } from 'react-router-dom'


const {getHistory} = require("../../service/service")

const History = () =>  {
    const tableRef = useRef(null)

    const [history, setHistory] = useState([])

    useEffect(() => {
        getHistory().then((res) => setHistory(res.data))
      }, []);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Updatehistory',
        sheet: 'History'
    })

        return (
            <div className="container">
            
                <div className="history">

                    <table className="history_table" ref={tableRef}>

                        <thead>
                            <tr className="field_names">
                                <td><h2>Task name</h2></td>
                                <td><h2>Updated by</h2></td>
                                <td><h2>Field</h2></td>
                                <td><h2>From</h2></td>
                                <td><h2>To</h2></td>
                                <td><h2>Time</h2></td>
                            </tr>
                        </thead>

                        <tbody>

                            <tr style={{bacgroundColor: "none"}}>
                                <td colSpan={6}>
                                    <div className="horizontal_line" />
                                </td>
                            </tr>             

                        {history.slice(0).reverse().map((update, index) => (
                        
                            <tr key={index}>
                                <td>{update.taskName}</td>
                                <td>{update.userEmail}</td>
                                <td>{update.field}</td>
                                <td>{update.oldInfo}</td>
                                <td>{update.newInfo}</td>
                                <td>{update.updateTime}</td>
                            </tr>
                            
                        ))}

                        </tbody>
                    </table>

                    <div className="horizontal_line" style={{marginTop: "10px"}} />

                    <div style={{display: "flex"}}>
                        <button className="nav_log_out" style={{marginRight: "10px"}} onClick={onDownload}> Download history </button>
                        <Link to="/"><button className="nav_log_out">Back</button></Link>
                    </div>

                </div>

            </div>
        )
    }

export default History