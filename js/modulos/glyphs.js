var Glyphs = (function() {
  var data = [
    { glyph: "🦅", name: "Cuauhtli", meaning: "Águila", desc: "El águila representa al guerrero solar, al que vuela hacia el sol. En Tlaxiaco, los guerreros del Cerro Encantado fueron como águilas luchando por la libertad." },
    { glyph: "🐆", name: "Ocelotl", meaning: "Jaguar", desc: "El jaguar es el animal más poderoso de la selva. Representa la fuerza, la noche y los guerreros de elite. Los mixtecos veían al jaguar como protector de los pueblos." },
    { glyph: "🌧️", name: "Quiaviz", meaning: "Lluvia", desc: "La lluvia es vida para los mixtecos. 'Ñuu Savi' significa 'Pueblo de la Lluvia'. Tlaxiaco recibe lluvias que nutren los campos y dan vida a la tierra." },
    { glyph: "🌽", name: "Cintli", meaning: "Maíz", desc: "El maíz es el alimento sagrado de Mesoamérica. Los mixtecos sembraban maíz en las laderas de los cerros, siguiendo el calendario de lluvias." },
    { glyph: "🌸", name: "Xóchitl", meaning: "Flor", desc: "Las flores representan la belleza, la vida y la muerte. En los códices mixtecos, las flores adornan a los dioses y los reyes." },
    { glyph: "⛰️", name: "Tepec", meaning: "Cerro", desc: "Los cerros son sagrados para los mixtecos. Cada cerro tiene un espíritu protector. Tlaxiaco significa 'Buena Vista' por su posición sobre el valle." },
    { glyph: "🐒", name: "Ozomatli", meaning: "Mono", desc: "El mono representa la danza, la música y la alegría. En las fiestas de Tlaxiaco, los danzantes visten como monos para celebrar." },
    { glyph: "🦌", name: "Mazatl", meaning: "Venado", desc: "El venado representa la velocidad, la gracia y la libertad. Los códices mixtecos están escritos en piel de venado." },
    { glyph: "🐍", name: "Coatl", meaning: "Serpiente", desc: "La serpiente representa la sabiduría y el conocimiento. La Serpiente Emplumada (Quetzalcóatl) pasó por la Mixteca." },
    { glyph: "💀", name: "Miquiztli", meaning: "Muerte", desc: "La muerte no es el fin, sino un cambio. Los mixtecos honran a sus muertos con ofrendas y celebraciones." }
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
      '<h2>🏺 Glifos Mixtecos</h2>' +
      '<div class="quiz-score">' + (current+1) + '/' + total + '</div>' +
    '</div>' +
    '<div class="progress-bar"><div class="progress-fill" style="width:' + pct + '%"></div></div>' +
    '<div class="glyph-display">' +
      '<div class="glyph-big">' + item.glyph + '</div>' +
      '<div class="glyph-name">' + item.name + '</div>' +
      '<div class="glyph-meaning">' + item.meaning + '</div>' +
    '</div>' +
    '<div class="content-body">' +
      '<div class="era-card">' +
        '<p>' + item.desc + '</p>' +
      '</div>' +
    '</div>' +
    '<div class="content-nav">' +
      '<button class="btn btn-outline btn-sm" onclick="Glyphs.prev()" style="visibility:' + (current === 0 ? 'hidden' : 'visible') + '">← Anterior</button>' +
      '<button class="btn btn-sm" onclick="Glyphs.next()">' + (current === total-1 ? '✓ Terminar' : 'Siguiente →') + '</button>' +
    '</div>';
    
    document.getElementById('glyphsContent').innerHTML = html;
  }
  
  function next() {
    if (current < data.length - 1) { current++; render(); }
    else App.go('menu');
  }
  
  function prev() {
    if (current > 0) { current--; render(); }
  }
  
  return { init: init, next: next, prev: prev };
})();
