import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UpdateMateriel({ closeModal, materiel }) {
    const [design, setDesign] = useState(materiel.design);
    const [etat, setEtat] = useState(materiel.etat); 
    const [quantite, setQuantite] = useState(materiel.quantite); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3003/modifier`, {
                num_materiel: materiel.num_materiel, 
                design,
                etat,
                quantite
            });
            console.log(response.data);
            closeModal(false);
            navigate("/");
        } catch (error) {
            console.error("Error updating data: ", error);
        }
    };

    return (
        <div className="container-fluid overlay">
            <div className='p-5 bg-white modal-custom'>
                <form onSubmit={handleSubmit}>
                    <div className="title">
                        <h4>Modifier un matériel</h4>
                    </div>
                    <div className="body modifier">
                    <div className="form-group">
                        <label htmlFor="">Désignation</label>
                        <input required type="text" className="custom-form" value={design} onChange={(e) => setDesign(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Etat</label>
                        <select required className="custom-form" value={etat} onChange={(e) => setEtat(e.target.value)}>
                            <option value="">Choisir un état</option>
                            <option value={1}>Bon</option>
                            <option value={2}>Mauvais</option>
                            <option value={3}>Abîmé</option>
                        </select>

                    </div>
                    <div className="form-group">
                        <label htmlFor="">Quantité</label>
                        <input type="number" required className="custom-form" value={quantite} onChange={(e) => setQuantite(e.target.value)} />
                    </div>
                    <div className="d-flex justify-content-center w-100 mt-4">
                            <button className="bouton-annuler" onClick={() => closeModal(false)}> Annuler </button>
                            <button className="bouton-modifier">Modifier</button>
                        </div>
                    </div>                   
                </form>
            </div>
        </div>
    );
}

export default UpdateMateriel;
