const readline = require('readline'); //Para leer datos desde el terminal.

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Generamos el codigo secreto.
function generarCodigo() {
  const caracteres = 'ABC123';
  let codigo = '';
  while (codigo.length < 4) {
    const caracter = caracteres[Math.floor(Math.random() * caracteres.length)];
    if (!codigo.includes(caracter)) {
      codigo += caracter;
    }
  }
  return codigo;
}

// Para validar los datos del codigo secreto.
function evaluarIntento(codigoSecreto, intento) {
  const pista = [];
  const codigoSecretoArray = codigoSecreto.split('');
  const intentoArray = intento.split('');

  intentoArray.forEach((caracter, index) => {
    if (caracter === codigoSecretoArray[index]) {
      pista.push(`Correcto`);
      codigoSecretoArray[index] = ''; // Marca el caracter como usado
    }
  });

  intentoArray.forEach((caracter, index) => {
    if (pista[index] !== 'Correcto' && codigoSecretoArray.includes(caracter)) {
      pista.push('Presente');
      const indice = codigoSecretoArray.indexOf(caracter);
      codigoSecretoArray[indice] = ''; // Marca el caracter como usado
    } else if (pista[index] === undefined) {
      pista.push('Incorrecto');
    }
  });

  return pista.join(' ');
}

// Juego
function jugar() {
  const codigoSecreto = generarCodigo();
  let intentos = 10;
  console.log('¡Bienvenido al juego del código secreto de Papá Noel!');
  console.log('Tienes 10 intentos para adivinar el código de 4 caracteres (A-C, 1-3).');

  const jugarRonda = () => {
    rl.question('Introduce tu intento: ', (intento) => {
      if (intento.length !== 4 || !/^[ABC123]{4}$/.test(intento)) {
        console.log('El código debe tener exactamente 4 caracteres segun los indicados (A-C, 1-3).');
        jugarRonda();
        return;
      }

      const pista = evaluarIntento(codigoSecreto, intento);
      console.log(pista);

      if (pista === 'Correcto Correcto Correcto Correcto') {
        console.log('¡Felicidades! Has descifrado el código. Papá Noel puede repartir los regalos.');
        rl.close();
        return;
      }

      intentos--;
      console.log(`Te quedan ${intentos} intentos.`);

      if (intentos === 0) {
        console.log('¡Lo siento! Se te acabaron los intentos. Papá Noel no podrá entregar los regalos.');
        rl.close();
      } else {
        jugarRonda();
      }
    });
  };

  jugarRonda();
}

jugar();