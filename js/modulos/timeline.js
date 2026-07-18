var Timeline = (function() {
  var data = [
    { era: "Época Prehispánica", date: "400 a.C. - 1500 d.C.", text: "El asentamiento inicial de Tlaxiaco se sitúa alrededor de 400 a.C. En Tlaxiaco existen 279 sitios arqueológicos que dan cuenta de su esplendor prehispánico.", highlight: "El nombre 'Tlaxiaco' proviene del náhuatl 'tlachquiauhco', que significa 'en el lugar de la lluvia del juego de pelota'." },
    { era: "La Conquista", date: "1519", text: "En 1519 la conquista española se hizo presente con Francisco de Orosco. Llegaron los Agustinos, Dominicos y Franciscanos.", highlight: "Tlaxiaco fue codiciada por los mexicas por su ubicación entre Coixtlahuaca y Tututepec." },
    { era: "Evangelización", date: "1548", text: "Llegan Fray Gonzalo de Lucero y Fray Benito Hernández. Se conserva un convento dominico asesorado por Rodrigo Gil de Hontañón.", highlight: "El convento destaca por el 'Modillón dominico', una ménsula decorativa única." },
    { era: "Independencia", date: "1813", text: "José María Morelos y Pavón pasa por Tlaxiaco exhortando a los habitantes a luchar por la Independencia.", highlight: "María Nava de Catalán fue nombrada Generala por Morelos, dando título de Heroica Ciudad." },
    { era: "Batalla del Cerro Encantado", date: "29 de abril de 1814", text: "Ramos Sesma y un centenar de insurgentes derrotaron al ejército realista sin armas ni artillería.", highlight: "Hubo 19 muertos y 120 heridos. Los realistas gritaron: '¡Mejor echen bala y no echen canto!'." },
    { era: "Porfirio Díaz", date: "1854", text: "Porfirio Díaz se refugia en Tlaxiaco herido, curado por los tlaxiaqueños.", highlight: "En 1884, Tlaxiaco es declarada 'Heroica Ciudad' y 'Ciudad de los Mártires de la Reforma'." }
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
      '<h2>📜 Línea del Tiempo</h2>' +
      '<div class="quiz-score">' + (current+1) + '/' + total + '</div>' +
    '</div>' +
    '<div class="progress-bar"><div class="progress-fill" style="width:' + pct + '%"></div></div>' +
    '<div class="content-body">' +
      '<div class="era-card">' +
        '<div class="era-date">' + item.date + '</div>' +
        '<h3>' + item.era + '</h3>' +
        '<p>' + item.text + '</p>' +
      '</div>' +
      '<div class="highlight-card">' +
        '<div class="highlight-title">💡 Dato importante</div>' +
        '<p>' + item.highlight + '</p>' +
      '</div>' +
    '</div>' +
    '<div class="content-nav">' +
      '<button class="btn btn-outline btn-sm" onclick="Timeline.prev()" style="visibility:' + (current === 0 ? 'hidden' : 'visible') + '">← Anterior</button>' +
      '<button class="btn btn-sm" onclick="Timeline.next()">' + (current === total-1 ? '✓ Terminar' : 'Siguiente →') + '</button>' +
    '</div>';
    
    document.getElementById('timelineContent').innerHTML = html;
  }
  
  function next() {
    if (current < data.length - 1) { current++; render(); }
    else App.go('result-timeline');
  }
  
  function prev() {
    if (current > 0) { current--; render(); }
  }
  
  return { init: init, next: next, prev: prev };
})();
