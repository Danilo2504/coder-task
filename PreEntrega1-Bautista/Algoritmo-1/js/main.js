// Este es un formulario de empadronamiento

let continuar = confirm(
  "Bienvendo al sistema de empadronamiento. Debe rellenar el siguiente formulario para empadronarse"
);

while (continuar) {
  let userNombre = prompt("Ingresu su nombre");
  let userEdad = prompt("Ingrese su edad");
  let userDNI = prompt("Ingrese su DNI");

  if (!userNombre) {
    alert("Ningun nombre fue ingresado");
    continuar = confirm("¿Desea intentarlo de nuevo?");
  } else if (userEdad.match(/\d/)) {
    alert("Edad debe ser un numero");
    continuar = confirm("¿Desea intentarlo de nuevo?");
  } else if (parseInt(userEdad) < 16) {
    alert("Debes ser mayor de 16 años para votar");
    continuar = confirm("¿Desea intentarlo de nuevo?");
  } else if (userDNI.length < 8) {
    alert("DNI incorrecto");
    continuar = confirm("¿Desea intentarlo de nuevo?");
  } else if (userDNI.match(/\d/)) {
    alert("DNI no existente");
    continuar = confirm("¿Desea intentarlo de nuevo?");
  } else {
    alert("Gracias por empadronarse!");
    continuar = false;
  }
}
