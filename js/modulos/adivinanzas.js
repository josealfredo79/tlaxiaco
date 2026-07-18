var Adivinanzas = (function() {
  var data = [
    { q: "Tengo 4 patas por la mañana, 2 al mediodía y 3 por la noche. ¿Qué soy?", answer: "El ser humano (bebé, adulto, anciano)", hint: "Es un ser que camina", icon: "🚶" },
    { q: "Blanca por dentro, verde por fuera. Si no me conoces, te equivocas de especie. ¿Qué soy?", answer: "El maíz", hint: "Se cultiva en la Mixteca", icon: "🌽" },
    { q: "Vuelo de noche, duermo de día, nunca veo la luz. ¿Qué soy?", answer: "El búho (lechuza)", hint: "Animal nocturno", icon: "🦉" },
    { q: "Llueva o truene, siempre estoy en mi lugar. ¿Qué soy?", answer: "La tierra / el cerro", hint: "Estás parado sobre mí", icon: "⛰️" },
    { q: "Cuanto más seco, más vale. Los abuelos lo guardan con cariño. ¿Qué soy?", answer: "El chile seco", hint: "Se usa en la cocina mixteca", icon: "🌶️" },
    { q: "Camino sin piernas, sueno sin boca. ¿Qué soy?", answer: "El viento", hint: "Pasa entre los cerros", icon: "💨" },
    { q: "Nace en la milpa, vive en la olla, muere en la boca. ¿Qué soy?", answer: "La tortilla / el maíz cocido", hint: "Alimento básico", icon: "🫓" },
    { q: "Mis hermanos son muchos, pero cada uno tiene cara diferente. ¿Qué soy?", answer: "Los glifos del calendario", hint: "Son 20 signos", icon: "🏺" },
    { q: "Cuanto más antigua, más vale. Cuenta historias sin hablar. ¿Qué soy?", answer: "La memoria / los códices", hint: "Se escriben en piel de venado", icon: "📖" },
    { q: "Llega sin que lo veas, se va sin que lo sientas. ¿Qué soy?", answer: "El tiempo", hint: "Los abuelos lo miden con el calendario", icon: "⏰" }
  ];

  var current = 0, revealed = false;

  function init() { current = 0; revealed = false; render(); }

  function render() {
    var item = data[current];
    var total = data.length;
    var html = '<div class="content-header"><button class="back-btn" onclick="App.go(\'menu\')">←</button>' +
      '<h2>🤔 Adivinanzas</h2><div class="quiz-score">' + (current+1) + '/' + total + '</div></div>' +
      '<div class="progress-bar"><div class="progress-fill" style="width:' + ((current+1)/total*100) + '%"></div></div>' +
      '<div class="glyph-display"><div class="glyph-big">' + item.icon + '</div></div>' +
      '<div class="quiz-card"><p class="quiz-question" style="font-style:italic;text-align:center">' + item.q + '</p></div>' +
      '<button class="btn btn-outline btn-sm" id="adivHint" onclick="Adivinanzas.showHint()" style="width:100%;max-width:400px">💡 Pista</button>' +
      '<div class="quiz-feedback" id="adivFb" style="margin-top:8px"></div>' +
      '<button class="btn" id="adivReveal" onclick="Adivinanzas.reveal()" style="width:100%;max-width:400px;margin-top:8px">👀 Ver Respuesta</button>' +
      '<div class="content-nav" style="margin-top:8px"><button class="btn btn-outline btn-sm" onclick="Adivinanzas.prev()" style="visibility:' + (current===0?'hidden':'visible') + '">← Anterior</button>' +
      '<button class="btn btn-sm" onclick="Adivinanzas.next()">' + (current===total-1?'✓ Terminar':'Siguiente →') + '</button></div>';

    document.getElementById('adivinanzasContent').innerHTML = html;
  }

  function showHint() {
    var fb = document.getElementById('adivFb');
    fb.className = 'quiz-feedback show';
    fb.style.background = 'rgba(212,160,23,.1)';
    fb.style.color = '#D4A017';
    fb.style.border = '1px solid rgba(212,160,23,.3)';
    fb.innerHTML = '💡 ' + data[current].hint;
  }

  function reveal() {
    var fb = document.getElementById('adivFb');
    fb.className = 'quiz-feedback show correct';
    fb.innerHTML = '✅ ' + data[current].answer;
  }

  function next() {
    if (current < data.length-1) { current++; revealed=false; render(); }
    else {
      Progreso.completeModule('adivinanzas', 10);
      document.getElementById('adivinanzasContent').innerHTML =
        '<div class="result-screen">' +
          '<div class="result-icon">🤔</div>' +
          '<h2 style="font-family:Cinzel;color:#D4A017">¡Adivinanzas Completadas!</h2>' +
          '<p style="color:#C25B28;margin:8px 0">Resolviste ' + data.length + ' adivinanzas de la Mixteca</p>' +
          '<div class="result-stats">' +
            '<div class="stat-box"><div class="stat-val">' + data.length + '</div><div class="stat-label">Adivinanzas</div></div>' +
            '<div class="stat-box"><div class="stat-val">+10</div><div class="stat-label">Monedas</div></div>' +
          '</div>' +
          '<button class="btn" onclick="App.go(\'menu\')">Volver al Menú</button>' +
        '</div>';
    }
  }

  function prev() { if (current > 0) { current--; revealed=false; render(); } }

  return { init: init, next: next, prev: prev, showHint: showHint, reveal: reveal };
})();
