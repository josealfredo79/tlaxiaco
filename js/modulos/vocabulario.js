var Vocabulario = (function() {
  var words = [
    { mixteco: "Ñuu Savi", spanish: "Pueblo de la Lluvia", category: "Pueblo", icon: "🌧️", desc: "Nombre con que se conocen a sí mismos los mixtecos. Ñuu = pueblo, Savi = lluvia." },
    { mixteco: "Ndijiinu", spanish: "Buena Vista", category: "Lugar", icon: "👁️", desc: "Nombre mixteco de Tlaxiaco, por su posición sobre el valle con vista panorámica." },
    { mixteco: "Tu'un Savi", spanish: "Palabra de Lluvia", category: "Lengua", icon: "🗣️", desc: "Así llaman los mixtecos a su lengua. Tu'un = palabra, Savi = lluvia." },
    { mixteco: "Ñuhu", spanish: "Dios / Ser Superior", category: "Espiritual", icon: "✨", desc: "Los ñuhu eran los seres creadores en la mitología mixteca." },
    { mixteco: "Tay Ñuu", spanish: "Gente de la Tierra", category: "Pueblo", icon: "🌍", desc: "Otro nombre con que los mixtecos se identifican, ligado a su tierra." },
    { mixteco: "Cinco Venado", spanish: "Cinco Venado Garra de Águila", category: "Personaje", icon: "🦌", desc: "El más grande rey mixteco. Unificó los señoríos de la Mixteca." },
    { mixteco: "Ñuu Tnoo", spanish: "Lugar Negro", category: "Lugar", icon: "⬛", desc: "Parte del nombre antiguo de Tilantongo, importante señorío mixteco." },
    { mixteco: "Yuhui Tamu", spanish: "Casa de la Serpiente", category: "Espacial", icon: "🐍", desc: "Concepto cosmológico mixteco sobre el origen del mundo." },
    { mixteco: "Inixi", spanish: "Maíz", category: "Alimento", icon: "🌽", desc: "El maíz es el alimento sagrado. Los mixtecos lo sembraban siguiendo el calendario de lluvias." },
    { mixteco: "Xí'nu", spanish: "Flor", category: "Naturaleza", icon: "🌸", desc: "Las flores son símbolo de belleza y aparecen en los códices adornando a dioses y reyes." }
  ];

  var current = 0;

  function init() { current = 0; render(); }

  function render() {
    var item = words[current];
    var total = words.length;
    var pct = ((current + 1) / total * 100);

    var html = '<div class="c-hdr"><button class="back" onclick="App.go(\'menu\')">←</button>' +
      '<h2>🗣️ Vocabulario Mixteco</h2><div class="c-score">' + (current+1) + '/' + total + '</div></div>' +
      '<div class="progress-bar"><div class="progress-fill" style="width:' + pct + '%"></div></div>' +
      '<div class="glyph-display"><div class="glyph-big">' + item.icon + '</div>' +
      '<div class="glyph-name">' + item.mixteco + '</div>' +
      '<div class="glyph-meaning">' + item.spanish + '</div></div>' +
      '<div class="c-body"><div class="era-card">' +
      '<div class="e-date">📂 ' + item.category + '</div>' +
      '<p>' + item.desc + '</p></div></div>' +
      '<div class="c-nav"><button class="btn btn-outline btn-sm" onclick="Vocabulario.prev()" style="visibility:' + (current===0?'hidden':'visible') + '">← Anterior</button>' +
      '<button class="btn btn-sm" onclick="Vocabulario.next()">' + (current===total-1?'✓ Terminar':'Siguiente →') + '</button></div>';

    document.getElementById('vocabContent').innerHTML = html;
  }

  function next() { if (current < words.length-1) { current++; render(); } else App.go('menu'); }
  function prev() { if (current > 0) { current--; render(); } }

  return { init: init, next: next, prev: prev };
})();
