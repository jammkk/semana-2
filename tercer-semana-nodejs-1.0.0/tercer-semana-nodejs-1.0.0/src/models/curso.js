const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const cursoSchema = new Schema({
	nombre : {
		type : String,
		required : true	,
		trim : true
	},
	id : {
		type: Number,
		required : true	
	},
	descripcion : {
		type: String,
		required : true	
	},
	valor : {
		type: Number,
		required : true	
	},
	 modalidad : {
		type: String
	},
	 intensidad : {
		type: Number			
	},
	estado : {
		type: String		
	},
	doncete:{
		type: String	
	}

});

cursoSchema.plugin(uniqueValidator);

const Curso = mongoose.model('Curso', cursoSchema);

module.exports = Curso