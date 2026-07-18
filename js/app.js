var App = (function() {
  var currentMode = '';
  var currentIndex = 0;
  var score = 0;
  var answered = false;

  function go(id) {
    document.querySelectorAll('.s').forEach(function(s) { s.classList.remove('on'); });
    document.getElementById(id).classList.add('on');
  }

  function startMode(mode) {
    currentMode = mode;
    currentIndex = 0;
    score = 0;
    answered = false;

    if (mode === 'quiz') {
      go('quiz');
      showQuestion();
    } else if (mode === 'legends') {
      go('legend');
      showLegends();
    } else {
      go('content');
      updateContent();
    }
  }

  // TIMELINE, FIGURES, GEOGRAPHY, CULTURE
  function getData() {
    if (currentMode === 'timeline') return Data.timeline;
    if (currentMode === 'figures') return Data.figures;
    if (currentMode === 'geography') return Data.geography;
    if (currentMode === 'culture') return Data.culture;
    return [];
  }

  function updateContent() {
    var data = getData();
    if (!data.length) return;

    var item = data[currentIndex];
    var total = data.length;
    var pct = ((currentIndex + 1) / total * 100);

    document.getElementById('progressFill').style.width = pct + '%';
    document.getElementById('pageIndicator').textContent = (currentIndex + 1) + '/' + total;
    document.getElementById('prevBtn').style.display = currentIndex === 0 ? 'none' : 'block';
    document.getElementById('nextBtn').textContent = currentIndex === total - 1 ? '✓ Terminar' : 'Siguiente →';

    var html = '';

    if (currentMode === 'timeline') {
      document.getElementById('contentTitle').textContent = '📜 Línea del Tiempo';
      html = '<div class="era">' +
        '<div class="era-date">' + item.date + '</div>' +
        '<h3>' + item.era + '</h3>' +
        '<p>' + item.text + '</p>' +
        '</div>' +
        '<div class="highlight">' +
        '<div class="highlight-title">💡 Dato importante</div>' +
        '<p>' + item.highlight + '</p>' +
        '</div>';
    } else if (currentMode === 'figures') {
      document.getElementById('contentTitle').textContent = '👤 Personajes';
      html = '<div style="font-size:3em;margin-bottom:8px">' + item.icon + '</div>' +
        '<h3>' + item.name + '</h3>' +
        '<p style="color:#ff8844;font-size:0.85em">' + item.role + '</p>' +
        '<p>' + item.bio + '</p>' +
        '<div class="highlight">' +
        '<div class="highlight-title">🏛️ Conexión con Tlaxiaco</div>' +
        '<p>' + item.tlaxiaco + '</p>' +
        '</div>';
    } else if (currentMode === 'geography') {
      document.getElementById('contentTitle').textContent = '🗺️ Geografía';
      html = '<div style="font-size:3em;margin-bottom:8px">' + item.icon + '</div>' +
        '<h3>' + item.title + '</h3>' +
        '<p>' + item.content + '</p>';
    } else if (currentMode === 'culture') {
      document.getElementById('contentTitle').textContent = '🎭 Cultura';
      html = '<div style="font-size:3em;margin-bottom:8px">' + item.icon + '</div>' +
        '<h3>' + item.title + '</h3>' +
        '<p>' + item.content + '</p>';
    }

    document.getElementById('contentBody').innerHTML = html;
  }

  function next() {
    var data = getData();
    if (currentIndex < data.length - 1) {
      currentIndex++;
      updateContent();
    } else {
      showResult();
    }
  }

  function prev() {
    if (currentIndex > 0) {
      currentIndex--;
      updateContent();
    }
  }

  // QUIZ
  function showQuestion() {
    var q = Data.quiz[currentIndex];
    var total = Data.quiz.length;

    document.getElementById('quizTitle').textContent = '🧠 Quiz Histórico';
    document.getElementById('quizScore').textContent = score + '/' + total;
    document.getElementById('quizQuestion').innerHTML = '<h3>Pregunta ' + (currentIndex + 1) + '/' + total + '</h3><p>' + q.q + '</p>';
    document.getElementById('quizFeedback').className = 'quiz-feedback';
    document.getElementById('quizFeedback').style.display = 'none';
    document.getElementById('quizNext').style.display = 'none';
    answered = false;

    var optsHtml = q.options.map(function(opt, i) {
      return '<button class="quiz-opt" data-i="' + i + '">' + opt + '</button>';
    }).join('');

    document.getElementById('quizOptions').innerHTML = optsHtml;

    document.querySelectorAll('.quiz-opt').forEach(function(btn) {
      btn.addEventListener('click', function() {
        if (answered) return;
        answered = true;
        var chosen = parseInt(btn.dataset.i);
        var correct = q.correct;

        document.querySelectorAll('.quiz-opt').forEach(function(b, i) {
          b.classList.add('disabled');
          if (i === correct) b.classList.add('correct');
        });

        var fb = document.getElementById('quizFeedback');
        if (chosen === correct) {
          score++;
          btn.classList.add('correct');
          fb.className = 'quiz-feedback show correct';
          fb.innerHTML = '✅ ¡Correcto! ' + q.explanation;
        } else {
          btn.classList.add('wrong');
          fb.className = 'quiz-feedback show wrong';
          fb.innerHTML = '❌ Incorrecto. ' + q.explanation;
        }

        document.getElementById('quizScore').textContent = score + '/' + Data.quiz.length;
        document.getElementById('quizNext').style.display = 'block';
        document.getElementById('quizNext').textContent = currentIndex < Data.quiz.length - 1 ? 'Siguiente →' : 'Ver Resultado';
      });
    });
  }

  function nextQuestion() {
    if (currentIndex < Data.quiz.length - 1) {
      currentIndex++;
      showQuestion();
    } else {
      showResult();
    }
  }

  // LEGENDS
  function showLegends() {
    document.getElementById('legendTitle').textContent = '👻 Leyendas de Tlaxiaco';
    var html = Data.legends.map(function(l, i) {
      return '<div class="legend-card" data-i="' + i + '">' +
        '<div class="legend-icon">' + l.icon + '</div>' +
        '<h3>' + l.title + '</h3>' +
        '<p>' + l.summary + '</p>' +
        '</div>';
    }).join('');

    document.getElementById('legendContent').innerHTML = html;

    document.querySelectorAll('.legend-card').forEach(function(card) {
      card.addEventListener('click', function() {
        var idx = parseInt(card.dataset.i);
        var legend = Data.legends[idx];
        document.getElementById('legendTitle').textContent = legend.icon + ' ' + legend.title;
        document.getElementById('legendContent').innerHTML = '<div class="legend-text">' + legend.text + '</div>';
      });
    });
  }

  // RESULT
  function showResult() {
    var data = getData();
    var total = data.length;

    document.getElementById('resultTitle').textContent = '¡Completado!';
    document.getElementById('resultDesc').textContent = 'Has terminado la sección de ' + getModeName();

    var icon = '🏆';
    if (currentMode === 'quiz') {
      var pct = Math.round(score / total * 100);
      if (pct >= 80) icon = '🌟';
      else if (pct >= 60) icon = '👍';
      else icon = '📚';
      document.getElementById('resultDesc').textContent = 'Obtuviste ' + score + '/' + total + ' respuestas correctas';
    }

    document.getElementById('resultIcon').textContent = icon;

    var statsHtml = '';
    if (currentMode === 'quiz') {
      statsHtml = '<div class="stat-box"><div class="stat-val">' + score + '</div><div class="stat-label">Correctas</div></div>' +
        '<div class="stat-box"><div class="stat-val">' + (total - score) + '</div><div class="stat-label">Incorrectas</div></div>';
    } else {
      statsHtml = '<div class="stat-box"><div class="stat-val">' + total + '</div><div class="stat-label">Temas</div></div>' +
        '<div class="stat-box"><div class="stat-val">' + currentMode.charAt(0).toUpperCase() + currentMode.slice(1) + '</div><div class="stat-label">Sección</div></div>';
    }

    document.getElementById('resultStats').innerHTML = statsHtml;
    go('result');
  }

  function getModeName() {
    var names = {
      timeline: 'Línea del Tiempo',
      quiz: 'Quiz Histórico',
      legends: 'Leyendas',
      figures: 'Personajes',
      geography: 'Geografía',
      culture: 'Cultura'
    };
    return names[currentMode] || currentMode;
  }

  // PARTICLES
  function initParticles() {
    setInterval(function() {
      var p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.top = '-10px';
      p.style.animationDuration = (3 + Math.random() * 4) + 's';
      document.body.appendChild(p);
      setTimeout(function() { p.remove(); }, 7000);
    }, 800);
  }

  function init() {
    initParticles();
  }

  // ===== CIVIC VALUES MODULES =====
  function startCivicMode(mode) {
    currentMode = mode;
    currentIndex = 0;
    score = 0;
    answered = false;
    
    if (mode === 'civicValues' || mode === 'scenarios') {
      go('content');
      updateCivicContent();
    } else if (mode === 'civicQuiz') {
      go('quiz');
      showCivicQuestion();
    } else if (mode === 'memory') {
      go('memory');
      initMemoryGame();
    }
  }

  function updateCivicContent() {
    var data = currentMode === 'civicValues' ? Data.civicValues : Data.scenarios;
    if (!data || !data.length) return;
    var item = data[currentIndex];
    var total = data.length;
    var pct = ((currentIndex + 1) / total * 100);
    
    document.getElementById('progressFill').style.width = pct + '%';
    document.getElementById('pageIndicator').textContent = (currentIndex + 1) + '/' + total;
    document.getElementById('prevBtn').style.display = currentIndex === 0 ? 'none' : 'block';
    document.getElementById('nextBtn').textContent = currentIndex === total - 1 ? '✓ Terminar' : 'Siguiente →';
    
    if (currentMode === 'civicValues') {
      document.getElementById('contentTitle').textContent = '⚖️ Valores Cívicos';
    } else {
      document.getElementById('contentTitle').textContent = '🎭 ' + item.title;
    }
    
    var html = '<div class="era">' +
      '<div class="era-date">' + (currentMode === 'civicValues' ? item.icon + ' ' + item.title : item.icon + ' Situación') + '</div>' +
      '<p>' + (currentMode === 'civicValues' ? item.description : item.situation) + '</p>' +
      '</div>' +
      '<div class="highlight">' +
      '<div class="highlight-title">🤔 ' + (currentMode === 'civicValues' ? 'Situación' : '¿Qué haces?') + '</div>';
    
    if (currentMode === 'civicValues') {
      html += '<p>' + item.scenario + '</p>';
    }
    
    html += '<div class="quiz-options" style="margin-top:12px">';
    
    var options = currentMode === 'civicValues' ? item.options : item.choices;
    options.forEach(function(opt, i) {
      html += '<button class="quiz-opt civic-opt" data-i="' + i + '">' + (opt.text || opt) + '</button>';
    });
    
    html += '</div>' +
      '<div class="quiz-feedback" id="civicFeedback"></div>' +
      '</div>';
    
    document.getElementById('contentBody').innerHTML = html;
    
    document.querySelectorAll('.civic-opt').forEach(function(btn) {
      btn.addEventListener('click', function() {
        if (answered) return;
        answered = true;
        var chosen = parseInt(btn.dataset.i);
        var correctIdx = options.findIndex(function(o) { return o.correct; });
        
        document.querySelectorAll('.civic-opt').forEach(function(b, i) {
          b.classList.add('disabled');
          if (options[i].correct) b.classList.add('correct');
        });
        
        var fb = document.getElementById('civicFeedback');
        if (options[chosen].correct) {
          score += options[chosen].points || 1;
          btn.classList.add('correct');
          fb.className = 'quiz-feedback show correct';
        } else {
          score += options[chosen].points || 0;
          btn.classList.add('wrong');
          fb.className = 'quiz-feedback show wrong';
        }
        var feedbackText = options[chosen].feedback || item.lesson;
        if (currentMode === 'scenarios') {
          feedbackText = '<strong>Puntos: ' + (options[chosen].points > 0 ? '+' : '') + options[chosen].points + '</strong><br>' + item.lesson;
        }
        fb.innerHTML = feedbackText;
        fb.style.display = 'block';
      });
    });
  }

  function showCivicQuestion() {
    var q = Data.civicQuiz[currentIndex];
    var total = Data.civicQuiz.length;
    
    document.getElementById('quizTitle').textContent = '⚖️ Quiz de Valores Cívicos';
    document.getElementById('quizScore').textContent = score + '/' + total;
    document.getElementById('quizQuestion').innerHTML = '<h3>Pregunta ' + (currentIndex + 1) + '/' + total + '</h3><p>' + q.q + '</p>';
    document.getElementById('quizFeedback').className = 'quiz-feedback';
    document.getElementById('quizFeedback').style.display = 'none';
    document.getElementById('quizNext').style.display = 'none';
    answered = false;
    
    var optsHtml = q.options.map(function(opt, i) {
      return '<button class="quiz-opt" data-i="' + i + '">' + opt + '</button>';
    }).join('');
    
    document.getElementById('quizOptions').innerHTML = optsHtml;
    
    document.querySelectorAll('.quiz-opt').forEach(function(btn) {
      btn.addEventListener('click', function() {
        if (answered) return;
        answered = true;
        var chosen = parseInt(btn.dataset.i);
        var correct = q.correct;
        
        document.querySelectorAll('.quiz-opt').forEach(function(b, i) {
          b.classList.add('disabled');
          if (i === correct) b.classList.add('correct');
        });
        
        var fb = document.getElementById('quizFeedback');
        if (chosen === correct) {
          score++;
          btn.classList.add('correct');
          fb.className = 'quiz-feedback show correct';
          fb.innerHTML = '✅ ¡Correcto! ' + q.explanation;
        } else {
          btn.classList.add('wrong');
          fb.className = 'quiz-feedback show wrong';
          fb.innerHTML = '❌ Incorrecto. ' + q.explanation;
        }
        
        document.getElementById('quizScore').textContent = score + '/' + Data.civicQuiz.length;
        document.getElementById('quizNext').style.display = 'block';
        document.getElementById('quizNext').textContent = currentIndex < Data.civicQuiz.length - 1 ? 'Siguiente →' : 'Ver Resultado';
      });
    });
  }

  function initMemoryGame() {
    var values = ['Respeto', 'Honestidad', 'Solidaridad', 'Justicia', 'Tolerancia', 'Responsabilidad'];
    var icons = ['⚖️', '✋', '🤲', '⚖️', '🌍', '🤝'];
    var pairs = [];
    
    values.forEach(function(v, i) {
      pairs.push({ id: i*2, value: v, icon: icons[i] });
      pairs.push({ id: i*2+1, value: v, icon: icons[i] });
    });
    
    // Shuffle
    for (var i = pairs.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = pairs[i];
      pairs[i] = pairs[j];
      pairs[j] = temp;
    }
    
    var html = '<div class="memory-grid">';
    pairs.forEach(function(p) {
      html += '<div class="memory-card" data-id="' + p.id + '" data-value="' + p.value + '">' +
        '<div class="memory-front">?</div>' +
        '<div class="memory-back">' + p.icon + '<br>' + p.value + '</div>' +
      '</div>';
    });
    html += '</div>';
    
    document.getElementById('memoryContent').innerHTML = html;
    
    var flipped = [];
    var matched = 0;
    var memoryScore = 0;
    
    document.querySelectorAll('.memory-card').forEach(function(card) {
      card.addEventListener('click', function() {
        if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
        if (flipped.length >= 2) return;
        
        card.classList.add('flipped');
        flipped.push(card);
        
        if (flipped.length === 2) {
          memoryScore++;
          document.getElementById('memoryScore').textContent = memoryScore + ' intentos';
          
          if (flipped[0].dataset.value === flipped[1].dataset.value) {
            flipped[0].classList.add('matched');
            flipped[1].classList.add('matched');
            matched += 2;
            flipped = [];
            
            if (matched === pairs.length) {
              setTimeout(function() {
                alert('¡Felicidades! Encontraste todos los valores cívicos en ' + memoryScore + ' intentos');
              }, 500);
            }
          } else {
            setTimeout(function() {
              flipped[0].classList.remove('flipped');
              flipped[1].classList.remove('flipped');
              flipped = [];
            }, 1000);
          }
        }
      });
    });
  }


  return {
    go: go,
    startMode: startMode,
    next: next,
    prev: prev,
    nextQuestion: nextQuestion,
    startCivicMode: startCivicMode,
    init: init
  };
})();

document.addEventListener('DOMContentLoaded', App.init);
