import React,{ useState } from "react"
import axios from "axios"
import {useNavigate} from 'react-router-dom'

const Create = ({ handleClose }) => {
 /////////////Relier API
    const [num_materiel, setNum_materiel] = useState()
    const [design, setDesign] = useState()
    const [etat, setEtat] = useState()
    const [quantite, setQuantite] = useState()
    const navigate = useNavigate()

    const Submit = (e) => {
        e.preventDefault();
        axios.post("https://localhost:3301/createMateriel", {num_materiel,design,etat,quantite})
        .then(result => {
            console.log(result)
            navigate('/')
        })
        .catch(err => console.log(err))
    }

////fin


    return (
    <div className="">
        <div className='bg-white rounded p-3 shadow'>
            <form onSubmit={Submit}>
                <h2>Ajouter Matériels</h2>
                <div className="mb-2">
                    <label htmlFor="">Numéro</label>
                    <input type="text" className="form-control" 
                    onChange={(e) => setNum_materiel(e.target.value)}/>
                </div>
                <div className="mb-2">
                    <label htmlFor="">Désignation</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="mb-2">
                    <label htmlFor="">Etat</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="mb-2">
                    <label htmlFor="">Quantité</label>
                    <input type="text" className="form-control" />
                </div>
                <button className="btn btn-success">Submit</button>
            </form>
        </div>
    </div>
    )
}

export default Create;