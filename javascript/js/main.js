

class cuota{
  constructor(capital,intereses,nrocuota){

      this.capital=capital;
      this.intereses=intereses;
      this.nrocuota=nrocuota;
  }


}


const datosClienteStorage= localStorage.getItem('datosUsuario1');
const datosCliente=JSON.parse(datosClienteStorage);
document.getElementById('nombre').textContent = "Nombre: "+ datosCliente.nombres  + " " +  datosCliente.apellidos;
document.getElementById('identificacion').textContent = "Identificacion: "+ datosCliente.id; 
document.getElementById('celular').textContent = "Celular: "+ datosCliente.celular;  
document.getElementById('direccion').textContent = "Direccion: "+ datosCliente.direccion;  
document.getElementById('correo').textContent = "Correo: "+ datosCliente.email;  





function validarNumero(valorValidar,campo){

	if ((Number.isNaN(Number.parseFloat(valorValidar))))  {
	
	          alert('El valor de ...' + campo + ' esta vacio o no es un numero ' ); 
	          return true;

            }
            
        return false;    
}


function genera_plan(capital,intereses,valor,cuotas) {
 
  const tableBody = document.getElementById('tablaplandepagosbody');
  tableBody.innerHTML = '';

  let planDePagos= new Array();

  for (let i = 1; i <= cuotas; i++) {
  
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${i}</td>
          <td>${capital.toFixed(2)}</td>
          <td>${intereses.toFixed(2)}</td>
          <td>${valor.toFixed(2)}</td>
      `;
      tableBody.appendChild(row);

    planDePagos.push(new cuota(capital,intereses,i));
    
  }

  localStorage.setItem('plandepagos', JSON.stringify(planDePagos));

  document.getElementById('tablaplandepagos').style.display = 'table';
}




document.getElementById('simulatorForm').addEventListener('submit', function(event) {
  event.preventDefault();
   
    const monto = parseFloat(document.getElementById('monto').value);
    const tasaAnual = parseFloat(document.getElementById('tasa').value);
    const meses = parseInt(document.getElementById('meses').value);
    const Imprimirplan = (document.getElementById('intereses').checked);  
    
    
    const element = document.getElementById("planpagos");
     if(element===null){
    
}else
{
  element.remove();
}
     if(  (validarNumero(monto,'monto del préstamo' ))  ||  (validarNumero(tasaAnual,'Tasa Anual' )) || (validarNumero(meses,'Meses' )))
      {
       return; 
      }
          
    const tasaMensual = tasaAnual  / 12;
    
    const capital = monto  / meses;
    
    const interesesMensuales= (tasaMensual*monto)/100;
    
    const cuota = capital + interesesMensuales;
    
    
    document.getElementById('resultText').textContent = 
    `Tu pago mensual aproximado es: $${cuota.toFixed(2)}`;

    document.getElementById('result').style.display = 'block';


    document.getElementById('valorintereses').textContent = `Valor Intereses: ${interesesMensuales.toFixed(2)}`;

    
   
    if(Imprimirplan){
    genera_plan( capital,interesesMensuales,cuota,meses  );}
    else{
      document.getElementById('tablaplandepagos').style.display = 'none';
    }
});


