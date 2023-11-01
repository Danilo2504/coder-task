// Este es un sistema de boleta electronica

let candidatos = [
  {
    id: 1,
    nombre: "Javier Milei",
  },
  {
    id: 2,
    nombre: "Patricia Bullrich",
  },
  {
    id: 3,
    nombre: "Sergio Massa",
  },
  {
    id: 4,
    nombre: "Juan Schiaretti",
  },
  {
    id: 5,
    nombre: "Myriam Bregman",
  },
];

let voto = prompt(
  "Eliga uno de los siguientes candidatos. Favor de escribirlo tal cual: \n 1 - Javier Milei \n 2 - Patricia Bullrich \n 3 - Sergio Massa \n 4 - Juan Schiaretti \n 5 - Myriam Bregman"
);

const validarVoto = (voto) => {
  if (!voto) {
    alert("Ningun candidato fue seleccionado, voto invalido");
    return false;
  }
  let resultado = candidatos.find((item) => item.id === parseInt(voto));
  if (resultado) return true;
  else return false;
};

let esValido = validarVoto(voto);

if (esValido) {
  alert("Gracias por su voto");
} else {
  alert("No se encontro al candidato. Voto invalido");
}
