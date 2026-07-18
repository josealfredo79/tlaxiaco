var Legends = (function() {
  var data = [
    { title: "El Cerro Encantado", icon: "⛰️", summary: "La batalla que dio nombre al cerro", text: "El 29 de abril de 1814, Ramos Sesma y un centenar de insurgentes sin armas ni artillería esperaron al ejército realista. Los insurgentes utilizaron piedras enormes que hacían rodar cuesta abajo. Los realistas gritaron: '¡Mejor echen bala y no echen canto!'. De ahí el nombre del cerro 'Encantado'." },
    { title: "María Nava de Catalán", icon: "🎖️", summary: "La heroína que fue nombrada Generala", text: "María Nava de Catalán, viuda del general Catalán, ofreció a sus hijos a la causa insurgente. Morelos la nombra Generala en reconocimiento a su valentía. Fue esta acción la que motivó que Tlaxiaco recibiera el título de Heroica Ciudad." },
    { title: "Porfirio y el Cura Márquez", icon: "🏥", summary: "La curación del futuro presidente", text: "En diciembre de 1854, Porfirio Díaz llega herido a Tlaxiaco. Se refugia con el cura Manuel Márquez, quien lo acogió y los tlaxiaqueños lo curaron de sus heridas. Esta experiencia marcó profundamente al futuro presidente." },
    { title: "Los 279 Secretos", icon: "🏺", summary: "Los sitios arqueológicos olvidados", text: "Bajo las calles de Tlaxiaco y en los cerros yacen 279 sitios arqueológicos que guardan los secretos de más de 2,000 años de historia. Desde pirámides hasta talleres de cerámica y orfebrería mixteca." }
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
      '<h2>👻 Leyendas</h2>' +
      '<div class="quiz-score">' + (current+1) + '/' + total + '</div>' +
    '</div>' +
    '<div class="progress-bar"><div class="progress-fill" style="width:' + pct + '%"></div></div>' +
    '<div class="legend-display">' +
      '<div class="legend-icon">' + item.icon + '</div>' +
      '<h3 class="legend-title">' + item.title + '</h3>' +
      '<p class="legend-summary">' + item.summary + '</p>' +
    '</div>' +
    '<div class="content-body">' +
      '<div class="era-card">' +
        '<p>' + item.text + '</p>' +
      '</div>' +
    '</div>' +
    '<div class="content-nav">' +
      '<button class="btn btn-outline btn-sm" onclick="Legends.prev()" style="visibility:' + (current === 0 ? 'hidden' : 'visible') + '">← Anterior</button>' +
      '<button class="btn btn-sm" onclick="Legends.next()">' + (current === total-1 ? '✓ Terminar' : 'Siguiente →') + '</button>' +
    '</div>';
    
    document.getElementById('legendsContent').innerHTML = html;
  }
  
  function next() {
    if (current < data.length - 1) { current++; render(); }
    else {
      Progreso.completeModule('legends', 15);
      App.go('menu');
    }
  }
  
  function prev() {
    if (current > 0) { current--; render(); }
  }
  
  return { init: init, next: next, prev: prev };
})();
