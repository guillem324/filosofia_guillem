window.onload = () => {
    // Crear tarjetas
    crearTarjetas(filosofos)

    // Crear handlers para los botones de control
    let botonCrearTarjeta = document.querySelector('.create-btn');
    botonCrearTarjeta.addEventListener('click',crearNuevaTarjeta);

    let botonesOrdenar = document.querySelectorAll('.sort-btn');
    botonesOrdenar[0].addEventListener('click', ordenarNombreAZ);
    botonesOrdenar[1].addEventListener('click', ordenarNombreZA);

    let botonGuardar = document.querySelector('.save-btn');
    botonGuardar.addEventListener('click', guardarTarjetas);

    let botonCargar = document.querySelector('.load-btn');
    botonCargar.addEventListener('click', cargarTarjetas);
}

function crearTarjetas(filosofos) {
    filosofos.forEach((filosofo) => {
        // Creamos tarjeta vacía
        let tarjeta = document.createElement('div');
        tarjeta.classList.add('card');
        // Creamos imagen
        let imagen = document.createElement('img');
        imagen.src = filosofo.imagen;
        imagen.alt = `Foto de ${filosofo.nombre}`;
        imagen.classList.add("photo");
        tarjeta.append(imagen);

        // Creamos caja de informacion
        let info = document.createElement('div');
        info.classList.add('card-info');
        tarjeta.append(info);
        // Creamos título
        let titulo = document.createElement('h3');
        titulo.classList.add('nombre');
        titulo.innerHTML = filosofo.nombre;
        info.append(titulo);
        // Creamos fila de información (info-row)
        let filaInfo = document.createElement('div');
        filaInfo.classList.add('info-row');
        info.append(filaInfo);

        // Añadimos info del país a filaInfo
        let paisDiv = document.createElement('div');
        paisDiv.classList.add('info-pais'); 
        let bandera = document.createElement('img');
        bandera.src = filosofo.pais.bandera;
        bandera.alt = `Bandera de ${filosofo.pais.nombre}`;
        paisDiv.append(bandera);
        let nombrePais = document.createElement('span');
        nombrePais.classList.add('pais'); 
        nombrePais.innerHTML = filosofo.pais.nombre;
        paisDiv.append(nombrePais);
        filaInfo.append(paisDiv);
        
        // Añadimos info de la corriente a filaInfo
        let corrienteDiv = document.createElement('div');
        corrienteDiv.classList.add('info-corriente'); 
        let etiquetaCorriente = document.createElement('span');
        etiquetaCorriente.innerHTML = "Corriente: ";
        corrienteDiv.append(etiquetaCorriente);
        let nombreCorriente = document.createElement('span');
        nombreCorriente.classList.add('corriente'); 
        nombreCorriente.innerHTML = filosofo.corriente;
        corrienteDiv.append(nombreCorriente);
        filaInfo.append(corrienteDiv);
        
        // Añadimos info del arma a filaInfo

        let armaDiv = document.createElement('div');
        armaDiv.classList.add('info-arma'); 
        let etiquetaArma = document.createElement('span');
        etiquetaArma.innerHTML = "Arma: ";
        armaDiv.append(etiquetaArma);
        let nombreArma = document.createElement('span');
        nombreArma.classList.add('arma'); 
        nombreArma.innerHTML = filosofo.arma;
        armaDiv.append(nombreArma);
        filaInfo.append(armaDiv);
        

        // Añadimos caja de habilidades
        let habilidades = document.createElement('div');
        habilidades.classList.add('skills');
        info.append(habilidades);
        // Añadimos una a una las habilidades
        for (let infoHabilidad of filosofo.habilidades) {
            // Añadimos una caja de habilidad
            let skillDiv = document.createElement('div');
            skillDiv.classList.add('skill');
            // Añadimos contenido caja de habilidad
            // 1.Icono de habilidad
            let icono = document.createElement('img');
            icono.src = "https://via.placeholder.com/16";
            icono.alt = `Icono de ${infoHabilidad.habilidad}`;
            skillDiv.append(icono);
            // 2.Etiqueta de habilidad
            let nombreHabilidad = document.createElement('span');
            nombreHabilidad.classList.add('skill-name');
            nombreHabilidad.innerHTML = infoHabilidad.habilidad;
            skillDiv.append(nombreHabilidad);
            
            // 2.Barra de habilidad
            let barraHabilidad = document.createElement('div');
            barraHabilidad.classList.add('skill-bar');
            let nivelHabilidad = document.createElement('div');
            nivelHabilidad.classList.add('level');
            let porcentaje = (infoHabilidad.nivel / 4) * 100;
            nivelHabilidad.style.width = `${porcentaje}%`;
            barraHabilidad.append(nivelHabilidad);
            skillDiv.append(barraHabilidad);
            habilidades.append(skillDiv);
            
            //poso el botó d'eliminar per cada targeta
        let botonEliminar = document.createElement('div');
        botonEliminar.innerHTML = '&#x2716'; // Aspa
        botonEliminar.classList.add('botonEliminar');
        botonEliminar.addEventListener('click', eliminarTarjeta);
        tarjeta.append(botonEliminar);
        }

        // Añadimos tarjeta creada al contenedor de tarjetas
        let contenedor = document.querySelector('.cards-container');
        contenedor.append(tarjeta);
    })
}

