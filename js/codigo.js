var ctx;
            var canvas;
            var palabra;
            var letras = "QWERTYUIOPASDFGHJKLÑZXCVBNM";
            var colorTecla = "#585858";
            var colorMargen = "red";
            var inicioX = 200;
            var inicioY = 300;
            var lon = 35;
            var margen = 20;
            var pistaText = "";
              

            /* Arreglos */
            var teclas_array = new Array();
            var letras_array = new Array();
            var palabras_array = new Array();

            /* Variables de control */
            var aciertos = 0;
            var errores = 0;
            
            /* Palabras */
            palabras_array.push("NUCLEAR");            
            palabras_array.push("HIDROELECTRICA");
            palabras_array.push("GEOTERMICA");
            palabras_array.push("EOLICA");
            palabras_array.push("SOLAR");
            palabras_array.push("TERMOELECTRICA");
          
                    
            /* Objetos */
            function Tecla(x, y, ancho, alto, letra){
                this.x = x;
                this.y = y;
                this.ancho = ancho;
                this.alto = alto;
                this.letra = letra;
                this.dibuja = dibujaTecla;
            }
            
            function Letra(x, y, ancho, alto, letra){
                this.x = x;
                this.y = y;
                this.ancho = ancho;
                this.alto = alto;
                this.letra = letra;
                this.dibuja = dibujaCajaLetra;
                this.dibujaLetra = dibujaLetraLetra;
            }
           
            /* Funciones */
    
            /* Dibujar Teclas*/
            function dibujaTecla(){
                ctx.fillStyle = colorTecla;
                ctx.strokeStyle = colorMargen;
                ctx.fillRect(this.x, this.y, this.ancho, this.alto);
                ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
                
                ctx.fillStyle = "white";
                ctx.font = "bold 20px courier";
                ctx.fillText(this.letra, this.x+this.ancho/2-5, this.y+this.alto/2+5);
            }
            
            /* Dibua la letra y su caja */
            function dibujaLetraLetra(){
                var w = this.ancho;
                var h = this.alto;
                ctx.fillStyle = "black";
                ctx.font = "bold 40px Courier";
                ctx.fillText(this.letra, this.x+w/2-12, this.y+h/2+14);
            }
            function dibujaCajaLetra(){
                ctx.fillStyle = "white";
                ctx.strokeStyle = "black";
                ctx.fillRect(this.x, this.y, this.ancho, this.alto);
                ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
            }
            
           
            function pistaFunction(palabra){
                let pista = ""; 
                switch(palabra){  
                    case 'GEOTERMICA':    
                        pista = "Generada de la tierra";
                        break;     // Es importante el break en cada case 
                    case 'SOLAR':
                        pista = "Viene del sol";
                        break;
                    case 'HIDROELECTRICA':
                        pista = "Generada del agua";
                        break;
                    case 'EOLICA':
                        pista = "Generada con aire";
                        break;
                    case 'TERMOELECTRICA':
                        pista = "Generada con calor";
                        break;
                    case 'NUCLEAR':
                        pista = "Generada con átomos";
                        break;

                }
                document.getElementById('pista').innerHTML="Pista: "+pista;

            }
           
                    
        
            function teclado(){
                var ren = 0;
                var col = 0;
                var letra = "";
                var miLetra;
                var x = inicioX;
                var y = inicioY;
                for(var i = 0; i < letras.length; i++){
                    letra = letras.substr(i,1);
                    miLetra = new Tecla(x, y, lon, lon, letra);
                    miLetra.dibuja();
                    teclas_array.push(miLetra);
                    x += lon + margen;
                    col++;
                    if(col==10){
                        col = 0;
                        ren++;
                        if(ren==2){
                            x = 280;
                        } else {
                            x = inicioX;
                        }
                    }
                    y = inicioY + ren * 50;
                }
            }
            
            
            
            function pintaPalabra(j){
           
                palabra = palabras_array[j];
            pistaFunction(palabra)
                 
            
                var w = canvas.width;
                var len = palabra.length;
                var ren = 0;
                var col = 0;
                var y = 230;
                var lon = 50;
                var x = (w - (lon+margen) *len)/2;
                for(var i=0; i<palabra.length; i++){
                    letra = palabra.substr(i,1);
                    miLetra = new Letra(x, y, lon, lon, letra);
                    miLetra.dibuja();
                    letras_array.push(miLetra);
                    x += lon + margen;
                }
            }
            
            /* dibujar cadalzo y partes del pj segun sea el caso */
            function horca(errores){
                var imagen = new Image();
                imagen.src = "../imagenes/ahorcado"+errores+".png";
                imagen.onload = function(){
                    ctx.clearRect(230,0,490,230);
                    ctx.drawImage(imagen, 230, 0, 490, 230);
                }
            }
            
            /* ajustar coordenadas */
            function ajusta(xx, yy){
                var posCanvas = canvas.getBoundingClientRect();
                var x = xx-posCanvas.left;
                var y = yy-posCanvas.top;
                return{x:x, y:y}
            }
            
            
            function selecciona(e){
                var pos = ajusta(e.clientX, e.clientY);
                var x = pos.x;
                var y = pos.y;
                var tecla;
                var bandera = false;
                for (var i = 0; i < teclas_array.length; i++){
                    tecla = teclas_array[i];
                    if (tecla.x > 0){
                        if ((x > tecla.x) && (x < tecla.x + tecla.ancho) && (y > tecla.y) && (y < tecla.y + tecla.alto)){
                            break;
                        }
                    }
                }
                if (i < teclas_array.length){
                    for (var i = 0 ; i < palabra.length ; i++){ 
                        letra = palabra.substr(i, 1);
                        if (letra == tecla.letra){
                            caja = letras_array[i];
                            caja.dibujaLetra();
                            aciertos++;
                            bandera = true;
                        }
                    }
                    if (bandera == false){
                        errores++;
                        horca(errores);
                        if (errores == 5) gameOver(errores);
                    }
                    /* Borra la tecla que se a presionado */
                    ctx.clearRect(tecla.x - 1, tecla.y - 1, tecla.ancho + 2, tecla.alto + 2);
                    tecla.x - 1;
                    /* checa si se gano y manda a la funcion gameover */
                    if (aciertos == palabra.length) {
                                document.getElementById("boton").removeAttribute("hidden");
                                }

                }
            }
            let h=1;
            
            function gameOver(errores){

                
                ctx.fillStyle = "black";

                ctx.font = "bold 50px Courier";
                if (errores < 5 ){
                          
                       
                      
                } else {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.fillText("Lo sentimos, la palabra era: ", 110, 280);
                     ctx.font = "bold 80px Courier";
                                      lon = (canvas.width - (palabra.length*48))/2;
                ctx.fillText(palabra, lon, 380);
                horca(errores);
              
                }

               
            }
           
function inicio() {

    document.getElementById("boton").setAttribute("hidden","");
    canvas = document.getElementById("pantalla");

                if (canvas && canvas.getContext){
                    ctx = canvas.getContext("2d");


                    if(ctx){
                        teclado();
                        pintaPalabra(0);
                        horca(errores);
                        
                        canvas.addEventListener("click", selecciona, false);


                    } else {
                        alert ("Error al cargar el contexto!");
                    }
                }


          
}
function avanzar() {
    
        letras_array.length=0;
        errores=0;
            aciertos=0;
           
            document.getElementById('lista').innerHTML= document.getElementById('lista').innerHTML+"<BR>"+palabras_array[0];
    if(palabras_array.length>1){
                
    ctx.clearRect(0, 0, canvas.width, canvas.height);
                 palabras_array.shift();
    
    
    inicio();
    }
    else {
                  palabras_array.shift();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
                         ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.fillText("Enhorabuena!!!,has terminado pulsa ", 110, 200);
                        ctx.fillText("  finalizar para volver a empezar", 110, 270);
              
                     ctx.font = "bold 60px Calibri";

                document.getElementById('boton').setAttribute("hidden","");

    }

}


          
            
