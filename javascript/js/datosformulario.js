
class datosGenerales{
    constructor(nombres,apellidos,celular,direccion,id,email){

        this.nombres=nombres;
        this.apellidos=apellidos;
        this.celular=celular;
        this.direccion=direccion;
        this.id=id;
        this.email=email;
    }


}


document.getElementById('datosGeneralesForm').addEventListener('submit', function(event) {
    event.preventDefault(); 


    const nombres = document.getElementById('nombres').value;
    const apellidos = document.getElementById('apellidos').value;
    const celular = document.getElementById('celular').value;
    const direccion = document.getElementById('direccion').value;
    const identificacion = document.getElementById('identificacion').value;
    const correo = document.getElementById('correo').value;

   const datosCliente =  new datosGenerales(
        nombres,
        apellidos,
        celular,
        direccion,
        identificacion,
        correo);
    

    localStorage.setItem('datosUsuario1', JSON.stringify(datosCliente));


    window.location.href = "calculoCredito.html";

});












