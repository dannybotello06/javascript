function validarNumero(valorValidar,campo){

	if ((Number.isNaN(Number.parseFloat(valorValidar))))  {
	
	          alert('El valor de ...' + campo + ' esta vacio o no es un numero ' ); 
	          return true;

            }
            
        return false;    
}


function genera_plan(capital,intereses,valor,cuotas) {
 
  var body = document.getElementsByTagName("body")[0];
  var tabla = document.createElement("table");
  var tblBody = document.createElement("tbody");

  
  for (var i = 0; i < cuotas; i++) {
   
    var hilera = document.createElement("tr");

    for (var j = 0; j < 1; j++) {
     
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode(
      "couta   " + (i+1) + "  capital: " +  capital + " intereses: " + intereses+ " valor cuota: "+valor ,
      );
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
    }

 
    tblBody.appendChild(hilera);
  }

  tabla.appendChild(tblBody);
  body.appendChild(tabla);
  tabla.setAttribute("border", "2");
}




function calcularCuota() {
   
    const monto = parseFloat(document.getElementById('monto').value);
    const tasaAnual = parseFloat(document.getElementById('tasa').value);
    const meses = parseInt(document.getElementById('meses').value);
    const Imprimirplan = (document.getElementById('intereses').checked);  

     if(  (validarNumero(monto,'monto del préstamo' ))  ||  (validarNumero(tasaAnual,'Tasa Anual' )) || (validarNumero(meses,'Meses' )))
      {
       return; 
      }
          
    const tasaMensual = tasaAnual  / 12;
    
    const capital = monto  / meses;
    
    const interesesMensuales= (tasaMensual*monto)/100;
    
    const cuota = capital + interesesMensuales;
    
    

    document.getElementById('resultado').textContent = `Cuota Mensual: ${cuota.toFixed(2)}`;
    
    document.getElementById('valorintereses').textContent = `Valor Intereses: ${interesesMensuales.toFixed(2)}`;
    if(Imprimirplan){
    genera_plan( capital,interesesMensuales,cuota,meses  );}
}


