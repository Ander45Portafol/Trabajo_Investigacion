const formulario = document.getElementById("formulario");
const inputNombre = document.getElementById("inputNombre");
const inputEmail = document.getElementById("inputEmail");
const inputTelefono = document.getElementById("inputTelefono");
const inputDui = document.getElementById("inputDui");
const tablaCuerpo = document.getElementById("tablaCuerpo");

const registros = [];

// Solo letras y espacios
const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

// Formato exacto ####-####
const regexTelefono = /^\d{4}-\d{4}$/;

// Formato exacto ########-#
const regexDui = /^\d{8}-\d$/;

// RegEx estándar para correo electrónico
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

inputTelefono.addEventListener("input", function (e) {
  let valor = e.target.value.replace(/\D/g, ""); // Eliminar caracteres no numéricos
  if (valor.length > 4) {
    valor = valor.substring(0, 4) + "-" + valor.substring(4, 8);
  }
  e.target.value = valor;
});

// 3. Formateo en tiempo real para DUI
inputDui.addEventListener("input", function (e) {
  let valor = e.target.value.replace(/\D/g, ""); // Eliminar caracteres no numéricos
  if (valor.length > 8) {
    valor = valor.substring(0, 8) + "-" + valor.substring(8, 9);
  }
  e.target.value = valor;
});

formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  const nombreLimpio = inputNombre.value.replace(/\s+/g, " ").trim();
  inputNombre.value = nombreLimpio;

  const email = inputEmail.value.trim();
  const telefono = inputTelefono.value.trim();
  const dui = inputDui.value.trim();

  let esValido = true;

  // Validar Nombre
  if (!regexNombre.test(nombreLimpio) || nombreLimpio === "") {
    inputNombre.classList.add("is-invalid");
    inputNombre.classList.remove("is-valid");
    esValido = false;
  } else {
    inputNombre.classList.add("is-valid");
    inputNombre.classList.remove("is-invalid");
  }

  // Validar Correo
  if (!regexEmail.test(email)) {
    inputEmail.classList.add("is-invalid");
    inputEmail.classList.remove("is-valid");
    esValido = false;
  } else {
    inputEmail.classList.add("is-valid");
    inputEmail.classList.remove("is-invalid");
  }

  // Validar Teléfono
  if (!regexTelefono.test(telefono)) {
    inputTelefono.classList.add("is-invalid");
    inputTelefono.classList.remove("is-valid");
    esValido = false;
  } else {
    inputTelefono.classList.add("is-valid");
    inputTelefono.classList.remove("is-invalid");
  }

  // Validar DUI
  if (!regexDui.test(dui)) {
    inputDui.classList.add("is-invalid");
    inputDui.classList.remove("is-valid");
    esValido = false;
  } else {
    inputDui.classList.add("is-valid");
    inputDui.classList.remove("is-invalid");
  }

  if (esValido) {
    registros.push({ nombre: nombreLimpio, email, telefono, dui });

    renderizarTabla();

    formulario.reset();
    [inputNombre, inputEmail, inputTelefono, inputDui].forEach((input) => {
      input.classList.remove("is-valid", "is-invalid");
    });
  }
});

function renderizarTabla() {
  if (registros.length === 0) return;

  tablaCuerpo.innerHTML = "";

  registros.forEach((registro, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${registro.nombre}</td>
            <td>${registro.email}</td>
            <td>${registro.telefono}</td>
            <td>${registro.dui}</td>
          `;
    tablaCuerpo.appendChild(fila);
  });
}
