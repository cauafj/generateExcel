import { useState } from "react";
import Cards from "./pages/components/cards"
import axios from "axios"

function App() {
  const [generated, setGenerated] = useState(0)
  const [url, setUrl] = useState("")
  const [data, setData] = useState([])

  const takeData = async () => {
    let data = []

    //takes data from url inserted by the user
    await axios.get(url).then(res => {
      data = res.data
    })

    //formats numbers into WhatsApp Links
    data = data.map(e => {
        const phoneNumber = e.phoneNumber.replaceAll(" ", "").replace("+", "").replace("-", "")
    
        return {
          title: e.title,
          rating: e.rating,
          reviewCount: e.reviewCount,
          website: e.website,
          link: "https://api.whatsapp.com/send?phone=" + phoneNumber + "&text=Ol%C3%A1.%20Boa%20tarde"
        }
    })
    return data
}

  return (
    <div className="container text-center">
      <p className="fs-1 m-4 fw-bold">Coloca ai tua URL com json, pae</p>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">URL dos guri</span>
        <input onChange={(e) => {setUrl(e.target.value)}} type="text" className="form-control"/>
      </div>
      <button className="btn btn-lg btn-info mt-3" onClick={() => {setGenerated(1); takeData().then(res => setData(res))}}>Gerar cards</button>
      <Cards generated={generated} data={data}></Cards> 
    </div>
  )
}

export default App;
