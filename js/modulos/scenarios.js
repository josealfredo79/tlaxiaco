var Scenarios = (function() {
  var data = [
    { title: "El Mercado y la Honestidad", icon: "🏪", situation: "Vendes frutas en el mercado. Un cliente te da un billete de $500 por manzanas de $50 y pide cambio de $450. El billete es falso.", choices: ["Le devuelvo el billete y le digo que es falso", "Acepto el billete y no digo nada", "Le doy el cambio pero le quito más frutas"], correct: 0, points: [10, -5, -3], lesson: "La honestidad es un pilar de la convivencia. En el mercado, la confianza mantiene vivo el comercio." },
    { title: "La Asamblea del Pueblo", icon: "🏛️", situation: "Hay una asamblea para decidir entre construir una escuela o reparar el mercado. Tienes opinión pero no quieres hablar.", choices: ["No voy a la asamblea", "Voy y expreso mi opinión con respeto", "Voy pero me quedo callado"], correct: 1, points: [-5, 10, 0], lesson: "La participación ciudadana es un derecho y un deber. Cada voz cuenta." },
    { title: "El Patrimonio Cultural", icon: "⛪", situation: "Ves que unos jóvenes rayan las paredes del antiguo convento dominico.", choices: ["Les digo que paren porque es patrimonio", "No hago nada", "Me uno a rayar"], correct: 0, points: [10, -5, -10], lesson: "El convento del siglo XVI es un tesoro histórico. Cuidarlo es responsabilidad de todos." },
    { title: "La Emergencia Comunitaria", icon: "🚨", situation: "Hay una inundación en un barrio. Muchas familias necesitan ayuda. Tú tienes comida y ropa de sobra.", choices: ["Guardo todo para mí", "Entrego lo que puedo para ayudar", "Espero a que ayude el gobierno"], correct: 1, points: [-5, 10, 0], lesson: "La solidaridad es lo que nos hace fuertes. La ayuda entre vecinos es más rápida." },
    { title: "El Voto Consciente", icon: "🗳️", situation: "Son elecciones. Un candidato te ofrece $500 por tu voto. El otro tiene un buen proyecto.", choices: ["Acepto los $500", "Voto por el mejor proyecto", "No voto porque todos son iguales"], correct: 1, points: [-10, 10, -5], lesson: "El voto no se vende. Votar por el mejor proyecto beneficia a toda la comunidad." }
  ];
  
  var current = 0;
  var totalPoints = 0;
  var answered = false;
  
  function init() {
    current = 0;
    totalPoints = 0;
    answered = false;
    render();
  }
  
  function render() {
    var item = data[current];
    var total = data.length;
    var pct = ((current + 1) / total * 100);
    
    var html = '<div class="content-header">' +
      '<button class="back-btn" onclick="App.go(\'menu\')">←</button>' +
      '<h2>🎭 Escenarios</h2>' +
      '<div class="quiz-score">' + totalPoints + ' pts</div>' +
    '</div>' +
    '<div class="progress-bar"><div class="progress-fill" style="width:' + pct + '%"></div></div>' +
    '<div class="content-body">' +
      '<div class="era-card">' +
        '<div class="era-date">' + item.icon + ' ' + item.title + '</div>' +
        '<p>' + item.situation + '</p>' +
      '</div>' +
      '<div class="highlight-card">' +
        '<div class="highlight-title">🤔 ¿Qué haces?</div>' +
        '<div class="quiz-options">';
    
    item.choices.forEach(function(choice, i) {
      html += '<button class="quiz-opt scenario-opt" data-i="' + i + '">' + choice + '</button>';
    });
    
    html += '</div>' +
      '<div class="quiz-feedback" id="scenarioFeedback"></div>' +
      '</div>' +
    '</div>' +
    '<div class="content-nav">' +
      '<button class="btn btn-outline btn-sm" onclick="Scenarios.prev()" style="visibility:' + (current === 0 ? 'hidden' : 'visible') + '">← Anterior</button>' +
      '<button class="btn btn-sm" onclick="Scenarios.next()">' + (current === total-1 ? '✓ Ver Resultado' : 'Siguiente →') + '</button>' +
    '</div>';
    
    document.getElementById('scenariosContent').innerHTML = html;
    
    document.querySelectorAll('.scenario-opt').forEach(function(btn) {
      btn.addEventListener('click', function() {
        if (answered) return;
        answered = true;
        var chosen = parseInt(btn.dataset.i);
        var pts = item.points[chosen];
        totalPoints += pts;
        
        document.querySelectorAll('.scenario-opt').forEach(function(b, i) {
          b.classList.add('disabled');
          if (i === item.correct) b.classList.add('correct');
        });
        
        var fb = document.getElementById('scenarioFeedback');
        btn.classList.add(chosen === item.correct ? 'correct' : 'wrong');
        fb.className = 'quiz-feedback show ' + (chosen === item.correct ? 'correct' : 'wrong');
        fb.innerHTML = '<strong>Puntos: ' + (pts > 0 ? '+' : '') + pts + '</strong><br>' + item.lesson;
        fb.style.display = 'block';
      });
    });
  }
  
  function next() {
    if (current < data.length - 1) { current++; answered = false; render(); }
    else {
      var icon = totalPoints >= 30 ? '🌟' : totalPoints >= 15 ? '👍' : '📚';
      document.getElementById('scenariosContent').innerHTML = 
        '<div class="result-screen">' +
          '<div class="result-icon">' + icon + '</div>' +
          '<h2>¡Escenarios Completados!</h2>' +
          '<p>Obtuviste ' + totalPoints + ' puntos</p>' +
          '<button class="btn" onclick="App.go(\'menu\')">Volver al Menú</button>' +
        '</div>';
    }
  }
  
  function prev() {
    if (current > 0) { current--; answered = false; render(); }
  }
  
  return { init: init, next: next, prev: prev };
})();
