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

  function toggleLang() {
    var lang = Idioma.toggle();
    updateUI();
  }

  function updateUI() {
    var t = Idioma.t;
    document.getElementById('homeTitle').textContent = t('home_title');
    document.getElementById('homeSub').textContent = t('home_subtitle');
    document.getElementById('homeDesc').textContent = t('home_desc');
    document.getElementById('btnExplore').textContent = '🏛️ ' + t('explore');
    document.getElementById('btnLang').textContent = t('switch_lang');
    document.getElementById('menuTitle').textContent = '🏛️ ' + t('menu_title');
    document.getElementById('secHist').textContent = '📜 ' + t('sec_history');
    document.getElementById('secCivic').textContent = '⚖️ ' + t('sec_civic');
    document.getElementById('secCult').textContent = '🏺 ' + t('sec_culture');
    document.getElementById('secGames').textContent = '🎮 ' + t('sec_games');
    document.getElementById('secGlyphs').textContent = '📖 ' + t('glyphs_sec');
    document.getElementById('mTimeline').textContent = t('timeline');
    document.getElementById('mTimelineD').textContent = t('timeline_desc');
    document.getElementById('mQuiz').textContent = t('quiz');
    document.getElementById('mQuizD').textContent = t('quiz_desc');
    document.getElementById('mCivic').textContent = t('civic');
    document.getElementById('mCivicD').textContent = t('civic_desc');
    document.getElementById('mScenarios').textContent = t('scenarios');
    document.getElementById('mScenariosD').textContent = t('scenarios_desc');
    document.getElementById('mGlyphs').textContent = t('glyphs');
    document.getElementById('mGlyphsD').textContent = t('glyphs_desc');
    document.getElementById('mLegends').textContent = t('legends');
    document.getElementById('mLegendsD').textContent = t('legends_desc');
    document.getElementById('mFigures').textContent = t('figures');
    document.getElementById('mFiguresD').textContent = t('figures_desc');
    document.getElementById('mMapa').textContent = t('mapa');
    document.getElementById('mMapaD').textContent = t('mapa_desc');
    document.getElementById('mVocab').textContent = t('vocab');
    document.getElementById('mVocabD').textContent = t('vocab_desc');
    document.getElementById('mMemory').textContent = t('memory');
    document.getElementById('mMemoryD').textContent = t('memory_desc');
    document.getElementById('mQuizVeloz').textContent = t('quizveloz');
    document.getElementById('mQuizVelozD').textContent = t('quizveloz_desc');
    document.getElementById('mAdiv').textContent = t('adivinanzas');
    document.getElementById('mAdivD').textContent = t('adivinanzas_desc');
    document.getElementById('mProfile').textContent = t('profile');
    document.getElementById('btnBack').textContent = t('back');
  }

  function init() {
    Idioma.load();
    updateUI();
  }

  return { go: go, toggleLang: toggleLang, init: init };
})();

document.addEventListener('DOMContentLoaded', App.init);
