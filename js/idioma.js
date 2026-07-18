var Idioma = (function() {
  var current = 'es'; // 'es' or 'mix'

  var translations = {
    'es': {
      home_title: 'Tlaxiaco',
      home_subtitle: 'Ndijiinu — Buena Vista',
      home_desc: 'Descubre la historia, los glifos y las tradiciones del pueblo Ñuu Savi',
      explore: 'Explorar',
      menu_title: 'Tlaxiaco — Ndijiinu',
      sec_history: 'Historia',
      sec_civic: 'Valores Cívicos',
      sec_culture: 'Cultura Ñuu Savi',
      sec_games: 'Juegos Interactivos',
      timeline: 'Línea del Tiempo',
      timeline_desc: 'Desde 400 a.C.',
      quiz: 'Quiz Histórico',
      quiz_desc: '10 preguntas',
      civic: 'Valores',
      civic_desc: 'Respeto, Honradez',
      scenarios: 'Escenarios',
      scenarios_desc: 'Decisiones reales',
      glyphs: 'Glifos',
      glyphs_desc: 'Símbolos antiguos',
      legends: 'Leyendas',
      legends_desc: 'Historias vivas',
      figures: 'Personajes',
      figures_desc: 'Héroes locales',
      memory: 'Memory',
      memory_desc: 'Encuentra valores',
      mapa: 'Mapa',
      mapa_desc: 'Lugares históricos',
      vocab: 'Vocabulario',
      vocab_desc: 'Ñuu Savi',
      quizveloz: 'Quiz Veloz',
      quizveloz_desc: '¡Contra el tiempo!',
      adivinanzas: 'Adivinanzas',
      adivinanzas_desc: 'Sabiduría popular',
      profile: 'Mi Perfil',
      glyphs_sec: 'Glifos del Calendario',
      back: '← Inicio',
      next: 'Siguiente →',
      prev: '← Anterior',
      finish: '✓ Terminar',
      back_menu: '← Menú',
      score: 'Puntos',
      attempts: 'intentos',
      congratulations: '¡Felicidades!',
      complete: '¡Completado!',
      play_again: '🔄 Jugar de Nuevo',
      switch_lang: '🗣️ Mixteco'
    },
    'mix': {
      home_title: 'Tlaxiaco',
      home_subtitle: 'Ñuu Tnoo — Buena Vista',
      home_desc: 'Nuu ka\'nuu yu\'ú, glifos ka\'ñuu Ñuu Savi',
      explore: 'Nuu Kánui',
      menu_title: 'Tlaxiaco — Ndijiinu',
      sec_history: 'Yuchi',
      sec_civic: 'Valores',
      sec_culture: 'Ñuu Savi',
      sec_games: 'Juegos',
      timeline: 'Yuchi Tii',
      timeline_desc: '400 a.C.',
      quiz: 'Quiz Yuchi',
      quiz_desc: '10 preguntas',
      civic: 'Valores',
      civic_desc: 'Respeto',
      scenarios: 'Escenarios',
      scenarios_desc: 'Decisiones',
      glyphs: 'Glifos',
      glyphs_desc: 'Signos',
      legends: 'Leyendas',
      legends_desc: 'Historias',
      figures: 'Personajes',
      figures_desc: 'Héroes',
      memory: 'Memory',
      memory_desc: 'Parejas',
      mapa: 'Mapa',
      mapa_desc: 'Lugares',
      vocab: 'Tu\'un Savi',
      vocab_desc: 'Lengua',
      quizveloz: 'Quiz Veloz',
      quizveloz_desc: 'Contra tiempo',
      adivinanzas: 'Adivinanzas',
      adivinanzas_desc: 'Sabiduría',
      profile: 'Mi Perfil',
      glyphs_sec: 'Glifos del Calendario',
      back: '← Inicio',
      next: 'Siguiente →',
      prev: '← Anterior',
      finish: '✓ Terminar',
      back_menu: '← Menú',
      score: 'Puntos',
      attempts: 'veces',
      congratulations: '¡Iní!',
      complete: '¡Iní!',
      play_again: '🔄 Jugar',
      switch_lang: '🗣️ Español'
    }
  };

  function t(key) {
    return (translations[current] && translations[current][key]) || translations['es'][key] || key;
  }

  function toggle() {
    current = current === 'es' ? 'mix' : 'es';
    localStorage.setItem('tlaxiaco_lang', current);
    return current;
  }

  function getCurrent() { return current; }

  function load() {
    var saved = localStorage.getItem('tlaxiaco_lang');
    if (saved) current = saved;
  }

  load();

  return { t: t, toggle: toggle, getCurrent: getCurrent };
})();
