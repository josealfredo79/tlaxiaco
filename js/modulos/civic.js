var Civic = (function() {
  var data = [
    { title: "Respeto a la Autoridad", icon: "⚖️", desc: "El respeto a la autoridad comenzó con los ancianos mixtecos. Hoy se refleja en el cumplimiento de las leyes.", scenario: "Tu vecino quiere construir una barda que invade la banqueta. ¿Qué haces?", options: ["Lo dejo, no es mi problema", "Le aviso al inspector municipal", "Le grito y me enojo"], correct: 1, feedback: ["Incorrecto. La banqueta es de todos.", "¡Correcto! Reportar es parte del respeto a la comunidad.", "Incorrecto. El respeto implica dialogar."] },
    { title: "Participación Ciudadana", icon: "🗳️", desc: "Participar en asambleas comunitarias y votar es nuestro deber cívico.", scenario: "Hay una asamblea del consejo de vigilancia. ¿Qué haces?", options: ["No voy, no me importa", "Voy y opino con respeto", "Voy pero solo a quejarme"], correct: 1, feedback: ["Incorrecto. Las decisiones se toman entre todos.", "¡Correcto! Participar fortalece la democracia.", "Incorrecto. Participar es proponer soluciones."] },
    { title: "Responsabilidad Social", icon: "🤝", desc: "Cuidar el medio ambiente y respetar el patrimonio es responsabilidad de todos.", scenario: "Encuentras basura en el parque. ¿Qué haces?", options: ["La dejo ahí", "La recojo y la separo", "La quemo"], correct: 1, feedback: ["Incorrecto. Cuidar el espacio es responsabilidad de todos.", "¡Correcto! Cuidar el medio ambiente es de todos.", "Incorrecto. Quemar basura contamina."] },
    { title: "Honestidad", icon: "✋", desc: "La honestidad construye confianza, como lo hicieron los héroes de Tlaxiaco.", scenario: "Encuentras una billetera en el mercado. ¿Qué haces?", options: ["Me la quedo", "La entrego a la policía", "La abro para ver"], correct: 1, feedback: ["Incorrecto. La honestidad define nuestro carácter.", "¡Correcto! Ser honesto es hacer lo correcto.", "Incorrecto. Eso es falta de honestidad."] },
    { title: "Amor a la Patria", icon: "🇲🇽", desc: "Amar la patria es conocer nuestra historia y trabajar por el bienestar de todos.", scenario: "Es el Día de la Independencia. ¿Cómo celebras?", options: ["No me importa", "Participo en actos cívicos", "Solo me importa el fuego artificial"], correct: 1, feedback: ["Incorrecto. Celebrar es honrar a quienes lucharon.", "¡Correcto! Amar la patria es conocer la historia.", "Incorrecto. Las fiestas van más allá del espectáculo."] },
    { title: "Tolerancia", icon: "🌍", desc: "Tlaxiaco es un crisol de culturas. La tolerancia es respetar las diferencias.", scenario: "Un compañero tiene costumbres diferentes. ¿Qué haces?", options: ["Me burlo", "Lo respeto y aprendo", "Lo evito"], correct: 1, feedback: ["Incorrecto. Burlarse destruye la convivencia.", "¡Correcto! La tolerancia enriquece.", "Incorrecto. Evitar es discriminación."] },
    { title: "Justicia Social", icon: "⚖️", desc: "La justicia social busca tratar a todos de manera equitativa.", scenario: "Un compañero gana más por el mismo trabajo. ¿Qué haces?", options: ["No hago nada", "Hablo con mi jefe", "Hago el mínimo"], correct: 1, feedback: ["Incorrecto. Hablar de discriminación salarial es un derecho.", "¡Correcto! Exigir justicia es responsabilidad cívica.", "Incorrecto. Eso no resuelve el problema."] },
    { title: "Solidaridad", icon: "🤲", desc: "La solidaridad es ayudar al prójimo sin esperar nada a cambio.", scenario: "Tu vecino mayor necesita ayuda con sus mandados. ¿Qué haces?", options: ["No tengo tiempo", "Le ayudo gustosamente", "Le digo que contrate a alguien"], correct: 1, feedback: ["Incorrecto. La solidaridad es ayudar a quien lo necesita.", "¡Correcto! La solidaridad fortalece los lazos.", "Incorrecto. La solidaridad es dar de nosotros mismos."] }
  ];
  
  var current = 0;
  var score = 0;
  var answered = false;
  
  function init() {
    current = 0;
    score = 0;
    answered = false;
    render();
  }
  
  function render() {
    var item = data[current];
    var total = data.length;
    var pct = ((current + 1) / total * 100);
    
    var html = '<div class="content-header">' +
      '<button class="back-btn" onclick="App.go(\'menu\')">←</button>' +
      '<h2>⚖️ Valores Cívicos</h2>' +
      '<div class="quiz-score">' + (current+1) + '/' + total + '</div>' +
    '</div>' +
    '<div class="progress-bar"><div class="progress-fill" style="width:' + pct + '%"></div></div>' +
    '<div class="content-body">' +
      '<div class="era-card">' +
        '<div class="era-date">' + item.icon + ' ' + item.title + '</div>' +
        '<p>' + item.desc + '</p>' +
      '</div>' +
      '<div class="highlight-card">' +
        '<div class="highlight-title">🤔 Situación</div>' +
        '<p>' + item.scenario + '</p>' +
        '<div class="quiz-options">';
    
    item.options.forEach(function(opt, i) {
      html += '<button class="quiz-opt civic-opt" data-i="' + i + '">' + opt + '</button>';
    });
    
    html += '</div>' +
      '<div class="quiz-feedback" id="civicFeedback"></div>' +
      '</div>' +
    '</div>' +
    '<div class="content-nav">' +
      '<button class="btn btn-outline btn-sm" onclick="Civic.prev()" style="visibility:' + (current === 0 ? 'hidden' : 'visible') + '">← Anterior</button>' +
      '<button class="btn btn-sm" onclick="Civic.next()">' + (current === total-1 ? '✓ Terminar' : 'Siguiente →') + '</button>' +
    '</div>';
    
    document.getElementById('civicContent').innerHTML = html;
    
    // Bind clicks
    document.querySelectorAll('.civic-opt').forEach(function(btn) {
      btn.addEventListener('click', function() {
        if (answered) return;
        answered = true;
        var chosen = parseInt(btn.dataset.i);
        
        document.querySelectorAll('.civic-opt').forEach(function(b, i) {
          b.classList.add('disabled');
          if (i === item.correct) b.classList.add('correct');
        });
        
        var fb = document.getElementById('civicFeedback');
        if (item.options[chosen] === item.options[item.correct]) {
          score++;
          btn.classList.add('correct');
          fb.className = 'quiz-feedback show correct';
        } else {
          btn.classList.add('wrong');
          fb.className = 'quiz-feedback show wrong';
        }
        fb.innerHTML = item.feedback[chosen];
        fb.style.display = 'block';
      });
    });
  }
  
  function next() {
    if (current < data.length - 1) { current++; answered = false; render(); }
    else App.go('menu');
  }
  
  function prev() {
    if (current > 0) { current--; answered = false; render(); }
  }
  
  return { init: init, next: next, prev: prev };
})();
