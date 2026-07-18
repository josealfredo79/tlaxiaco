// ===== MAIN APP =====
var App = (function() {
  var currentScreen = 'home';
  
  function go(id) {
    document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('on'); });
    document.getElementById(id).classList.add('on');
    currentScreen = id;
    window.scrollTo(0,0);
    
    // Init modules
    if (id === 'timeline') Timeline.init();
    if (id === 'quiz') Quiz.init();
    if (id === 'civic') Civic.init();
    if (id === 'scenarios') Scenarios.init();
    if (id === 'glyphs') Glyphs.init();
    if (id === 'legends') Legends.init();
    if (id === 'coddex') Coddex.init();
    if (id === 'figures') Figures.init();
    if (id === 'memory') Memory.init();
    if (id === 'glyphGame') GlyphGame.init();
  }
  
  function init() {
    // Add glow animation to body
    document.body.classList.add('loaded');
  }
  
  return { go: go, init: init };
})();

document.addEventListener('DOMContentLoaded', App.init);
