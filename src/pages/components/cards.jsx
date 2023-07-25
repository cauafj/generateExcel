
export default function Cards(props) {
    const data = props.data
    const generated = props.generated
    
    switch (generated) {
        case 0:
            return (<div className="fs-4 fw-bold mt-3">aguardas</div>)

        case 1:
            return (
                <div className="row text-center justify-content-md-center">
                    {
                        data.map(e => {
                            return (
                                <div className="card m-3" style={{width: "18rem"}}>
                                  <div className="card-body">
                                    <h5 className="card-title">{e.title}</h5>
                                    <p className="card-text">Rating: {e.rating}</p>
                                    <p className="card-text">reviewCount: {e.reviewCount}</p>
                                    <a href={e.website} target="blank" className="card-link">{e.website}</a><br/>
                                    <a href={e.link} target="blank" className="btn btn-info">Enviar mensagem</a>
                                  </div>
                                </div>
                            )
                          })
                    }
                </div>
            )
    }
}