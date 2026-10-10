/* 可穿透的家族瞬间 — client-side family memory graph */
(function () {
  "use strict";

  const PASSCODE = "88888888";
  const GATE_KEY = "family_moments_unlocked_v1";

  /* Bloodline + spouses as first-class people (spouses have role:"spouse") */
  const PEOPLE = {
    dengfu: {
      id: "dengfu", name: "李登福", gen: 6, genLabel: "六世",
      note: "谱图亦作「福登」",
      spouseId: "jia", parent: null,
      moments: [
        { seed: "dengfu-a", year: "示意 · 六世", caption: "支系起点：登福公一门的记忆入口（占位）" },
        { seed: "dengfu-b", year: "示意", caption: "与贾氏结成此房根基（占位图）" }
      ]
    },
    jia: {
      id: "jia", name: "贾氏", gen: 6, genLabel: "六世",
      role: "spouse", spouseOf: "dengfu", parent: null,
      moments: [
        { seed: "jia-a", year: "示意 · 六世", caption: "贾氏：与登福公结成支系根基（占位）" },
        { seed: "jia-b", year: "示意", caption: "待补：贾氏相关瞬间" }
      ]
    },
    heping: {
      id: "heping", name: "李和平", gen: 7, genLabel: "七世",
      spouseId: "xuehua", parent: "dengfu",
      moments: [
        { seed: "heping-a", year: "示意 · 七世", caption: "和平一门：翠茹、艳茹、慧茹的父辈瞬间（占位）" },
        { seed: "heping-b", year: "示意", caption: "与李学华的家庭示意" }
      ]
    },
    xuehua: {
      id: "xuehua", name: "李学华", gen: 7, genLabel: "七世",
      role: "spouse", spouseOf: "heping", parent: null,
      moments: [
        { seed: "xuehua-a", year: "示意 · 七世", caption: "李学华：和平一门的配偶瞬间（占位）" },
        { seed: "xuehua-b", year: "示意", caption: "待补：与和平的家庭合影" }
      ]
    },
    hezhu: {
      id: "hezhu", name: "李和柱", gen: 7, genLabel: "七世",
      spouseId: "zhenfen", parent: "dengfu",
      moments: [
        { seed: "hezhu-a", year: "示意 · 七世", caption: "和柱一门：洪建、红丽的父辈瞬间（占位）" },
        { seed: "hezhu-b", year: "示意", caption: "与李振芬的家庭示意" }
      ]
    },
    zhenfen: {
      id: "zhenfen", name: "李振芬", gen: 7, genLabel: "七世",
      role: "spouse", spouseOf: "hezhu", parent: null,
      moments: [
        { seed: "zhenfen-a", year: "示意 · 七世", caption: "李振芬：和柱一门的配偶瞬间（占位）" },
        { seed: "zhenfen-b", year: "示意", caption: "待补：与和柱的家庭合影" }
      ]
    },
    heshan: {
      id: "heshan", name: "李和山", gen: 7, genLabel: "七世",
      spouseId: "jinhua", parent: "dengfu",
      moments: [
        { seed: "heshan-a", year: "示意 · 七世", caption: "和山一门：秋红、秋明的父辈瞬间（占位）" },
        { seed: "heshan-b", year: "示意", caption: "与李金花的家庭示意" }
      ]
    },
    jinhua: {
      id: "jinhua", name: "李金花", gen: 7, genLabel: "七世",
      role: "spouse", spouseOf: "heshan", parent: null,
      moments: [
        { seed: "jinhua-a", year: "示意 · 七世", caption: "李金花：和山一门的配偶瞬间（占位）" },
        { seed: "jinhua-b", year: "示意", caption: "待补：与和山的家庭合影" }
      ]
    },
    heying: {
      id: "heying", name: "李和英", gen: 7, genLabel: "七世",
      spouseId: null, parent: "dengfu",
      moments: [
        { seed: "heying-a", year: "示意 · 七世", caption: "和英示意片刻（配偶待补）" }
      ]
    },
    cuiru: {
      id: "cuiru", name: "李翠茹", gen: 8, genLabel: "八世",
      spouseId: null, parent: "heping",
      moments: [
        { seed: "cuiru-a", year: "示意 · 八世", caption: "翠茹的示意瞬间" }
      ]
    },
    yanru: {
      id: "yanru", name: "李艳茹", gen: 8, genLabel: "八世",
      spouseId: null, parent: "heping",
      moments: [
        { seed: "yanru-a", year: "示意 · 八世", caption: "艳茹的示意瞬间" }
      ]
    },
    huiru: {
      id: "huiru", name: "李慧茹", gen: 8, genLabel: "八世",
      spouseId: null, parent: "heping",
      moments: [
        { seed: "huiru-a", year: "示意 · 八世", caption: "慧茹的示意瞬间" }
      ]
    },
    hongjian: {
      id: "hongjian", name: "李洪建", gen: 8, genLabel: "八世",
      spouseId: "haiyan", parent: "hezhu",
      moments: [
        { seed: "hongjian-a", year: "示意 · 八世", caption: "洪建一门：奕非、奕凡的父辈瞬间（占位）" },
        { seed: "hongjian-b", year: "示意", caption: "与刘海燕的家庭示意" },
        { seed: "hongjian-c", year: "示意", caption: "待补：一张真实合影" }
      ]
    },
    haiyan: {
      id: "haiyan", name: "刘海燕", gen: 8, genLabel: "八世",
      role: "spouse", spouseOf: "hongjian", parent: null,
      moments: [
        { seed: "haiyan-a", year: "示意 · 八世", caption: "刘海燕：洪建一门的配偶瞬间（占位）" },
        { seed: "haiyan-b", year: "示意", caption: "待补：与洪建的家庭合影" }
      ]
    },
    hongli: {
      id: "hongli", name: "李红丽", gen: 8, genLabel: "八世",
      spouseId: "songxing", parent: "hezhu",
      moments: [
        { seed: "hongli-a", year: "示意 · 八世", caption: "红丽的示意瞬间" },
        { seed: "hongli-b", year: "示意", caption: "与李松行的家庭示意" }
      ]
    },
    songxing: {
      id: "songxing", name: "李松行", gen: 8, genLabel: "八世",
      role: "spouse", spouseOf: "hongli", parent: null,
      moments: [
        { seed: "songxing-a", year: "示意 · 八世", caption: "李松行：红丽的配偶瞬间（占位）" },
        { seed: "songxing-b", year: "示意", caption: "待补：与红丽的家庭合影" }
      ]
    },
    qiuhong: {
      id: "qiuhong", name: "李秋红", gen: 8, genLabel: "八世",
      spouseId: null, parent: "heshan",
      moments: [
        { seed: "qiuhong-a", year: "示意 · 八世", caption: "秋红的示意瞬间" }
      ]
    },
    qiuming: {
      id: "qiuming", name: "李秋明", gen: 8, genLabel: "八世",
      spouseId: "shuangshuang", parent: "heshan",
      moments: [
        { seed: "qiuming-a", year: "示意 · 八世", caption: "秋明一门：晓桐、晓月的父辈瞬间（占位）" },
        { seed: "qiuming-b", year: "示意", caption: "与刘双双的家庭示意" }
      ]
    },
    shuangshuang: {
      id: "shuangshuang", name: "刘双双", gen: 8, genLabel: "八世",
      role: "spouse", spouseOf: "qiuming", parent: null,
      moments: [
        { seed: "shuang-a", year: "示意 · 八世", caption: "刘双双：秋明一门的配偶瞬间（占位）" },
        { seed: "shuang-b", year: "示意", caption: "待补：与秋明的家庭合影" }
      ]
    },
    yifei: {
      id: "yifei", name: "李奕非", gen: 9, genLabel: "九世",
      spouseId: null, parent: "hongjian",
      moments: [
        { seed: "yifei-a", year: "示意 · 九世", caption: "奕非的示意瞬间" },
        { seed: "yifei-b", year: "示意", caption: "待补：成长中的一张照片" }
      ]
    },
    yifan: {
      id: "yifan", name: "李奕凡", gen: 9, genLabel: "九世",
      spouseId: null, parent: "hongjian",
      moments: [
        { seed: "yifan-a", year: "示意 · 九世", caption: "奕凡的示意瞬间" }
      ]
    },
    xiaotong: {
      id: "xiaotong", name: "李晓桐", gen: 9, genLabel: "九世",
      spouseId: null, parent: "qiuming",
      moments: [
        { seed: "xiaotong-a", year: "示意 · 九世", caption: "晓桐的示意瞬间" }
      ]
    },
    xiaoyue: {
      id: "xiaoyue", name: "李晓月", gen: 9, genLabel: "九世",
      spouseId: null, parent: "qiuming",
      moments: [
        { seed: "xiaoyue-a", year: "示意 · 九世", caption: "晓月的示意瞬间" }
      ]
    }
  };

  /* Center of each person card. Couples sit side-by-side (bloodline left, spouse right). */
  const POS = {
    dengfu:        { x: 560, y: 88 },
    jia:           { x: 690, y: 88 },

    heping:        { x: 150, y: 240 },
    xuehua:        { x: 280, y: 240 },
    hezhu:         { x: 440, y: 240 },
    zhenfen:       { x: 570, y: 240 },
    heshan:        { x: 740, y: 240 },
    jinhua:        { x: 870, y: 240 },
    heying:        { x: 1040, y: 240 },

    cuiru:         { x: 90,  y: 420 },
    yanru:         { x: 200, y: 420 },
    huiru:         { x: 310, y: 420 },
    hongjian:      { x: 450, y: 420 },
    haiyan:        { x: 580, y: 420 },
    hongli:        { x: 720, y: 420 },
    songxing:      { x: 850, y: 420 },
    qiuhong:       { x: 980, y: 420 },
    qiuming:       { x: 1120, y: 420 },
    shuangshuang:  { x: 1250, y: 420 },

    yifei:         { x: 450, y: 600 },
    yifan:         { x: 580, y: 600 },
    xiaotong:      { x: 1120, y: 600 },
    xiaoyue:       { x: 1250, y: 600 }
  };

  const GEN_COLORS = { 6: "#2e2e2b", 7: "#4a4a45", 8: "#c45c3a", 9: "#d4896e" };
  const SPOUSE_FILL = "#7a7870";
  const NODE_W = 118;
  const NODE_H = 68;
  const FONT_STACK = "Noto Sans SC, DM Sans, PingFang SC, Microsoft YaHei, sans-serif";

  let selectedId = null;
  let filterGen = "all";

  function $(sel) { return document.querySelector(sel); }

  function isSpouse(p) {
    return !!(p && p.role === "spouse");
  }

  function avatarGlyph(name) {
    if (!name) return "·";
    /* Prefer given-name character (last) for multi-char names; keep 氏 names' first char */
    if (name.length >= 2 && name.charAt(name.length - 1) === "氏") return name.charAt(0);
    return name.charAt(name.length - 1);
  }

  function imgUrl(seed) {
    var h = 0;
    for (var i = 0; i < seed.length; i++) h = ((h << 5) - h + seed.charCodeAt(i)) | 0;
    var hues = [18, 22, 28, 12, 8, 32];
    var hue = hues[Math.abs(h) % hues.length];
    var c1 = "hsl(" + hue + ",28%,88%)";
    var c2 = "hsl(" + (hue + 8) + ",22%,78%)";
    var c3 = "hsl(" + (hue - 4) + ",18%,70%)";
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0%" stop-color="' + c1 + '"/>' +
      '<stop offset="50%" stop-color="' + c2 + '"/>' +
      '<stop offset="100%" stop-color="' + c3 + '"/>' +
      "</linearGradient></defs>" +
      '<rect width="800" height="600" fill="url(#g)"/>' +
      '<circle cx="640" cy="90" r="110" fill="rgba(255,255,255,0.35)"/>' +
      '<circle cx="120" cy="500" r="130" fill="rgba(28,28,26,0.04)"/>' +
      '<text x="400" y="280" text-anchor="middle" fill="rgba(28,28,26,0.28)" ' +
      'font-family="DM Sans,Noto Sans SC,sans-serif" font-size="28" font-weight="600" letter-spacing="0.2em">示意照片</text>' +
      '<text x="400" y="320" text-anchor="middle" fill="rgba(28,28,26,0.2)" ' +
      'font-family="Noto Sans SC,sans-serif" font-size="15">素材稍后补</text>' +
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

    /* Parent–child edges (bloodline only) */
    Object.values(PEOPLE).forEach(function (p) {
      if (!p.parent || isSpouse(p)) return;
      var a = POS[p.parent];
      var b = POS[p.id];
      if (!a || !b) return;
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

    /* Spouse link: dashed line between couple centers */
    Object.values(PEOPLE).forEach(function (p) {
      if (!p.spouseId) return;
      var a = POS[p.id];
      var b = POS[p.spouseId];
      if (!a || !b) return;
      var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", a.x + NODE_W / 2 - 4);
      line.setAttribute("y1", a.y);
      line.setAttribute("x2", b.x - NODE_W / 2 + 4);
      line.setAttribute("y2", b.y);
      line.setAttribute("class", "edge spouse-edge");
      line.dataset.person = p.id;
      line.dataset.spouse = p.spouseId;
      edges.appendChild(line);

      var midX = (a.x + b.x) / 2;
      var midY = (a.y + b.y) / 2;
      var heart = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      heart.setAttribute("cx", midX);
      heart.setAttribute("cy", midY);
      heart.setAttribute("r", 3);
      heart.setAttribute("fill", "#9a9890");
      heart.setAttribute("class", "edge spouse-edge");
      heart.dataset.person = p.id;
      heart.dataset.spouse = p.spouseId;
      edges.appendChild(heart);
    });

    Object.values(PEOPLE).forEach(function (p) {
      var pos = POS[p.id];
      if (!pos) return;
      var spouse = isSpouse(p);
      var fill = spouse ? SPOUSE_FILL : (GEN_COLORS[p.gen] || "#4a4a45");
      var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("class", "person-node" + (spouse ? " spouse-node" : ""));
      g.dataset.id = p.id;
      g.dataset.gen = String(p.gen);
      g.dataset.role = spouse ? "spouse" : "bloodline";
      g.setAttribute("transform", "translate(" + (pos.x - NODE_W / 2) + "," + (pos.y - NODE_H / 2) + ")");
      g.setAttribute("tabindex", "0");
      g.setAttribute("role", "button");
      g.setAttribute("aria-label", spouse ? p.name + "（配偶）" : p.name);

      var shadow = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      shadow.setAttribute("class", "node-shadow");
      shadow.setAttribute("x", 2);
      shadow.setAttribute("y", 3);
      shadow.setAttribute("width", NODE_W);
      shadow.setAttribute("height", NODE_H);
      shadow.setAttribute("rx", 14);
      shadow.setAttribute("ry", 14);
      shadow.setAttribute("fill", "rgba(28,28,26,0.12)");
      shadow.setAttribute("opacity", "0.35");

      var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("class", "node-bg");
      rect.setAttribute("width", NODE_W);
      rect.setAttribute("height", NODE_H);
      rect.setAttribute("rx", 14);
      rect.setAttribute("ry", 14);
      rect.setAttribute("fill", fill);
      rect.setAttribute("stroke", spouse ? "#e8e6e0" : "#ffffff");
      rect.setAttribute("stroke-width", spouse ? "1.5" : "2");
      rect.setAttribute("filter", "url(#nodeDrop)");

      /* Avatar circle + glyph */
      var avCx = 22;
      var avCy = NODE_H / 2;
      var avBg = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      avBg.setAttribute("class", "node-avatar");
      avBg.setAttribute("cx", avCx);
      avBg.setAttribute("cy", avCy);
      avBg.setAttribute("r", 14);
      avBg.setAttribute("fill", spouse ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.18)");
      avBg.setAttribute("stroke", "rgba(255,255,255,0.45)");
      avBg.setAttribute("stroke-width", "1");

      var avText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      avText.setAttribute("x", avCx);
      avText.setAttribute("y", avCy + 1);
      avText.setAttribute("text-anchor", "middle");
      avText.setAttribute("dominant-baseline", "middle");
      avText.setAttribute("fill", "#fafaf8");
      avText.setAttribute("font-size", "12");
      avText.setAttribute("font-weight", "700");
      avText.setAttribute("font-family", FONT_STACK);
      avText.textContent = avatarGlyph(p.name);
      avText.style.pointerEvents = "none";

      /* Person icon ring accent (tiny user silhouette hint via path) */
      var iconHint = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      iconHint.setAttribute("cx", avCx);
      iconHint.setAttribute("cy", avCy - 3.5);
      iconHint.setAttribute("r", 3.2);
      iconHint.setAttribute("fill", "none");
      iconHint.setAttribute("stroke", "rgba(250,250,248,0.55)");
      iconHint.setAttribute("stroke-width", "1");
      iconHint.style.pointerEvents = "none";
      iconHint.setAttribute("opacity", "0"); /* glyph is primary; keep path for future */

      var nameX = 44;
      var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", nameX);
      text.setAttribute("y", spouse ? NODE_H / 2 - 8 : NODE_H / 2);
      text.setAttribute("dominant-baseline", "middle");
      text.setAttribute("fill", "#fafaf8");
      text.setAttribute("font-size", "13");
      text.setAttribute("font-weight", "600");
      text.setAttribute("font-family", FONT_STACK);
      text.setAttribute("letter-spacing", "0.02em");
      text.textContent = p.name;
      text.style.pointerEvents = "none";

      g.appendChild(shadow);
      g.appendChild(rect);
      g.appendChild(avBg);
      g.appendChild(avText);
      g.appendChild(iconHint);
      g.appendChild(text);

      if (spouse) {
        var badge = document.createElementNS("http://www.w3.org/2000/svg", "g");
        badge.setAttribute("class", "spouse-badge");
        var badgeBg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        badgeBg.setAttribute("x", nameX);
        badgeBg.setAttribute("y", NODE_H / 2 + 4);
        badgeBg.setAttribute("width", 34);
        badgeBg.setAttribute("height", 14);
        badgeBg.setAttribute("rx", 4);
        badgeBg.setAttribute("ry", 4);
        badgeBg.setAttribute("fill", "rgba(255,255,255,0.2)");
        var badgeTx = document.createElementNS("http://www.w3.org/2000/svg", "text");
        badgeTx.setAttribute("x", nameX + 17);
        badgeTx.setAttribute("y", NODE_H / 2 + 12);
        badgeTx.setAttribute("text-anchor", "middle");
        badgeTx.setAttribute("dominant-baseline", "middle");
        badgeTx.setAttribute("fill", "#f5f4f0");
        badgeTx.setAttribute("font-size", "9");
        badgeTx.setAttribute("font-weight", "600");
        badgeTx.setAttribute("font-family", FONT_STACK);
        badgeTx.textContent = "配偶";
        badgeTx.style.pointerEvents = "none";
        badge.appendChild(badgeBg);
        badge.appendChild(badgeTx);
        g.appendChild(badge);
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
      var spouse = e.dataset.spouse;
      if (child && PEOPLE[child] && String(PEOPLE[child].gen) === filterGen) keep = true;
      if (parent && PEOPLE[parent] && String(PEOPLE[parent].gen) === filterGen) keep = true;
      if (person && PEOPLE[person] && String(PEOPLE[person].gen) === filterGen) keep = true;
      if (spouse && PEOPLE[spouse] && String(PEOPLE[spouse].gen) === filterGen) keep = true;
      e.classList.toggle("dimmed", !keep);
    });
  }

  function selectPerson(id) {
    selectedId = id;
    applyFilter();
    var p = PEOPLE[id];
    if (!p) return;
    var empty = document.getElementById("panelEmpty");
    var card = document.getElementById("personCard");
    var panel = document.getElementById("panel");
    var backdrop = document.getElementById("backdrop");
    var actions = document.getElementById("panelActions");

    if (empty) empty.hidden = true;
    card.hidden = false;
    if (actions) actions.hidden = false;

    var spouseHtml = "";
    if (isSpouse(p)) {
      var partner = PEOPLE[p.spouseOf];
      spouseHtml =
        '<div class="spouse-note">' +
          '<span class="spouse-pill">配偶</span> ' +
          (partner ? '配偶于 <button type="button" class="inline-link" data-goto="' + partner.id + '">' + partner.name + "</button>" : "配偶") +
        "</div>";
    } else if (p.spouseId && PEOPLE[p.spouseId]) {
      var sp = PEOPLE[p.spouseId];
      spouseHtml =
        '<div class="spouse-note">' +
          '<span class="spouse-pill">配偶</span> ' +
          '<button type="button" class="inline-link" data-goto="' + sp.id + '">' + sp.name + "</button>" +
          " · 可点击配偶卡片查看瞬间" +
        "</div>";
    } else if (p.id === "heying") {
      spouseHtml = '<div class="spouse-note"><span class="spouse-pill">配偶</span> 暂无（待补）</div>';
    }

    var noteHtml = p.note
      ? '<div class="person-meta" style="margin-bottom:0.75rem"><span>' + p.note + "</span></div>"
      : "";

    var parentName = "—";
    if (isSpouse(p)) {
      parentName = "配偶入谱（非本支血缘）";
    } else if (p.parent && PEOPLE[p.parent]) {
      parentName = PEOPLE[p.parent].name;
    } else {
      parentName = "—（支系起点）";
    }

    var roleMeta = isSpouse(p)
      ? '<span class="meta-spouse">配偶</span>'
      : "<span>" + p.genLabel + "</span>";

    var momentsHtml = (p.moments || []).map(function (m) {
      return (
        '<figure class="moment">' +
          '<div class="moment-media">' +
            '<img src="' + imgUrl(m.seed) + '" alt="' + p.name + ' 示意照片" loading="lazy" width="800" height="600">' +
          "</div>" +
          "<figcaption>" +
            '<div class="cap-year">' + m.year + '<span class="demo-tag">示例</span></div>' +
            '<div class="cap-text">' + m.caption + "</div>" +
          "</figcaption>" +
        "</figure>"
      );
    }).join("");

    card.innerHTML =
      '<div class="person-card-head">' +
        '<div class="person-avatar" aria-hidden="true">' + avatarGlyph(p.name) + "</div>" +
        "<div>" +
          "<h2>" + p.name + "</h2>" +
          '<div class="person-meta">' +
            roleMeta +
            "<span>" + (isSpouse(p) ? "关系：" : "父系：") + parentName + "</span>" +
          "</div>" +
        "</div>" +
      "</div>" +
      noteHtml +
      spouseHtml +
      '<div class="moments-title">瞬间 Moments</div>' +
      (momentsHtml || '<p class="panel-empty-moments">暂无示意瞬间</p>');

    panel.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
    backdrop.classList.add("open");
    document.body.classList.add("drawer-open");

    var scroll = panel.querySelector(".panel-scroll");
    if (scroll) scroll.scrollTop = 0;

    card.querySelectorAll("[data-goto]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        selectPerson(btn.getAttribute("data-goto"));
      });
    });
  }

  function closePanel() {
    selectedId = null;
    applyFilter();
    var panel = document.getElementById("panel");
    var backdrop = document.getElementById("backdrop");
    if (panel) {
      panel.classList.remove("open");
      panel.setAttribute("aria-hidden", "true");
    }
    if (backdrop) backdrop.classList.remove("open");
    document.body.classList.remove("drawer-open");
    var empty = document.getElementById("panelEmpty");
    var card = document.getElementById("personCard");
    var actions = document.getElementById("panelActions");
    if (empty) empty.hidden = false;
    if (actions) actions.hidden = true;
    if (card) {
      card.hidden = true;
      card.innerHTML = "";
    }
  }

  function setupUI() {
    document.getElementById("backdrop").addEventListener("click", closePanel);
    var closeFixed = document.getElementById("closePanelFixed");
    if (closeFixed) closeFixed.addEventListener("click", closePanel);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closePanel();
    });
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
