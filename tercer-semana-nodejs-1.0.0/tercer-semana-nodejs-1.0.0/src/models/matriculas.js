const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const matriculaSchema = new Schema({
	estudiante : {
		type : String	
	},
	curso :{
		type : String
	}
});

matriculaSchema.plugin(uniqueValidator);

const Matricula = mongoose.model('Matricula', matriculaSchema);

module.exports = Matricula