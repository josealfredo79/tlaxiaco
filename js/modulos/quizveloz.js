var QuizVeloz = (function() {
  var questions = [
    { q: "¿Cómo se dice 'agua' en mixteco?", options: ["Savi", "Tutu", "Ñuu", "Yu"], correct: 3, time: 10 },
    { q: "¿Qué animal representa al guerrero solar?", options: ["Venado", "Águila", "Mono", "Jaguar"], correct: 1, time: 10 },
    { q: "¿En qué año fue la Batalla del Cerro Encantado?", options: ["1810", "1812", "1814", "1816"], correct: 2, time: 12 },
    { q: "¿Cómo se dice 'buena vista' en mixteco?", options: ["Ñuu Savi", "Ndijiinu", "Tu'un Savi", "Ñuhu"], correct: 1, time: 10 },
    { q: "¿Cuántos sitios arqueológicos tiene Tlaxiaco?", options: ["100", "179", "279", "379"], correct: 2, time: 12 },
    { q: "¿Qué significa 'Ñuu Savi'?", options: ["Lugar Negro", "Pueblo de la Lluvia", "Buena Vista", "Casa de Piedra"], correct: 1, time: 10 },
    { q: "¿Quién nombró Generala a María Nava?", options: ["Juárez", "Morelos", "Díaz", "Hidalgo"], correct: 1, time: 10 },
    { q: "¿Qué material se usaba para los códices?", options: ["Papel", "Piel de venado", "Piedra", "Madera"], correct: 1, time: 10 },
    { q: "¿Qué es 'Cinco Venado'?", options: ["Un dios", "Un rey mixteco", "Una montaña", "Un río"], correct: 1, time: 10 },
    { q: "¿Cómo se dice 'flor' en mixteco?", options: ["Xí'nu", "Inixi", "Tutu", "Savi"], correct: 0, time: 10 }
  ];

  var current = 0, score = 0, timer = null, timeLeft = 0, answered = false;

  function init() {
    current = 0; score = 0; answered = false;
    shuffle(questions);
    render();
  }

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
  }

  function render() {
    var q = questions[current];
    timeLeft = q.time;
    answered = false;

    var html = '<div class="c-hdr"><button class="back" onclick="QuizVeloz.exit()">←</button>' +
      '<h2>⚡ Quiz Veloz</h2><div class="c-score" id="qvTimer">⏱ ' + timeLeft + 's</div></div>' +
      '<div class="progress-bar"><div class="progress-fill" style="width:' + ((current+1)/questions.length*100) + '%"></div></div>' +
      '<div class="q-card"><div class="q-num">Pregunta ' + (current+1) + '/' + questions.length + ' • Puntos: ' + score + '</div>' +
      '<div class="q-txt">' + q.q + '</div></div>' +
      '<div class="q-opts" id="qvOpts">';

    q.options.forEach(function(opt, i) {
      html += '<button class="q-opt" data-i="' + i + '">' + opt + '</button>';
    });

    html += '</div><div class="q-fb" id="qvFb"></div>';
    document.getElementById('quizVelozContent').innerHTML = html;

    document.querySelectorAll('#qvOpts .q-opt').forEach(function(btn) {
      btn.addEventListener('click', function() {
        if (answered) return;
        answered = true;
        clearInterval(timer);
        var chosen = parseInt(btn.dataset.i);
        document.querySelectorAll('#qvOpts .q-opt').forEach(function(b, i) {
          b.classList.add('off');
          if (i === q.correct) b.classList.add('ok');
        });
        var fb = document.getElementById('qvFb');
        if (chosen === q.correct) {
          score += timeLeft;
          btn.classList.add('ok');
          fb.className = 'q-fb show ok';
          fb.innerHTML = '✅ ¡Correcto! +' + timeLeft + ' puntos';
        } else {
          btn.classList.add('no');
          fb.className = 'q-fb show no';
          fb.innerHTML = '❌ Incorrecto. Era: ' + q.options[q.correct];
        }
        setTimeout(function() {
          if (current < questions.length - 1) { current++; render(); }
          else showResult();
        }, 1500);
      });
    });

    clearInterval(timer);
    timer = setInterval(function() {
      timeLeft--;
      var el = document.getElementById('qvTimer');
      if (el) el.textContent = '⏱ ' + timeLeft + 's';
      if (timeLeft <= 0) {
        clearInterval(timer);
        if (!answered) {
          answered = true;
          var fb = document.getElementById('qvFb');
          fb.className = 'q-fb show no';
          fb.innerHTML = '⏰ ¡Tiempo! La respuesta era: ' + q.options[q.correct];
          document.querySelectorAll('#qvOpts .q-opt').forEach(function(b, i) {
            b.classList.add('off');
            if (i === q.correct) b.classList.add('ok');
          });
          setTimeout(function() {
            if (current < questions.length - 1) { current++; render(); }
            else showResult();
          }, 2000);
        }
      }
    }, 1000);
  }

  function showResult() {
    clearInterval(timer);
    var maxScore = questions.reduce(function(s, q) { return s + q.time; }, 0);
    var pct = Math.round(score / maxScore * 100);
    var icon = pct >= 70 ? '🌟' : pct >= 40 ? '⚡' : '📚';

    document.getElementById('quizVelozContent').innerHTML =
      '<div class="result-screen"><div class="result-icon">' + icon + '</div>' +
      '<h2 style="font-family:Cinzel;color:#D4A017">¡Quiz Veloz Completado!</h2>' +
      '<p style="color:#C25B28;margin:8px 0">Puntuación: ' + score + '/' + maxScore + '</p>' +
      '<div class="result-stats"><div class="stat-box"><div class="stat-val">' + score + '</div><div class="stat-label">Puntos</div></div>' +
      '<div class="stat-box"><div class="stat-val">' + pct + '%</div><div class="stat-label">Eficiencia</div></div></div>' +
      '<button class="btn" onclick="QuizVeloz.init()">🔄 Intentar de Nuevo</button>' +
      '<button class="btn btn-outline" style="margin-top:8px" onclick="App.go(\'menu\')">← Menú</button></div>';
  }

  function exit() { clearInterval(timer); App.go('menu'); }

  return { init: init, exit: exit };
})();
