/**
 * Mcx Dialog Mobile v0.2.0
 * Copyright (C) 2019 mcx
 * https://github.com/code-mcx/mcx-dialog-mobile
 */
!function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e(require("./css/dialog-mobile.css")) : "function" == typeof define && define.amd ? define(["./css/dialog-mobile.css"], e) : (t = t || self).mcxDialog = e()
}(this, function () {
    "use strict";
    let is_open = 0

    function d(t, e) {
        var n = t.className.split(" ");
        "" === t.className && (n = []), n.push(e), t.className = n.join(" ")
    }

    function a(t, e) {
        for (var n in e) t[n] = e[n];
        return t
    }

    function m() {
        var t = document.documentElement.clientWidth;
        return t < 640 ? t / 375 * 16 + "px" : 16
    }

    var c = {
        initOpen: function (t, n) {
            if (is_open !== 0) {
                return;
            }
            t.style.fontSize = m();
            var e = document.querySelector("body"), i = document.createElement("div");
            d(i, "dialog-mobile-bg"), 1 == n.showBottom && d(i, "animation-bg-fadeIn"), n.bottom && i.addEventListener("click", function () {
                l()
            }), e.appendChild(i), e.appendChild(t);
            var o = function (t) {
                for (var e = ["animation", "webkitAnimation"], n = {
                    animation: "animationend",
                    webkitAnimation: "webkitAnimationEnd"
                }, i       = 0; i < e.length; i++) if (null != t.style[e[i]]) return n[e[i]]
            }(t);

            function l() {
                o ? (c.close([i]), d(t, n.closeAnimation), t.addEventListener(o, function () {
                    c.close([t])
                })) : c.close([i, t])
            }

            n.btns.forEach(function (t, e) {
                0 != e && e <= n.btns.length - 1 ? n.bottom ? t.addEventListener("click", function () {
                    l(), n.btnClick(this.getAttribute("i"))
                }) : t.addEventListener("click", function () {
                    l(), n.sureBtnClick()
                }) : t.addEventListener("click", l)
            }), n.bottom || (t.style.top = (document.documentElement.clientHeight - t.offsetHeight) / 2 + "px", t.style.left = (document.documentElement.clientWidth - t.offsetWidth) / 2 + "px")
            is_open = 1;
        }, close: function (t) {
            for (var e = document.querySelector("body"), n = 0; n < t.length; n++) e.removeChild(t[n])
            is_open = 0;
        }
    }, n  = {
        alert: function (t, e) {
            var n = {titleText: "", sureBtnText: "Đóng"};
            n = a(n, e);
            var i = document.createElement("div");
            i.innerText = n.sureBtnText, d(i, "dialog-button"), n.btns = [i], this.open(t, n)
        }, confirm: function (t, e, cancelBtnText = "Cancel", sureBtnText = "Ok") {
            var n = {
                titleText: "", cancelBtnText: cancelBtnText, sureBtnText: sureBtnText,
                sureBtnClick: function () {
                }
            };
            n = a(n, e);
            var i = document.createElement("div");
            i.innerText = n.cancelBtnText, d(i, "dialog-cancel-button");
            var o = document.createElement("div");
            o.innerText = n.sureBtnText, d(o, "dialog-sure-button"), n.btns = [i, o], this.open(t, n)
        }, open: function (t, e) {
            var n = document.createElement("div"), i = document.createElement("div");
            if (d(n, "dialog-mobile"), d(n, "animation-zoom-in"), d(i, "dialog-content"), i.innerHTML = t, e.titleText) {
                var o = document.createElement("div");
                d(o, "dialog-title"), o.innerText = e.titleText, n.appendChild(o)
            }
            n.appendChild(i), e.btns.forEach(function (t, e) {
                n.appendChild(t)
            }), e.closeAnimation = "animation-zoom-out", c.initOpen(n, e)
        }, showBottom: function (t) {
            var i = {
                title: "", cancelText: "Huỷ", btn: ["Xoá"], btnColor: [], btnClick: function (t) {
                }
            };
            (i = a(i, t)).bottom = !0, 1 == i.btn.length && "Xoá" == i.btn[0] && (i.btnColor = ["#EE2C2C"]);
            var e = document.createElement("div"), n = document.createElement("div"), o = document.createElement("div"),
                l                                                                       = document.createElement("div");
            n.innerText = i.title, l.innerText = i.cancelText, d(e, "dialog-mobile-bottom"), d(e, "animation-bottom-in"), d(n, "bottom-btn-title"), d(o, "bottom-btn-item"), d(l, "dialog-cancel-btn"), i.title && e.appendChild(n), e.appendChild(o), e.appendChild(l), i.btns = [], i.btns.push(l), i.btn.forEach(function (t, e) {
                var n = document.createElement("div");
                n.innerText = i.btn[e], n.setAttribute("i", e + 1), d(n, "dialog-item-btn"), i.btnColor[e] && (n.style.color = i.btnColor[e]), o.appendChild(n), i.btns.push(n)
            }), i.closeAnimation = "animation-bottom-out", i.showBottom = !0, c.initOpen(e, i)
        }, toast: function (t, status = 1, e = 5) {
            var n = document.createElement("div"), i = document.createElement("div"), rm = document.createElement("i");
            rm.addEventListener('click', function () {
                this.closest('div.dialog-mobile-toast').remove();
            })
            d(n, "dialog-mobile-toast"), d(n, "animation-fade-in"), d(i, "toast-content"), d(rm, "close"), i.innerText = t, rm.innerText = 'x', n.appendChild(rm), n.appendChild(i);
            if (status === 0) {
                d(i, "toast-error")
            } else if (status === 1) {
                d(i, "toast-success")
            } else if (status === 2) {
                d(i, "toast-info")
            } else if (status === 3) {
                d(i, "toast-waring")
            }
            var body = document.querySelector("body");
            let o = document.getElementById('tnotify-container');
            if (!o) {
                o = document.createElement("div");
                o.id = 'tnotify-container'
                body.appendChild(o)
            }

            o.appendChild(n), n.style.fontSize = m(), n.style.left = (document.documentElement.clientWidth - n.offsetWidth) / 2 + "px", setTimeout(function () {
                try {
                    o.removeChild(n)
                } catch (e) {
                }
            }, 1e3 * e)
        }, loadElement: [], loading: function (t) {
            var e = {src: "img", hint: ""};
            e = a(e, t);
            var n = document.createElement("div"), i = document.createElement("div"), o = document.createElement("img");
            if (d(n, "mobile-loading-bg"), d(i, "mobile-loading"), d(i, "animation-zoom-in"), o.src = e.src + "/loading.gif", i.appendChild(o), e.hint) {
                var l = document.createElement("div");
                d(l, "loading-content"), l.innerText = e.hint, i.appendChild(l)
            }
            var c = document.querySelector("body");
            c.appendChild(n), c.appendChild(i), i.style.fontSize = m(), i.style.left = (document.documentElement.clientWidth - i.offsetWidth) / 2 + "px", i.style.top = (document.documentElement.clientHeight - i.offsetHeight) / 2 + "px", this.loadElement.push(n), this.loadElement.push(i)
        }, closeLoading: function () {
            c.close(this.loadElement), this.loadElement = []
        }, install: function (t, e) {
            t.prototype.$mcxDialog = n
        }
    };
    return n
});