function eliminarTarjeta(event) {
    event.target.parentElement.remove();
}

function ordenarNombreAZ() {
    let tarjetas = Array.from(document.querySelectorAll('.card'));
    let tarjetasOrdenadas = tarjetas.sort((tarjetaA, tarjetaB) => {
        let nombre1 = tarjetaA.querySelector('h3').innerHTML;
        let nombre2 = tarjetaB.querySelector('h3').innerHTML;
        return nombre1.localeCompare(nombre2);
    });

    // Eliminar totes les targetes de l'array 'tarjeta'
        let contenedor = document.querySelector('.cards-container');
        contenedor.innerHTML = '';
    // Completar codi

    // Afegir 'tarjetasOrdenadas' al contenidor de cards
    tarjetasOrdenadas.forEach(tarjeta => contenedor.append(tarjeta));
    // Completar codi
}

function ordenarNombreZA() {
    let tarjetas = Array.from(document.querySelectorAll('.card'));
    let tarjetasOrdenadas = tarjetas.sort((tarjetaA, tarjetaB) => {
        let nombre1 = tarjetaA.querySelector('h3').innerHTML;
        let nombre2 = tarjetaB.querySelector('h3').innerHTML;
        return nombre2.localeCompare(nombre1);
    });

    let contenedor = document.querySelector('.cards-container');
    contenedor.innerHTML = '';
    tarjetasOrdenadas.forEach(tarjeta => contenedor.append(tarjeta));
}


function crearNuevaTarjeta(event) {
    event.preventDefault();
    let nuevoFilosofo = {};
    nuevoFilosofo.nombre = document.querySelector('.create-card-form .nombre').value;
    nuevoFilosofo.imagen = document.querySelector('.create-card-form .foto').value;
    nuevoFilosofo.pais = {};
    nuevoFilosofo.pais.nombre = document.querySelector('.create-card-form .pais').value;
    // Completar la función
    nuevoFilosofo.pais.bandera = document.querySelector('.create-card-form .bandera').value;
    nuevoFilosofo.corriente = document.querySelector('.create-card-form .corriente').value;
    nuevoFilosofo.arma = document.querySelector('.create-card-form .arma').value;


    //la part de les habilitats ho he hagut de mirar per saber com fer-ho
    let habilidadesInputs = document.querySelectorAll('.create-card-form .skills');
    nuevoFilosofo.habilidades = [];
    let nombresHabilidades = ['Sabiduría', 'Oratoria', 'Lógica', 'Innovación'];
    for (let i = 0; i < habilidadesInputs.length; i++) {
        let habilidad = {
            habilidad: nombresHabilidades[i],
            nivel: parseInt(habilidadesInputs[i].value)
        };
        nuevoFilosofo.habilidades.push(habilidad);
    }
    crearTarjetas([nuevoFilosofo]);
    document.querySelector('.create-card-form form').reset(); // això ho he mirat perque em donava error si no posava això , es per netejar el formulari
}

