// Banco digital

class Usuario {
  constructor(nombre, contraseña, dinero) {
    this.id = Math.floor(Math.random() * 999) + 1;
    this.nombre = nombre;
    this.contraseña = contraseña;
    this.dinero = dinero;
  }
}

const user1 = new Usuario("Gustavo", "contra123", 500);
const user2 = new Usuario("Charly", "click", 850);
const user3 = new Usuario("Sergio", "ramos", 1000);
const user4 = new Usuario("Tony", "password", 300);

let usuarios = [user1, user2, user3, user4];

let isLogged = false;
let isRunning = true;

const operaciones = (usuario) => {
  while (isRunning) {
    let opcion = prompt(
      "Bienvenido, ¿Que operación desea realizar? \n 1 - Ver Saldo\n 2 - Depositar dinero\n 3 - Extraer Dinero\n 4 - Cerrar sesión"
    );

    if (opcion === "1") {
      verSaldo(usuario);
    } else if (opcion === "2") {
      let monto = prompt("Ingrese la cantidad a depositar");
      depositarDinero(monto, usuario);
    } else if (opcion === "3") {
      let monto = prompt("Ingrese la cantidad a extaer");
      extraerDinero(monto, usuario);
    } else if (opcion === "4") {
      cerrarSesion();
    } else {
      alert("Ninguna opción fue seleccionada. Vuelva a intentarlo");
    }
  }
};

const verSaldo = (usuario) => {
  if (!usuario.dinero) {
    alert("No tenes dinero. Vuelva a intentarlo");
  } else if (Number(usuario.dinero) >= 0) {
    alert(`Su Saldo es de ${usuario.dinero}`);
  } else {
    alert("Ocurrio un error. Vuelva a intentarlo");
  }
};

const depositarDinero = (monto, usuario) => {
  if (Number(monto)) {
    let dineroActual = usuario.dinero + Number(monto);

    let nuevosDatos = usuarios.map(function (item) {
      if (item.id === usuario.id) {
        item.dinero = dineroActual;
      }
      return item;
    });

    usuarios = nuevosDatos;

    alert(`Deposito realizado con exito, su saldo es de: ${dineroActual}`);
  } else {
    alert("Ocurrio un error. Vuelva a intentarlo");
  }
};

const extraerDinero = (monto, usuario) => {
  if (usuario.dinero < Number(monto)) {
    alert("Saldo insuficiente. Vuelva a intentarlo");
  } else if (Number(monto) > 0) {
    let dineroActual = usuario.dinero - Number(monto);

    let nuevosDatos = usuarios.map(function (item) {
      if (item.id === usuario.id) {
        item.dinero = dineroActual;
      }
      return item;
    });

    usuarios = nuevosDatos;

    alert(`Extracción realizada con exito, su saldo es de: ${dineroActual}`);
  } else {
    alert("Ocurrio un error. Vuelva a intentarlo");
  }
};

const cerrarSesion = () => {
  alert("Gracias por su visita");
  isLogged = false;
  isRunning = false;
};

const iniciarSesion = (nombre, contraseña) => {
  if (!nombre) {
    alert("Necesita un nombre");
  } else if (!contraseña) {
    alert("Necesita su contraseña");
  } else {
    let result = usuarios.filter(
      (item) => item.nombre === nombre && item.contraseña === contraseña
    );
    if (result[0]) {
      isLogged = true;
      return result[0];
    } else {
      alert("Error en las credenciales. Vuelva a intentarlo");
    }
  }
};

const crearCuenta = (nombre, contraseña) => {
  if (!nombre) {
    alert("Necesita un nombre");
  } else if (!contraseña) {
    alert("Necesita su contraseña");
  } else if (contraseña.length < 5) {
    alert("Contraseña muy corta");
  } else {
    let nuevoUsuario = new Usuario(nombre, contraseña, 0);
    usuarios.push(nuevoUsuario);
    isLogged = true;
    console.log(usuarios);
    return nuevoUsuario;
  }
};

let inicio = prompt(
  "Bienvenido a ArgenBank, ¿Que desea hacer? \n 1 - Iniciar sesion\n 2 - Crear una cuenta"
);

if (inicio === "1") {
  let nombre = prompt("Ingrese su nombre de usuario");
  let contraseña = prompt("Ingrese su contraseña");

  let usuario = iniciarSesion(nombre, contraseña);

  if (!isLogged) {
    isRunning = false;
  } else {
    operaciones(usuario);
  }
} else if (inicio === "2") {
  let nombre = prompt("Ingrese su nombre");
  let contraseña = prompt(
    "Ingrese su contraseña. Debe ser de mas de 5 caracteres de longitud"
  );

  let usuario = crearCuenta(nombre, contraseña);

  if (!isLogged) {
    isRunning = false;
  } else {
    operaciones(usuario);
  }
} else {
  alert("Ninguna opción fue seleccionada. Gracias por su visita");
}
