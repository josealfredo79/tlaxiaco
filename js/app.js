var App = (function() {
  function go(id) {
    document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('on'); });
    document.getElementById(id).classList.add('on');
    window.scrollTo(0, 0);

    if (id === 'timeline') Timeline.init();
    if (id === 'quiz') Quiz.init();
    if (id === 'civic') Civic.init();
    if (id === 'scenarios') Scenarios.init();
    if (id === 'glyphs') Glyphs.init();
    if (id === 'legends') Legends.init();
    if (id === 'figures') Figures.init();
    if (id === 'memory') Memory.init();
    if (id === 'mapa') Mapa.init();
    if (id === 'vocabulario') Vocabulario.init();
    if (id === 'quizVeloz') QuizVeloz.init();
    if (id === 'adivinanzas') Adivinanzas.init();
    if (id === 'perfil') Progreso.showProfile();
  }

  function init() {
    Idioma.load();
  }

  return { go: go, init: init };
})();

document.addEventListener('DOMContentLoaded', App.init);
