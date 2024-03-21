import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateMateriel from './CreateMateriel';
import Confirm from './Confirm';
import UpdateMateriel from './UpdateMateriel';
import Diagramme from './Diagramme'; 
import { Link } from 'react-router-dom';

function Materiels() {
    const [materiels, setMateriels] = useState([]);
    const [openAddModal, setOpenAddModal] = useState(false); 
    const [confirmDelete, setConfirmDelete] = useState(false); 
    const [selectedMateriel, setSelectedMateriel] = useState(null);
    const [openUpdateModal, setOpenUpdateModal] = useState(false); 
    const [totalQuantite, setTotalQuantite] = useState(0);
    

    const fetchData = () => {
        axios.get('http://localhost:3003')
            .then(result => {
                setMateriels(result.data);
            })
            .catch(err => console.log(err));

        axios.get('http://localhost:3003/totalQuantite')
            .then(result => {
                setTotalQuantite(result.data[0].totalQuantite);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchData();
    }, []);

    

    const handleDelete = (num_materiel) => {
        setSelectedMateriel(num_materiel);
        setConfirmDelete(true);
    };

    const handleConfirmDelete = () => {
        axios.post('http://localhost:3003/supprimer', { num_materiel: selectedMateriel })
            .then(response => {
                console.log(response.data);
                fetchData(); 
                setConfirmDelete(false);
            })
            .catch(error => {
                console.error('Erreur lors de la suppression :', error);
                setConfirmDelete(false);
            });
    };

    const handleOpenModal = (materiel) => {
        setSelectedMateriel(materiel);
        setOpenUpdateModal(true);
    };

    

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className='table-responsive'>
                        <button className="openModalBtn bouton-ajouter" onClick={() => setOpenAddModal(true)}>Ajouter</button>
                        {openAddModal && <CreateMateriel closeModal={() => { setOpenAddModal(false); fetchData(); }} />}
                       
                        <table className='table-custom mt-2 table table-borderless table-striped'>
                            <thead className=''>
                                <tr>
                                    <th>Numéro</th>
                                    <th>Désignation</th>
                                    <th>Etat</th>
                                    <th>Quantité</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {materiels.map((materiel) => (
                                    <tr key={materiel._id}>
                                        <td>{materiel.num_materiel}</td>
                                        <td>{materiel.design}</td>
                                        <td>{materiel.etat === 1 ? 'Bon' : materiel.etat === 2 ? 'Mauvais' : 'Abîmé'}</td>
                                        <td>{materiel.quantite}</td>
                                        <td>            
                                            <button className="btn border-none" onClick={() => handleOpenModal(materiel)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill='#00965b' viewBox="0 0 24 24" ><path d="m7 17.013 4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58zM9 13.417l6.03-5.973 1.586 1.586-6.029 5.971L9 15.006v-1.589z"></path><path d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z"></path></svg>
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn border-none" tooltip='supprimer' onClick={() => handleDelete(materiel.num_materiel)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill='#ff575b' viewBox="0 0 24 24"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                      
                    </div>
                    <div>Total des matériels : {totalQuantite}</div>
                </div>
               
                <div className="col-md-6">
                    
                    <Diagramme />
                  
                </div>
            </div>
            
            {confirmDelete && <Confirm closeModal={() => setConfirmDelete(false)} onDelete={handleConfirmDelete} />}
            {openUpdateModal && selectedMateriel && (
                <UpdateMateriel
                    closeModal={() => { setOpenUpdateModal(false); fetchData(); }}
                    materiel={selectedMateriel}
                />
            )}
        </div>
    )
}

export default Materiels;
