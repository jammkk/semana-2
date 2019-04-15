const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const estudianteSchema = new Schema({
	nombre : {
		type : String,
		required : true	,
		trim : true
	},
	password :{
		type : String,
		required : true
	},
	email : {
		type: String,
		required : true	
	},
	telefono : {
		type: String,
		required : true	
	},
	identificacion : {
		type: String,
		required : true	
	},
	perfil:{
		type:String
	}

});

estudianteSchema.plugin(uniqueValidator);

const Estudiante = mongoose.model('Estudiante', estudianteSchema);

module.exports = Estudiante