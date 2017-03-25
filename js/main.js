	window.onload = function () { // acciones tras cargar la pagina
		pantalla = document.getElementById("textoPantalla"); // elemento pantalla de salida
		document.onkeydown = teclado;  //función teclado disponible
	}
	x = "0"; // guardar numero en pantalla
	xi = 1; // iniciar numero en pantalla: 1=si; 0=no;
	coma = "0"; // estado coma decimal 0=no 1=si;

	ni = 0; // nuemro oculto o en espera
	op = "no"; //operacion en curso; "no" = sin operacion

	function numero(xx) { // recoge el numero puslado en el argumento
		if(x == "0" || xi == 1){ // inicializar el numero

			pantalla.value = xx; // mostrar en pantalla
			x = xx; // guardar numero

			if(xx == ".") { // si escribimos la coma al principio del numero
				pantalla.value = "0.";
				x = xx;
				coma = 1; // cambiar el estado de la coma
			}

		}else{ // continuar un numero

			if (xx == "." && coma == 0){ // si escribimos la coma por primera vez

				pantalla.value += xx; // añadimos y mostramos en pantalla
				x += xx; // añadimos y guardamos
				coma = 1; // cambiar el estado de la coma

			} else if (xx == "." && coma == 1) { // si intentamos ingresar nuevamente la coma
				// no realiza ninguna accion
			} else {

				pantalla.value += xx; // añadimos y mostramos en pantalla
				x += xx; // añadimos y guardamos
			}
		};
		xi = 0; // el numero esta iniciado y podemos ampliarlo
	}

	function operar(s) {
		igualar(); //si hay operaciones pendientes se realizan primero
		ni = x //ponemos el 1º número en "numero en espera" para poder escribir el segundo.
		op = s; //guardamos tipo de operación.
		xi = 1; //inicializar pantalla.
	}

	function igualar() {
		if (op == "no") { //no hay ninguna operación pendiente.
			pantalla.value = x;	//mostramos el mismo número	

		} else { //con operación pendiente resolvemos

			sl = ni + op + x; // escribimos la operación en una cadena
			sol = eval(sl) //convertimos la cadena a código y resolvemos
			pantalla.value = sol //mostramos la solución
			x = sol; //guardamos la solución
			op = "no"; //ya no hay operaciones pendientes
			xi = 1; //se puede reiniciar la pantalla.
		}
	}

	function raizc() {
		x = Math.sqrt(x) //resolver raíz cuadrada.
		pantalla.value = x; //mostrar en pantalla resultado
		op = "no"; //quitar operaciones pendientes.
		xi = 1; //se puede reiniciar la pantalla 
    }

    function porcent() { 
		x = x/100 //dividir por 100 el número
		pantalla.value = x; //mostrar en pantalla
		igualar() //resolver y mostrar operaciones pendientes
		xi = 1 //reiniciar la pantalla
	}

	function opuest() { 
		nx = Number(x); //convertir en número
		nx = -nx; //cambiar de signo
		x = String(nx); //volver a convertir a cadena
		pantalla.value = x; //mostrar en pantalla.
	}

	function inve() {
		nx = Number(x);
		nx = (1/nx);
		x = String(nx);		 
		pantalla.value = x;
		xi = 1; //reiniciar pantalla al pulsar otro número.
	}

	function retro(){ //Borrar sólo el último número escrito.
		cifras = x.length; //hayar número de caracteres en pantalla
		br = x.substr(cifras -1, cifras) //info del último caracter
		x = x.substr(0, cifras -1) //quitar el ultimo caracter
		if (x == "") {
			x = "0";
		} //si ya no quedan caracteres, pondremos el 0
		if (br == ".") {
			coma=0;
		} //Si hemos quitado la coma, se permite escribirla de nuevo.
		pantalla.value=x; //mostrar resultado en pantalla	 
	}

	function borradoParcial() {
		pantalla.value = 0; //Borrado de pantalla;
		x = 0; //Borrado indicador número pantalla.
		coma = 0; //reiniciamos también la coma					
	}

	function borradoTotal() {
		pantalla.value = 0; //poner pantalla a 0
		x = "0"; //reiniciar número en pantalla
		coma = 0; //reiniciar estado coma decimal 
		ni = 0 //indicador de número oculto a 0;
		op = "no" //borrar operación en curso.
	}

	function teclado (elEvento) { 
		evento = elEvento || window.event;
		k=evento.keyCode; //número de código de la tecla.
		//teclas númericas del teclado alfamunérico
		if (k>47 && k<58) { 
			p=k-48; //buscar número a mostrar.
			p=String(p) //convertir a cadena para poder añádir en pantalla.
			numero(p); //enviar para mostrar en pantalla
		}	
		//Teclas del teclado númerico. Seguimos el mismo procedimiento que en el anterior.
		if (k>95 && k<106) {
			p=k-96;
			p=String(p);
			numero(p);
		}
		if (k==110 || k==190) {numero(".")} //teclas de coma decimal
		if (k==106) {operar('*')} //tecla multiplicación
		if (k==107) {operar('+')} //tecla suma
		if (k==109) {operar('-')} //tecla resta
		if (k==111) {operar('/')} //tecla división
		if (k==32 || k==13) {igualar()} //Tecla igual: intro o barra espaciadora
		if (k==46) {borradoTotal()} //Tecla borrado total: "supr"
		if (k==8) {retro()} //Retroceso en escritura : tecla retroceso.
		if (k==36) {borradoParcial()} //Tecla borrado parcial: tecla de inicio.
	}