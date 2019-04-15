const hbs = require('hbs');

hbs.registerHelper('listar', (listado) => {
let texto = `	<form action="/eliminar" method="post">
		<table class='table table-striped table-hover'> 
				<thead class='thead-dark'>
				<th>Nombre</th>
				<th>Matematicas</th>
				<th>Ingles</th>
				<th>Programacion</th>
				<th></th>
				</thead>
				<tbody>`;
	listado.forEach(estudiante =>{
		texto = texto + 
				`<tr>
				<td> ${estudiante.nombre} </td>
				<td> ${estudiante.matematicas} </td>
				<td> ${estudiante.ingles}</td>
				<td> ${estudiante.programacion} </td>
				<td><button class="btn btn-danger" name="nombre" value="${estudiante.nombre}">Eliminar</button></td>
				
				</tr> `;
	})
	texto = texto + '</tbody> </table></form>';	
	return texto;

});

hbs.registerHelper('listar2', (listado) => {

	if(listado){

	console.log(listado);
	let texto = `	<form action="/matricular" method="post">
			<table class='table table-striped table-hover'> 
					<thead class='thead-dark'>
					<th>ID</th>
					<th>Nombre</th>
					<th>Descripcion</th>
					<th>Modalidad</th>
					<th>Duración</th>
					<th>Valor</th>
					<th></th>
					
					</thead>
					<tbody>`;
		listado.forEach(curso =>{
			texto = texto + 
					`<tr>
					<td> ${curso.id} </td>
					<td> ${curso.nombre} </td>
					<td> ${curso.descripcion}</td>
					<td> ${curso.modalidad} </td>
					<td> ${curso.intensidad}</td>
					<td> ${curso.valor} </td>					
					
					<td><button class="btn btn-danger" name="id" value="${curso.id}">matricular</button></td>
					
					</tr> `;
		})
		texto = texto + '</tbody> </table></form>';	
		return texto;
	}else return "";
	
	});

	hbs.registerHelper('listarCoordinador', (listado) => {

		console.log(listado);
		let texto = `	<form action="/cerrarCurso" method="post">
				<table class='table table-striped table-hover'> 
						<thead class='thead-dark'>
						<th>ID</th>
						<th>Nombre</th>
						<th>Descripcion</th>
						<th>Modalidad</th>
						<th>Duración</th>
						<th>Valor</th>
						<th>Estado</th>
						<th></th>
						</thead>
						<tbody>`;
			listado.forEach(curso =>{
				texto = texto + 
						`<tr>
						<td> ${curso.id} </td>
						<td> ${curso.nombre} </td>
						<td> ${curso.descripcion}</td>
						<td> ${curso.modalidad} </td>
						<td> ${curso.intensidad}</td>
						<td> ${curso.valor} </td>
						<td> ${curso.estado} </td>	
						<td><button class="btn btn-danger" name="id" value="${curso.id}">Cerrar Curso</button></td>											
						</tr> `;
			})
			texto = texto + '</tbody> </table></form>';	
			return texto;
		
		});


hbs.registerHelper('listarInteresado', (listado) => {

	console.log(listado);
	let texto = `	<form action="/verdetalle" method="post">
			<table class='table table-striped table-hover'> 
					<thead class='thead-dark'>
					<th>ID</th>
					<th>Nombre</th>
					<th>Descripcion</th>
					<th>Estado</th>
					<th></th>
					</thead>
					<tbody>`;
		listado.forEach(curso =>{
			texto = texto + 
					`<tr>
					<td> ${curso.id} </td>
					<td> ${curso.nombre} </td>
					<td> ${curso.descripcion}</td>
					<td> ${curso.estado} </td>												
					<td><button class="btn btn-danger" name="id" value="${curso.id}">Ver detalle</button></td>
					</tr> `;
		})
		texto = texto + '</tbody> </table></form>';	
		return texto;
	
	});

	hbs.registerHelper('show', (listado) => {

		if(listado){
		let texto = `	<form action="/cerrarCurso" method="post">
				<table class='table table-striped table-hover'> 
						<thead class='thead-dark'>
						<th>ID</th>
						<th>Nombre</th>
						<th>Descripcion</th>
						<th>Modalidad</th>
						<th>Duración</th>
						<th>Valor</th>
						<th>Estado</th>
						<th></th>
						</thead>
						<tbody>`;
			listado.forEach(curso =>{
				texto = texto + 
						`<tr>
						<td> ${curso.id} </td>
						<td> ${curso.nombre} </td>
						<td> ${curso.descripcion}</td>
						<td> ${curso.modalidad} </td>
						<td> ${curso.intensidad}</td>
						<td> ${curso.valor} </td>
						<td> ${curso.estado} </td>	
						<td><button class="btn btn-danger" name="id" value="${curso.id}">Cerrar Curso</button></td>											
						</tr> `;
			})
			texto = texto + '</tbody> </table></form>';	
		return texto;
		}else{
			return "";
		}
		});

		hbs.registerHelper('listarcursosIncirtos', (cursos) => {
if(cursos){
		
			let texto = `	<form action="/retirar" method="post">
			<table class='table table-striped table-hover'> 
					<thead class='thead-dark'>
					<th>ID Curso</th>
					<th>Usuario</th>
					<th></th>
					</thead>
					<tbody>`;
		cursos.forEach(curso =>{
			texto = texto + 
					`<tr>
					<td> ${curso.curso} </td>
					<td> ${curso.estudiante} </td>											
					<td><button class="btn btn-danger" name="id" value="${curso.curso}">Retirar Curso</button></td>
					</tr> `;
		})
		texto = texto + '</tbody> </table></form>';	
		return texto;
}
else
return "";
			
			});

	
	hbs.registerHelper('listarUsuarios', (usuarios) => {

		console.log("revision: " + usuarios);
		let texto = `	<form action="/actualizarUsuario" method="post">
		<table class='table table-striped table-hover'> 
				<thead class='thead-dark'>
				<th>ID usuario</th>
				<th>Nombre</th>
				<th></th>
				</thead>
				<tbody>`;
				usuarios.forEach(curso =>{
				
		texto = texto + 
				`<tr>
				<td> ${curso.id} </td>
				<td> ${curso.nombre} </td>											
				<td><button class="btn btn-danger" name="id" value="${curso.identificacion}">Actualizar</button></td>
				</tr> `;
	})
	texto = texto + '</tbody> </table></form>';	
	return texto;
		});

	hbs.registerHelper('listarDetalleUsuario', (usuarios) => {

		console.log("revision: " + usuarios);
		let	texto="";
				usuarios.forEach(curso =>{
		texto = 
				`
				Usuario id: ${curso.id} 
				Nombre: ${curso.nombre}		
				Perfil: ${curso.perfil} 
				Telefono: ${curso.telefono}
				Email: ${curso.email}
				
				 `;
	})
	
	return texto;

		
		});


hbs.registerHelper('listarRegistros', (usuarios) => {

	console.log("revision: " + usuarios);
	let texto = `	<form action="/retirar" method="post">
	<table class='table table-striped table-hover'> 
			<thead class='thead-dark'>
			<th>Curso</th>
			<th>Estudiante</th>
			<th></th>
			</thead>
			<tbody>`;
			usuarios.forEach(curso =>{
			
	texto = texto + 
			`<tr>
			<td> ${curso.curso} </td>
			<td> ${curso.estudiante} </td>											
			<td><button class="btn btn-danger" name="id" value="${curso}">Retirar</button></td>
			</tr> `;
})
texto = texto + '</tbody> </table></form>';	
return texto;
	
	});