// Banco digital

class Usuario {
  constructor(nombre, dni, dinero, contraseña) {
    this.nombre = nombre;
    this.dni = dni;
    this.dinero = dinero;
    this.contraseña = contraseña;
  }

  crearCuenta(nombre, dni, contraseña) {
    if (!nombre) {
      alert("Usuario no encontrado");
      return false;
    }
    if (!dni.match(/\d/)) {
      alert("dni no valido");
      return false;
    }
    if (!contraseña) {
      alert("Ingrese su contraseña por favor");
      return false;
    }
    if (contraseña.length < 5) {
      alert("Contraseña muy corta");
      return false;
    }
    return true;
  }

  login(nombre, contraseña) {
    if (!nombre) {
      alert("Usuario no encontrado");
      return false;
    }
    if (!contraseña) {
      alert("Ingrese su contraseña por favor");
      return false;
    }
    if (contraseña.length < 5) {
      alert("Contraseña muy corta");
      return false;
    }
    return true;
  }

  operaciones() {
    let opcion = prompt(
      "Bienvenido, ¿Que operación desea realizar? \n 1 - Ver Saldo\n 2 - Depositar dinero\n 3 - Extraer Dinero"
    );

    if (opcion === "1") {
      this.verSaldo();
    } else if (opcion === "2") {
      let monto = prompt("Ingrese la cantidad a depositar");
      this.depositarDinero(monto);
    } else if (opcion === "3") {
      let monto = prompt("Ingrese la cantidad a extaer");
      this.extraerDinero(monto);
    }
  }

  verSaldo() {
    if (!this.dinero) {
      return alert("No tenes dinero");
    } else if (parseInt(this.dinero) >= 0) {
      return alert(`Su Saldo es de ${this.dinero}`);
    }
  }

  depositarDinero(monto) {
    if (monto.match(/\d/)) {
      let dineroActual = parseInt(this.dinero) + parseInt(monto);
      return alert(
        `Deposito realizado con exito, su saldo es de: ${dineroActual}`
      );
    }
  }

  extraerDinero(monto) {
    if (monto.match(/\d/)) {
      if (this.dinero < monto) return alert("Saldo insuficiente");
      let dineroActual = parseInt(this.dinero) - parseInt(monto);
      return alert(
        `Extracción realizada con exito, su saldo es de: ${dineroActual}`
      );
    }
  }
}

let inicio = prompt(
  "Bienvenido a ArgenBank, ¿Que desea hacer? \n 1 - Iniciar sesion\n 2 - Crear una cuenta"
);

if (inicio === "1") {
  let nombre = prompt("Ingrese su nombre de usuario");
  let contraseña = prompt("Ingrese su contraseña");

  let usario = new Usuario(nombre, "", "0", contraseña);

  if (!usario.login(nombre, contraseña)) alert("Datos incorrectos");
  usario.operaciones();
} else if (inicio === "2") {
  let nombre = prompt("Ingrese su nombre");
  let dni = prompt("Ingrese su dni");
  let contraseña = prompt(
    "Ingrese su contraseña. Debe ser de mas de 5 caracteres de longitud"
  );
  let usuario = new Usuario(nombre, dni, "0", contraseña);
  let bandera = usuario.crearCuenta(nombre, dni, contraseña);
  if (!bandera) {
    alert("Falló al crear cuenta");
  } else {
    usuario.operaciones();
  }
}
