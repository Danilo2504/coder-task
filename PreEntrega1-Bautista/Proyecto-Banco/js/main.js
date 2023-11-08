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

const operaciones = (usuario) => {
  while (isLogged) {
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
    }
  }
};

const verSaldo = (usuario) => {
  if (!usuario.dinero) {
    alert("No tenes dinero");
    isLogged = true;
  } else if (Number(usuario.dinero) >= 0) {
    alert(`Su Saldo es de ${usuario.dinero}`);
    isLogged = true;
  }
};

const depositarDinero = (monto, usuario) => {
  if (Number(monto)) {
    let dineroActual = usuario.dinero + Number(monto);

    usuarios = usuarios.map(function (item) {
      if (item.id === usuario.id) {
        item.dinero = dineroActual;
      }
      return item;
    });

    alert(`Deposito realizado con exito, su saldo es de: ${dineroActual}`);
    isLogged = true;
  } else {
    alert("Ocurrio un error. Vuelva a intentarlo");
    isLogged = true;
  }
};

const extraerDinero = (monto, usuario) => {
  if (usuario.dinero < Number(monto)) {
    alert("Saldo insuficiente. Vuelva a intentarlo");
    isLogged = true;
  }
  let dineroActual = usuario.dinero - Number(monto);

  usuarios = usuarios.map(function (item) {
    if (item.id === usuario.id) {
      item.dinero = dineroActual;
    }
    return item;
  });

  alert(`Extracción realizada con exito, su saldo es de: ${dineroActual}`);
  isLogged = true;
};

const cerrarSesion = () => {
  alert("Gracias por su visita");
  isLogged = false;
};

const iniciarSesion = (nombre, contraseña) => {
  if (!nombre) {
    alert("Necesita un nombre");
    isLogged = false;
  } else if (!contraseña) {
    alert("Necesita su contraseña");
    isLogged = false;
  } else {
    let result = usuarios.filter(
      (item) => item.nombre === nombre && item.contraseña === contraseña
    );
    if (result[0]) {
      isLogged = true;
      return result[0];
    } else isLogged = false;
  }
};

const crearCuenta = (nombre, contraseña) => {
  if (!nombre) {
    alert("Necesita un nombre");
    isLogged = false;
  } else if (!contraseña) {
    alert("Necesita su contraseña");
    isLogged = false;
  } else if (contraseña.length < 5) {
    alert("Contraseña muy corta");
    isLogged = false;
  } else {
    let nuevoUsuario = new Usuario(nombre, contraseña, 0);
    usuarios.push(nuevoUsuario);
    isLogged = true;
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

  if (!isLogged) alert("Datos incorrectos");

  operaciones(usuario);
} else if (inicio === "2") {
  let nombre = prompt("Ingrese su nombre");
  let contraseña = prompt(
    "Ingrese su contraseña. Debe ser de mas de 5 caracteres de longitud"
  );

  let usuario = crearCuenta(nombre, contraseña);

  if (!isLogged) alert("Datos incorrectos");

  operaciones(usuario);
}
