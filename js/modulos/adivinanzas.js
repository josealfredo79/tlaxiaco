var Adivinanzas = (function() {
  var data = [
    { q: "Tengo 4 patas por la mañana, 2 al mediodía y 3 por la noche. ¿Qué soy?", answer: "El ser humano (bebé, adulto, anciano)", hint: "Es un ser que camina", icon: "🚶" },
    { q: "Blanca por dentro, verde por fuera. Si no me conoces, te equivocas de especie. ¿Qué soy?", answer: "El maíz", hint: "Se cultiva en la Mixteca", icon: "🌽" },
    { q: "Vuelo de noche, duermo de día, nunca veo la luz. ¿Qué soy?", answer: "El búho (lechuza)", hint: "Animal nocturno", icon: "🦉" },
    { q: "Llueva o truene, siempre estoy en mi lugar. ¿Qué soy?", answer: "La tierra / el cerro", hint: "Estás parado sobre mí", icon: "⛰️" },
    { q: "Cuanto más seco, más vale. Los abuelos lo guardan con cariño. ¿Qué soy?", answer: "El chile seco", hint: "Se usa en la cocina mixteca", icon: "🌶️" },
    { q: "Camino sin piernas, sueno sin boca. ¿Qué soy?", answer: "El viento", hint: "Pasa entre los cerros", icon: "💨" },
    { q: "Nace en la milpa, vive en la olla, muere en la boca. ¿Qué soy?", answer: "El tortilla / el maíz cocido", hint: "Alimento básico", icon: "🫓" },
    { q: "Mis hermanos son muchos, pero cada uno tiene cara diferente. ¿Qué soy?", answer: "Los glifos del calendario", hint: "Son 20 signos", icon: "🏺" },
    { q: "Cuanto más antigua, más vale. Cuenta historias sin hablar. ¿Qué soy?", answer: "La memoria / los códices", hint: "Se escriben en piel de venado", icon: "📖" },
    { q: "Llega sin que lo veas, se va sin que lo sientas. ¿Qué soy?", answer: "El tiempo", hint: "Los abuelos lo miden con el calendario", icon: "⏰" }
  ];

  var current = 0, revealed = false;

  function init() { current = 0; revealed = false; render(); }

  function render() {
    var item = data[current];
    var total = data.length;
    var html = '<div class="c-hdr"><button class="back" onclick="App.go(\'menu\')">←</button>' +
      '<h2>🤔 Adivinanzas</h2><div class="c-score">' + (current+1) + '/' + total + '</div></div>' +
      '<div class="progress-bar"><div class="progress-fill" style="width:' + ((current+1)/total*100) + '%"></div></div>' +
      '<div class="glyph-display"><div class="glyph-big">' + item.icon + '</div></div>' +
      '<div class="q-card"><div class="q-txt" style="font-style:italic;text-align:center;font-size:1em;line-height:1.6">' + item.q + '</div></div>' +
      '<button class="btn btn-outline btn-sm" id="adivHint" onclick="Adivinanzas.showHint()" style="width:100%;max-width:400px">💡 Pista</button>' +
      '<div class="q-fb" id="adivFb" style="display:block;background:rgba(212,160,23,.1);color:#D4A017;border:1px solid rgba(212,160,23,.3);margin-top:8px;min-height:40px;display:none"></div>' +
      '<button class="btn" id="adivReveal" onclick="Adivinanzas.reveal()" style="width:100%;max-width:400px;margin-top:8px">👀 Ver Respuesta</button>' +
      '<div class="c-nav" style="margin-top:8px"><button class="btn btn-outline btn-sm" onclick="Adivinanzas.prev()" style="visibility:' + (current===0?'hidden':'visible') + '">← Anterior</button>' +
      '<button class="btn btn-sm" onclick="Adivinanzas.next()">' + (current===total-1?'✓ Terminar':'Siguiente →') + '</button></div>';

    document.getElementById('adivinanzasContent').innerHTML = html;
  }

  function showHint() {
    var fb = document.getElementById('adivFb');
    fb.style.display = 'block';
    fb.innerHTML = '💡 ' + data[current].hint;
  }

  function reveal() {
    var fb = document.getElementById('adivFb');
    fb.style.display = 'block';
    fb.className = 'q-fb show ok';
    fb.style.background = 'rgba(26,122,109,.15)';
    fb.style.color = '#1A8A7D';
    fb.style.border = '1px solid rgba(26,122,109,.3)';
    fb.innerHTML = '✅ ' + data[current].answer;
  }

  function next() { if (current < data.length-1) { current++; revealed=false; render(); } else App.go('menu'); }
  function prev() { if (current > 0) { current--; revealed=false; render(); } }

  return { init: init, next: next, prev: prev, showHint: showHint, reveal: reveal };
})();
