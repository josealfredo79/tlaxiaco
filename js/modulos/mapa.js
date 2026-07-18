var Mapa = (function() {
  var places = [
    { name: "Parroquia de San Juan Bautista", icon: "⛪", year: "1548", desc: "Construida sobre un antiguo templo mixteco. Destaca por el 'Modillón dominico' asesorado por Rodrigo Gil de Hontañón. Es una de las iglesias más antiguas de la región.", coords: "Centro de Tlaxiaco" },
    { name: "Cerro Encantado", icon: "⛰️", year: "1814", desc: "Aquí se libró la Batalla del Cerro Encantado el 29 de abril de 1814. Ramos Sesma y sus insurgentes derrotaron al ejército realista sin armas ni artillería.", coords: "Norte de Tlaxiaco" },
    { name: "Mercado Municipal", icon: "🏪", year: "Siglo XVI", desc: "Uno de los mercados más importantes de la Mixteca. Aquí se encuentran productos frescos, artesanías, textiles y los famosos quesos de la región.", coords: "Centro de Tlaxiaco" },
    { name: "Barrio de San Pedro", icon: "🏘️", year: "1548", desc: "Donde fray Gonzalo de Lucero y fray Benito Hernández fundaron la primera ermita. Aquí se inició la evangelización de Tlaxiaco.", coords: "Zona centro" },
    { name: "Sitio Arqueológico", icon: "🏺", year: "400 a.C.", desc: "Uno de los 279 sitios arqueológicos de Tlaxiaco. Guarda restos de la ocupación prehispánica mixteca de más de 2,000 años.", coords: "Cercanías de Tlaxiaco" },
    { name: "Plaza Principal", icon: "🏛️", year: "Colonial", desc: "Corazón de la vida social de Tlaxiaco. Aquí se celebran las fiestas patronales, ferias y eventos cívicos.", coords: "Centro histórico" }
  ];

  function init() { render(); }

  function render() {
    var html = '<div class="content-header">' +
      '<button class="back-btn" onclick="App.go(\'menu\')">←</button>' +
      '<h2>🗺️ Mapa de Tlaxiaco</h2></div>' +
      '<div class="content-body">';
    
    places.forEach(function(p, i) {
      html += '<div class="era-card" style="cursor:pointer" onclick="Mapa.showDetail(' + i + ')">' +
        '<div class="era-date">' + p.icon + ' ' + p.year + '</div>' +
        '<h3>' + p.name + '</h3>' +
        '<p style="font-size:.75em;color:#D4692E">' + p.coords + '</p></div>';
    });
    
    html += '</div><div class="content-nav"><button class="btn btn-outline btn-sm" onclick="App.go(\'menu\')">← Menú</button></div>';
    document.getElementById('mapaContent').innerHTML = html;
  }

  function showDetail(i) {
    var p = places[i];
    document.getElementById('mapaContent').innerHTML =
      '<div class="content-header"><button class="back-btn" onclick="Mapa.init()">←</button><h2>' + p.icon + ' ' + p.name + '</h2></div>' +
      '<div class="glyph-display"><div class="glyph-big">' + p.icon + '</div>' +
      '<div class="glyph-name">' + p.name + '</div><div class="glyph-meaning">' + p.year + ' • ' + p.coords + '</div></div>' +
      '<div class="content-body"><div class="era-card"><p>' + p.desc + '</p></div></div>' +
      '<div class="content-nav"><button class="btn btn-outline btn-sm" onclick="Mapa.init()">← Lista</button></div>';
  }

  return { init: init, showDetail: showDetail };
})();
