var Figures = (function() {
  var data = [
    { name: "José María Morelos y Pavón", icon: "🎖️", role: "Líder Insurgente", bio: "Morelos fue uno de los líderes más importantes de la Independencia. En 1813, pasó por Tlaxiaco.", tlaxiaco: "Exhortó a los habitantes a luchar y nombró Generala a María Nava de Catalán." },
    { name: "María Nava de Catalán", icon: "👩", role: "Heroína de la Independencia", bio: "Viuda del general Catalán, ofreció sus hijos a la causa insurgente.", tlaxiaco: "Su valentía motivó que Tlaxiaco recibiera el título de Heroica Ciudad." },
    { name: "Porfirio Díaz", icon: "📜", role: "Presidente de México", bio: "Presidente durante 35 años. En 1854 se refugió en Tlaxiaco.", tlaxiaco: "Fue curado por los tlaxiaqueños con el cura Manuel Márquez." },
    { name: "Rodrigo Gil de Hontañón", icon: "🏛️", role: "Arquitecto", bio: "Arquitecto que asesoró el convento dominico.", tlaxiaco: "Su obra incluye el 'Modillón dominico'." },
    { name: "Los Ñuu Savi", icon: "🏺", role: "Pueblo Mixteco", bio: "El pueblo que habitó Tlaxiaco desde 400 a.C.", tlaxiaco: "Dejaron 279 sitios arqueológicos y su nombre 'Ndijiinu' (Buena vista)." }
  ];
  
  var current = 0;
  
  function init() {
    current = 0;
    render();
  }
  
  function render() {
    var item = data[current];
    var total = data.length;
    var pct = ((current + 1) / total * 100);
    
    var html = '<div class="content-header">' +
      '<button class="back-btn" onclick="App.go(\'menu\')">←</button>' +
      '<h2>👤 Personajes</h2>' +
      '<div class="quiz-score">' + (current+1) + '/' + total + '</div>' +
    '</div>' +
    '<div class="progress-bar"><div class="progress-fill" style="width:' + pct + '%"></div></div>' +
    '<div class="figure-display">' +
      '<div class="figure-icon">' + item.icon + '</div>' +
      '<h3 class="figure-name">' + item.name + '</h3>' +
      '<p class="figure-role">' + item.role + '</p>' +
    '</div>' +
    '<div class="content-body">' +
      '<div class="era-card">' +
        '<p>' + item.bio + '</p>' +
      '</div>' +
      '<div class="highlight-card">' +
        '<div class="highlight-title">🏛️ Conexión con Tlaxiaco</div>' +
        '<p>' + item.tlaxiaco + '</p>' +
      '</div>' +
    '</div>' +
    '<div class="content-nav">' +
      '<button class="btn btn-outline btn-sm" onclick="Figures.prev()" style="visibility:' + (current === 0 ? 'hidden' : 'visible') + '">← Anterior</button>' +
      '<button class="btn btn-sm" onclick="Figures.next()">' + (current === total-1 ? '✓ Terminar' : 'Siguiente →') + '</button>' +
    '</div>';
    
    document.getElementById('figuresContent').innerHTML = html;
  }
  
  function next() {
    if (current < data.length - 1) { current++; render(); }
    else {
      Progreso.completeModule('figures', 15);
      App.go('menu');
    }
  }
  
  function prev() {
    if (current > 0) { current--; render(); }
  }
  
  return { init: init, next: next, prev: prev };
})();
