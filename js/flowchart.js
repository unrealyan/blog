// flowchart.js, v1.8.0
// Copyright (c)2017 Adriano Raiano (adrai).
// Distributed under MIT license
// http://adrai.github.io/flowchart.js

!(function(t, i) {
  if ("object" == typeof exports && "object" == typeof module)
    module.exports = i(require("Raphael"));
  else if ("function" == typeof define && define.amd) define(["Raphael"], i);
  else {
    var e = i("object" == typeof exports ? require("Raphael") : t.Raphael);
    for (var r in e) ("object" == typeof exports ? exports : t)[r] = e[r];
  }
})(this, function(t) {
  return (function(t) {
    function i(r) {
      if (e[r]) return e[r].exports;
      var s = (e[r] = { exports: {}, id: r, loaded: !1 });
      return t[r].call(s.exports, s, s.exports, i), (s.loaded = !0), s.exports;
    }
    var e = {};
    return (i.m = t), (i.c = e), (i.p = ""), i(0);
  })([
    function(t, i, e) {
      e(8);
      var r = e(4);
      e(14);
      var s = { parse: r };
      "undefined" != typeof window && (window.flowchart = s), (t.exports = s);
    },
    function(t, i) {
      function e(t, i) {
        if (!t || "function" == typeof t) return i;
        var r = {};
        for (var s in i) r[s] = i[s];
        for (s in t)
          t[s] &&
            ("object" == typeof r[s] ? (r[s] = e(r[s], t[s])) : (r[s] = t[s]));
        return r;
      }
      function r(t, i) {
        if ("function" == typeof Object.create)
          (t.super_ = i),
            (t.prototype = Object.create(i.prototype, {
              constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }
            }));
        else {
          t.super_ = i;
          var e = function() {};
          (e.prototype = i.prototype),
            (t.prototype = new e()),
            (t.prototype.constructor = t);
        }
      }
      t.exports = { defaults: e, inherits: r };
    },
    function(t, i, e) {
      function r(t, i, e) {
        (this.chart = t),
          (this.group = this.chart.paper.set()),
          (this.symbol = e),
          (this.connectedTo = []),
          (this.symbolType = i.symbolType),
          (this.flowstate = i.flowstate || "future"),
          (this.lineStyle = i.lineStyle || {}),
          (this.key = i.key || ""),
          (this.next_direction =
            i.next && i.direction_next ? i.direction_next : void 0),
          (this.text = this.chart.paper.text(0, 0, i.text)),
          i.key && (this.text.node.id = i.key + "t"),
          this.text.node.setAttribute("class", this.getAttr("class") + "t"),
          this.text.attr({
            "text-anchor": "start",
            x: this.getAttr("text-margin"),
            fill: this.getAttr("font-color"),
            "font-size": this.getAttr("font-size")
          });
        var r = this.getAttr("font"),
          s = this.getAttr("font-family"),
          n = this.getAttr("font-weight");
        r && this.text.attr({ font: r }),
          s && this.text.attr({ "font-family": s }),
          n && this.text.attr({ "font-weight": n }),
          i.link && this.text.attr("href", i.link),
          i.target && this.text.attr("target", i.target);
        var o = this.getAttr("maxWidth");
        if (o) {
          for (
            var h = i.text.split(" "), a = "", x = 0, l = h.length;
            x < l;
            x++
          ) {
            var y = h[x];
            this.text.attr("text", a + " " + y),
              (a += this.text.getBBox().width > o ? "\n" + y : " " + y);
          }
          this.text.attr("text", a.substring(1));
        }
        if ((this.group.push(this.text), e)) {
          var g = this.getAttr("text-margin");
          e.attr({
            fill: this.getAttr("fill"),
            stroke: this.getAttr("element-color"),
            "stroke-width": this.getAttr("line-width"),
            width: this.text.getBBox().width + 2 * g,
            height: this.text.getBBox().height + 2 * g
          }),
            e.node.setAttribute("class", this.getAttr("class")),
            i.link && e.attr("href", i.link),
            i.target && e.attr("target", i.target),
            i.key && (e.node.id = i.key),
            this.group.push(e),
            e.insertBefore(this.text),
            this.text.attr({ y: e.getBBox().height / 2 }),
            this.initialize();
        }
      }
      var s = e(3),
        n = s.drawLine,
        o = s.checkLineIntersection;
      (r.prototype.getAttr = function(t) {
        if (this.chart) {
          var i,
            e = this.chart.options ? this.chart.options[t] : void 0,
            r = this.chart.options.symbols
              ? this.chart.options.symbols[this.symbolType][t]
              : void 0;
          return (
            this.chart.options.flowstate &&
              this.chart.options.flowstate[this.flowstate] &&
              (i = this.chart.options.flowstate[this.flowstate][t]),
            i || r || e
          );
        }
      }),
        (r.prototype.initialize = function() {
          this.group.transform(
            "t" + this.getAttr("line-width") + "," + this.getAttr("line-width")
          ),
            (this.width = this.group.getBBox().width),
            (this.height = this.group.getBBox().height);
        }),
        (r.prototype.getCenter = function() {
          return {
            x: this.getX() + this.width / 2,
            y: this.getY() + this.height / 2
          };
        }),
        (r.prototype.getX = function() {
          return this.group.getBBox().x;
        }),
        (r.prototype.getY = function() {
          return this.group.getBBox().y;
        }),
        (r.prototype.shiftX = function(t) {
          this.group.transform("t" + (this.getX() + t) + "," + this.getY());
        }),
        (r.prototype.setX = function(t) {
          this.group.transform("t" + t + "," + this.getY());
        }),
        (r.prototype.shiftY = function(t) {
          this.group.transform("t" + this.getX() + "," + (this.getY() + t));
        }),
        (r.prototype.setY = function(t) {
          this.group.transform("t" + this.getX() + "," + t);
        }),
        (r.prototype.getTop = function() {
          var t = this.getY(),
            i = this.getX() + this.width / 2;
          return { x: i, y: t };
        }),
        (r.prototype.getBottom = function() {
          var t = this.getY() + this.height,
            i = this.getX() + this.width / 2;
          return { x: i, y: t };
        }),
        (r.prototype.getLeft = function() {
          var t = this.getY() + this.group.getBBox().height / 2,
            i = this.getX();
          return { x: i, y: t };
        }),
        (r.prototype.getRight = function() {
          var t = this.getY() + this.group.getBBox().height / 2,
            i = this.getX() + this.group.getBBox().width;
          return { x: i, y: t };
        }),
        (r.prototype.render = function() {
          if (this.next) {
            var t = this.getAttr("line-length");
            if ("right" === this.next_direction) {
              var i = this.getRight();
              if (!this.next.isPositioned) {
                this.next.setY(i.y - this.next.height / 2),
                  this.next.shiftX(this.group.getBBox().x + this.width + t);
                var e = this;
                !(function i() {
                  for (
                    var r, s = !1, n = 0, o = e.chart.symbols.length;
                    n < o;
                    n++
                  ) {
                    r = e.chart.symbols[n];
                    var h = Math.abs(r.getCenter().x - e.next.getCenter().x);
                    if (
                      r.getCenter().y > e.next.getCenter().y &&
                      h <= e.next.width / 2
                    ) {
                      s = !0;
                      break;
                    }
                  }
                  s && (e.next.setX(r.getX() + r.width + t), i());
                })(),
                  (this.next.isPositioned = !0),
                  this.next.render();
              }
            } else {
              var r = this.getBottom();
              this.next.isPositioned ||
                (this.next.shiftY(this.getY() + this.height + t),
                this.next.setX(r.x - this.next.width / 2),
                (this.next.isPositioned = !0),
                this.next.render());
            }
          }
        }),
        (r.prototype.renderLines = function() {
          this.next &&
            (this.next_direction
              ? this.drawLineTo(this.next, "", this.next_direction)
              : this.drawLineTo(this.next));
        }),
        (r.prototype.drawLineTo = function(t, i, e) {
          this.connectedTo.indexOf(t) < 0 && this.connectedTo.push(t);
          var r,
            s = this.getCenter().x,
            h = this.getCenter().y,
            a = this.getRight(),
            x = this.getBottom(),
            l = this.getLeft(),
            y = t.getCenter().x,
            g = t.getCenter().y,
            f = t.getTop(),
            p = t.getRight(),
            c = t.getLeft(),
            u = s === y,
            d = h === g,
            m = h < g,
            b = h > g || this === t,
            v = s > y,
            w = s < y,
            k = 0,
            _ = this.getAttr("line-length"),
            B = this.getAttr("line-width");
          if ((e && "bottom" !== e) || !u || !m)
            if ((e && "right" !== e) || !d || !w)
              if ((e && "left" !== e) || !d || !v)
                if ((e && "right" !== e) || !u || !b)
                  if ((e && "right" !== e) || !u || !m)
                    if ((e && "bottom" !== e) || !v)
                      if ((e && "bottom" !== e) || !w)
                        if (e && "right" === e && v)
                          (r = n(
                            this.chart,
                            a,
                            [
                              { x: a.x + _ / 2, y: a.y },
                              { x: a.x + _ / 2, y: f.y - _ / 2 },
                              { x: f.x, y: f.y - _ / 2 },
                              { x: f.x, y: f.y }
                            ],
                            i
                          )),
                            (this.rightStart = !0),
                            (t.topEnd = !0),
                            (k = a.x + _ / 2);
                        else if (e && "right" === e && w)
                          (r = n(
                            this.chart,
                            a,
                            [{ x: f.x, y: a.y }, { x: f.x, y: f.y }],
                            i
                          )),
                            (this.rightStart = !0),
                            (t.topEnd = !0),
                            (k = a.x + _ / 2);
                        else if (e && "bottom" === e && u && b)
                          (r = n(
                            this.chart,
                            x,
                            [
                              { x: x.x, y: x.y + _ / 2 },
                              { x: a.x + _ / 2, y: x.y + _ / 2 },
                              { x: a.x + _ / 2, y: f.y - _ / 2 },
                              { x: f.x, y: f.y - _ / 2 },
                              { x: f.x, y: f.y }
                            ],
                            i
                          )),
                            (this.bottomStart = !0),
                            (t.topEnd = !0),
                            (k = x.x + _ / 2);
                        else if ("left" === e && u && b) {
                          var A = l.x - _ / 2;
                          c.x < l.x && (A = c.x - _ / 2),
                            (r = n(
                              this.chart,
                              l,
                              [
                                { x: A, y: l.y },
                                { x: A, y: f.y - _ / 2 },
                                { x: f.x, y: f.y - _ / 2 },
                                { x: f.x, y: f.y }
                              ],
                              i
                            )),
                            (this.leftStart = !0),
                            (t.topEnd = !0),
                            (k = l.x);
                        } else
                          "left" === e &&
                            ((r = n(
                              this.chart,
                              l,
                              [
                                { x: f.x + (l.x - f.x) / 2, y: l.y },
                                { x: f.x + (l.x - f.x) / 2, y: f.y - _ / 2 },
                                { x: f.x, y: f.y - _ / 2 },
                                { x: f.x, y: f.y }
                              ],
                              i
                            )),
                            (this.leftStart = !0),
                            (t.topEnd = !0),
                            (k = l.x));
                      else
                        (r = n(
                          this.chart,
                          x,
                          [
                            { x: x.x, y: x.y + _ / 2 },
                            { x: x.x + (x.x - f.x) / 2, y: x.y + _ / 2 },
                            { x: x.x + (x.x - f.x) / 2, y: f.y - _ / 2 },
                            { x: f.x, y: f.y - _ / 2 },
                            { x: f.x, y: f.y }
                          ],
                          i
                        )),
                          (this.bottomStart = !0),
                          (t.topEnd = !0),
                          (k = x.x + (x.x - f.x) / 2);
                    else
                      (r =
                        this.leftEnd && b
                          ? n(
                              this.chart,
                              x,
                              [
                                { x: x.x, y: x.y + _ / 2 },
                                { x: x.x + (x.x - f.x) / 2, y: x.y + _ / 2 },
                                { x: x.x + (x.x - f.x) / 2, y: f.y - _ / 2 },
                                { x: f.x, y: f.y - _ / 2 },
                                { x: f.x, y: f.y }
                              ],
                              i
                            )
                          : n(
                              this.chart,
                              x,
                              [
                                { x: x.x, y: f.y - _ / 2 },
                                { x: f.x, y: f.y - _ / 2 },
                                { x: f.x, y: f.y }
                              ],
                              i
                            )),
                        (this.bottomStart = !0),
                        (t.topEnd = !0),
                        (k = x.x + (x.x - f.x) / 2);
                  else
                    (r = n(
                      this.chart,
                      a,
                      [
                        { x: a.x + _ / 2, y: a.y },
                        { x: a.x + _ / 2, y: f.y - _ / 2 },
                        { x: f.x, y: f.y - _ / 2 },
                        { x: f.x, y: f.y }
                      ],
                      i
                    )),
                      (this.rightStart = !0),
                      (t.topEnd = !0),
                      (k = a.x + _ / 2);
                else
                  (r = n(
                    this.chart,
                    a,
                    [
                      { x: a.x + _ / 2, y: a.y },
                      { x: a.x + _ / 2, y: f.y - _ / 2 },
                      { x: f.x, y: f.y - _ / 2 },
                      { x: f.x, y: f.y }
                    ],
                    i
                  )),
                    (this.rightStart = !0),
                    (t.topEnd = !0),
                    (k = a.x + _ / 2);
              else
                (r = n(this.chart, l, p, i)),
                  (this.leftStart = !0),
                  (t.rightEnd = !0),
                  (k = p.x);
            else
              (r = n(this.chart, a, c, i)),
                (this.rightStart = !0),
                (t.leftEnd = !0),
                (k = c.x);
          else
            (r = n(this.chart, x, f, i)),
              (this.bottomStart = !0),
              (t.topEnd = !0),
              (k = x.x);
          if (
            (this.lineStyle[t.key] && r && r.attr(this.lineStyle[t.key]), r)
          ) {
            for (var O = 0, L = this.chart.lines.length; O < L; O++)
              for (
                var M,
                  X = this.chart.lines[O],
                  S = X.attr("path"),
                  T = r.attr("path"),
                  Y = 0,
                  C = S.length - 1;
                Y < C;
                Y++
              ) {
                var j = [];
                j.push(["M", S[Y][1], S[Y][2]]),
                  j.push(["L", S[Y + 1][1], S[Y + 1][2]]);
                for (
                  var E = j[0][1],
                    z = j[0][2],
                    P = j[1][1],
                    R = j[1][2],
                    F = 0,
                    I = T.length - 1;
                  F < I;
                  F++
                ) {
                  var N = [];
                  N.push(["M", T[F][1], T[F][2]]),
                    N.push(["L", T[F + 1][1], T[F + 1][2]]);
                  var W = N[0][1],
                    V = N[0][2],
                    q = N[1][1],
                    G = N[1][2],
                    Q = o(E, z, P, R, W, V, q, G);
                  if (Q.onLine1 && Q.onLine2) {
                    var J;
                    V === G
                      ? W > q
                        ? ((J = ["L", Q.x + 2 * B, V]),
                          T.splice(F + 1, 0, J),
                          (J = [
                            "C",
                            Q.x + 2 * B,
                            V,
                            Q.x,
                            V - 4 * B,
                            Q.x - 2 * B,
                            V
                          ]),
                          T.splice(F + 2, 0, J),
                          r.attr("path", T))
                        : ((J = ["L", Q.x - 2 * B, V]),
                          T.splice(F + 1, 0, J),
                          (J = [
                            "C",
                            Q.x - 2 * B,
                            V,
                            Q.x,
                            V - 4 * B,
                            Q.x + 2 * B,
                            V
                          ]),
                          T.splice(F + 2, 0, J),
                          r.attr("path", T))
                      : V > G
                        ? ((J = ["L", W, Q.y + 2 * B]),
                          T.splice(F + 1, 0, J),
                          (J = [
                            "C",
                            W,
                            Q.y + 2 * B,
                            W + 4 * B,
                            Q.y,
                            W,
                            Q.y - 2 * B
                          ]),
                          T.splice(F + 2, 0, J),
                          r.attr("path", T))
                        : ((J = ["L", W, Q.y - 2 * B]),
                          T.splice(F + 1, 0, J),
                          (J = [
                            "C",
                            W,
                            Q.y - 2 * B,
                            W + 4 * B,
                            Q.y,
                            W,
                            Q.y + 2 * B
                          ]),
                          T.splice(F + 2, 0, J),
                          r.attr("path", T)),
                      (F += 2),
                      (M += 2);
                  }
                }
              }
            this.chart.lines.push(r);
          }
          (!this.chart.maxXFromLine ||
            (this.chart.maxXFromLine && k > this.chart.maxXFromLine)) &&
            (this.chart.maxXFromLine = k);
        }),
        (t.exports = r);
    },
    function(t, i) {
      function e(t, i, e) {
        var r,
          s,
          n = "M{0},{1}";
        for (r = 2, s = 2 * e.length + 2; r < s; r += 2)
          n += " L{" + r + "},{" + (r + 1) + "}";
        var o = [i.x, i.y];
        for (r = 0, s = e.length; r < s; r++) o.push(e[r].x), o.push(e[r].y);
        var h = t.paper.path(n, o);
        h.attr("stroke", t.options["element-color"]),
          h.attr("stroke-width", t.options["line-width"]);
        var a = t.options.font,
          x = t.options["font-family"],
          l = t.options["font-weight"];
        return (
          a && h.attr({ font: a }),
          x && h.attr({ "font-family": x }),
          l && h.attr({ "font-weight": l }),
          h
        );
      }
      function r(t, i, e, r) {
        var s, n;
        "[object Array]" !== Object.prototype.toString.call(e) && (e = [e]);
        var o = "M{0},{1}";
        for (s = 2, n = 2 * e.length + 2; s < n; s += 2)
          o += " L{" + s + "},{" + (s + 1) + "}";
        var h = [i.x, i.y];
        for (s = 0, n = e.length; s < n; s++) h.push(e[s].x), h.push(e[s].y);
        var a = t.paper.path(o, h);
        a.attr({
          stroke: t.options["line-color"],
          "stroke-width": t.options["line-width"],
          "arrow-end": t.options["arrow-end"]
        });
        var x = t.options.font,
          l = t.options["font-family"],
          y = t.options["font-weight"];
        if (
          (x && a.attr({ font: x }),
          l && a.attr({ "font-family": l }),
          y && a.attr({ "font-weight": y }),
          r)
        ) {
          var g = !1,
            f = t.paper.text(0, 0, r),
            p = !1,
            c = e[0];
          i.y === c.y && (p = !0);
          var u = 0,
            d = 0;
          g
            ? ((u = i.x > c.x ? i.x - (i.x - c.x) / 2 : c.x - (c.x - i.x) / 2),
              (d = i.y > c.y ? i.y - (i.y - c.y) / 2 : c.y - (c.y - i.y) / 2),
              p
                ? ((u -= f.getBBox().width / 2),
                  (d -= t.options["text-margin"]))
                : ((u += t.options["text-margin"]),
                  (d -= f.getBBox().height / 2)))
            : ((u = i.x),
              (d = i.y),
              p
                ? ((u += t.options["text-margin"] / 2),
                  (d -= t.options["text-margin"]))
                : ((u += t.options["text-margin"] / 2),
                  (d += t.options["text-margin"]))),
            f.attr({
              "text-anchor": "start",
              "font-size": t.options["font-size"],
              fill: t.options["font-color"],
              x: u,
              y: d
            }),
            x && f.attr({ font: x }),
            l && f.attr({ "font-family": l }),
            y && f.attr({ "font-weight": y });
        }
        return a;
      }
      function s(t, i, e, r, s, n, o, h) {
        var a,
          x,
          l,
          y,
          g,
          f = { x: null, y: null, onLine1: !1, onLine2: !1 };
        return (
          (a = (h - n) * (e - t) - (o - s) * (r - i)),
          0 === a
            ? f
            : ((x = i - n),
              (l = t - s),
              (y = (o - s) * x - (h - n) * l),
              (g = (e - t) * x - (r - i) * l),
              (x = y / a),
              (l = g / a),
              (f.x = t + x * (e - t)),
              (f.y = i + x * (r - i)),
              x > 0 && x < 1 && (f.onLine1 = !0),
              l > 0 && l < 1 && (f.onLine2 = !0),
              f)
        );
      }
      t.exports = { drawPath: e, drawLine: r, checkLineIntersection: s };
    },
    function(t, i, e) {
      function r(t) {
        function i(t) {
          var i = t.indexOf("(") + 1,
            e = t.indexOf(")");
          return i >= 0 && e >= 0 ? t.substring(i, e) : "{}";
        }
        function e(t) {
          var i = t.indexOf("(") + 1,
            e = t.indexOf(")");
          return i >= 0 && e >= 0 ? t.substring(i, e) : "";
        }
        function r(t) {
          var i = t.indexOf("(") + 1,
            e = t.indexOf(")");
          return i >= 0 && e >= 0
            ? g.symbols[t.substring(0, i - 1)]
            : g.symbols[t];
        }
        function y(t) {
          var i = "next",
            e = t.indexOf("(") + 1,
            r = t.indexOf(")");
          return (
            e >= 0 &&
              r >= 0 &&
              ((i = j.substring(e, r)),
              i.indexOf(",") < 0 &&
                "yes" !== i &&
                "no" !== i &&
                (i = "next, " + i)),
            i
          );
        }
        (t = t || ""), (t = t.trim());
        for (
          var g = {
              symbols: {},
              start: null,
              drawSVG: function(t, i) {
                function e(t) {
                  if (g[t.key]) return g[t.key];
                  switch (t.symbolType) {
                    case "start":
                      g[t.key] = new n(y, t);
                      break;
                    case "end":
                      g[t.key] = new o(y, t);
                      break;
                    case "operation":
                      g[t.key] = new h(y, t);
                      break;
                    case "inputoutput":
                      g[t.key] = new a(y, t);
                      break;
                    case "subroutine":
                      g[t.key] = new x(y, t);
                      break;
                    case "condition":
                      g[t.key] = new l(y, t);
                      break;
                    default:
                      return new Error("Wrong symbol type!");
                  }
                  return g[t.key];
                }
                var r = this;
                this.diagram && this.diagram.clean();
                var y = new s(t, i);
                this.diagram = y;
                var g = {};
                !(function t(i, s, n) {
                  var o = e(i);
                  return (
                    r.start === i
                      ? y.startWith(o)
                      : s &&
                        n &&
                        !s.pathOk &&
                        (s instanceof l
                          ? (n.yes === i && s.yes(o), n.no === i && s.no(o))
                          : s.then(o)),
                    o.pathOk
                      ? o
                      : (o instanceof l
                          ? (i.yes && t(i.yes, o, i), i.no && t(i.no, o, i))
                          : i.next && t(i.next, o, i),
                        o)
                  );
                })(this.start),
                  y.render();
              },
              clean: function() {
                this.diagram.clean();
              }
            },
            f = [],
            p = 0,
            c = 1,
            u = t.length;
          c < u;
          c++
        )
          if ("\n" === t[c] && "\\" !== t[c - 1]) {
            var d = t.substring(p, c);
            (p = c + 1), f.push(d.replace(/\\\n/g, "\n"));
          }
        p < t.length && f.push(t.substr(p));
        for (var m = 1, b = f.length; m < b; ) {
          var v = f[m];
          v.indexOf("->") < 0 && v.indexOf("=>") < 0 && v.indexOf("@>") < 0
            ? ((f[m - 1] += "\n" + v), f.splice(m, 1), b--)
            : m++;
        }
        for (; f.length > 0; ) {
          var w = f.splice(0, 1)[0].trim();
          if (w.indexOf("=>") >= 0) {
            var k = w.split("=>"),
              _ = {
                key: k[0].replace(/\(.*\)/, ""),
                symbolType: k[1],
                text: null,
                link: null,
                target: null,
                flowstate: null,
                lineStyle: {},
                params: {}
              },
              B = k[0].match(/\((.*)\)/);
            if (B && B.length > 1)
              for (var A = B[1].split(","), O = 0; O < A.length; O++) {
                var L = A[0].split("=");
                2 == L.length && (_.params[L[0]] = L[1]);
              }
            var M;
            if (
              (_.symbolType.indexOf(": ") >= 0 &&
                ((M = _.symbolType.split(": ")),
                (_.symbolType = M.shift()),
                (_.text = M.join(": "))),
              _.text && _.text.indexOf(":>") >= 0
                ? ((M = _.text.split(":>")),
                  (_.text = M.shift()),
                  (_.link = M.join(":>")))
                : _.symbolType.indexOf(":>") >= 0 &&
                  ((M = _.symbolType.split(":>")),
                  (_.symbolType = M.shift()),
                  (_.link = M.join(":>"))),
              _.symbolType.indexOf("\n") >= 0 &&
                (_.symbolType = _.symbolType.split("\n")[0]),
              _.link)
            ) {
              var X = _.link.indexOf("[") + 1,
                S = _.link.indexOf("]");
              X >= 0 &&
                S >= 0 &&
                ((_.target = _.link.substring(X, S)),
                (_.link = _.link.substring(0, X - 1)));
            }
            if (_.text && _.text.indexOf("|") >= 0) {
              var T = _.text.split("|");
              (_.flowstate = T.pop().trim()), (_.text = T.join("|"));
            }
            g.symbols[_.key] = _;
          } else if (w.indexOf("->") >= 0)
            for (var Y = w.split("->"), O = 0, C = Y.length; O < C; O++) {
              var j = Y[O],
                E = e(j);
              ("true" !== E && "false" !== E) ||
                ((j = j.replace("true", "yes")),
                (j = j.replace("false", "no")));
              var z = r(j),
                P = y(j),
                R = null;
              if (P.indexOf(",") >= 0) {
                var F = P.split(",");
                (P = F[0]), (R = F[1].trim());
              }
              if ((g.start || (g.start = z), O + 1 < C)) {
                var I = Y[O + 1];
                (z[P] = r(I)), (z["direction_" + P] = R), (R = null);
              }
            }
          else if (w.indexOf("@>") >= 0)
            for (var N = w.split("@>"), O = 0, C = N.length; O < C; O++)
              if (O + 1 != C) {
                var W = r(N[O]),
                  I = r(N[O + 1]);
                W.lineStyle[I.key] = JSON.parse(i(N[O + 1]));
              }
        }
        return g;
      }
      var s = e(6),
        n = e(12),
        o = e(9),
        h = e(11),
        a = e(10),
        x = e(13),
        l = e(5);
      t.exports = r;
    },
    function(t, i, e) {
      function r(t, i) {
        (i = i || {}),
          s.call(this, t, i),
          (this.textMargin = this.getAttr("text-margin")),
          (this.yes_direction = "bottom"),
          (this.no_direction = "right"),
          (this.params = i.params),
          i.yes && i.direction_yes && i.no && !i.direction_no
            ? "right" === i.direction_yes
              ? ((this.no_direction = "bottom"), (this.yes_direction = "right"))
              : ((this.no_direction = "right"), (this.yes_direction = "bottom"))
            : i.yes && !i.direction_yes && i.no && i.direction_no
              ? "right" === i.direction_no
                ? ((this.yes_direction = "bottom"),
                  (this.no_direction = "right"))
                : ((this.yes_direction = "right"),
                  (this.no_direction = "bottom"))
              : ((this.yes_direction = "bottom"),
                (this.no_direction = "right")),
          (this.yes_direction = this.yes_direction || "bottom"),
          (this.no_direction = this.no_direction || "right"),
          this.text.attr({ x: 2 * this.textMargin });
        var e = this.text.getBBox().width + 3 * this.textMargin;
        e += e / 2;
        var r = this.text.getBBox().height + 2 * this.textMargin;
        (r += r / 2), (r = Math.max(0.5 * e, r));
        var n = e / 4,
          o = r / 4;
        this.text.attr({ x: n + this.textMargin / 2 });
        var a = { x: n, y: o },
          x = [
            { x: n - e / 4, y: o + r / 4 },
            { x: n - e / 4 + e / 2, y: o + r / 4 + r / 2 },
            { x: n - e / 4 + e, y: o + r / 4 },
            { x: n - e / 4 + e / 2, y: o + r / 4 - r / 2 },
            { x: n - e / 4, y: o + r / 4 }
          ],
          l = h(t, a, x);
        l.attr({
          stroke: this.getAttr("element-color"),
          "stroke-width": this.getAttr("line-width"),
          fill: this.getAttr("fill")
        }),
          i.link && l.attr("href", i.link),
          i.target && l.attr("target", i.target),
          i.key && (l.node.id = i.key),
          l.node.setAttribute("class", this.getAttr("class")),
          this.text.attr({ y: l.getBBox().height / 2 }),
          this.group.push(l),
          l.insertBefore(this.text),
          this.initialize();
      }
      var s = e(2),
        n = e(1).inherits,
        o = e(3),
        h = o.drawPath;
      n(r, s),
        (r.prototype.render = function() {
          this.yes_direction &&
            (this[this.yes_direction + "_symbol"] = this.yes_symbol),
            this.no_direction &&
              (this[this.no_direction + "_symbol"] = this.no_symbol);
          var t = this.getAttr("line-length");
          if (this.bottom_symbol) {
            var i = this.getBottom();
            this.bottom_symbol.isPositioned ||
              (this.bottom_symbol.shiftY(this.getY() + this.height + t),
              this.bottom_symbol.setX(i.x - this.bottom_symbol.width / 2),
              (this.bottom_symbol.isPositioned = !0),
              this.bottom_symbol.render());
          }
          if (this.right_symbol) {
            var e = this.getRight();
            if (!this.right_symbol.isPositioned) {
              this.right_symbol.setY(e.y - this.right_symbol.height / 2),
                this.right_symbol.shiftX(
                  this.group.getBBox().x + this.width + t
                );
              var r = this;
              !(function i() {
                for (
                  var e, s = !1, n = 0, o = r.chart.symbols.length;
                  n < o;
                  n++
                )
                  if (
                    ((e = r.chart.symbols[n]),
                    !r.params["align-next"] || "no" !== r.params["align-next"])
                  ) {
                    var h = Math.abs(
                      e.getCenter().x - r.right_symbol.getCenter().x
                    );
                    if (
                      e.getCenter().y > r.right_symbol.getCenter().y &&
                      h <= r.right_symbol.width / 2
                    ) {
                      s = !0;
                      break;
                    }
                  }
                s && (r.right_symbol.setX(e.getX() + e.width + t), i());
              })(),
                (this.right_symbol.isPositioned = !0),
                this.right_symbol.render();
            }
          }
        }),
        (r.prototype.renderLines = function() {
          this.yes_symbol &&
            this.drawLineTo(
              this.yes_symbol,
              this.getAttr("yes-text"),
              this.yes_direction
            ),
            this.no_symbol &&
              this.drawLineTo(
                this.no_symbol,
                this.getAttr("no-text"),
                this.no_direction
              );
        }),
        (t.exports = r);
    },
    function(t, i, e) {
      function r(t, i) {
        (i = i || {}),
          (this.paper = new s(t)),
          (this.options = n(i, o)),
          (this.symbols = []),
          (this.lines = []),
          (this.start = null);
      }
      var s = e(15),
        n = e(1).defaults,
        o = e(7),
        h = e(5);
      (r.prototype.handle = function(t) {
        this.symbols.indexOf(t) <= -1 && this.symbols.push(t);
        var i = this;
        return (
          t instanceof h
            ? ((t.yes = function(e) {
                return (
                  (t.yes_symbol = e),
                  t.no_symbol && (t.pathOk = !0),
                  i.handle(e)
                );
              }),
              (t.no = function(e) {
                return (
                  (t.no_symbol = e),
                  t.yes_symbol && (t.pathOk = !0),
                  i.handle(e)
                );
              }))
            : (t.then = function(e) {
                return (t.next = e), (t.pathOk = !0), i.handle(e);
              }),
          t
        );
      }),
        (r.prototype.startWith = function(t) {
          return (this.start = t), this.handle(t);
        }),
        (r.prototype.render = function() {
          var t,
            i,
            e = 0,
            r = 0,
            s = 0,
            n = 0,
            o = 0,
            h = 0,
            a = 0,
            x = 0;
          for (s = 0, n = this.symbols.length; s < n; s++)
            (t = this.symbols[s]),
              t.width > e && (e = t.width),
              t.height > r && (r = t.height);
          for (s = 0, n = this.symbols.length; s < n; s++)
            (t = this.symbols[s]),
              t.shiftX(
                this.options.x + (e - t.width) / 2 + this.options["line-width"]
              ),
              t.shiftY(
                this.options.y + (r - t.height) / 2 + this.options["line-width"]
              );
          for (this.start.render(), s = 0, n = this.symbols.length; s < n; s++)
            (t = this.symbols[s]), t.renderLines();
          o = this.maxXFromLine;
          var l, y;
          for (s = 0, n = this.symbols.length; s < n; s++)
            (t = this.symbols[s]),
              (l = t.getX() + t.width),
              (y = t.getY() + t.height),
              l > o && (o = l),
              y > h && (h = y);
          for (s = 0, n = this.lines.length; s < n; s++) {
            (i = this.lines[s].getBBox()), (l = i.x), (y = i.y);
            var g = i.x2,
              f = i.y2;
            l < a && (a = l),
              y < x && (x = y),
              g > o && (o = g),
              f > h && (h = f);
          }
          var p = this.options.scale,
            c = this.options["line-width"];
          a < 0 && (a -= c), x < 0 && (x -= c);
          var u = o + c - a,
            d = h + c - x;
          this.paper.setSize(u * p, d * p),
            this.paper.setViewBox(a, x, u, d, !0);
        }),
        (r.prototype.clean = function() {
          if (this.paper) {
            var t = this.paper.canvas;
            t.parentNode.removeChild(t);
          }
        }),
        (t.exports = r);
    },
    function(t, i) {
      t.exports = {
        x: 0,
        y: 0,
        "line-width": 3,
        "line-length": 50,
        "text-margin": 10,
        "font-size": 14,
        "font-color": "black",
        "line-color": "black",
        "element-color": "black",
        fill: "white",
        "yes-text": "yes",
        "no-text": "no",
        "arrow-end": "block",
        class: "flowchart",
        scale: 1,
        symbols: {
          start: {},
          end: {},
          condition: {},
          inputoutput: {},
          operation: {},
          subroutine: {}
        }
      };
    },
    function(t, i) {
      Array.prototype.indexOf ||
        (Array.prototype.indexOf = function(t) {
          "use strict";
          if (null === this) throw new TypeError();
          var i = Object(this),
            e = i.length >>> 0;
          if (0 === e) return -1;
          var r = 0;
          if (
            (arguments.length > 0 &&
              ((r = Number(arguments[1])),
              r != r
                ? (r = 0)
                : 0 !== r &&
                  r != 1 / 0 &&
                  r != -(1 / 0) &&
                  (r = (r > 0 || -1) * Math.floor(Math.abs(r)))),
            r >= e)
          )
            return -1;
          for (var s = r >= 0 ? r : Math.max(e - Math.abs(r), 0); s < e; s++)
            if (s in i && i[s] === t) return s;
          return -1;
        }),
        Array.prototype.lastIndexOf ||
          (Array.prototype.lastIndexOf = function(t) {
            "use strict";
            if (null === this) throw new TypeError();
            var i = Object(this),
              e = i.length >>> 0;
            if (0 === e) return -1;
            var r = e;
            arguments.length > 1 &&
              ((r = Number(arguments[1])),
              r != r
                ? (r = 0)
                : 0 !== r &&
                  r != 1 / 0 &&
                  r != -(1 / 0) &&
                  (r = (r > 0 || -1) * Math.floor(Math.abs(r))));
            for (
              var s = r >= 0 ? Math.min(r, e - 1) : e - Math.abs(r);
              s >= 0;
              s--
            )
              if (s in i && i[s] === t) return s;
            return -1;
          }),
        String.prototype.trim ||
          (String.prototype.trim = function() {
            return this.replace(/^\s+|\s+$/g, "");
          });
    },
    function(t, i, e) {
      function r(t, i) {
        var e = t.paper.rect(0, 0, 0, 0, 20);
        (i = i || {}), (i.text = i.text || "End"), s.call(this, t, i, e);
      }
      var s = e(2),
        n = e(1).inherits;
      n(r, s), (t.exports = r);
    },
    function(t, i, e) {
      function r(t, i) {
        (i = i || {}),
          s.call(this, t, i),
          (this.textMargin = this.getAttr("text-margin")),
          this.text.attr({ x: 3 * this.textMargin });
        var e = this.text.getBBox().width + 4 * this.textMargin,
          r = this.text.getBBox().height + 2 * this.textMargin,
          n = this.textMargin,
          o = r / 2,
          a = { x: n, y: o },
          x = [
            { x: n - this.textMargin, y: r },
            { x: n - this.textMargin + e, y: r },
            { x: n - this.textMargin + e + 2 * this.textMargin, y: 0 },
            { x: n - this.textMargin + 2 * this.textMargin, y: 0 },
            { x: n, y: o }
          ],
          l = h(t, a, x);
        l.attr({
          stroke: this.getAttr("element-color"),
          "stroke-width": this.getAttr("line-width"),
          fill: this.getAttr("fill")
        }),
          i.link && l.attr("href", i.link),
          i.target && l.attr("target", i.target),
          i.key && (l.node.id = i.key),
          l.node.setAttribute("class", this.getAttr("class")),
          this.text.attr({ y: l.getBBox().height / 2 }),
          this.group.push(l),
          l.insertBefore(this.text),
          this.initialize();
      }
      var s = e(2),
        n = e(1).inherits,
        o = e(3),
        h = o.drawPath;
      n(r, s),
        (r.prototype.getLeft = function() {
          var t = this.getY() + this.group.getBBox().height / 2,
            i = this.getX() + this.textMargin;
          return { x: i, y: t };
        }),
        (r.prototype.getRight = function() {
          var t = this.getY() + this.group.getBBox().height / 2,
            i = this.getX() + this.group.getBBox().width - this.textMargin;
          return { x: i, y: t };
        }),
        (t.exports = r);
    },
    function(t, i, e) {
      function r(t, i) {
        var e = t.paper.rect(0, 0, 0, 0);
        (i = i || {}), s.call(this, t, i, e);
      }
      var s = e(2),
        n = e(1).inherits;
      n(r, s), (t.exports = r);
    },
    function(t, i, e) {
      function r(t, i) {
        var e = t.paper.rect(0, 0, 0, 0, 20);
        (i = i || {}), (i.text = i.text || "Start"), s.call(this, t, i, e);
      }
      var s = e(2),
        n = e(1).inherits;
      n(r, s), (t.exports = r);
    },
    function(t, i, e) {
      function r(t, i) {
        var e = t.paper.rect(0, 0, 0, 0);
        (i = i || {}),
          s.call(this, t, i, e),
          e.attr({
            width: this.text.getBBox().width + 4 * this.getAttr("text-margin")
          }),
          this.text.attr({ x: 2 * this.getAttr("text-margin") });
        var r = t.paper.rect(0, 0, 0, 0);
        r.attr({
          x: this.getAttr("text-margin"),
          stroke: this.getAttr("element-color"),
          "stroke-width": this.getAttr("line-width"),
          width: this.text.getBBox().width + 2 * this.getAttr("text-margin"),
          height: this.text.getBBox().height + 2 * this.getAttr("text-margin"),
          fill: this.getAttr("fill")
        }),
          i.key && (r.node.id = i.key + "i");
        var n = this.getAttr("font"),
          o = this.getAttr("font-family"),
          h = this.getAttr("font-weight");
        n && r.attr({ font: n }),
          o && r.attr({ "font-family": o }),
          h && r.attr({ "font-weight": h }),
          i.link && r.attr("href", i.link),
          i.target && r.attr("target", i.target),
          this.group.push(r),
          r.insertBefore(this.text),
          this.initialize();
      }
      var s = e(2),
        n = e(1).inherits;
      n(r, s), (t.exports = r);
    },
    function(t, i, e) {
      if ("undefined" != typeof jQuery) {
        var r = e(4);
        !(function(t) {
          t.fn.flowChart = function(i) {
            return this.each(function() {
              var e = t(this),
                s = r(e.text());
              e.html(""), s.drawSVG(this, i);
            });
          };
        })(jQuery);
      }
    },
    function(i, e) {
      i.exports = t;
    }
  ]);
});
//# sourceMappingURL=flowchart.min.js.map
