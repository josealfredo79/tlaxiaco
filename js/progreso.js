var Progreso = (function() {
  var KEY = 'tlaxiaco_progress';

  function get() {
    var data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : {
      coins: 0,
      level: 1,
      xp: 0,
      completed: {},
      badges: [],
      streak: 0,
      lastVisit: null
    };
  }

  function save(data) { localStorage.setItem(KEY, JSON.stringify(data)); }

  function completeModule(name, points) {
    var p = get();
    if (p.completed[name]) return false;
    p.completed[name] = { date: new Date().toISOString(), points: points };
    p.coins += points;
    p.xp += points;
    if (p.xp >= p.level * 50) { p.level++; }
    checkBadges(p);
    save(p);
    return true;
  }

  function checkBadges(p) {
    var count = Object.keys(p.completed).length;
    var badgeDefs = [
      { id: 'explorer', name: 'Explorador', icon: '🗺️', req: 3, desc: 'Completó 3 módulos' },
      { id: 'scholar', name: 'Erudito Mixteco', icon: '📚', req: 6, desc: 'Completó 6 módulos' },
      { id: 'master', name: 'Maestro de Glifos', icon: '🏺', req: 9, desc: 'Completó todos los módulos' },
      { id: 'quiz_ace', name: 'Quiz Ace', icon: '🧠', req: 'quiz', desc: 'Completó el Quiz Histórico' },
      { id: 'civic_hero', name: 'Héroe Cívico', icon: '⚖️', req: 'civic', desc: 'Completó Valores Cívicos' },
      { id: 'speed_demon', name: 'Veloz como el Viento', icon: '⚡', req: 'quizVeloz', desc: 'Completó Quiz Veloz' }
    ];
    badgeDefs.forEach(function(b) {
      if (p.badges.find(function(x) { return x.id === b.id; })) return;
      if (typeof b.req === 'number' && count >= b.req) {
        p.badges.push({ id: b.id, name: b.name, icon: b.icon, desc: b.desc });
      } else if (typeof b.req === 'string' && p.completed[b.req]) {
        p.badges.push({ id: b.id, name: b.name, icon: b.icon, desc: b.desc });
      }
    });
  }

  function getStats() {
    var p = get();
    return {
      coins: p.coins,
      level: p.level,
      xp: p.xp,
      modules: Object.keys(p.completed).length,
      badges: p.badges.length,
      totalBadges: 9
    };
  }

  function showProfile() {
    var p = get();
    var stats = getStats();
    var html = '<div class="content-header"><button class="back-btn" onclick="App.go(\'menu\')">←</button>' +
      '<h2>👤 Mi Perfil</h2></div>' +
      '<div class="glyph-display"><div class="glyph-big">🏺</div>' +
      '<div class="glyph-name">Explorador Nivel ' + stats.level + '</div>' +
      '<div class="glyph-meaning">' + stats.coins + ' monedas • ' + stats.xp + ' XP</div></div>' +
      '<div class="content-body"><div class="era-card"><h3>📊 Progreso</h3>' +
      '<p>Módulos completados: ' + stats.modules + '/12</p>' +
      '<p>Insignias: ' + stats.badges + '/' + stats.totalBadges + '</p></div>';

    if (p.badges.length > 0) {
      html += '<div class="era-card"><h3>🏆 Mis Insignias</h3>';
      p.badges.forEach(function(b) {
        html += '<p style="margin:6px 0">' + b.icon + ' <strong>' + b.name + '</strong> — ' + b.desc + '</p>';
      });
      html += '</div>';
    }

    html += '<button class="btn btn-outline btn-sm" style="width:100%;margin-top:8px" onclick="if(confirm(\'¿Borrar todo el progreso?\')){localStorage.removeItem(\'' + KEY + '\');location.reload();}">🗑️ Borrar Progreso</button></div>';
    document.getElementById('perfilContent').innerHTML = html;
  }

  function sync() {
    var p = get();
    return JSON.stringify(p);
  }

  function importData(json) {
    try {
      var data = JSON.parse(json);
      save(data);
      return true;
    } catch(e) { return false; }
  }

  return { get: get, save: save, completeModule: completeModule, getStats: getStats, showProfile: showProfile, sync: sync, importData: importData };
})();
