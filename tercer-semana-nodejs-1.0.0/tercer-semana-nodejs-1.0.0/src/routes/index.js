const express = require('express')
const app = express ()
const path = require('path')
const hbs = require ('hbs')
const Estudiante = require('./../models/estudiante')
const Curso = require('./../models/curso')
const Matricula = require('./../models/matriculas')
const dirViews = path.join(__dirname, '../../template/views')
const dirPartials = path.join(__dirname, '../../template/partials')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('./../helpers/helpers')

//hbs
app.set('view engine', 'hbs')
app.set('views', dirViews)
hbs.registerPartials(dirPartials)


app.get('/', (req, res ) => {
	res.render('index', {
		titulo: 'Inicio',
	})	
});

app.post('/', (req, res ) => {

	let estudiante = new Estudiante ({
		nombre : req.body.nombre,
		identificacion : req.body.identificacion,
		telefono : req.body.telefono,
		email : 	req.body.email,
		password : bcrypt.hashSync(req.body.password, 10),
		perfil:"Aspirante"		
	})

	estudiante.save((err, resultado) => {
		if (err){
			return res.render ('indexpost', {
				mostrar : err
			})			
		}		
		res.render ('indexpost', {			
				mostrar : resultado.nombre
			})		
	})			
});

app.post('/AddCourse', (req, res ) => {


	let curso = new Curso ({
		nombre : req.body.nombre,
		id : req.body.id,
		descripcion : req.body.descripcion,
		valor : req.body.valor,
		intensidad:req.body.intensidad,
		modalidad:req.body.modalidad,
		estado:"disponible"			
	})

	curso.save((err, resultado) => {
		if (err){
			return res.render ('indexpost', {
				mostrar : err
			})			
		}		
	console.log("se agrego el curso");	
	})			
});

app.get('/coordinador', (req,res) => {

	Curso.find({},(err,listadoCargue)=>{
		if (err){
			return console.log(err)
		}
		Estudiante.find({},(err,usuarios)=>{
			if (err){
				return console.log(err)
			}


			Matricula.find({},(err,matriculas)=>{
				if (err){
					return console.log(err)
				}				
				lista=listadoCargue;
			console.log(usuarios);
	
				res.render('coordinador', {
				listado:lista,
				usuarios:usuarios,
				registros:matriculas,
				sesion : true						
					}
					
					)})
				})
			})
})


app.post('/actualizarUsuario', (req,res) => {
	

	console.log("information:"+ req.body.id);
	req.session.identificacion = req.body.id;

	Estudiante.find({identificacion:req.body.id},(err,detalle)=>{
	if (err){
		return console.log(err)
	}
	console.log("detalle usuario desde el index "+ detalle);
	let	lista=detalle;
	
	res.render('actualizarUsuario', {
		usuarios:lista,
		sesion : true						
	}	
	)})
})


app.get('/interesado', (req,res) => {
	
	Curso.find({estado:"disponible"},(err,listadoCargue)=>{
	if (err){
		return console.log(err)
	}
	let	lista=listadoCargue;
	
	res.render('interesado', {
		listado:lista,
		sesion : true						
	}	
	)})
})

app.get('/vernotas', (req,res) => {

	Estudiante.find({},(err,respuesta)=>{
		if (err){
			return console.log(err)
		}

		res.render ('vernotas',{
			listado : respuesta
		})
	})
})


app.post('/actualizar', (req, res) => {
	
console.log("que hay acá?"+req.session.identificacion);

	Estudiante.findOneAndUpdate({identificacion : req.session.identificacion}, req.body, {new : true, runValidators: true, context: 'query' }, (err, resultados) => {
		if (err){
			return console.log(err)
		}
	res.render ('actualizar', {
			cedula:req.session.identificacion
		})
	})	
})

app.post('/retirar', (req, res) => {
	console.log("here we go : " + req.body.id);
	console.log("here we go2 : " + req.body.id.curso);

	
	Matricula.findOneAndDelete({estudiante : req.body.id.estudiante,curso:req.body.id.curso}, 
		req.body, (err, resultados) => {
		if (err){
			return console.log(err)
		}
	})	
})

