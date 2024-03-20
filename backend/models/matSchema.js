const mongoose = require('mongoose');
const materielSchema = new mongoose.Schema({
    num_materiel : {
        type: String, 
        required: true,
        unique : true
    },
    design : {
        type: String, 
        required: true
    },
    etat : {
        type: Number, 
        required: true
    },
    quantite : {
        type: Number, 
        required: true
    }
   
})

const Materiel = mongoose.model('Materiel', materielSchema);

module.exports = Materiel;