function parsearTarjetas(tarjetas){
    let filosofosParseados = [];
    for (let tarjeta of tarjetas){
        let filosofo = {};
        filosofo.nombre = tarjeta.querySelector('.nombre').innerHTML;
        filosofo.imagen = tarjeta.querySelector('.photo').src;
        filosofo.pais = {};
        // Completar funció
        filosofo.pais.nombre = tarjeta.querySelector('.pais').innerHTML;
        filosofo.pais.bandera = tarjeta.querySelector('.info-pais img').src;
        filosofo.corriente = tarjeta.querySelector('.corriente').innerHTML;
        filosofo.arma = tarjeta.querySelector('.arma').innerHTML;

        let habilidades = tarjeta.querySelectorAll('.skill');
        filosofo.habilidades = [];
        for (let habilidad of habilidades){
            let habilidadParaGuardar = {};
            // Completar funció
            habilidadParaGuardar.habilidad = habilidad.querySelector('.skill-name').innerHTML;

            filosofo.habilidades.push(habilidadParaGuardar);
        }
        filosofosParseados.push(filosofo);
    }
    return filosofosParseados;
}

function guardarTarjetas(){
    let tarjetas = Array.from(document.querySelectorAll('.card'));
    localStorage.setItem('tarjetas',JSON.stringify(parsearTarjetas(tarjetas)));
}


function cargarTarjetas() {
    let tarjetasGuardadas = localStorage.getItem('tarjetas');
    if (tarjetasGuardadas) {
        //aquesta part l'he hagut de mirar perque no sabia com fer-ho
        let arrayFilosofos = JSON.parse(tarjetasGuardadas);
        
        let contenedor = document.querySelector('.cards-container');
        contenedor.innerHTML = '';
        
        crearTarjetas(arrayFilosofos);
        alert('Tarjetas cargadas desde localStorage');
    } else {
        alert('No hay tarjetas guardadas en localStorage');
    }
}

const filosofos = [
    {
        nombre: "Platón",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Plato_Pio-Clemetino_Inv305.jpg/1200px-Plato_Pio-Clemetino_Inv305.jpg",
        pais: {
            nombre: "Grecia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/640px-Flag_of_Greece.svg.png"
        },
        corriente: "Idealismo",
        arma: "Dialéctica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 4
        },
        {
            habilidad: "Oratoria",
            nivel: 4
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 4
        }
        ]
    },
    {
        nombre: "Aristóteles",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdXUwy_fFGOJ2vwOMpwtJPyXc9HVb06HSRsbembn7IPKq6D1YitIra2WFM4Gu2rm6yHRs&usqp=CAU",
        pais: {
            nombre: "Grecia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/640px-Flag_of_Greece.svg.png"
        },
        corriente: "Naturalismo",
        arma: "Lógica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 4
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 4
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Descartes",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg/800px-Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg",
        pais: {
            nombre: "Francia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1280px-Flag_of_France.svg.png"
        },
        corriente: "Racionalismo",
        arma: "Meditación",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 2
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Kant",
        imagen: "https://i.pinimg.com/736x/20/89/7f/20897f915acb5124893a278c395382ed.jpg",
        pais: {
            nombre: "Alemania",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/255px-Flag_of_Germany.svg.png"
        },
        corriente: "Trascendentalismo",
        arma: "Crítica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 2
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Hume",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiFZYg2MiOQSXbkBvFP-T3vW9pnhLW5qDioA&s",
        pais: {
            nombre: "Escocia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Flag_of_Scotland.svg/640px-Flag_of_Scotland.svg.png"
        },
        corriente: "Empirismo",
        arma: "Escepticismo",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Arendt",
        imagen: "https://efeminista.com/wp-content/uploads/2021/09/Arendt-Hannah-1-e1576158475623.jpg",
        pais: {
            nombre: "Alemania",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/255px-Flag_of_Germany.svg.png"
        },
        corriente: "Fenomenología",
        arma: "Parresía",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 2
        },
        {
            habilidad: "Lógica",
            nivel: 2
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    }
]