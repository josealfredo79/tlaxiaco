var Memory = (function() {
  var values = ['Respeto', 'Honestidad', 'Solidaridad', 'Justicia', 'Tolerancia', 'Responsabilidad'];
  var icons = ['⚖️', '✋', '🤲', '⚖️', '🌍', '🤝'];
  var cards = [];
  var flipped = [];
  var matched = 0;
  var attempts = 0;
  
  function init() {
    cards = [];
    flipped = [];
    matched = 0;
    attempts = 0;
    
    values.forEach(function(v, i) {
      cards.push({ id: i*2, value: v, icon: icons[i] });
      cards.push({ id: i*2+1, value: v, icon: icons[i] });
    });
    
    // Shuffle
    for (var i = cards.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = cards[i];
      cards[i] = cards[j];
      cards[j] = temp;
    }
    
    render();
  }
  
  function render() {
    var html = '<div class="content-header">' +
      '<button class="back-btn" onclick="App.go(\'menu\')">←</button>' +
      '<h2>🧠 Memory de Valores</h2>' +
      '<div class="quiz-score">' + attempts + ' intentos</div>' +
    '</div>' +
    '<div class="memory-grid">';
    
    cards.forEach(function(c) {
      html += '<div class="memory-card" data-id="' + c.id + '" data-value="' + c.value + '">' +
        '<div class="memory-front">?</div>' +
        '<div class="memory-back">' + c.icon + '<br>' + c.value + '</div>' +
      '</div>';
    });
    
    html += '</div>' +
    '<p style="color:#C25B28;font-size:0.85em;text-align:center;margin-top:12px">Encuentra las parejas de valores cívicos</p>';
    
    document.getElementById('memoryContent').innerHTML = html;
    
    document.querySelectorAll('.memory-card').forEach(function(card) {
      card.addEventListener('click', function() {
        if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
        if (flipped.length >= 2) return;
        
        card.classList.add('flipped');
        flipped.push(card);
        
        if (flipped.length === 2) {
          attempts++;
          document.querySelector('.quiz-score').textContent = attempts + ' intentos';
          
          if (flipped[0].dataset.value === flipped[1].dataset.value) {
            flipped[0].classList.add('matched');
            flipped[1].classList.add('matched');
            matched += 2;
            flipped = [];
            
            if (matched === cards.length) {
              Progreso.completeModule('memory', 20);
              setTimeout(function() {
                document.getElementById('memoryContent').innerHTML = 
                  '<div class="result-screen">' +
                    '<div class="result-icon">🌟</div>' +
                    '<h2 style="font-family:Cinzel;color:#D4A017">¡Felicidades!</h2>' +
                    '<p style="color:#C25B28;margin:8px 0">Encontraste todos los valores en ' + attempts + ' intentos</p>' +
                    '<div class="result-stats">' +
                      '<div class="stat-box"><div class="stat-val">' + attempts + '</div><div class="stat-label">Intentos</div></div>' +
                      '<div class="stat-box"><div class="stat-val">+20</div><div class="stat-label">Monedas</div></div>' +
                    '</div>' +
                    '<button class="btn" onclick="App.go(\'menu\')">Volver al Menú</button>' +
                  '</div>';
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
  
  return { init: init };
})();
