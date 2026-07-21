const card = document.getElementById('card');

// Estado de la invitación
const data = {
  fecha: '',
  hora: '07:00 PM',
  gustos: []
};

// Cargar Paso 1
function renderPaso1() {
  card.innerHTML = `
    <div class="badge">Pregunta Seria</div>
    <h2>¿Quieres salir el Jueves conmigo?</h2>
    <p class="subtitle">Sí o no</p>
    <div class="btn-container">
      <button onclick="renderPasoEmotivo()">Sí</button>
      <button class="btn-secondary" id="btnNo" onmouseover="esquivarNo()" onclick="esquivarNo()">No</button>
    </div>
  `;
}

// Función para que el botón "No" esquive el cursor/tap
function esquivarNo() {
  const btnNo = document.getElementById('btnNo');
  if (!btnNo) return;
  const x = Math.random() * 160 - 80;
  const y = Math.random() * 160 - 80;
  btnNo.style.transform = `translate(${x}px, ${y}px)`;
}

// Paso Intermedio: Reacción
function renderPasoEmotivo() {
  card.innerHTML = `
    <div class="badge">Momento Emotivo</div>
    <h2>espera... ¿dijiste que sí? 😃</h2>
    <p class="subtitle">no me lo creo, mira este pato</p>
    <div style="font-size: 3rem; margin: 15px 0;">🦆</div>
    <button class="btn-full" onclick="renderPaso2()">sí, dije que sí →</button>
  `;
}

// Paso 2: Fecha y Hora
function renderPaso2() {
  // Fecha por defecto: mañana
  const mañana = new Date();
  mañana.setDate(mañana.getDate() + 1);
  const fechaStr = mañana.toISOString().split('T')[0];

  card.innerHTML = `
    <div class="badge">Paso 2</div>
    <h2>¿Cuándo estás libre?</h2>
    <p class="subtitle">Elige el día y la hora</p>
    
    <div class="input-group">
      <label>Día</label>
      <input type="date" id="inputFecha" value="${fechaStr}">
    </div>
    
    <div class="input-group">
      <label>Hora</label>
      <input type="time" id="inputHora" value="19:00">
    </div>

    <button class="btn-full" onclick="guardarPaso2()">siguiente →</button>
  `;
}

function guardarPaso2() {
  data.fecha = document.getElementById('inputFecha').value;
  data.hora = document.getElementById('inputHora').value;
  renderPaso3();
}

// Paso 3: Antojos / Comida
const opcionesComida = [
  '🐟 Acuario', 
  '🍦 Helado', 
  '😅 Elegí vos porque me cuesta poner otras opciones'
];


function renderPaso3() {
  card.innerHTML = `
    <div class="badge">Paso 3</div>
    <h2>¿Qué se te antoja?</h2>
    <p class="subtitle">Toca lo que más te guste</p>
    
    <div class="grid-options">
      ${opcionesComida.map(item => `
        <div class="option-card" onclick="toggleOpcion(this, '${item}')">${item}</div>
      `).join('')}
    </div>

    <button class="btn-full" onclick="renderConfirmacion()">listo →</button>
  `;
}

function toggleOpcion(element, opcion) {
  element.classList.toggle('selected');
  if (data.gustos.includes(opcion)) {
    data.gustos = data.gustos.filter(i => i !== opcion);
  } else {
    data.gustos.push(opcion);
  }
}

// Paso Final: Confirmación
function renderConfirmacion() {
  const gustosHTML = data.gustos.map(g => `<span class="chip">${g}</span>`).join('');
  
  card.innerHTML = `
    <div class="badge">Confirmado</div>
    <h2>¡Nos vemos! 🥳</h2>
    <p class="subtitle">Nos vemos </p>
    
    <div class="car-scene">
      <div class="sun"></div>
      <div class="car">🚗</div>
      <div class="road"></div>
    </div>

    <p style="font-size: 0.85rem; font-weight: bold; margin-bottom: 5px;">
      📅 ${data.fecha || 'Pronto'} a las ⏰ ${data.hora}
    </p>
    
    <div class="chips-container">
      ${gustosHTML || '<span class="chip">✨ Plan sorpresa</span>'}
    </div>
  `;
}

// Inicializar la app
renderPaso1();
