const express = require('express');
const router = express.Router();

const materiel = require("../models/matSchema");

router.get("/", async (req,res)=>{
    try{
        const result = await materiel.aggregate([
        {
            $group: {
                _id: null,
                totalQuantite: { $sum: "$quantite" },
                documents: { $push: "$$ROOT" }
            }
        },
        {
            $unwind: "$documents" 
        },
        {
            $project: {
                _id: "$documents._id", 
                num_materiel: "$documents.num_materiel",
                design: "$documents.design",
                etat: "$documents.etat",
                quantite: "$documents.quantite",
                totalQuantite: "$totalQuantite"
            }
        }
        ]);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Rien à afficher", error: error });
    }
});

router.post("/ajouter",async (req,res)=>{

    const {design, etat, quantite}= req.body;

    if(!design || etat === null || !quantite){
        res.status(400).json("Champs manquants");
    }

    try{
            const dernierMateriel = await materiel.find().sort({num_materiel: -1}).limit(1);
            
            let nouveauNumero;
            if (dernierMateriel.length === 0) {
                nouveauNumero = "MAT001";
            } else {
                const dernierNum = dernierMateriel[0].num_materiel;
                var numeroChaine = dernierNum.slice(3);
                var numeroEntier = parseInt(numeroChaine);
                numeroEntier += 1 ;
                var numeroConverti = numeroEntier.toString();
            
                
                while (numeroConverti.length < 3) {
                    numeroConverti = "0" + numeroConverti;
                }
                nouveauNumero = "MAT"+numeroConverti;
            }
            
            console.log("last =" +nouveauNumero);

            const ajoutMateriel = new materiel({num_materiel: nouveauNumero ,design, etat,quantite});
            await ajoutMateriel.save();
            res.status(201).json(ajoutMateriel);   

    }catch(err){
        res.status(404).json(err)
    }
});

router.post("/supprimer", async (req, res) => {
    const {num_materiel} = req.body;

    if(!num_materiel){
        res.status(404).json("Champ manquant");
    }
    try{
        const result = await materiel.deleteOne({num_materiel:num_materiel});
        
        if(result.deletedCount === 1 ){
            res.json({ status: "OK", message: "Supprimé" });
        }else{
            res.status(404).json({ message: "Aucun enregistrement trouvé à supprimer" });
        }
      
    }catch(err){
        res.status(500).json({ message: "Erreur lors de la suppression", error: err });
    }
});

router.post("/modifier", async (req,res) => {
    const { num_materiel, design, etat, quantite } = req.body;

    if (!num_materiel || !design || etat == null || !quantite) {
        return res.status(400).json({ message: "Champs manquants" });
    }
    try {
        const updatedMateriel = await materiel.findOneAndUpdate(
            { num_materiel: num_materiel },
            { design: design, etat: etat, quantite: quantite },
            { new: true }
        );
        if (!updatedMateriel) {
            res.status(404).json({ message: "Aucun enregistrement trouvé à modifier" });
        }
        res.json({ status: "OK", message: "Enregistrement modifié avec succès", updatedMateriel });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la modification", error: err });
    }
});

router.get("/diagramme", async (req,res)=>{
    try {
        const result = await materiel.aggregate([
            {
                $group: {
                    _id: "$etat",
                    totalQuantite: { $sum: "$quantite" }
                }
            }
        ]);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Impossible d'obtenir les quantités", error: error });
    }
})

router.get("/totalQuantite", async (req,res)=>{
    try {
        const result = await materiel.aggregate([
            {
                $group: {
                    _id: null,
                    totalQuantite: { $sum: "$quantite" }
                }
            }
        ]);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Impossible d'obtenir le total de la quantité", error: error });
    }
})

module.exports = router;