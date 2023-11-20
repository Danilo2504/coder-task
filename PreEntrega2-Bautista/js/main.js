function Car(brand, model, year, price, status) {
  this.id = Math.ceil(Math.random() * 100);
  this.brand = brand;
  this.model = model;
  this.year = year;
  this.price = price;
  this.status = status;
  this.listCar = [];
}

let car = new Car();

let auto1 = new Car("Toyota", "Corolla", 2005, 3500, "nuevo");
let auto2 = new Car("Ford", "Mustang", 2007, 2000, "usado");
let auto3 = new Car("BMW", "X5", 2010, 4500, "nuevo");
let auto4 = new Car("Chevrolet", "Camaro", 2012, 4020, "nuevo");
let auto5 = new Car("Mercedes Benz", "GLE", 2008, 2800, "usado");
let auto6 = new Car("Ford", "Escape", 2014, 3910, "nuevo");
let auto7 = new Car("Tesla", "Model s", 2011, 5600, "usado");
let auto8 = new Car("Nissan", "Altima", 2009, 4502, "usado");
let auto9 = new Car("Audi", "A4", 2013, 2040, "usado");
let auto10 = new Car("BMW", "Serie 5", 2006, 3201, "nuevo");
let auto11 = new Car("Chevrolet", "Equinox", 2015, 2040, "nuevo");
let auto12 = new Car("Mercedes Benz", "Clase E", 2002, 4500, "nuevo");

car.listCar = [
  auto1,
  auto2,
  auto3,
  auto4,
  auto5,
  auto6,
  auto7,
  auto8,
  auto9,
  auto10,
  auto11,
  auto12,
];

let isRunning = true;

//Esta función es para subastar un car. Al finalizar se agrega a la lista
//de autos en subasta
function auction() {
  let brand = prompt("¿A que marca pertenece?");
  if (!brand) return alert("Marca no válida");
  let model = prompt("¿Que modelo es?");
  if (!model) return alert("Modelo no válido");
  let year = prompt("¿De que año es?");
  if (isNaN(year) || Number(year) < 1900) return alert("Año no válido");
  let status = prompt("¿Cual es el estado (nuevo, usado)?");
  if (!status) return alert("Estado no válido");
  let initialOffer = prompt("¿Cuanto quieres de oferta inicial?");
  if (isNaN(initialOffer) || Number(initialOffer) < 0)
    return alert("Oferta Inicial no válido");

  let data = new Car(brand, model, year, initialOffer, status);
  car.listCar.push(data);

  alert("Gracias por subastar su auto en Autoventa Subastas");
}

// Esta función busca en la lista de autos por la palabra ingresada.
function searchCar(option) {
  let results = car.listCar.filter(
    (car) =>
      car.brand.toLowerCase().startsWith(option.toLowerCase()) ||
      car.model.toLowerCase().startsWith(option.toLowerCase()) ||
      car.status.toLowerCase().startsWith(option.toLowerCase())
  );

  if (!results.length) return alert("No hay resultados");

  let resultsListed = results
    .map((car, index) => {
      return `${index + 1}- Marca: ${car.brand}, Modelo: ${car.model}, Año: ${
        car.year
      }, Estado: ${car.status.toUpperCase()}, Precio Base: $${car.price}`;
    })
    .join("\n");

  let optionSelected = prompt(
    `Elija uno de los siguientes resultados:\n${resultsListed}`
  );

  if (
    isNaN(optionSelected) ||
    Number(optionSelected) <= 0 ||
    Number(optionSelected) > results.length
  ) {
    return alert("No es una opción válida");
  }

  let selectedCar = results[Number(optionSelected) - 1];
  generateFakeOffer(selectedCar);
}

//Esta función genera una puja falsa. Es para darle realismo.
//Si la puja falsa no es valida se procede con el precio inicial del car.
function generateFakeOffer(selectedCar) {
  let currentSeconds = new Date().getSeconds();
  let fakeOffer = currentSeconds % 2 === 0;

  if (fakeOffer) {
    let fakeAmount = Math.floor(Math.random() * 1000 + selectedCar.price);
    if (fakeAmount <= selectedCar.price) return false;
    let amount = prompt(
      `Hay una oferta de otro usuario en pie por el auto ${selectedCar.brand} ${
        selectedCar.model
      } ${
        selectedCar.year
      } ${selectedCar.status.toUpperCase()}.\nLa oferta es de $${fakeAmount}\nIngrese una oferta mayor:`
    );
    makeAnOffer(fakeAmount, amount, selectedCar.id);
  } else {
    let amount = prompt(
      `La oferta inicial del auto ${selectedCar.brand} ${selectedCar.model} ${
        selectedCar.year
      } ${selectedCar.status.toUpperCase()} es de $${
        selectedCar.price
      }. Ingrese una oferta mayor: `
    );
    makeAnOffer(selectedCar.price, amount, selectedCar.id);
  }
}

//Esta función maneja las validaciones de los precios
//Si todo sale bien hace la oferta y quita el auto de la lista.
function makeAnOffer(price, amount, carId) {
  if (isNaN(amount) || Number(amount) === 0) return alert("Oferta no válida");
  if (Number(amount) <= price) {
    return alert("Oferta insuficiente. Ponele voluntad!");
  } else if (Number(amount) > price) {
    let selectedCar = car.listCar.find((car) => car.id == carId);
    let newList = car.listCar.filter((car) => car.id !== carId);
    car.listCar = newList;
    alert(
      `El auto ${selectedCar.brand} ${selectedCar.model} ${
        selectedCar.year
      } ${selectedCar.status.toUpperCase()} ha sido vendido a usted.`
    );
  } else return alert("No se que hiciste para llegar aca");
}

alert(
  "Bienvendio a Autoventa Subastas. El sitio web donde puede ofertar o subastar autos"
);

while (isRunning) {
  let homeOption = prompt(
    "¿Que desea realizar?\n 1- Subastar\n 2- Ofertar\n 3- Salir"
  );

  switch (homeOption) {
    case "1":
      {
        alert("Acountinuación complete el siguiente formulario");
        auction();
      }
      break;
    case "2":
      {
        let option = prompt(
          `Escribe el modelo, marca o estado del auto que desea buscar:`
        );
        searchCar(option);
      }
      break;
    case "3": {
      isRunning = false;
      alert("Adios");
      break;
    }
    default:
      alert("Ninguna opción fue seleccionada");
  }
}
