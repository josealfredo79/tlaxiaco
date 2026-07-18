var Quiz = (function() {
  var questions = [
    { q: "¿Qué significa 'Tlaxiaco' en náhuatl?", options: ["Casa grande", "En el lugar de la lluvia del juego de pelota", "Río de flores", "Cerro del sol"], correct: 1, explanation: "'Tlachquiauhco' significa 'en el lugar de la lluvia del juego de pelota'." },
    { q: "¿Cómo se dice Tlaxiaco en mixteco?", options: ["Ñuu Tlandehe", "Ndijiinu (Buena vista)", "Ñuu Dzaa", "Tu'un Savi"], correct: 1, explanation: "En mixteco se llama 'Ndijiinu', que significa 'Buena vista'." },
    { q: "¿En qué año se situó el asentamiento inicial?", options: ["1000 a.C.", "400 a.C.", "100 a.C.", "500 d.C."], correct: 1, explanation: "El asentamiento inicial se sitúa alrededor de 400 a.C." },
    { q: "¿Cuántos sitios arqueológicos existen en Tlaxiaco?", options: ["50", "100", "279", "500"], correct: 2, explanation: "En Tlaxiaco existen 279 sitios arqueológicos." },
    { q: "¿Qué batalla dio el título de 'Heroica'?", options: ["Batalla de Puebla", "Batalla del Cerro Encantado", "Batalla de Azcapotzalco", "Batalla de Tlaxcala"], correct: 1, explanation: "La Batalla del Cerro Encantado del 29 de abril de 1814." },
    { q: "¿Qué presidente se refugió en Tlaxiaco?", options: ["Benito Juárez", "Porfirio Díaz", "Santa Anna", "Gómez Farías"], correct: 1, explanation: "Porfirio Díaz se refugió con el cura Manuel Márquez." },
    { q: "¿Qué monje dominico asesoró el convento?", options: ["Fray Toribio", "Rodrigo Gil de Hontañón", "Fray Bernardino", "Alonso de Molina"], correct: 1, explanation: "Rodrigo Gil de Hontañón asesoró la construcción." },
    { q: "¿Qué producía la región en la época colonial?", options: ["Tabaco", "Grana cochinilla", "Cacao", "Plata"], correct: 1, explanation: "La producción de grana cochinilla fue importante." },
    { q: "¿Qué heroína fue nombrada Generala?", options: ["Josefa Ortiz", "María Nava de Catalán", "Leona Vicario", "Hermenegildo"], correct: 1, explanation: "María Nava de Catalán ofreció sus hijos a la causa." },
    { q: "¿Cuántos muertos hubo en el Cerro Encantado?", options: ["5", "19", "50", "100"], correct: 1, explanation: "Hubo 19 muertos y 120 heridos." }
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
    var q = questions[current];
    var total = questions.length;
    
    var html = '<div class="content-header">' +
      '<button class="back-btn" onclick="App.go(\'menu\')">←</button>' +
      '<h2>🧠 Quiz Histórico</h2>' +
      '<div class="quiz-score">' + score + '/' + total + '</div>' +
    '</div>' +
    '<div class="quiz-card">' +
      '<div class="quiz-num">Pregunta ' + (current+1) + '/' + total + '</div>' +
      '<p class="quiz-question">' + q.q + '</p>' +
    '</div>' +
    '<div class="quiz-options" id="quizOptions">';
    
    q.options.forEach(function(opt, i) {
      html += '<button class="quiz-opt" data-i="' + i + '">' + opt + '</button>';
    });
    
    html += '</div>' +
    '<div class="quiz-feedback" id="quizFeedback"></div>' +
    '<button class="btn btn-sm" id="quizNext" onclick="Quiz.next()" style="display:none">' + (current < total-1 ? 'Siguiente →' : 'Ver Resultado') + '</button>';
    
    document.getElementById('quizContent').innerHTML = html;
    
    // Bind clicks
    document.querySelectorAll('.quiz-opt').forEach(function(btn) {
      btn.addEventListener('click', function() {
        if (answered) return;
        answered = true;
        var chosen = parseInt(btn.dataset.i);
        
        document.querySelectorAll('.quiz-opt').forEach(function(b, i) {
          b.classList.add('disabled');
          if (i === q.correct) b.classList.add('correct');
        });
        
        var fb = document.getElementById('quizFeedback');
        if (chosen === q.correct) {
          score++;
          btn.classList.add('correct');
          fb.className = 'quiz-feedback show correct';
          fb.innerHTML = '✅ ¡Correcto! ' + q.explanation;
        } else {
          btn.classList.add('wrong');
          fb.className = 'quiz-feedback show wrong';
          fb.innerHTML = '❌ Incorrecto. ' + q.explanation;
        }
        
        document.getElementById('quizNext').style.display = 'block';
      });
    });
  }
  
  function next() {
    if (current < questions.length - 1) {
      current++;
      answered = false;
      render();
    } else {
      Progreso.completeModule('quiz', score * 2);
      var pct = Math.round(score / questions.length * 100);
      var icon = pct >= 80 ? '🌟' : pct >= 60 ? '👍' : '📚';
      document.getElementById('quizContent').innerHTML = 
        '<div class="result-screen">' +
          '<div class="result-icon">' + icon + '</div>' +
          '<h2 style="font-family:Cinzel;color:#D4A017">¡Quiz Completado!</h2>' +
          '<p style="color:#C25B28;margin:8px 0">Obtuviste ' + score + '/' + questions.length + ' respuestas correctas</p>' +
          '<div class="result-stats">' +
            '<div class="stat-box"><div class="stat-val">' + score + '</div><div class="stat-label">Correctas</div></div>' +
            '<div class="stat-box"><div class="stat-val">' + (questions.length - score) + '</div><div class="stat-label">Incorrectas</div></div>' +
          '</div>' +
          '<button class="btn" onclick="App.go(\'menu\')">Volver al Menú</button>' +
        '</div>';
    }
  }
  
  return { init: init, next: next };
})();
