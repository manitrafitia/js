import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function CreateMateriel({ closeModal }) {

    const [num_materiel, setNum_materiel] = useState();
    const [design, setDesign] = useState();
    const [etat, setEtat] = useState();
    const [quantite, setQuantite] = useState();
    const navigate = useNavigate();

    const Submit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3003/ajouter", { num_materiel, design, etat, quantite })
            .then(result => {
                console.log(result);
                closeModal(false);
                navigate('/');
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="container-fluid overlay">
            <div className='p-5 bg-white modal-custom'>
                <form onSubmit={Submit}>
                    <div className="title">
                        <h4>Ajouter un matériel</h4>       
                    </div>
                    <div className="body ajouter">             
                        <div className="form-group">
                            <label htmlFor="">Désignation</label>
                            <input type="text" className=" custom-form"
                            onChange={(e) => setDesign(e.target.value)} placeholder="Désignation"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Etat</label>
                            <select className=" custom-form" onChange={(e) => setEtat(e.target.value)}>
                                <option value="">Choisir un état</option>
                                <option value={1}>Bon</option>
                                <option value={2}>Mauvais</option>
                                <option value={3}>Abîmé</option>
                        </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Quantité</label>
                            <input type="number" className=" custom-form" 
                            onChange={(e) => setQuantite(e.target.value)} placeholder="0000"/>
                        </div>
                        <div className="d-flex justify-content-center w-100 mt-4">
                            <button className="bouton-annuler" onClick={() => closeModal(false)}> Annuler </button>
                            <button className="bouton-submit">Ajouter</button>
                        </div>
                        
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateMateriel;
