/* PinkCode — app.js, Lógica principal da aplicação  */

/* ── ELEMENTOS DO DOM ── */
const editor          = document.getElementById('editor');
const output          = document.getElementById('output');
const lang            = document.getElementById('lang');
const numLinhasOutput = document.getElementById('num-linhas-output');
const numLinhasEditor = document.getElementById('num-linhas-editor');
const numLinhas       = document.getElementById('num-linhas');
const numChars        = document.getElementById('num-chars');
const btnCopiar       = document.getElementById('btn-copiar');
const btnTema         = document.getElementById('btn-tema');
const btnLimpar       = document.getElementById('btn-limpar');
const btnGuardar      = document.getElementById('btn-guardar');

/* ── ESTATÍSTICAS ──
   Atualiza o contador de linhas e caracteres em tempo real
   ── */
function atualizarStats() {
  const codigo = editor.value;
  const linhas = codigo === '' ? 0 : codigo.split('\n').length;
  const chars  = codigo.length;
  numLinhas.textContent = linhas + ' linhas';
  numChars.textContent  = chars + ' caracteres';
}

/* ── NÚMEROS DE LINHA ── */

function atualizarNumLinhas(codigo) {
  const linhas = codigo === '' ? 0 : codigo.split('\n').length;
  let html = '';
  for (let i = 1; i <= linhas; i++) {
    html += i + '<br>';
  }
  numLinhasOutput.innerHTML = html;
  numLinhasEditor.innerHTML = html;
}

/* ── HIGHLIGHT ── */

function destacar() {
  const codigo    = editor.value;
  const resultado = hljs.highlight(codigo, { language: lang.value });
  output.innerHTML = resultado.value;
  atualizarStats();
  atualizarNumLinhas(codigo);
}

/* ── EVENTOS ── */


editor.addEventListener('input', destacar);


lang.addEventListener('change', destacar);


btnCopiar.addEventListener('click', function() {
  navigator.clipboard.writeText(editor.value);
  btnCopiar.textContent = 'Copiado!';
  setTimeout(function() {
    btnCopiar.textContent = 'Copiar';
  }, 2000);
});

btnTema.addEventListener('click', function() {
  document.body.classList.toggle('tema-claro');
  btnTema.textContent = document.body.classList.contains('tema-claro')
    ? 'Tema escuro'
    : 'Tema claro';
});


btnLimpar.addEventListener('click', function() {
  editor.value          = '';
  output.innerHTML      = '';
  numLinhasOutput.innerHTML = '';
  numLinhasEditor.innerHTML = '';
  atualizarStats();
});


btnGuardar.addEventListener('click', function() {
  localStorage.setItem('pinkcode-codigo', editor.value);
  localStorage.setItem('pinkcode-lang',   lang.value);
  btnGuardar.textContent = 'Guardado!';
  setTimeout(function() {
    btnGuardar.textContent = 'Guardar';
  }, 2000);
});

/* ── LOCALSTORAGE ── */

const codigoGuardado = localStorage.getItem('pinkcode-codigo');
const langGuardada   = localStorage.getItem('pinkcode-lang');

if (codigoGuardado) {
  editor.value = codigoGuardado;
  lang.value   = langGuardada || 'javascript';
  destacar();
  atualizarStats();
}

/* ── PARTÍCULAS ---*/

particlesJS('particles', {
  particles: {
    number:      { value: 80 },
    color:       { value: '#ff69b4' },
    shape:       { type: 'circle' },
    opacity:     { value: 0.5, random: true },
    size:        { value: 3, random: true },
    line_linked: {
      enable:   true,
      distance: 150,
      color:    '#ff69b4',
      opacity:  0.2,
      width:    1
    },
    move: {
      enable: true,
      speed:  1.5,
      random: true
    }
  },
  interactivity: {
    events: {
      onhover: { enable: true, mode: 'grab' },
      onclick: { enable: true, mode: 'push' }
    }
  }
});

