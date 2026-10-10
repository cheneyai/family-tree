/* 可穿透的家族瞬间 — client-side family memory graph */
(function () {
  "use strict";

  const PASSCODE = "88888888";
  const GATE_KEY = "family_moments_unlocked_v1";

  const PEOPLE = {
    dengfu: {
      id: "dengfu", name: "李登福", gen: 6, genLabel: "六世",
      note: "谱图亦作「福登」",
      spouse: "贾氏",
      parent: null,
      moments: [
        { seed: "dengfu-a", year: "示意 · 六世", caption: "支系起点：登福公一门的记忆入口（占位）" },
        { seed: "dengfu-b", year: "示意", caption: "与贾氏结成此房根基（占位图）" }
      ]
    },
    heping: {
      id: "heping", name: "李和平", gen: 7, genLabel: "七世",
      spouse: "李学华", parent: "dengfu",
      moments: [
        { seed: "heping-a", year: "示意 · 七世", caption: "和平一门：翠茹、艳茹、慧茹的父辈瞬间（占位）" },
        { seed: "heping-b", year: "示意", caption: "与李学华的家庭示意" }
      ]
    },
    hezhu: {
      id: "hezhu", name: "李和柱", gen: 7, genLabel: "七世",
      spouse: "李振芬", parent: "dengfu",
      moments: [
        { seed: "hezhu-a", year: "示意 · 七世", caption: "和柱一门：洪建、红丽的父辈瞬间（占位）" },
        { seed: "hezhu-b", year: "示意", caption: "与李振芬的家庭示意" }
      ]
    },
    heshan: {
      id: "heshan", name: "李和山", gen: 7, genLabel: "七世",
      spouse: "李金花", parent: "dengfu",
      moments: [
        { seed: "heshan-a", year: "示意 · 七世", caption: "和山一门：秋红、秋明的父辈瞬间（占位）" },
        { seed: "heshan-b", year: "示意", caption: "与李金花的家庭示意" }
      ]
    },
    heying: {
      id: "heying", name: "李和英", gen: 7, genLabel: "七世",
      spouse: null, parent: "dengfu",
      moments: [
        { seed: "heying-a", year: "示意 · 七世", caption: "和英示意片刻（配偶待补）" }
      ]
    },
    cuiru: {
      id: "cuiru", name: "李翠茹", gen: 8, genLabel: "八世",
      spouse: null, parent: "heping",
      moments: [
        { seed: "cuiru-a", year: "示意 · 八世", caption: "翠茹的示意瞬间" }
      ]
    },
    yanru: {
      id: "yanru", name: "李艳茹", gen: 8, genLabel: "八世",
      spouse: null, parent: "heping",
      moments: [
        { seed: "yanru-a", year: "示意 · 八世", caption: "艳茹的示意瞬间" }
      ]
    },
    huiru: {
      id: "huiru", name: "李慧茹", gen: 8, genLabel: "八世",
      spouse: null, parent: "heping",
      moments: [
        { seed: "huiru-a", year: "示意 · 八世", caption: "慧茹的示意瞬间" }
      ]
    },
    hongjian: {
      id: "hongjian", name: "李洪建", gen: 8, genLabel: "八世",
      spouse: "刘海燕", parent: "hezhu",
      moments: [
        { seed: "hongjian-a", year: "示意 · 八世", caption: "洪建一门：奕非、奕凡的父辈瞬间（占位）" },
        { seed: "hongjian-b", year: "示意", caption: "与刘海燕的家庭示意" },
        { seed: "hongjian-c", year: "示意", caption: "待补：一张真实合影" }
      ]
    },
    hongli: {
      id: "hongli", name: "李红丽", gen: 8, genLabel: "八世",
      spouse: "李松行", parent: "hezhu",
      moments: [
        { seed: "hongli-a", year: "示意 · 八世", caption: "红丽的示意瞬间" },
        { seed: "hongli-b", year: "示意", caption: "与李松行的家庭示意" }
      ]
    },
    qiuhong: {
      id: "qiuhong", name: "李秋红", gen: 8, genLabel: "八世",
      spouse: null, parent: "heshan",
      moments: [
        { seed: "qiuhong-a", year: "示意 · 八世", caption: "秋红的示意瞬间" }
      ]
    },
    qiuming: {
      id: "qiuming", name: "李秋明", gen: 8, genLabel: "八世",
      spouse: "刘双双", parent: "heshan",
      moments: [
        { seed: "qiuming-a", year: "示意 · 八世", caption: "秋明一门：晓桐、晓月的父辈瞬间（占位）" },
        { seed: "qiuming-b", year: "示意", caption: "与刘双双的家庭示意" }
      ]
    },
    yifei: {
      id: "yifei", name: "李奕非", gen: 9, genLabel: "九世",
      spouse: null, parent: "hongjian",
      moments: [
        { seed: "yifei-a", year: "示意 · 九世", caption: "奕非的示意瞬间" },
        { seed: "yifei-b", year: "示意", caption: "待补：成长中的一张照片" }
      ]
    },
    yifan: {
      id: "yifan", name: "李奕凡", gen: 9, genLabel: "九世",
      spouse: null, parent: "hongjian",
      moments: [
        { seed: "yifan-a", year: "示意 · 九世", caption: "奕凡的示意瞬间" }
      ]
    },
    xiaotong: {
      id: "xiaotong", name: "李晓桐", gen: 9, genLabel: "九世",
      spouse: null, parent: "qiuming",
      moments: [
        { seed: "xiaotong-a", year: "示意 · 九世", caption: "晓桐的示意瞬间" }
      ]
    },
    xiaoyue: {
      id: "xiaoyue", name: "李晓月", gen: 9, genLabel: "九世",
      spouse: null, parent: "qiuming",
      moments: [
        { seed: "xiaoyue-a", year: "示意 · 九世", caption: "晓月的示意瞬间" }
      ]
    }
  };

  const POS = {
    dengfu:   { x: 550, y: 80 },
    heping:   { x: 220, y: 220 },
    hezhu:    { x: 450, y: 220 },
    heshan:   { x: 720, y: 220 },
    heying:   { x: 920, y: 220 },
    cuiru:    { x: 100, y: 385 },
    yanru:    { x: 210, y: 385 },
    huiru:    { x: 320, y: 385 },
    hongjian: { x: 460, y: 385 },
    hongli:   { x: 580, y: 385 },
    qiuhong:  { x: 720, y: 385 },
    qiuming:  { x: 860, y: 385 },
    yifei:    { x: 410, y: 565 },
    yifan:    { x: 510, y: 565 },
    xiaotong: { x: 810, y: 565 },
    xiaoyue:  { x: 920, y: 565 }
  };

  const GEN_COLORS = { 6: "#6b3a1f", 7: "#8f4e2a", 8: "#b86a3d", 9: "#c9944a" };
  const NODE_W = 92;
  const NODE_H = 44;

  let selectedId = null;
  let filterGen = "all";

  function $(sel) { return document.querySelector(sel); }

  /* Warm self-contained SVG placeholder — no external CDN */
  function imgUrl(seed) {
    var h = 0;
    for (var i = 0; i < seed.length; i++) h = ((h << 5) - h + seed.charCodeAt(i)) | 0;
    var hues = [28, 32, 36, 22, 40, 18];
    var hue = hues[Math.abs(h) % hues.length];
    var c1 = "hsl(" + hue + ",42%,72%)";
    var c2 = "hsl(" + (hue + 12) + ",38%,58%)";
    var c3 = "hsl(" + (hue - 8) + ",35%,48%)";
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0%" stop-color="' + c1 + '"/>' +
      '<stop offset="55%" stop-color="' + c2 + '"/>' +
      '<stop offset="100%" stop-color="' + c3 + '"/>' +
      "</linearGradient></defs>" +
      '<rect width="640" height="400" fill="url(#g)"/>' +
      '<circle cx="480" cy="90" r="70" fill="rgba(255,250,243,0.18)"/>' +
      '<circle cx="120" cy="320" r="90" fill="rgba(42,34,26,0.08)"/>' +
      '<text x="320" y="198" text-anchor="middle" fill="rgba(42,34,26,0.38)" ' +
      'font-family="Songti SC,Noto Serif SC,serif" font-size="28" letter-spacing="0.35em">示意照片</text>' +
      '<text x="320" y="232" text-anchor="middle" fill="rgba(42,34,26,0.28)" ' +
      'font-family="PingFang SC,sans-serif" font-size="13">素材稍后补</text>' +
      "</svg>";
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  /* ---------- Gate ---------- */
  function isUnlocked() {
    try { return sessionStorage.getItem(GATE_KEY) === "1"; }
    catch (e) { return false; }
  }

  function unlock() {
    try { sessionStorage.setItem(GATE_KEY, "1"); } catch (e) {}
    document.body.classList.remove("locked");
    document.body.classList.add("unlocked");
  }

  function lock() {
    try { sessionStorage.removeItem(GATE_KEY); } catch (e) {}
    document.body.classList.add("locked");
    document.body.classList.remove("unlocked");
    closePanel();
    var input = $("#passcode");
    var err = $("#gateErr");
    if (input) input.value = "";
    if (err) err.textContent = "";
    if (input) input.focus();
  }

  function setupGate() {
    var input = $("#passcode");
    var btn = $("#gateBtn");
    var err = $("#gateErr");
    var lockBtn = $("#lockBtn");

    function tryUnlock() {
      if ((input.value || "").trim() === PASSCODE) {
        unlock();
      } else {
        err.textContent = "通行码不正确，请重试";
        input.select();
      }
    }

    btn.addEventListener("click", tryUnlock);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") tryUnlock();
    });
    if (lockBtn) lockBtn.addEventListener("click", lock);

    if (isUnlocked()) unlock();
    else setTimeout(function () { input.focus(); }, 80);
  }

  /* ---------- Graph ---------- */
  function drawTree() {
    var edges = document.getElementById("edges");
    var nodes = document.getElementById("nodes");
    edges.innerHTML = "";
    nodes.innerHTML = "";

    Object.values(PEOPLE).forEach(function (p) {
      if (!p.parent) return;
      var a = POS[p.parent];
      var b = POS[p.id];
      var midY = (a.y + b.y) / 2;
      var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d",
        "M " + a.x + " " + (a.y + NODE_H / 2) +
        " V " + midY +
        " H " + b.x +
        " V " + (b.y - NODE_H / 2)
      );
      path.setAttribute("class", "edge");
      path.dataset.child = p.id;
      path.dataset.parent = p.parent;
      edges.appendChild(path);
    });

    Object.values(PEOPLE).forEach(function (p) {
      if (!p.spouse) return;
      var pos = POS[p.id];
      var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", pos.x - 22);
      line.setAttribute("y1", pos.y + NODE_H / 2 + 8);
      line.setAttribute("x2", pos.x + 22);
      line.setAttribute("y2", pos.y + NODE_H / 2 + 8);
      line.setAttribute("class", "edge spouse-edge");
      line.dataset.person = p.id;
      edges.appendChild(line);
    });

    Object.values(PEOPLE).forEach(function (p) {
      var pos = POS[p.id];
      var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("class", "person-node");
      g.dataset.id = p.id;
      g.dataset.gen = String(p.gen);
      g.setAttribute("transform", "translate(" + (pos.x - NODE_W / 2) + "," + (pos.y - NODE_H / 2) + ")");
      g.setAttribute("tabindex", "0");
      g.setAttribute("role", "button");
      g.setAttribute("aria-label", p.name);

      var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("class", "node-bg");
      rect.setAttribute("width", NODE_W);
      rect.setAttribute("height", NODE_H);
      rect.setAttribute("rx", 12);
      rect.setAttribute("ry", 12);
      rect.setAttribute("fill", GEN_COLORS[p.gen] || "#8f4e2a");
      rect.setAttribute("stroke", "#fffaf3");
      rect.setAttribute("stroke-width", "2");

      var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", NODE_W / 2);
      text.setAttribute("y", NODE_H / 2 + 1);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("dominant-baseline", "middle");
      text.setAttribute("fill", "#fffaf3");
      text.setAttribute("font-size", "13.5");
      text.setAttribute("font-weight", "600");
      text.setAttribute("font-family", "PingFang SC, Noto Sans SC, Microsoft YaHei, sans-serif");
      text.textContent = p.name;
      text.style.pointerEvents = "none";

      g.appendChild(rect);
      g.appendChild(text);

      if (p.spouse) {
        var sp = document.createElementNS("http://www.w3.org/2000/svg", "text");
        sp.setAttribute("x", NODE_W / 2);
        sp.setAttribute("y", NODE_H + 16);
        sp.setAttribute("text-anchor", "middle");
        sp.setAttribute("fill", "#7a654f");
        sp.setAttribute("font-size", "10.5");
        sp.setAttribute("font-family", "PingFang SC, Noto Sans SC, Microsoft YaHei, sans-serif");
        sp.textContent = "配 " + p.spouse;
        sp.style.pointerEvents = "none";
        g.appendChild(sp);
      }

      g.addEventListener("click", function () { selectPerson(p.id); });
      g.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectPerson(p.id);
        }
      });

      nodes.appendChild(g);
    });

    applyFilter();
  }

  function applyFilter() {
    document.querySelectorAll(".person-node").forEach(function (n) {
      var g = n.dataset.gen;
      var dim = filterGen !== "all" && g !== filterGen;
      n.classList.toggle("dimmed", dim);
      n.classList.toggle("selected", n.dataset.id === selectedId);
    });
    document.querySelectorAll(".edge").forEach(function (e) {
      if (filterGen === "all") {
        e.classList.remove("dimmed");
        return;
      }
      var keep = false;
      var child = e.dataset.child;
      var parent = e.dataset.parent;
      var person = e.dataset.person;
      if (child && PEOPLE[child] && String(PEOPLE[child].gen) === filterGen) keep = true;
      if (parent && PEOPLE[parent] && String(PEOPLE[parent].gen) === filterGen) keep = true;
      if (person && PEOPLE[person] && String(PEOPLE[person].gen) === filterGen) keep = true;
      e.classList.toggle("dimmed", !keep);
    });
  }

  function selectPerson(id) {
    selectedId = id;
    applyFilter();
    var p = PEOPLE[id];
    var empty = document.getElementById("panelEmpty");
    var card = document.getElementById("personCard");
    var panel = document.getElementById("panel");
    var backdrop = document.getElementById("backdrop");

    empty.hidden = true;
    card.hidden = false;

    var spouseHtml = "";
    if (p.spouse) {
      spouseHtml = '<div class="spouse-note">配偶（示意）：' + p.spouse + "</div>";
    } else if (p.id === "heying") {
      spouseHtml = '<div class="spouse-note">配偶：暂无（待补）</div>';
    }

    var noteHtml = p.note
      ? '<div class="person-meta"><span>' + p.note + "</span></div>"
      : "";

    var parentName = p.parent ? PEOPLE[p.parent].name : "—（支系起点）";

    var momentsHtml = p.moments.map(function (m) {
      return (
        '<figure class="moment">' +
          '<div class="moment-media">' +
            '<img src="' + imgUrl(m.seed) + '" alt="' + p.name + ' 示意照片" loading="lazy" width="640" height="400">' +
          "</div>" +
          "<figcaption>" +
            '<div class="cap-year">' + m.year + '<span class="demo-tag">示例</span></div>' +
            '<div class="cap-text">' + m.caption + "</div>" +
          "</figcaption>" +
        "</figure>"
      );
    }).join("");

    card.innerHTML =
      "<h2>" + p.name + "</h2>" +
      '<div class="person-meta">' +
        "<span>" + p.genLabel + "</span>" +
        "<span>父系：" + parentName + "</span>" +
      "</div>" +
      noteHtml +
      spouseHtml +
      '<div class="moments-title">瞬间 Moments</div>' +
      momentsHtml +
      '<button type="button" class="close-btn" id="closePanel">关闭</button>';

    panel.classList.add("open");
    backdrop.classList.add("open");

    var closeBtn = document.getElementById("closePanel");
    if (closeBtn) closeBtn.addEventListener("click", closePanel);
  }

  function closePanel() {
    selectedId = null;
    applyFilter();
    var panel = document.getElementById("panel");
    var backdrop = document.getElementById("backdrop");
    if (panel) panel.classList.remove("open");
    if (backdrop) backdrop.classList.remove("open");
    var empty = document.getElementById("panelEmpty");
    var card = document.getElementById("personCard");
    if (empty) empty.hidden = false;
    if (card) {
      card.hidden = true;
      card.innerHTML = "";
    }
  }

  function setupUI() {
    document.getElementById("backdrop").addEventListener("click", closePanel);
    document.getElementById("genChips").addEventListener("click", function (e) {
      var btn = e.target.closest(".chip");
      if (!btn) return;
      document.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("active"); });
      btn.classList.add("active");
      filterGen = btn.dataset.gen;
      applyFilter();
    });
  }

  setupGate();
  setupUI();
  drawTree();
})();
