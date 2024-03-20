import React from 'react'

function Confirm({ closeModal, onDelete }) {
    return (
        <>
            <div className="container-fluid overlay">
                <div className="p-5 bg-white modal-custom">
                    <div className="title">
                        <h4>Confirmation de suppression</h4>
                    </div>
                    <div className="body">
                        <p>Êtes-vous sûr de vouloir supprimer définitivement cet élément?</p>
                    </div>
                    <div className="foot d-flex">
                        <button className="bouton-annuler" onClick={closeModal}>Annuler</button>
                        {onDelete && <button className="bouton-supprimer" onClick={onDelete}>Supprimer</button>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Confirm;
