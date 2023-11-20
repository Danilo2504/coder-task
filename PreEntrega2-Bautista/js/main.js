function Car(brand, model, year, initialPrice, status) {
  this.id = Math.ceil(Math.random() * 100);
  this.brand = brand;
  this.model = model;
  this.year = year;
  this.initialPrice = initialPrice;
  this.currentPrice = initialPrice;
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
let auto9 = new Car("Audi", "A4", 2013, 2004, "usado");
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

function auction() {
  let brand = prompt("¿A que marca pertenece?");
  if (!brand) {
    alert("Marca no válida");
    return false;
  }
  let model = prompt("¿Qué modelo es?");
  if (!model) {
    alert("Modelo no válido");
    return false;
  }
  let year = prompt("¿De que año es?");
  if (isNaN(year) || Number(year) < 1900) {
    alert("Año no válido");
    return false;
  }
  let status = prompt("¿Cuál es el estado (nuevo, usado)?");
  if (!status) {
    alert("Estado no válido");
    return false;
  }
  let initialPrice = prompt("¿Cuanto es el precio inicial?");
  if (isNaN(initialPrice) || Number(initialPrice) < 0) {
    alert("Precio Inicial no es válido");
    return false;
  }

  let data = new Car(brand, model, year, initialPrice, status);
  car.listCar.push(data);

  alert("Gracias por subastar su auto en Autoventa Subastas");
}

function searchCar(keyWord) {
  let matches = car.listCar.filter(
    (car) =>
      car.brand.toLowerCase().startsWith(keyWord.toLowerCase()) ||
      car.model.toLowerCase().startsWith(keyWord.toLowerCase()) ||
      car.status.toLowerCase().startsWith(keyWord.toLowerCase())
  );

  if (matches.length) {
    let matchesListed = matches
      .map((car, index) => {
        return `${index + 1}- ${car.brand} ${car.model} ${
          car.year
        } (${car.status.toUpperCase()}) al precio de $${car.currentPrice}`;
      })
      .join("\n");

    let carSelected = prompt(
      `Elija uno de los siguientes resultados:\n${matchesListed}`
    );

    if (Number(carSelected) > 0 && Number(carSelected) <= matches.length) {
      return matches[carSelected - 1];
    } else {
      alert("No es una opción válida");
      return false;
    }
  } else {
    alert("No hay resultados");
    return false;
  }
}

function makeAnOffer(carId, offer) {
  let carInfo = car.listCar.find((car) => car.id === carId);

  if (carInfo.currentPrice < Number(offer)) {
    car.listCar.map((car) => {
      if (car.id == carId) {
        return (car.currentPrice = offer);
      }
      return car;
    });
    alert("Se hizo una oferta");
    return carId;
  } else {
    alert("No es una oferta válida");
    return false;
  }
}

function winningOffer(carId) {
  let carInfo = car.listCar.find((car) => car.id === carId);
  if (carInfo.currentPrice >= carInfo.initialPrice * 3) {
    let newList = car.listCar.filter((car) => car.id !== carId);
    car.listCar = newList;
    alert(
      `El auto ${carInfo.brand} ${carInfo.model} ${
        carInfo.year
      } (${carInfo.status.toUpperCase()}) fue vendido por $${
        carInfo.currentPrice
      }`
    );
    return true;
  } else {
    alert("Ups! La subasta aún sigue en pie");
    return false;
  }
}

alert(
  "Bienvendio a Autoventa Subastas. El sitio web donde puede ofertar o subastar autos"
);

while (isRunning) {
  let homeOption = prompt(
    "¿Qué desea realizar?\n 1- Subastar\n 2- Ofertar\n 3- Salir"
  );

  switch (homeOption) {
    case "1":
      {
        alert("Acontinuación rellena el siguiente formulario");
        auction();
      }
      break;
    case "2":
      {
        let keyWord = prompt(
          `Escribe el modelo, marca o estado del auto que desea buscar:`
        );
        let match = searchCar(keyWord);
        if (match) {
          let amount = prompt(
            `¿Quieres llevarte un ${match.brand} ${match.model} ${match.year} (${match.status})?\n Ingrese un monto superior a $${match.currentPrice}`
          );

          let myOffer = makeAnOffer(match.id, amount);
          if (myOffer) {
            winningOffer(match.id);
          }
        }
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