app.post('/verdetalle', (req, res) => {

	Curso.find({id:req.body.id},(err,detalle)=>{
		if (err){
			return console.log(err)
		}
					console.log(detalle);	
		res.render('verdetalle', {
		detalle:detalle,		
		sesion : true						
			}
			
			)})
})

app.post('/matricular', (req, res) => {
console.log(req.session.nombre);
console.log(req.body.id);
	
let matricula = new Matricula ({
		estudiante : req.session.nombre,
		curso : req.body.id	
	})
	console.log(matricula);

	matricula.save((err, resultado) => {
		if (err){
			console.log(err);
			return res.render('matricula', {
				mostrar : err,
				mensaje:"Se prensento un error y el estudiante "+req.session.nombre +" no se ha matriculado exitosamente el el curso con id "+req.body.id
			})	
		}			return res.render('matricula', {
				mostrar : err,
				mensaje:"El estudiante "+req.session.nombre +" se ha matriculado exitosamente el el curso con id "+req.body.id
			})	
	
	})
})


app.post('/cerrarCurso', (req, res) => {
	console.log(req.session.nombre);
	console.log(req.body.id);
		
	Curso.findOneAndUpdate({id : req.body.id}, {estado:"No disponible"}, {new : true, runValidators: true, context: 'query' }, (err, resultados) => {
		if (err){
			return console.log(err)
		}

		res.render ('actualizarCurso', {
			id:req.body.id
		})
	})	

	})


	
app.post('/retirar', (req, res) => {
	console.log(req.session.nombre);
	console.log(req.body.id);
		
	Matricula.findOneAndDelete({curso : req.body.id, estudiante:req.session.nombre}, req.body, (err, resultados) => {
		if (err){
			return console.log(err)
		}
		if(resultados){
			Curso.find({estado:"disponible"},(err,listadoCargue)=>{
			if (err){
				return console.log(err)
			}
	
			Matricula.find({estudiante:req.session.nombre},(err,cursosEstudiantes)=>{
				if (err){
					return console.log(err)
				}	
				lista=listadoCargue;
				res.render('ingresar', {
				listado:lista,
				nombre : req.session.nombre,
				cursos:cursosEstudiantes,
				sesion : true						
					}
					)})
				
				})
		}else{
			console.log(resultados);
		}
	})
	

	})

app.post('/ingresar', (req, res) => {	
	
	Estudiante.findOne({nombre : req.body.usuario}, (err, resultados) => {
		if (err){
			return console.log(err)
		}
		if(!resultados){
			Curso.find({estado:"disponible"},(err,listadoCargue)=>{
				if (err){
					return console.log(err)
				}
				lista=listadoCargue;
				console.log(lista);
				res.render('ingresar', {
				listado:lista,
				nombre : resultados.nombre,
				sesion : true						
					}
					
					)})
			return res.render ('ingresar', {
			mensaje : "Usuario no encontrado"			
			})
		}
		if(!bcrypt.compareSync(req.body.password, resultados.password)){
			return res.render ('ingresar', {
			mensaje : "Contraseña no es correcta"			
			})
		}	
			//Para crear las variables de sesión
			req.session.usuario = resultados._id	
			req.session.nombre = resultados.nombre

			let lista;
		Curso.find({estado:"disponible"},(err,listadoCargue)=>{
		if (err){
			return console.log(err)
		}

		Matricula.find({estudiante:req.session.nombre},(err,cursosEstudiantes)=>{
			if (err){
				return console.log(err)
			}	
			lista=listadoCargue;
			res.render('ingresar', {
			listado:lista,
			nombre : resultados.nombre,
			cursos:cursosEstudiantes,
			sesion : true						
				}
				)})
			
			})
	})	
})

app.get('/salir', (req, res) => {
	req.session.destroy((err) => {
  		if(err) return console.log(err) 	
	})	
	// localStorage.setItem('token', '');
	res.redirect('/')	
})

app.get('*',(req,res)=> {
	res.render('error', {
		titulo: "Error 404",		
	})
});

module.exports = app