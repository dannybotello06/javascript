

class cuota {
  constructor(capital, intereses, nrocuota) {

    this.capital = capital;
    this.intereses = intereses;
    this.nrocuota = nrocuota;
  }


}


class datosGenerales {
  constructor(nombres, apellidos, celular, direccion, id, email) {

    this.nombres = nombres;
    this.apellidos = apellidos;
    this.celular = celular;
    this.direccion = direccion;
    this.id = id;
    this.email = email;
  }


}


document.getElementById('datosGeneralesForm').addEventListener('submit', function (event) {
  event.preventDefault();


  const nombres = document.getElementById('nombres').value;
  const apellidos = document.getElementById('apellidos').value;
  const celular = document.getElementById('celular').value;
  const direccion = document.getElementById('direccion').value;
  const identificacion = document.getElementById('identificacion').value;
  const correo = document.getElementById('correo').value;

  const datosCliente = new datosGenerales(
    nombres,
    apellidos,
    celular,
    direccion,
    identificacion,
    correo);


  localStorage.setItem('datosUsuario1', JSON.stringify(datosCliente));


  document.getElementById('bloq1').style.display = 'none';
  document.getElementById('bloq2').style.display = 'block';

  setTimeout(function () {
    imprimirDatos()
  }, 1000)
});


function imprimirDatos() {
  const datosClienteStorage = localStorage.getItem('datosUsuario1');
  const datosClient = JSON.parse(datosClienteStorage);
  document.getElementById('nombreReporte').textContent = "Nombre: " + datosClient.nombres + " " + datosClient.apellidos;
  document.getElementById('identificacionReporte').textContent = "Identificacion: " + datosClient.id;
  document.getElementById('celularReporte').textContent = "Celular: " + datosClient.celular;
  document.getElementById('direccionReporte').textContent = "Direccion: " + datosClient.direccion;
  document.getElementById('correoReporte').textContent = "Correo: " + datosClient.email;

}



function validarNumero(valorValidar, campo) {

  if ((Number.isNaN(Number.parseFloat(valorValidar)))) {

    alert('El valor de ...' + campo + ' esta vacio o no es un numero ');
    return true;

  }

  return false;
}


function genera_plan(capital, intereses, valor, cuotas) {

  const tableBody = document.getElementById('tablaplandepagosbody');
  tableBody.innerHTML = '';

  let planDePagos = new Array();

  for (let i = 1; i <= cuotas; i++) {

    const row = document.createElement('tr');
    row.innerHTML = `
          <td>${i}</td>
          <td>${capital.toFixed(2)}</td>
          <td>${intereses.toFixed(2)}</td>
          <td>${valor.toFixed(2)}</td>
      `;
    tableBody.appendChild(row);

    planDePagos.push(new cuota(capital, intereses, i));

  }

  localStorage.setItem('plandepagos', JSON.stringify(planDePagos));

  document.getElementById('tablaplandepagos').style.display = 'table';
}




document.getElementById('simulatorForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const monto = parseFloat(document.getElementById('monto').value);
  const tasaAnual = parseFloat(document.getElementById('tasa').value);
  const meses = parseInt(document.getElementById('meses').value);
  const Imprimirplan = (document.getElementById('intereses').checked);


  const element = document.getElementById("planpagos");
  if (element === null) {

  } else {
    element.remove();
  }
  if ((validarNumero(monto, 'monto del préstamo')) || (validarNumero(tasaAnual, 'Tasa Anual')) || (validarNumero(meses, 'Meses'))) {
    return;
  }

  const tasaMensual = tasaAnual / 12;

  const capital = monto / meses;

  const interesesMensuales = (tasaMensual * monto) / 100;

  const cuota = capital + interesesMensuales;


  document.getElementById('resultText').textContent =
    `Tu pago mensual aproximado es: $${cuota.toFixed(2)}`;

  document.getElementById('result').style.display = 'block';
  document.getElementById('valorintereses').textContent = `Valor Intereses: ${interesesMensuales.toFixed(2)}`;
  document.getElementById('cardAsesor').style.display = 'block';



  if (Imprimirplan) {
    genera_plan(capital, interesesMensuales, cuota, meses);
  }
  else {
    document.getElementById('tablaplandepagos').style.display = 'none';
  }


  getDatosAsesor().then((data) =>

    renderizarAsesor(data.results));

});



async function getDatosAsesor() {
  const asesor = await fetch("https://randomuser.me/api/?results=1");
  return asesor.json();
}


function renderizarAsesor(asesores) {

  console.log(asesores);
  for (const asesor of asesores)
  {

  var imagenAsesor = document.getElementById("imagenAsesor");
  imagenAsesor.setAttribute("src", asesor.picture.thumbnail);
  document.getElementById('nombreAsesor').textContent =asesor.name.first+" "+ asesor.name.last;

  var correoAsesor = document.getElementById("correoAsesor");
  correoAsesor.setAttribute("href", "mailto:"+ asesor.email);
  

  }
}






