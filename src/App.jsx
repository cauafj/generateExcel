import { useState } from "react";
import axios from "axios"
import * as FileSaver from "file-saver"
import XLSX from "sheetjs-style"

function App() {
  const [data, setData] = useState([])
  let url = ""

  const generateDoc = async () => {
    //takes data from url inserted by the user
    axios.create({ baseURL: url }).get("/").then(res => {
      setData(res.data)
      console.log(typeof(data))
    })

    //defines filetype and extension
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
    const fileExtension = ".xlsx"

    //generates the file
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = { Sheets: {"data": ws}, SheetNames: ["data"]}
    const excelBuffer = XLSX.write(wb, {bookType: "xlsx", type: "array" })
    const sData = new Blob([excelBuffer], { type: fileType })
    FileSaver.saveAs(sData, "tohTeuDoc" + fileExtension)
  }

  return (
    <div className="container text-center">
      <p className="fs-1 m-4 fw-bold">Coloca ai tua URL com json, pae</p>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">URL dos guri</span>
        <input onChange={(e) => {url = e.target.value; console.log(url)}} type="text" className="form-control"/>
      </div>
      <button className="btn btn-lg btn-info mt-3" onClick={() => generateDoc()}>Gerar planilha</button>
    </div>
  );
}

export default App;
