import gsap from "./gsap-core.min.js";
import CSSPlugin from "./CSSPlugin.min.js";

gsap.registerPlugin(CSSPlugin), function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = t || self).Swiper = e()
}(this, function () {
    "use strict";

    function t(t, e) {
        var i = [], s = 0;
        if (t && !e && t instanceof c) return t;
        if (t) if ("string" == typeof t) {
            var n, a, o = t.trim();
            if (o.indexOf("<") >= 0 && o.indexOf(">") >= 0) {
                var h = "div";
                for (0 === o.indexOf("<li") && (h = "ul"), 0 === o.indexOf("<tr") && (h = "tbody"), 0 !== o.indexOf("<td") && 0 !== o.indexOf("<th") || (h = "tr"), 0 === o.indexOf("<tbody") && (h = "table"), 0 === o.indexOf("<option") && (h = "select"), (a = r.createElement(h)).innerHTML = o, s = 0; s < a.childNodes.length; s += 1) i.push(a.childNodes[s])
            } else for (n = e || "#" !== t[0] || t.match(/[ .<>:~]/) ? (e || r).querySelectorAll(t.trim()) : [r.getElementById(t.trim().split("#")[1])], s = 0; s < n.length; s += 1) n[s] && i.push(n[s])
        } else if (t.nodeType || t === l || t === r) i.push(t); else if (t.length > 0 && t[0].nodeType) for (s = 0; s < t.length; s += 1) i.push(t[s]);
        return new c(i)
    }

    function e(t) {
        for (var e = [], i = 0; i < t.length; i += 1) -1 === e.indexOf(t[i]) && e.push(t[i]);
        return e
    }

    function i(e) {
        var i = this.touchEventsData, s = this.params, n = this.touches;
        if (!this.animating || !s.preventInteractionOnTransition) {
            var a = e;
            a.originalEvent && (a = a.originalEvent);
            var o = t(a.target);
            if (("wrapper" !== s.touchEventsTarget || o.closest(this.wrapperEl).length) && (i.isTouchEvent = "touchstart" === a.type, (i.isTouchEvent || !("which" in a) || 3 !== a.which) && !(!i.isTouchEvent && "button" in a && a.button > 0 || i.isTouched && i.isMoved))) if (s.noSwiping && o.closest(s.noSwipingSelector ? s.noSwipingSelector : "." + s.noSwipingClass)[0]) this.allowClick = !0; else if (!s.swipeHandler || o.closest(s.swipeHandler)[0]) {
                n.currentX = "touchstart" === a.type ? a.targetTouches[0].pageX : a.pageX, n.currentY = "touchstart" === a.type ? a.targetTouches[0].pageY : a.pageY;
                var c = n.currentX, h = n.currentY, u = s.edgeSwipeDetection || s.iOSEdgeSwipeDetection,
                    p = s.edgeSwipeThreshold || s.iOSEdgeSwipeThreshold;
                if (!u || !(c <= p || c >= l.screen.width - p)) {
                    if (d.extend(i, {
                        isTouched: !0,
                        isMoved: !1,
                        allowTouchCallbacks: !0,
                        isScrolling: void 0,
                        startMoving: void 0
                    }), n.startX = c, n.startY = h, i.touchStartTime = d.now(), this.allowClick = !0, this.updateSize(), this.swipeDirection = void 0, s.threshold > 0 && (i.allowThresholdMove = !1), "touchstart" !== a.type) {
                        var f = !0;
                        o.is(i.formElements) && (f = !1), r.activeElement && t(r.activeElement).is(i.formElements) && r.activeElement !== o[0] && r.activeElement.blur();
                        var v = f && this.allowTouchMove && s.touchStartPreventDefault;
                        (s.touchStartForcePreventDefault || v) && a.preventDefault()
                    }
                    this.emit("touchStart", a)
                }
            }
        }
    }

    function s(e) {
        var i = this.touchEventsData, s = this.params, n = this.touches, a = this.rtlTranslate, o = e;
        if (o.originalEvent && (o = o.originalEvent), i.isTouched) {
            if (!i.isTouchEvent || "mousemove" !== o.type) {
                var l = "touchmove" === o.type && o.targetTouches && (o.targetTouches[0] || o.changedTouches[0]),
                    c = "touchmove" === o.type ? l.pageX : o.pageX, h = "touchmove" === o.type ? l.pageY : o.pageY;
                if (o.preventedByNestedSwiper) return n.startX = c, void (n.startY = h);
                if (!this.allowTouchMove) return this.allowClick = !1, void (i.isTouched && (d.extend(n, {
                    startX: c,
                    startY: h,
                    currentX: c,
                    currentY: h
                }), i.touchStartTime = d.now()));
                if (i.isTouchEvent && s.touchReleaseOnEdges && !s.loop) if (this.isVertical()) {
                    if (h < n.startY && this.translate <= this.maxTranslate() || h > n.startY && this.translate >= this.minTranslate()) return i.isTouched = !1, void (i.isMoved = !1)
                } else if (c < n.startX && this.translate <= this.maxTranslate() || c > n.startX && this.translate >= this.minTranslate()) return;
                if (i.isTouchEvent && r.activeElement && o.target === r.activeElement && t(o.target).is(i.formElements)) return i.isMoved = !0, void (this.allowClick = !1);
                if (i.allowTouchCallbacks && this.emit("touchMove", o), !(o.targetTouches && o.targetTouches.length > 1)) {
                    n.currentX = c, n.currentY = h;
                    var u = n.currentX - n.startX, p = n.currentY - n.startY;
                    if (!(this.params.threshold && Math.sqrt(Math.pow(u, 2) + Math.pow(p, 2)) < this.params.threshold)) {
                        var f;
                        if (void 0 === i.isScrolling && (this.isHorizontal() && n.currentY === n.startY || this.isVertical() && n.currentX === n.startX ? i.isScrolling = !1 : u * u + p * p >= 25 && (f = 180 * Math.atan2(Math.abs(p), Math.abs(u)) / Math.PI, i.isScrolling = this.isHorizontal() ? f > s.touchAngle : 90 - f > s.touchAngle)), i.isScrolling && this.emit("touchMoveOpposite", o), void 0 === i.startMoving && (n.currentX === n.startX && n.currentY === n.startY || (i.startMoving = !0)), i.isScrolling) i.isTouched = !1; else if (i.startMoving) {
                            this.allowClick = !1, s.cssMode || o.preventDefault(), s.touchMoveStopPropagation && !s.nested && o.stopPropagation(), i.isMoved || (s.loop && this.loopFix(), i.startTranslate = this.getTranslate(), this.setTransition(0), this.animating && this.$wrapperEl.trigger("webkitTransitionEnd transitionend"), i.allowMomentumBounce = !1, !s.grabCursor || !0 !== this.allowSlideNext && !0 !== this.allowSlidePrev || this.setGrabCursor(!0), this.emit("sliderFirstMove", o)), this.emit("sliderMove", o), i.isMoved = !0;
                            var v = this.isHorizontal() ? u : p;
                            n.diff = v, v *= s.touchRatio, a && (v = -v), this.swipeDirection = v > 0 ? "prev" : "next", i.currentTranslate = v + i.startTranslate;
                            var m = !0, g = s.resistanceRatio;
                            if (s.touchReleaseOnEdges && (g = 0), v > 0 && i.currentTranslate > this.minTranslate() ? (m = !1, s.resistance && (i.currentTranslate = this.minTranslate() - 1 + Math.pow(-this.minTranslate() + i.startTranslate + v, g))) : v < 0 && i.currentTranslate < this.maxTranslate() && (m = !1, s.resistance && (i.currentTranslate = this.maxTranslate() + 1 - Math.pow(this.maxTranslate() - i.startTranslate - v, g))), m && (o.preventedByNestedSwiper = !0), !this.allowSlideNext && "next" === this.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate), !this.allowSlidePrev && "prev" === this.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate), s.threshold > 0) {
                                if (!(Math.abs(v) > s.threshold || i.allowThresholdMove)) return void (i.currentTranslate = i.startTranslate);
                                if (!i.allowThresholdMove) return i.allowThresholdMove = !0, n.startX = n.currentX, n.startY = n.currentY, i.currentTranslate = i.startTranslate, void (n.diff = this.isHorizontal() ? n.currentX - n.startX : n.currentY - n.startY)
                            }
                            s.followFinger && !s.cssMode && ((s.freeMode || s.watchSlidesProgress || s.watchSlidesVisibility) && (this.updateActiveIndex(), this.updateSlidesClasses()), s.freeMode && (0 === i.velocities.length && i.velocities.push({
                                position: n[this.isHorizontal() ? "startX" : "startY"],
                                time: i.touchStartTime
                            }), i.velocities.push({
                                position: n[this.isHorizontal() ? "currentX" : "currentY"],
                                time: d.now()
                            })), this.updateProgress(i.currentTranslate), this.setTranslate(i.currentTranslate))
                        }
                    }
                }
            }
        } else i.startMoving && i.isScrolling && this.emit("touchMoveOpposite", o)
    }

    function n(t) {
        var e = this, i = e.touchEventsData, s = e.params, n = e.touches, a = e.rtlTranslate, o = e.$wrapperEl,
            r = e.slidesGrid, l = e.snapGrid, c = t;
        if (c.originalEvent && (c = c.originalEvent), i.allowTouchCallbacks && e.emit("touchEnd", c), i.allowTouchCallbacks = !1, !i.isTouched) return i.isMoved && s.grabCursor && e.setGrabCursor(!1), i.isMoved = !1, void (i.startMoving = !1);
        s.grabCursor && i.isMoved && i.isTouched && (!0 === e.allowSlideNext || !0 === e.allowSlidePrev) && e.setGrabCursor(!1);
        var h, u = d.now(), p = u - i.touchStartTime;
        if (e.allowClick && (e.updateClickedSlide(c), e.emit("tap click", c), p < 300 && u - i.lastClickTime < 300 && e.emit("doubleTap doubleClick", c)), i.lastClickTime = d.now(), d.nextTick(function () {
            e.destroyed || (e.allowClick = !0)
        }), !i.isTouched || !i.isMoved || !e.swipeDirection || 0 === n.diff || i.currentTranslate === i.startTranslate) return i.isTouched = !1, i.isMoved = !1, void (i.startMoving = !1);
        if (i.isTouched = !1, i.isMoved = !1, i.startMoving = !1, h = s.followFinger ? a ? e.translate : -e.translate : -i.currentTranslate, !s.cssMode) if (s.freeMode) {
            if (h < -e.minTranslate()) return void e.slideTo(e.activeIndex);
            if (h > -e.maxTranslate()) return void (e.slides.length < l.length ? e.slideTo(l.length - 1) : e.slideTo(e.slides.length - 1));
            if (s.freeModeMomentum) {
                if (i.velocities.length > 1) {
                    var f = i.velocities.pop(), v = i.velocities.pop(), m = f.position - v.position,
                        g = f.time - v.time;
                    e.velocity = m / g, e.velocity /= 2, Math.abs(e.velocity) < s.freeModeMinimumVelocity && (e.velocity = 0), (g > 150 || d.now() - f.time > 300) && (e.velocity = 0)
                } else e.velocity = 0;
                e.velocity *= s.freeModeMomentumVelocityRatio, i.velocities.length = 0;
                var b = 1e3 * s.freeModeMomentumRatio, y = e.velocity * b, w = e.translate + y;
                a && (w = -w);
                var x, S, T = !1, E = 20 * Math.abs(e.velocity) * s.freeModeMomentumBounceRatio;
                if (w < e.maxTranslate()) s.freeModeMomentumBounce ? (w + e.maxTranslate() < -E && (w = e.maxTranslate() - E), x = e.maxTranslate(), T = !0, i.allowMomentumBounce = !0) : w = e.maxTranslate(), s.loop && s.centeredSlides && (S = !0); else if (w > e.minTranslate()) s.freeModeMomentumBounce ? (w - e.minTranslate() > E && (w = e.minTranslate() + E), x = e.minTranslate(), T = !0, i.allowMomentumBounce = !0) : w = e.minTranslate(), s.loop && s.centeredSlides && (S = !0); else if (s.freeModeSticky) {
                    for (var C, M = 0; M < l.length; M += 1) if (l[M] > -w) {
                        C = M;
                        break
                    }
                    w = -(w = Math.abs(l[C] - w) < Math.abs(l[C - 1] - w) || "next" === e.swipeDirection ? l[C] : l[C - 1])
                }
                if (S && e.once("transitionEnd", function () {
                    e.loopFix()
                }), 0 !== e.velocity) {
                    if (b = a ? Math.abs((-w - e.translate) / e.velocity) : Math.abs((w - e.translate) / e.velocity), s.freeModeSticky) {
                        var k = Math.abs((a ? -w : w) - e.translate), P = e.slidesSizesGrid[e.activeIndex];
                        b = k < P ? s.speed : k < 2 * P ? 1.5 * s.speed : 2.5 * s.speed
                    }
                } else if (s.freeModeSticky) return void e.slideToClosest();
                s.freeModeMomentumBounce && T ? (e.updateProgress(x), e.setTransition(b), e.setTranslate(w), e.transitionStart(!0, e.swipeDirection), e.animating = !0, o.transitionEnd(function () {
                    e && !e.destroyed && i.allowMomentumBounce && (e.emit("momentumBounce"), e.setTransition(s.speed), e.setTranslate(x), o.transitionEnd(function () {
                        e && !e.destroyed && e.transitionEnd()
                    }))
                })) : e.velocity ? (e.updateProgress(w), e.setTransition(b), e.setTranslate(w), e.transitionStart(!0, e.swipeDirection), e.animating || (e.animating = !0, o.transitionEnd(function () {
                    e && !e.destroyed && e.transitionEnd()
                }))) : e.updateProgress(w), e.updateActiveIndex(), e.updateSlidesClasses()
            } else if (s.freeModeSticky) return void e.slideToClosest();
            (!s.freeModeMomentum || p >= s.longSwipesMs) && (e.updateProgress(), e.updateActiveIndex(), e.updateSlidesClasses())
        } else {
            for (var $ = 0, L = e.slidesSizesGrid[0], A = 0; A < r.length; A += A < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup) {
                var z = A < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
                void 0 !== r[A + z] ? h >= r[A] && h < r[A + z] && ($ = A, L = r[A + z] - r[A]) : h >= r[A] && ($ = A, L = r[r.length - 1] - r[r.length - 2])
            }
            var I = (h - r[$]) / L, O = $ < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
            if (p > s.longSwipesMs) {
                if (!s.longSwipes) return void e.slideTo(e.activeIndex);
                "next" === e.swipeDirection && (I >= s.longSwipesRatio ? e.slideTo($ + O) : e.slideTo($)), "prev" === e.swipeDirection && (I > 1 - s.longSwipesRatio ? e.slideTo($ + O) : e.slideTo($))
            } else {
                if (!s.shortSwipes) return void e.slideTo(e.activeIndex);
                !e.navigation || c.target !== e.navigation.nextEl && c.target !== e.navigation.prevEl ? ("next" === e.swipeDirection && e.slideTo($ + O), "prev" === e.swipeDirection && e.slideTo($)) : c.target === e.navigation.nextEl ? e.slideTo($ + O) : e.slideTo($)
            }
        }
    }

    function a() {
        var t = this.params, e = this.el;
        if (!e || 0 !== e.offsetWidth) {
            t.breakpoints && this.setBreakpoint();
            var i = this.allowSlideNext, s = this.allowSlidePrev, n = this.snapGrid;
            this.allowSlideNext = !0, this.allowSlidePrev = !0, this.updateSize(), this.updateSlides(), this.updateSlidesClasses(), ("auto" === t.slidesPerView || t.slidesPerView > 1) && this.isEnd && !this.params.centeredSlides ? this.slideTo(this.slides.length - 1, 0, !1, !0) : this.slideTo(this.activeIndex, 0, !1, !0), this.autoplay && this.autoplay.running && this.autoplay.paused && this.autoplay.run(), this.allowSlidePrev = s, this.allowSlideNext = i, this.params.watchOverflow && n !== this.snapGrid && this.checkOverflow()
        }
    }

    function o() {
    }

    var r = "undefined" == typeof document ? {
        body: {}, addEventListener: function () {
        }, removeEventListener: function () {
        }, activeElement: {
            blur: function () {
            }, nodeName: ""
        }, querySelector: function () {
            return null
        }, querySelectorAll: function () {
            return []
        }, getElementById: function () {
            return null
        }, createEvent: function () {
            return {
                initEvent: function () {
                }
            }
        }, createElement: function () {
            return {
                children: [], childNodes: [], style: {}, setAttribute: function () {
                }, getElementsByTagName: function () {
                    return []
                }
            }
        }, location: {hash: ""}
    } : document, l = "undefined" == typeof window ? {
        document: r,
        navigator: {userAgent: ""},
        location: {},
        history: {},
        CustomEvent: function () {
            return this
        },
        addEventListener: function () {
        },
        removeEventListener: function () {
        },
        getComputedStyle: function () {
            return {
                getPropertyValue: function () {
                    return ""
                }
            }
        },
        Image: function () {
        },
        Date: function () {
        },
        screen: {},
        setTimeout: function () {
        },
        clearTimeout: function () {
        }
    } : window, c = function (t) {
        for (var e = 0; e < t.length; e += 1) this[e] = t[e];
        return this.length = t.length, this
    };
    t.fn = c.prototype, t.Class = c, t.Dom7 = c;
    var h = {
        addClass: function (t) {
            if (void 0 === t) return this;
            for (var e = t.split(" "), i = 0; i < e.length; i += 1) for (var s = 0; s < this.length; s += 1) void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.add(e[i]);
            return this
        }, removeClass: function (t) {
            for (var e = t.split(" "), i = 0; i < e.length; i += 1) for (var s = 0; s < this.length; s += 1) void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.remove(e[i]);
            return this
        }, hasClass: function (t) {
            return !!this[0] && this[0].classList.contains(t)
        }, toggleClass: function (t) {
            for (var e = t.split(" "), i = 0; i < e.length; i += 1) for (var s = 0; s < this.length; s += 1) void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.toggle(e[i]);
            return this
        }, attr: function (t, e) {
            var i = arguments;
            if (1 === arguments.length && "string" == typeof t) return this[0] ? this[0].getAttribute(t) : void 0;
            for (var s = 0; s < this.length; s += 1) if (2 === i.length) this[s].setAttribute(t, e); else for (var n in t) this[s][n] = t[n], this[s].setAttribute(n, t[n]);
            return this
        }, removeAttr: function (t) {
            for (var e = 0; e < this.length; e += 1) this[e].removeAttribute(t);
            return this
        }, data: function (t, e) {
            var i;
            if (void 0 !== e) {
                for (var s = 0; s < this.length; s += 1) (i = this[s]).dom7ElementDataStorage || (i.dom7ElementDataStorage = {}), i.dom7ElementDataStorage[t] = e;
                return this
            }
            if (i = this[0]) {
                if (i.dom7ElementDataStorage && t in i.dom7ElementDataStorage) return i.dom7ElementDataStorage[t];
                return i.getAttribute("data-" + t) || void 0
            }
        }, transform: function (t) {
            for (var e = 0; e < this.length; e += 1) {
                var i = this[e].style;
                i.webkitTransform = t, i.transform = t
            }
            return this
        }, transition: function (t) {
            "string" != typeof t && (t += "ms");
            for (var e = 0; e < this.length; e += 1) {
                var i = this[e].style;
                i.webkitTransitionDuration = t, i.transitionDuration = t
            }
            return this
        }, on: function () {
            function e(e) {
                var i = e.target;
                if (i) {
                    var s = e.target.dom7EventData || [];
                    if (s.indexOf(e) < 0 && s.unshift(e), t(i).is(r)) l.apply(i, s); else for (var n = t(i).parents(), a = 0; a < n.length; a += 1) t(n[a]).is(r) && l.apply(n[a], s)
                }
            }

            function i(t) {
                var e = t && t.target && t.target.dom7EventData || [];
                e.indexOf(t) < 0 && e.unshift(t), l.apply(this, e)
            }

            for (var s, n = [], a = arguments.length; a--;) n[a] = arguments[a];
            var o = n[0], r = n[1], l = n[2], c = n[3];
            "function" == typeof n[1] && (o = (s = n)[0], l = s[1], c = s[2], r = void 0), c || (c = !1);
            for (var h, d = o.split(" "), u = 0; u < this.length; u += 1) {
                var p = this[u];
                if (r) for (h = 0; h < d.length; h += 1) {
                    var f = d[h];
                    p.dom7LiveListeners || (p.dom7LiveListeners = {}), p.dom7LiveListeners[f] || (p.dom7LiveListeners[f] = []), p.dom7LiveListeners[f].push({
                        listener: l,
                        proxyListener: e
                    }), p.addEventListener(f, e, c)
                } else for (h = 0; h < d.length; h += 1) {
                    var v = d[h];
                    p.dom7Listeners || (p.dom7Listeners = {}), p.dom7Listeners[v] || (p.dom7Listeners[v] = []), p.dom7Listeners[v].push({
                        listener: l,
                        proxyListener: i
                    }), p.addEventListener(v, i, c)
                }
            }
            return this
        }, off: function () {
            for (var t, e = [], i = arguments.length; i--;) e[i] = arguments[i];
            var s = e[0], n = e[1], a = e[2], o = e[3];
            "function" == typeof e[1] && (s = (t = e)[0], a = t[1], o = t[2], n = void 0), o || (o = !1);
            for (var r = s.split(" "), l = 0; l < r.length; l += 1) for (var c = r[l], h = 0; h < this.length; h += 1) {
                var d = this[h], u = void 0;
                if (!n && d.dom7Listeners ? u = d.dom7Listeners[c] : n && d.dom7LiveListeners && (u = d.dom7LiveListeners[c]), u && u.length) for (var p = u.length - 1; p >= 0; p -= 1) {
                    var f = u[p];
                    a && f.listener === a ? (d.removeEventListener(c, f.proxyListener, o), u.splice(p, 1)) : a && f.listener && f.listener.dom7proxy && f.listener.dom7proxy === a ? (d.removeEventListener(c, f.proxyListener, o), u.splice(p, 1)) : a || (d.removeEventListener(c, f.proxyListener, o), u.splice(p, 1))
                }
            }
            return this
        }, trigger: function () {
            for (var t = [], e = arguments.length; e--;) t[e] = arguments[e];
            for (var i = t[0].split(" "), s = t[1], n = 0; n < i.length; n += 1) for (var a = i[n], o = 0; o < this.length; o += 1) {
                var c = this[o], h = void 0;
                try {
                    h = new l.CustomEvent(a, {detail: s, bubbles: !0, cancelable: !0})
                } catch (t) {
                    (h = r.createEvent("Event")).initEvent(a, !0, !0), h.detail = s
                }
                c.dom7EventData = t.filter(function (t, e) {
                    return e > 0
                }), c.dispatchEvent(h), c.dom7EventData = [], delete c.dom7EventData
            }
            return this
        }, transitionEnd: function (t) {
            function e(a) {
                if (a.target === this) for (t.call(this, a), i = 0; i < s.length; i += 1) n.off(s[i], e)
            }

            var i, s = ["webkitTransitionEnd", "transitionend"], n = this;
            if (t) for (i = 0; i < s.length; i += 1) n.on(s[i], e);
            return this
        }, outerWidth: function (t) {
            if (this.length > 0) {
                if (t) {
                    var e = this.styles();
                    return this[0].offsetWidth + parseFloat(e.getPropertyValue("margin-right")) + parseFloat(e.getPropertyValue("margin-left"))
                }
                return this[0].offsetWidth
            }
            return null
        }, outerHeight: function (t) {
            if (this.length > 0) {
                if (t) {
                    var e = this.styles();
                    return this[0].offsetHeight + parseFloat(e.getPropertyValue("margin-top")) + parseFloat(e.getPropertyValue("margin-bottom"))
                }
                return this[0].offsetHeight
            }
            return null
        }, offset: function () {
            if (this.length > 0) {
                var t = this[0], e = t.getBoundingClientRect(), i = r.body, s = t.clientTop || i.clientTop || 0,
                    n = t.clientLeft || i.clientLeft || 0, a = t === l ? l.scrollY : t.scrollTop,
                    o = t === l ? l.scrollX : t.scrollLeft;
                return {top: e.top + a - s, left: e.left + o - n}
            }
            return null
        }, css: function (t, e) {
            var i;
            if (1 === arguments.length) {
                if ("string" != typeof t) {
                    for (i = 0; i < this.length; i += 1) for (var s in t) this[i].style[s] = t[s];
                    return this
                }
                if (this[0]) return l.getComputedStyle(this[0], null).getPropertyValue(t)
            }
            if (2 === arguments.length && "string" == typeof t) {
                for (i = 0; i < this.length; i += 1) this[i].style[t] = e;
                return this
            }
            return this
        }, each: function (t) {
            if (!t) return this;
            for (var e = 0; e < this.length; e += 1) if (!1 === t.call(this[e], e, this[e])) return this;
            return this
        }, html: function (t) {
            if (void 0 === t) return this[0] ? this[0].innerHTML : void 0;
            for (var e = 0; e < this.length; e += 1) this[e].innerHTML = t;
            return this
        }, text: function (t) {
            if (void 0 === t) return this[0] ? this[0].textContent.trim() : null;
            for (var e = 0; e < this.length; e += 1) this[e].textContent = t;
            return this
        }, is: function (e) {
            var i, s, n = this[0];
            if (!n || void 0 === e) return !1;
            if ("string" == typeof e) {
                if (n.matches) return n.matches(e);
                if (n.webkitMatchesSelector) return n.webkitMatchesSelector(e);
                if (n.msMatchesSelector) return n.msMatchesSelector(e);
                for (i = t(e), s = 0; s < i.length; s += 1) if (i[s] === n) return !0;
                return !1
            }
            if (e === r) return n === r;
            if (e === l) return n === l;
            if (e.nodeType || e instanceof c) {
                for (i = e.nodeType ? [e] : e, s = 0; s < i.length; s += 1) if (i[s] === n) return !0;
                return !1
            }
            return !1
        }, index: function () {
            var t, e = this[0];
            if (e) {
                for (t = 0; null !== (e = e.previousSibling);) 1 === e.nodeType && (t += 1);
                return t
            }
        }, eq: function (t) {
            if (void 0 === t) return this;
            var e, i = this.length;
            return new c(t > i - 1 ? [] : t < 0 ? (e = i + t) < 0 ? [] : [this[e]] : [this[t]])
        }, append: function () {
            for (var t, e = [], i = arguments.length; i--;) e[i] = arguments[i];
            for (var s = 0; s < e.length; s += 1) {
                t = e[s];
                for (var n = 0; n < this.length; n += 1) if ("string" == typeof t) {
                    var a = r.createElement("div");
                    for (a.innerHTML = t; a.firstChild;) this[n].appendChild(a.firstChild)
                } else if (t instanceof c) for (var o = 0; o < t.length; o += 1) this[n].appendChild(t[o]); else this[n].appendChild(t)
            }
            return this
        }, prepend: function (t) {
            var e, i;
            for (e = 0; e < this.length; e += 1) if ("string" == typeof t) {
                var s = r.createElement("div");
                for (s.innerHTML = t, i = s.childNodes.length - 1; i >= 0; i -= 1) this[e].insertBefore(s.childNodes[i], this[e].childNodes[0])
            } else if (t instanceof c) for (i = 0; i < t.length; i += 1) this[e].insertBefore(t[i], this[e].childNodes[0]); else this[e].insertBefore(t, this[e].childNodes[0]);
            return this
        }, next: function (e) {
            return new c(this.length > 0 ? e ? this[0].nextElementSibling && t(this[0].nextElementSibling).is(e) ? [this[0].nextElementSibling] : [] : this[0].nextElementSibling ? [this[0].nextElementSibling] : [] : [])
        }, nextAll: function (e) {
            var i = [], s = this[0];
            if (!s) return new c([]);
            for (; s.nextElementSibling;) {
                var n = s.nextElementSibling;
                e ? t(n).is(e) && i.push(n) : i.push(n), s = n
            }
            return new c(i)
        }, prev: function (e) {
            if (this.length > 0) {
                var i = this[0];
                return new c(e ? i.previousElementSibling && t(i.previousElementSibling).is(e) ? [i.previousElementSibling] : [] : i.previousElementSibling ? [i.previousElementSibling] : [])
            }
            return new c([])
        }, prevAll: function (e) {
            var i = [], s = this[0];
            if (!s) return new c([]);
            for (; s.previousElementSibling;) {
                var n = s.previousElementSibling;
                e ? t(n).is(e) && i.push(n) : i.push(n), s = n
            }
            return new c(i)
        }, parent: function (i) {
            for (var s = [], n = 0; n < this.length; n += 1) null !== this[n].parentNode && (i ? t(this[n].parentNode).is(i) && s.push(this[n].parentNode) : s.push(this[n].parentNode));
            return t(e(s))
        }, parents: function (i) {
            for (var s = [], n = 0; n < this.length; n += 1) for (var a = this[n].parentNode; a;) i ? t(a).is(i) && s.push(a) : s.push(a), a = a.parentNode;
            return t(e(s))
        }, closest: function (t) {
            var e = this;
            return void 0 === t ? new c([]) : (e.is(t) || (e = e.parents(t).eq(0)), e)
        }, find: function (t) {
            for (var e = [], i = 0; i < this.length; i += 1) for (var s = this[i].querySelectorAll(t), n = 0; n < s.length; n += 1) e.push(s[n]);
            return new c(e)
        }, children: function (i) {
            for (var s = [], n = 0; n < this.length; n += 1) for (var a = this[n].childNodes, o = 0; o < a.length; o += 1) i ? 1 === a[o].nodeType && t(a[o]).is(i) && s.push(a[o]) : 1 === a[o].nodeType && s.push(a[o]);
            return new c(e(s))
        }, filter: function (t) {
            for (var e = [], i = 0; i < this.length; i += 1) t.call(this[i], i, this[i]) && e.push(this[i]);
            return new c(e)
        }, remove: function () {
            for (var t = 0; t < this.length; t += 1) this[t].parentNode && this[t].parentNode.removeChild(this[t]);
            return this
        }, add: function () {
            for (var e = [], i = arguments.length; i--;) e[i] = arguments[i];
            var s, n;
            for (s = 0; s < e.length; s += 1) {
                var a = t(e[s]);
                for (n = 0; n < a.length; n += 1) this[this.length] = a[n], this.length += 1
            }
            return this
        }, styles: function () {
            return this[0] ? l.getComputedStyle(this[0], null) : {}
        }
    };
    Object.keys(h).forEach(function (e) {
        t.fn[e] = t.fn[e] || h[e]
    });
    var d = {
        deleteProps: function (t) {
            var e = t;
            Object.keys(e).forEach(function (t) {
                try {
                    e[t] = null
                } catch (t) {
                }
                try {
                    delete e[t]
                } catch (t) {
                }
            })
        }, nextTick: function (t, e) {
            return void 0 === e && (e = 0), setTimeout(t, e)
        }, now: function () {
            return Date.now()
        }, getTranslate: function (t, e) {
            var i, s, n;
            void 0 === e && (e = "x");
            var a = l.getComputedStyle(t, null);
            return l.WebKitCSSMatrix ? ((s = a.transform || a.webkitTransform).split(",").length > 6 && (s = s.split(", ").map(function (t) {
                return t.replace(",", ".")
            }).join(", ")), n = new l.WebKitCSSMatrix("none" === s ? "" : s)) : i = (n = a.MozTransform || a.OTransform || a.MsTransform || a.msTransform || a.transform || a.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === e && (s = l.WebKitCSSMatrix ? n.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])), "y" === e && (s = l.WebKitCSSMatrix ? n.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])), s || 0
        }, parseUrlQuery: function (t) {
            var e, i, s, n, a = {}, o = t || l.location.href;
            if ("string" == typeof o && o.length) for (n = (i = (o = o.indexOf("?") > -1 ? o.replace(/\S*\?/, "") : "").split("&").filter(function (t) {
                return "" !== t
            })).length, e = 0; e < n; e += 1) s = i[e].replace(/#\S+/g, "").split("="), a[decodeURIComponent(s[0])] = void 0 === s[1] ? void 0 : decodeURIComponent(s[1]) || "";
            return a
        }, isObject: function (t) {
            return "object" == typeof t && null !== t && t.constructor && t.constructor === Object
        }, extend: function () {
            for (var t = [], e = arguments.length; e--;) t[e] = arguments[e];
            for (var i = Object(t[0]), s = 1; s < t.length; s += 1) {
                var n = t[s];
                if (null != n) for (var a = Object.keys(Object(n)), o = 0, r = a.length; o < r; o += 1) {
                    var l = a[o], c = Object.getOwnPropertyDescriptor(n, l);
                    void 0 !== c && c.enumerable && (d.isObject(i[l]) && d.isObject(n[l]) ? d.extend(i[l], n[l]) : !d.isObject(i[l]) && d.isObject(n[l]) ? (i[l] = {}, d.extend(i[l], n[l])) : i[l] = n[l])
                }
            }
            return i
        }
    }, u = {
        touch: l.Modernizr && !0 === l.Modernizr.touch || !!(l.navigator.maxTouchPoints > 0 || "ontouchstart" in l || l.DocumentTouch && r instanceof l.DocumentTouch),
        pointerEvents: !!l.PointerEvent && "maxTouchPoints" in l.navigator && l.navigator.maxTouchPoints > 0,
        observer: "MutationObserver" in l || "WebkitMutationObserver" in l,
        passiveListener: function () {
            var t = !1;
            try {
                var e = Object.defineProperty({}, "passive", {
                    get: function () {
                        t = !0
                    }
                });
                l.addEventListener("testPassiveListener", null, e)
            } catch (t) {
            }
            return t
        }(),
        gestures: "ongesturestart" in l
    }, p = function (t) {
        void 0 === t && (t = {});
        var e = this;
        e.params = t, e.eventsListeners = {}, e.params && e.params.on && Object.keys(e.params.on).forEach(function (t) {
            e.on(t, e.params.on[t])
        })
    }, f = {components: {configurable: !0}};
    p.prototype.on = function (t, e, i) {
        var s = this;
        if ("function" != typeof e) return s;
        var n = i ? "unshift" : "push";
        return t.split(" ").forEach(function (t) {
            s.eventsListeners[t] || (s.eventsListeners[t] = []), s.eventsListeners[t][n](e)
        }), s
    }, p.prototype.once = function (t, e, i) {
        function s() {
            for (var i = [], a = arguments.length; a--;) i[a] = arguments[a];
            n.off(t, s), s.f7proxy && delete s.f7proxy, e.apply(n, i)
        }

        var n = this;
        return "function" != typeof e ? n : (s.f7proxy = e, n.on(t, s, i))
    }, p.prototype.off = function (t, e) {
        var i = this;
        return i.eventsListeners ? (t.split(" ").forEach(function (t) {
            void 0 === e ? i.eventsListeners[t] = [] : i.eventsListeners[t] && i.eventsListeners[t].length && i.eventsListeners[t].forEach(function (s, n) {
                (s === e || s.f7proxy && s.f7proxy === e) && i.eventsListeners[t].splice(n, 1)
            })
        }), i) : i
    }, p.prototype.emit = function () {
        for (var t = [], e = arguments.length; e--;) t[e] = arguments[e];
        var i, s, n, a = this;
        if (!a.eventsListeners) return a;
        "string" == typeof t[0] || Array.isArray(t[0]) ? (i = t[0], s = t.slice(1, t.length), n = a) : (i = t[0].events, s = t[0].data, n = t[0].context || a);
        return (Array.isArray(i) ? i : i.split(" ")).forEach(function (t) {
            if (a.eventsListeners && a.eventsListeners[t]) {
                var e = [];
                a.eventsListeners[t].forEach(function (t) {
                    e.push(t)
                }), e.forEach(function (t) {
                    t.apply(n, s)
                })
            }
        }), a
    }, p.prototype.useModulesParams = function (t) {
        var e = this;
        e.modules && Object.keys(e.modules).forEach(function (i) {
            var s = e.modules[i];
            s.params && d.extend(t, s.params)
        })
    }, p.prototype.useModules = function (t) {
        void 0 === t && (t = {});
        var e = this;
        e.modules && Object.keys(e.modules).forEach(function (i) {
            var s = e.modules[i], n = t[i] || {};
            s.instance && Object.keys(s.instance).forEach(function (t) {
                var i = s.instance[t];
                e[t] = "function" == typeof i ? i.bind(e) : i
            }), s.on && e.on && Object.keys(s.on).forEach(function (t) {
                e.on(t, s.on[t])
            }), s.create && s.create.bind(e)(n)
        })
    }, f.components.set = function (t) {
        this.use && this.use(t)
    }, p.installModule = function (t) {
        for (var e = [], i = arguments.length - 1; i-- > 0;) e[i] = arguments[i + 1];
        var s = this;
        s.prototype.modules || (s.prototype.modules = {});
        var n = t.name || Object.keys(s.prototype.modules).length + "_" + d.now();
        return s.prototype.modules[n] = t, t.proto && Object.keys(t.proto).forEach(function (e) {
            s.prototype[e] = t.proto[e]
        }), t.static && Object.keys(t.static).forEach(function (e) {
            s[e] = t.static[e]
        }), t.install && t.install.apply(s, e), s
    }, p.use = function (t) {
        for (var e = [], i = arguments.length - 1; i-- > 0;) e[i] = arguments[i + 1];
        var s = this;
        return Array.isArray(t) ? (t.forEach(function (t) {
            return s.installModule(t)
        }), s) : s.installModule.apply(s, [t].concat(e))
    }, Object.defineProperties(p, f);
    var v, m, g, b, y, w, x, S, T, E, C, M, k, P, $, L = {
            updateSize: function () {
                var t, e, i = this.$el;
                t = void 0 !== this.params.width ? this.params.width : i[0].clientWidth, e = void 0 !== this.params.height ? this.params.height : i[0].clientHeight, 0 === t && this.isHorizontal() || 0 === e && this.isVertical() || (t = t - parseInt(i.css("padding-left"), 10) - parseInt(i.css("padding-right"), 10), e = e - parseInt(i.css("padding-top"), 10) - parseInt(i.css("padding-bottom"), 10), d.extend(this, {
                    width: t,
                    height: e,
                    size: this.isHorizontal() ? t : e
                }))
            }, updateSlides: function () {
                function t(t) {
                    return !e.cssMode || t !== c.length - 1
                }

                var e = this.params, i = this.$wrapperEl, s = this.size, n = this.rtlTranslate, a = this.wrongRTL,
                    o = this.virtual && e.virtual.enabled, r = o ? this.virtual.slides.length : this.slides.length,
                    c = i.children("." + this.params.slideClass), h = o ? this.virtual.slides.length : c.length, u = [],
                    p = [], f = [], v = e.slidesOffsetBefore;
                "function" == typeof v && (v = e.slidesOffsetBefore.call(this));
                var m = e.slidesOffsetAfter;
                "function" == typeof m && (m = e.slidesOffsetAfter.call(this));
                var g = this.snapGrid.length, b = this.snapGrid.length, y = e.spaceBetween, w = -v, x = 0, S = 0;
                if (void 0 !== s) {
                    var T, E;
                    "string" == typeof y && y.indexOf("%") >= 0 && (y = parseFloat(y.replace("%", "")) / 100 * s), this.virtualSize = -y, n ? c.css({
                        marginLeft: "",
                        marginTop: ""
                    }) : c.css({
                        marginRight: "",
                        marginBottom: ""
                    }), e.slidesPerColumn > 1 && (T = Math.floor(h / e.slidesPerColumn) === h / this.params.slidesPerColumn ? h : Math.ceil(h / e.slidesPerColumn) * e.slidesPerColumn, "auto" !== e.slidesPerView && "row" === e.slidesPerColumnFill && (T = Math.max(T, e.slidesPerView * e.slidesPerColumn)));
                    for (var C, M = e.slidesPerColumn, k = T / M, P = Math.floor(h / e.slidesPerColumn), $ = 0; $ < h; $ += 1) {
                        E = 0;
                        var L = c.eq($);
                        if (e.slidesPerColumn > 1) {
                            var A = void 0, z = void 0, I = void 0;
                            if ("row" === e.slidesPerColumnFill && e.slidesPerGroup > 1) {
                                var O = Math.floor($ / (e.slidesPerGroup * e.slidesPerColumn)),
                                    D = $ - e.slidesPerColumn * e.slidesPerGroup * O,
                                    B = 0 === O ? e.slidesPerGroup : Math.min(Math.ceil((h - O * M * e.slidesPerGroup) / M), e.slidesPerGroup);
                                A = (z = D - (I = Math.floor(D / B)) * B + O * e.slidesPerGroup) + I * T / M, L.css({
                                    "-webkit-box-ordinal-group": A,
                                    "-moz-box-ordinal-group": A,
                                    "-ms-flex-order": A,
                                    "-webkit-order": A,
                                    order: A
                                })
                            } else "column" === e.slidesPerColumnFill ? (I = $ - (z = Math.floor($ / M)) * M, (z > P || z === P && I === M - 1) && (I += 1) >= M && (I = 0, z += 1)) : z = $ - (I = Math.floor($ / k)) * k;
                            L.css("margin-" + (this.isHorizontal() ? "top" : "left"), 0 !== I && e.spaceBetween && e.spaceBetween + "px")
                        }
                        if ("none" !== L.css("display")) {
                            if ("auto" === e.slidesPerView) {
                                var H = l.getComputedStyle(L[0], null), V = L[0].style.transform,
                                    R = L[0].style.webkitTransform;
                                if (V && (L[0].style.transform = "none"), R && (L[0].style.webkitTransform = "none"), e.roundLengths) E = this.isHorizontal() ? L.outerWidth(!0) : L.outerHeight(!0); else if (this.isHorizontal()) {
                                    var F = parseFloat(H.getPropertyValue("width")),
                                        Y = parseFloat(H.getPropertyValue("padding-left")),
                                        X = parseFloat(H.getPropertyValue("padding-right")),
                                        j = parseFloat(H.getPropertyValue("margin-left")),
                                        W = parseFloat(H.getPropertyValue("margin-right")),
                                        N = H.getPropertyValue("box-sizing");
                                    E = N && "border-box" === N ? F + j + W : F + Y + X + j + W
                                } else {
                                    var _ = parseFloat(H.getPropertyValue("height")),
                                        G = parseFloat(H.getPropertyValue("padding-top")),
                                        q = parseFloat(H.getPropertyValue("padding-bottom")),
                                        U = parseFloat(H.getPropertyValue("margin-top")),
                                        K = parseFloat(H.getPropertyValue("margin-bottom")),
                                        Z = H.getPropertyValue("box-sizing");
                                    E = Z && "border-box" === Z ? _ + U + K : _ + G + q + U + K
                                }
                                V && (L[0].style.transform = V), R && (L[0].style.webkitTransform = R), e.roundLengths && (E = Math.floor(E))
                            } else E = (s - (e.slidesPerView - 1) * y) / e.slidesPerView, e.roundLengths && (E = Math.floor(E)), c[$] && (this.isHorizontal() ? c[$].style.width = E + "px" : c[$].style.height = E + "px");
                            c[$] && (c[$].swiperSlideSize = E), f.push(E), e.centeredSlides ? (w = w + E / 2 + x / 2 + y, 0 === x && 0 !== $ && (w = w - s / 2 - y), 0 === $ && (w = w - s / 2 - y), Math.abs(w) < .001 && (w = 0), e.roundLengths && (w = Math.floor(w)), S % e.slidesPerGroup == 0 && u.push(w), p.push(w)) : (e.roundLengths && (w = Math.floor(w)), (S - Math.min(this.params.slidesPerGroupSkip, S)) % this.params.slidesPerGroup == 0 && u.push(w), p.push(w), w = w + E + y), this.virtualSize += E + y, x = E, S += 1
                        }
                    }
                    if (this.virtualSize = Math.max(this.virtualSize, s) + m, n && a && ("slide" === e.effect || "coverflow" === e.effect) && i.css({width: this.virtualSize + e.spaceBetween + "px"}), e.setWrapperSize && (this.isHorizontal() ? i.css({width: this.virtualSize + e.spaceBetween + "px"}) : i.css({height: this.virtualSize + e.spaceBetween + "px"})), e.slidesPerColumn > 1 && (this.virtualSize = (E + e.spaceBetween) * T, this.virtualSize = Math.ceil(this.virtualSize / e.slidesPerColumn) - e.spaceBetween, this.isHorizontal() ? i.css({width: this.virtualSize + e.spaceBetween + "px"}) : i.css({height: this.virtualSize + e.spaceBetween + "px"}), e.centeredSlides)) {
                        C = [];
                        for (var Q = 0; Q < u.length; Q += 1) {
                            var J = u[Q];
                            e.roundLengths && (J = Math.floor(J)), u[Q] < this.virtualSize + u[0] && C.push(J)
                        }
                        u = C
                    }
                    if (!e.centeredSlides) {
                        C = [];
                        for (var tt = 0; tt < u.length; tt += 1) {
                            var et = u[tt];
                            e.roundLengths && (et = Math.floor(et)), u[tt] <= this.virtualSize - s && C.push(et)
                        }
                        u = C, Math.floor(this.virtualSize - s) - Math.floor(u[u.length - 1]) > 1 && u.push(this.virtualSize - s)
                    }
                    if (0 === u.length && (u = [0]), 0 !== e.spaceBetween && (this.isHorizontal() ? n ? c.filter(t).css({marginLeft: y + "px"}) : c.filter(t).css({marginRight: y + "px"}) : c.filter(t).css({marginBottom: y + "px"})), e.centeredSlides && e.centeredSlidesBounds) {
                        var it = 0;
                        f.forEach(function (t) {
                            it += t + (e.spaceBetween ? e.spaceBetween : 0)
                        });
                        var st = (it -= e.spaceBetween) - s;
                        u = u.map(function (t) {
                            return t < 0 ? -v : t > st ? st + m : t
                        })
                    }
                    if (e.centerInsufficientSlides) {
                        var nt = 0;
                        if (f.forEach(function (t) {
                            nt += t + (e.spaceBetween ? e.spaceBetween : 0)
                        }), (nt -= e.spaceBetween) < s) {
                            var at = (s - nt) / 2;
                            u.forEach(function (t, e) {
                                u[e] = t - at
                            }), p.forEach(function (t, e) {
                                p[e] = t + at
                            })
                        }
                    }
                    d.extend(this, {
                        slides: c,
                        snapGrid: u,
                        slidesGrid: p,
                        slidesSizesGrid: f
                    }), h !== r && this.emit("slidesLengthChange"), u.length !== g && (this.params.watchOverflow && this.checkOverflow(), this.emit("snapGridLengthChange")), p.length !== b && this.emit("slidesGridLengthChange"), (e.watchSlidesProgress || e.watchSlidesVisibility) && this.updateSlidesOffset()
                }
            }, updateAutoHeight: function (t) {
                var e, i = [], s = 0;
                if ("number" == typeof t ? this.setTransition(t) : !0 === t && this.setTransition(this.params.speed), "auto" !== this.params.slidesPerView && this.params.slidesPerView > 1) for (e = 0; e < Math.ceil(this.params.slidesPerView); e += 1) {
                    var n = this.activeIndex + e;
                    if (n > this.slides.length) break;
                    i.push(this.slides.eq(n)[0])
                } else i.push(this.slides.eq(this.activeIndex)[0]);
                for (e = 0; e < i.length; e += 1) if (void 0 !== i[e]) {
                    var a = i[e].offsetHeight;
                    s = a > s ? a : s
                }
                s && this.$wrapperEl.css("height", s + "px")
            }, updateSlidesOffset: function () {
                for (var t = this.slides, e = 0; e < t.length; e += 1) t[e].swiperSlideOffset = this.isHorizontal() ? t[e].offsetLeft : t[e].offsetTop
            }, updateSlidesProgress: function (e) {
                void 0 === e && (e = this && this.translate || 0);
                var i = this.params, s = this.slides, n = this.rtlTranslate;
                if (0 !== s.length) {
                    void 0 === s[0].swiperSlideOffset && this.updateSlidesOffset();
                    var a = -e;
                    n && (a = e), s.removeClass(i.slideVisibleClass), this.visibleSlidesIndexes = [], this.visibleSlides = [];
                    for (var o = 0; o < s.length; o += 1) {
                        var r = s[o],
                            l = (a + (i.centeredSlides ? this.minTranslate() : 0) - r.swiperSlideOffset) / (r.swiperSlideSize + i.spaceBetween);
                        if (i.watchSlidesVisibility) {
                            var c = -(a - r.swiperSlideOffset), h = c + this.slidesSizesGrid[o];
                            (c >= 0 && c < this.size - 1 || h > 1 && h <= this.size || c <= 0 && h >= this.size) && (this.visibleSlides.push(r), this.visibleSlidesIndexes.push(o), s.eq(o).addClass(i.slideVisibleClass))
                        }
                        r.progress = n ? -l : l
                    }
                    this.visibleSlides = t(this.visibleSlides)
                }
            }, updateProgress: function (t) {
                if (void 0 === t) {
                    var e = this.rtlTranslate ? -1 : 1;
                    t = this && this.translate && this.translate * e || 0
                }
                var i = this.params, s = this.maxTranslate() - this.minTranslate(), n = this.progress, a = this.isBeginning,
                    o = this.isEnd, r = a, l = o;
                0 === s ? (n = 0, a = !0, o = !0) : (a = (n = (t - this.minTranslate()) / s) <= 0, o = n >= 1), d.extend(this, {
                    progress: n,
                    isBeginning: a,
                    isEnd: o
                }), (i.watchSlidesProgress || i.watchSlidesVisibility) && this.updateSlidesProgress(t), a && !r && this.emit("reachBeginning toEdge"), o && !l && this.emit("reachEnd toEdge"), (r && !a || l && !o) && this.emit("fromEdge"), this.emit("progress", n)
            }, updateSlidesClasses: function () {
                var t, e = this.slides, i = this.params, s = this.$wrapperEl, n = this.activeIndex, a = this.realIndex,
                    o = this.virtual && i.virtual.enabled;
                e.removeClass(i.slideActiveClass + " " + i.slideNextClass + " " + i.slidePrevClass + " " + i.slideDuplicateActiveClass + " " + i.slideDuplicateNextClass + " " + i.slideDuplicatePrevClass), (t = o ? this.$wrapperEl.find("." + i.slideClass + '[data-swiper-slide-index="' + n + '"]') : e.eq(n)).addClass(i.slideActiveClass), i.loop && (t.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + a + '"]').addClass(i.slideDuplicateActiveClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + a + '"]').addClass(i.slideDuplicateActiveClass));
                var r = t.nextAll("." + i.slideClass).eq(0).addClass(i.slideNextClass);
                i.loop && 0 === r.length && (r = e.eq(0)).addClass(i.slideNextClass);
                var l = t.prevAll("." + i.slideClass).eq(0).addClass(i.slidePrevClass);
                i.loop && 0 === l.length && (l = e.eq(-1)).addClass(i.slidePrevClass), i.loop && (r.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + r.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + r.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass), l.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass))
            }, updateActiveIndex: function (t) {
                var e, i = this.rtlTranslate ? this.translate : -this.translate, s = this.slidesGrid, n = this.snapGrid,
                    a = this.params, o = this.activeIndex, r = this.realIndex, l = this.snapIndex, c = t;
                if (void 0 === c) {
                    for (var h = 0; h < s.length; h += 1) void 0 !== s[h + 1] ? i >= s[h] && i < s[h + 1] - (s[h + 1] - s[h]) / 2 ? c = h : i >= s[h] && i < s[h + 1] && (c = h + 1) : i >= s[h] && (c = h);
                    a.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0)
                }
                if (n.indexOf(i) >= 0) e = n.indexOf(i); else {
                    var u = Math.min(a.slidesPerGroupSkip, c);
                    e = u + Math.floor((c - u) / a.slidesPerGroup)
                }
                if (e >= n.length && (e = n.length - 1), c !== o) {
                    var p = parseInt(this.slides.eq(c).attr("data-swiper-slide-index") || c, 10);
                    d.extend(this, {
                        snapIndex: e,
                        realIndex: p,
                        previousIndex: o,
                        activeIndex: c
                    }), this.emit("activeIndexChange"), this.emit("snapIndexChange"), r !== p && this.emit("realIndexChange"), (this.initialized || this.runCallbacksOnInit) && this.emit("slideChange")
                } else e !== l && (this.snapIndex = e, this.emit("snapIndexChange"))
            }, updateClickedSlide: function (e) {
                var i = this.params, s = t(e.target).closest("." + i.slideClass)[0], n = !1;
                if (s) for (var a = 0; a < this.slides.length; a += 1) this.slides[a] === s && (n = !0);
                if (!s || !n) return this.clickedSlide = void 0, void (this.clickedIndex = void 0);
                this.clickedSlide = s, this.virtual && this.params.virtual.enabled ? this.clickedIndex = parseInt(t(s).attr("data-swiper-slide-index"), 10) : this.clickedIndex = t(s).index(), i.slideToClickedSlide && void 0 !== this.clickedIndex && this.clickedIndex !== this.activeIndex && this.slideToClickedSlide()
            }
        }, A = {
            getTranslate: function (t) {
                void 0 === t && (t = this.isHorizontal() ? "x" : "y");
                var e = this.params, i = this.rtlTranslate, s = this.translate, n = this.$wrapperEl;
                if (e.virtualTranslate) return i ? -s : s;
                if (e.cssMode) return s;
                var a = d.getTranslate(n[0], t);
                return i && (a = -a), a || 0
            }, setTranslate: function (t, e) {
                var i = this.rtlTranslate, s = this.params, n = this.$wrapperEl, a = this.wrapperEl, o = this.progress,
                    r = 0, l = 0;
                this.isHorizontal() ? r = i ? -t : t : l = t, s.roundLengths && (r = Math.floor(r), l = Math.floor(l)), s.cssMode ? a[this.isHorizontal() ? "scrollLeft" : "scrollTop"] = this.isHorizontal() ? -r : -l : s.virtualTranslate || n.transform("translate3d(" + r + "px, " + l + "px, 0px)"), this.previousTranslate = this.translate, this.translate = this.isHorizontal() ? r : l;
                var c = this.maxTranslate() - this.minTranslate();
                (0 === c ? 0 : (t - this.minTranslate()) / c) !== o && this.updateProgress(t), this.emit("setTranslate", this.translate, e)
            }, minTranslate: function () {
                return -this.snapGrid[0]
            }, maxTranslate: function () {
                return -this.snapGrid[this.snapGrid.length - 1]
            }, translateTo: function (t, e, i, s, n) {
                var a;
                void 0 === t && (t = 0), void 0 === e && (e = this.params.speed), void 0 === i && (i = !0), void 0 === s && (s = !0);
                var o = this, r = o.params, l = o.wrapperEl;
                if (o.animating && r.preventInteractionOnTransition) return !1;
                var c, h = o.minTranslate(), d = o.maxTranslate();
                if (c = s && t > h ? h : s && t < d ? d : t, o.updateProgress(c), r.cssMode) {
                    var u = o.isHorizontal();
                    return 0 === e ? l[u ? "scrollLeft" : "scrollTop"] = -c : l.scrollTo ? l.scrollTo(((a = {})[u ? "left" : "top"] = -c, a.behavior = "smooth", a)) : l[u ? "scrollLeft" : "scrollTop"] = -c, !0
                }
                return 0 === e ? (o.setTransition(0), o.setTranslate(c), i && (o.emit("beforeTransitionStart", e, n), o.emit("transitionEnd"))) : (o.setTransition(e), o.setTranslate(c), i && (o.emit("beforeTransitionStart", e, n), o.emit("transitionStart")), o.animating || (o.animating = !0, o.onTranslateToWrapperTransitionEnd || (o.onTranslateToWrapperTransitionEnd = function (t) {
                    o && !o.destroyed && t.target === this && (o.$wrapperEl[0].removeEventListener("transitionend", o.onTranslateToWrapperTransitionEnd), o.$wrapperEl[0].removeEventListener("webkitTransitionEnd", o.onTranslateToWrapperTransitionEnd), o.onTranslateToWrapperTransitionEnd = null, delete o.onTranslateToWrapperTransitionEnd, i && o.emit("transitionEnd"))
                }), o.$wrapperEl[0].addEventListener("transitionend", o.onTranslateToWrapperTransitionEnd), o.$wrapperEl[0].addEventListener("webkitTransitionEnd", o.onTranslateToWrapperTransitionEnd))), !0
            }
        }, z = {
            slideTo: function (t, e, i, s) {
                var n;
                void 0 === t && (t = 0), void 0 === e && (e = this.params.speed), void 0 === i && (i = !0);
                var a = this, o = t;
                o < 0 && (o = 0);
                var r = a.params, l = a.snapGrid, c = a.slidesGrid, h = a.previousIndex, d = a.activeIndex,
                    u = a.rtlTranslate, p = a.wrapperEl;
                if (a.animating && r.preventInteractionOnTransition) return !1;
                var f = Math.min(a.params.slidesPerGroupSkip, o), v = f + Math.floor((o - f) / a.params.slidesPerGroup);
                v >= l.length && (v = l.length - 1), (d || r.initialSlide || 0) === (h || 0) && i && a.emit("beforeSlideChangeStart");
                var m, g = -l[v];
                if (a.updateProgress(g), r.normalizeSlideIndex) for (var b = 0; b < c.length; b += 1) -Math.floor(100 * g) >= Math.floor(100 * c[b]) && (o = b);
                if (a.initialized && o !== d) {
                    if (!a.allowSlideNext && g < a.translate && g < a.minTranslate()) return !1;
                    if (!a.allowSlidePrev && g > a.translate && g > a.maxTranslate() && (d || 0) !== o) return !1
                }
                if (m = o > d ? "next" : o < d ? "prev" : "reset", u && -g === a.translate || !u && g === a.translate) return a.updateActiveIndex(o), r.autoHeight && a.updateAutoHeight(), a.updateSlidesClasses(), "slide" !== r.effect && a.setTranslate(g), "reset" !== m && (a.transitionStart(i, m), a.transitionEnd(i, m)), !1;
                if (r.cssMode) {
                    var y = a.isHorizontal();
                    return 0 === e ? p[y ? "scrollLeft" : "scrollTop"] = -g : p.scrollTo ? p.scrollTo(((n = {})[y ? "left" : "top"] = -g, n.behavior = "smooth", n)) : p[y ? "scrollLeft" : "scrollTop"] = -g, !0
                }
                return 0 === e ? (a.setTransition(0), a.setTranslate(g), a.updateActiveIndex(o), a.updateSlidesClasses(), a.emit("beforeTransitionStart", e, s), a.transitionStart(i, m), a.transitionEnd(i, m)) : (a.setTransition(e), a.setTranslate(g), a.updateActiveIndex(o), a.updateSlidesClasses(), a.emit("beforeTransitionStart", e, s), a.transitionStart(i, m), a.animating || (a.animating = !0, a.onSlideToWrapperTransitionEnd || (a.onSlideToWrapperTransitionEnd = function (t) {
                    a && !a.destroyed && t.target === this && (a.$wrapperEl[0].removeEventListener("transitionend", a.onSlideToWrapperTransitionEnd), a.$wrapperEl[0].removeEventListener("webkitTransitionEnd", a.onSlideToWrapperTransitionEnd), a.onSlideToWrapperTransitionEnd = null, delete a.onSlideToWrapperTransitionEnd, a.transitionEnd(i, m))
                }), a.$wrapperEl[0].addEventListener("transitionend", a.onSlideToWrapperTransitionEnd), a.$wrapperEl[0].addEventListener("webkitTransitionEnd", a.onSlideToWrapperTransitionEnd))), !0
            }, slideToLoop: function (t, e, i, s) {
                void 0 === t && (t = 0), void 0 === e && (e = this.params.speed), void 0 === i && (i = !0);
                var n = t;
                return this.params.loop && (n += this.loopedSlides), this.slideTo(n, e, i, s)
            }, slideNext: function (t, e, i) {
                void 0 === t && (t = this.params.speed), void 0 === e && (e = !0);
                var s = this.params, n = this.animating, a = this.activeIndex < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup;
                if (s.loop) {
                    if (n) return !1;
                    this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft
                }
                return this.slideTo(this.activeIndex + a, t, e, i)
            }, slidePrev: function (t, e, i) {
                function s(t) {
                    return t < 0 ? -Math.floor(Math.abs(t)) : Math.floor(t)
                }

                void 0 === t && (t = this.params.speed), void 0 === e && (e = !0);
                var n = this.params, a = this.animating, o = this.snapGrid, r = this.slidesGrid, l = this.rtlTranslate;
                if (n.loop) {
                    if (a) return !1;
                    this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft
                }
                var c, h = s(l ? this.translate : -this.translate), d = o.map(function (t) {
                    return s(t)
                }), u = (r.map(function (t) {
                    return s(t)
                }), o[d.indexOf(h)], o[d.indexOf(h) - 1]);
                return void 0 === u && n.cssMode && o.forEach(function (t) {
                    !u && h >= t && (u = t)
                }), void 0 !== u && (c = r.indexOf(u)) < 0 && (c = this.activeIndex - 1), this.slideTo(c, t, e, i)
            }, slideReset: function (t, e, i) {
                return void 0 === t && (t = this.params.speed), void 0 === e && (e = !0), this.slideTo(this.activeIndex, t, e, i)
            }, slideToClosest: function (t, e, i, s) {
                void 0 === t && (t = this.params.speed), void 0 === e && (e = !0), void 0 === s && (s = .5);
                var n = this.activeIndex, a = Math.min(this.params.slidesPerGroupSkip, n),
                    o = a + Math.floor((n - a) / this.params.slidesPerGroup),
                    r = this.rtlTranslate ? this.translate : -this.translate;
                if (r >= this.snapGrid[o]) {
                    var l = this.snapGrid[o];
                    r - l > (this.snapGrid[o + 1] - l) * s && (n += this.params.slidesPerGroup)
                } else {
                    var c = this.snapGrid[o - 1];
                    r - c <= (this.snapGrid[o] - c) * s && (n -= this.params.slidesPerGroup)
                }
                return n = Math.max(n, 0), n = Math.min(n, this.slidesGrid.length - 1), this.slideTo(n, t, e, i)
            }, slideToClickedSlide: function () {
                var e, i = this, s = i.params, n = i.$wrapperEl,
                    a = "auto" === s.slidesPerView ? i.slidesPerViewDynamic() : s.slidesPerView, o = i.clickedIndex;
                if (s.loop) {
                    if (i.animating) return;
                    e = parseInt(t(i.clickedSlide).attr("data-swiper-slide-index"), 10), s.centeredSlides ? o < i.loopedSlides - a / 2 || o > i.slides.length - i.loopedSlides + a / 2 ? (i.loopFix(), o = n.children("." + s.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + s.slideDuplicateClass + ")").eq(0).index(), d.nextTick(function () {
                        i.slideTo(o)
                    })) : i.slideTo(o) : o > i.slides.length - a ? (i.loopFix(), o = n.children("." + s.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + s.slideDuplicateClass + ")").eq(0).index(), d.nextTick(function () {
                        i.slideTo(o)
                    })) : i.slideTo(o)
                } else i.slideTo(o)
            }
        }, I = {
            loopCreate: function () {
                var e = this, i = e.params, s = e.$wrapperEl;
                s.children("." + i.slideClass + "." + i.slideDuplicateClass).remove();
                var n = s.children("." + i.slideClass);
                if (i.loopFillGroupWithBlank) {
                    var a = i.slidesPerGroup - n.length % i.slidesPerGroup;
                    if (a !== i.slidesPerGroup) {
                        for (var o = 0; o < a; o += 1) {
                            var l = t(r.createElement("div")).addClass(i.slideClass + " " + i.slideBlankClass);
                            s.append(l)
                        }
                        n = s.children("." + i.slideClass)
                    }
                }
                "auto" !== i.slidesPerView || i.loopedSlides || (i.loopedSlides = n.length), e.loopedSlides = Math.ceil(parseFloat(i.loopedSlides || i.slidesPerView, 10)), e.loopedSlides += i.loopAdditionalSlides, e.loopedSlides > n.length && (e.loopedSlides = n.length);
                var c = [], h = [];
                n.each(function (i, s) {
                    var a = t(s);
                    i < e.loopedSlides && h.push(s), i < n.length && i >= n.length - e.loopedSlides && c.push(s), a.attr("data-swiper-slide-index", i)
                });
                for (var d = 0; d < h.length; d += 1) s.append(t(h[d].cloneNode(!0)).addClass(i.slideDuplicateClass));
                for (var u = c.length - 1; u >= 0; u -= 1) s.prepend(t(c[u].cloneNode(!0)).addClass(i.slideDuplicateClass))
            }, loopFix: function () {
                this.emit("beforeLoopFix");
                var t, e = this.activeIndex, i = this.slides, s = this.loopedSlides, n = this.allowSlidePrev,
                    a = this.allowSlideNext, o = this.snapGrid, r = this.rtlTranslate;
                this.allowSlidePrev = !0, this.allowSlideNext = !0;
                var l = -o[e] - this.getTranslate();
                e < s ? (t = i.length - 3 * s + e, t += s, this.slideTo(t, 0, !1, !0) && 0 !== l && this.setTranslate((r ? -this.translate : this.translate) - l)) : e >= i.length - s && (t = -i.length + e + s, t += s, this.slideTo(t, 0, !1, !0) && 0 !== l && this.setTranslate((r ? -this.translate : this.translate) - l)), this.allowSlidePrev = n, this.allowSlideNext = a, this.emit("loopFix")
            }, loopDestroy: function () {
                var t = this.$wrapperEl, e = this.params, i = this.slides;
                t.children("." + e.slideClass + "." + e.slideDuplicateClass + ",." + e.slideClass + "." + e.slideBlankClass).remove(), i.removeAttr("data-swiper-slide-index")
            }
        }, O = {
            setGrabCursor: function (t) {
                if (!(u.touch || !this.params.simulateTouch || this.params.watchOverflow && this.isLocked || this.params.cssMode)) {
                    var e = this.el;
                    e.style.cursor = "move", e.style.cursor = t ? "-webkit-grabbing" : "-webkit-grab", e.style.cursor = t ? "-moz-grabbin" : "-moz-grab", e.style.cursor = t ? "grabbing" : "grab"
                }
            }, unsetGrabCursor: function () {
                u.touch || this.params.watchOverflow && this.isLocked || this.params.cssMode || (this.el.style.cursor = "")
            }
        }, D = {
            appendSlide: function (t) {
                var e = this.$wrapperEl, i = this.params;
                if (i.loop && this.loopDestroy(), "object" == typeof t && "length" in t) for (var s = 0; s < t.length; s += 1) t[s] && e.append(t[s]); else e.append(t);
                i.loop && this.loopCreate(), i.observer && u.observer || this.update()
            }, prependSlide: function (t) {
                var e = this.params, i = this.$wrapperEl, s = this.activeIndex;
                e.loop && this.loopDestroy();
                var n = s + 1;
                if ("object" == typeof t && "length" in t) {
                    for (var a = 0; a < t.length; a += 1) t[a] && i.prepend(t[a]);
                    n = s + t.length
                } else i.prepend(t);
                e.loop && this.loopCreate(), e.observer && u.observer || this.update(), this.slideTo(n, 0, !1)
            }, addSlide: function (t, e) {
                var i = this.$wrapperEl, s = this.params, n = this.activeIndex;
                s.loop && (n -= this.loopedSlides, this.loopDestroy(), this.slides = i.children("." + s.slideClass));
                var a = this.slides.length;
                if (t <= 0) this.prependSlide(e); else if (t >= a) this.appendSlide(e); else {
                    for (var o = n > t ? n + 1 : n, r = [], l = a - 1; l >= t; l -= 1) {
                        var c = this.slides.eq(l);
                        c.remove(), r.unshift(c)
                    }
                    if ("object" == typeof e && "length" in e) {
                        for (var h = 0; h < e.length; h += 1) e[h] && i.append(e[h]);
                        o = n > t ? n + e.length : n
                    } else i.append(e);
                    for (var d = 0; d < r.length; d += 1) i.append(r[d]);
                    s.loop && this.loopCreate(), s.observer && u.observer || this.update(), s.loop ? this.slideTo(o + this.loopedSlides, 0, !1) : this.slideTo(o, 0, !1)
                }
            }, removeSlide: function (t) {
                var e = this.params, i = this.$wrapperEl, s = this.activeIndex;
                e.loop && (s -= this.loopedSlides, this.loopDestroy(), this.slides = i.children("." + e.slideClass));
                var n, a = s;
                if ("object" == typeof t && "length" in t) {
                    for (var o = 0; o < t.length; o += 1) n = t[o], this.slides[n] && this.slides.eq(n).remove(), n < a && (a -= 1);
                    a = Math.max(a, 0)
                } else n = t, this.slides[n] && this.slides.eq(n).remove(), n < a && (a -= 1), a = Math.max(a, 0);
                e.loop && this.loopCreate(), e.observer && u.observer || this.update(), e.loop ? this.slideTo(a + this.loopedSlides, 0, !1) : this.slideTo(a, 0, !1)
            }, removeAllSlides: function () {
                for (var t = [], e = 0; e < this.slides.length; e += 1) t.push(e);
                this.removeSlide(t)
            }
        }, B = (v = l.navigator.platform, m = l.navigator.userAgent, g = {
            ios: !1,
            android: !1,
            androidChrome: !1,
            desktop: !1,
            iphone: !1,
            ipod: !1,
            ipad: !1,
            edge: !1,
            ie: !1,
            firefox: !1,
            macos: !1,
            windows: !1,
            cordova: !(!l.cordova && !l.phonegap),
            phonegap: !(!l.cordova && !l.phonegap),
            electron: !1
        }, b = l.screen.width, y = l.screen.height, w = m.match(/(Android);?[\s\/]+([\d.]+)?/), x = m.match(/(iPad).*OS\s([\d_]+)/), S = m.match(/(iPod)(.*OS\s([\d_]+))?/), T = !x && m.match(/(iPhone\sOS|iOS)\s([\d_]+)/), E = m.indexOf("MSIE ") >= 0 || m.indexOf("Trident/") >= 0, C = m.indexOf("Edge/") >= 0, M = m.indexOf("Gecko/") >= 0 && m.indexOf("Firefox/") >= 0, k = "Win32" === v, P = m.toLowerCase().indexOf("electron") >= 0, $ = "MacIntel" === v, !x && $ && u.touch && (1024 === b && 1366 === y || 834 === b && 1194 === y || 834 === b && 1112 === y || 768 === b && 1024 === y) && (x = m.match(/(Version)\/([\d.]+)/), $ = !1), g.ie = E, g.edge = C, g.firefox = M, w && !k && (g.os = "android", g.osVersion = w[2], g.android = !0, g.androidChrome = m.toLowerCase().indexOf("chrome") >= 0), (x || T || S) && (g.os = "ios", g.ios = !0), T && !S && (g.osVersion = T[2].replace(/_/g, "."), g.iphone = !0), x && (g.osVersion = x[2].replace(/_/g, "."), g.ipad = !0), S && (g.osVersion = S[3] ? S[3].replace(/_/g, ".") : null, g.ipod = !0), g.ios && g.osVersion && m.indexOf("Version/") >= 0 && "10" === g.osVersion.split(".")[0] && (g.osVersion = m.toLowerCase().split("version/")[1].split(" ")[0]), g.webView = !(!(T || x || S) || !m.match(/.*AppleWebKit(?!.*Safari)/i) && !l.navigator.standalone) || l.matchMedia && l.matchMedia("(display-mode: standalone)").matches, g.webview = g.webView, g.standalone = g.webView, g.desktop = !(g.ios || g.android) || P, g.desktop && (g.electron = P, g.macos = $, g.windows = k, g.macos && (g.os = "macos"), g.windows && (g.os = "windows")), g.pixelRatio = l.devicePixelRatio || 1, g),
        H = !1, V = {
            init: !0,
            direction: "horizontal",
            touchEventsTarget: "container",
            initialSlide: 0,
            speed: 300,
            cssMode: !1,
            updateOnWindowResize: !0,
            preventInteractionOnTransition: !1,
            edgeSwipeDetection: !1,
            edgeSwipeThreshold: 20,
            freeMode: !1,
            freeModeMomentum: !0,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: !0,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: !1,
            freeModeMinimumVelocity: .02,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            breakpoints: void 0,
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            slidesPerGroupSkip: 0,
            centeredSlides: !1,
            centeredSlidesBounds: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            normalizeSlideIndex: !0,
            centerInsufficientSlides: !1,
            watchOverflow: !1,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: !0,
            allowTouchMove: !0,
            threshold: 0,
            touchMoveStopPropagation: !1,
            touchStartPreventDefault: !0,
            touchStartForcePreventDefault: !1,
            touchReleaseOnEdges: !1,
            uniqueNavElements: !0,
            resistance: !0,
            resistanceRatio: .85,
            watchSlidesProgress: !1,
            watchSlidesVisibility: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            loopFillGroupWithBlank: !1,
            allowSlidePrev: !0,
            allowSlideNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            noSwipingSelector: null,
            passiveListeners: !0,
            containerModifierClass: "swiper-container-",
            slideClass: "swiper-slide",
            slideBlankClass: "swiper-slide-invisible-blank",
            slideActiveClass: "swiper-slide-active",
            slideDuplicateActiveClass: "swiper-slide-duplicate-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slideDuplicateNextClass: "swiper-slide-duplicate-next",
            slidePrevClass: "swiper-slide-prev",
            slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
            wrapperClass: "swiper-wrapper",
            runCallbacksOnInit: !0
        }, R = {
            update: L, translate: A, transition: {
                setTransition: function (t, e) {
                    this.params.cssMode || this.$wrapperEl.transition(t), this.emit("setTransition", t, e)
                }, transitionStart: function (t, e) {
                    void 0 === t && (t = !0);
                    var i = this.activeIndex, s = this.params, n = this.previousIndex;
                    if (!s.cssMode) {
                        s.autoHeight && this.updateAutoHeight();
                        var a = e;
                        if (a || (a = i > n ? "next" : i < n ? "prev" : "reset"), this.emit("transitionStart"), t && i !== n) {
                            if ("reset" === a) return void this.emit("slideResetTransitionStart");
                            this.emit("slideChangeTransitionStart"), "next" === a ? this.emit("slideNextTransitionStart") : this.emit("slidePrevTransitionStart")
                        }
                    }
                }, transitionEnd: function (t, e) {
                    void 0 === t && (t = !0);
                    var i = this.activeIndex, s = this.previousIndex, n = this.params;
                    if (this.animating = !1, !n.cssMode) {
                        this.setTransition(0);
                        var a = e;
                        if (a || (a = i > s ? "next" : i < s ? "prev" : "reset"), this.emit("transitionEnd"), t && i !== s) {
                            if ("reset" === a) return void this.emit("slideResetTransitionEnd");
                            this.emit("slideChangeTransitionEnd"), "next" === a ? this.emit("slideNextTransitionEnd") : this.emit("slidePrevTransitionEnd")
                        }
                    }
                }
            }, slide: z, loop: I, grabCursor: O, manipulation: D, events: {
                attachEvents: function () {
                    var t = this.params, e = this.touchEvents, l = this.el, c = this.wrapperEl;
                    this.onTouchStart = i.bind(this), this.onTouchMove = s.bind(this), this.onTouchEnd = n.bind(this), t.cssMode && (this.onScroll = function () {
                        var t = this.wrapperEl;
                        this.previousTranslate = this.translate, this.translate = this.isHorizontal() ? -t.scrollLeft : -t.scrollTop, -0 === this.translate && (this.translate = 0), this.updateActiveIndex(), this.updateSlidesClasses();
                        var e = this.maxTranslate() - this.minTranslate();
                        (0 === e ? 0 : (this.translate - this.minTranslate()) / e) !== this.progress && this.updateProgress(this.translate), this.emit("setTranslate", this.translate, !1)
                    }.bind(this)), this.onClick = function (t) {
                        this.allowClick || (this.params.preventClicks && t.preventDefault(), this.params.preventClicksPropagation && this.animating && (t.stopPropagation(), t.stopImmediatePropagation()))
                    }.bind(this);
                    var h = !!t.nested;
                    if (!u.touch && u.pointerEvents) l.addEventListener(e.start, this.onTouchStart, !1), r.addEventListener(e.move, this.onTouchMove, h), r.addEventListener(e.end, this.onTouchEnd, !1); else {
                        if (u.touch) {
                            var d = !("touchstart" !== e.start || !u.passiveListener || !t.passiveListeners) && {
                                passive: !0,
                                capture: !1
                            };
                            l.addEventListener(e.start, this.onTouchStart, d), l.addEventListener(e.move, this.onTouchMove, u.passiveListener ? {
                                passive: !1,
                                capture: h
                            } : h), l.addEventListener(e.end, this.onTouchEnd, d), e.cancel && l.addEventListener(e.cancel, this.onTouchEnd, d), H || (r.addEventListener("touchstart", o), H = !0)
                        }
                        (t.simulateTouch && !B.ios && !B.android || t.simulateTouch && !u.touch && B.ios) && (l.addEventListener("mousedown", this.onTouchStart, !1), r.addEventListener("mousemove", this.onTouchMove, h), r.addEventListener("mouseup", this.onTouchEnd, !1))
                    }
                    (t.preventClicks || t.preventClicksPropagation) && l.addEventListener("click", this.onClick, !0), t.cssMode && c.addEventListener("scroll", this.onScroll), t.updateOnWindowResize ? this.on(B.ios || B.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", a, !0) : this.on("observerUpdate", a, !0)
                }, detachEvents: function () {
                    var t = this.params, e = this.touchEvents, i = this.el, s = this.wrapperEl, n = !!t.nested;
                    if (!u.touch && u.pointerEvents) i.removeEventListener(e.start, this.onTouchStart, !1), r.removeEventListener(e.move, this.onTouchMove, n), r.removeEventListener(e.end, this.onTouchEnd, !1); else {
                        if (u.touch) {
                            var o = !("onTouchStart" !== e.start || !u.passiveListener || !t.passiveListeners) && {
                                passive: !0,
                                capture: !1
                            };
                            i.removeEventListener(e.start, this.onTouchStart, o), i.removeEventListener(e.move, this.onTouchMove, n), i.removeEventListener(e.end, this.onTouchEnd, o), e.cancel && i.removeEventListener(e.cancel, this.onTouchEnd, o)
                        }
                        (t.simulateTouch && !B.ios && !B.android || t.simulateTouch && !u.touch && B.ios) && (i.removeEventListener("mousedown", this.onTouchStart, !1), r.removeEventListener("mousemove", this.onTouchMove, n), r.removeEventListener("mouseup", this.onTouchEnd, !1))
                    }
                    (t.preventClicks || t.preventClicksPropagation) && i.removeEventListener("click", this.onClick, !0), t.cssMode && s.removeEventListener("scroll", this.onScroll), this.off(B.ios || B.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", a)
                }
            }, breakpoints: {
                setBreakpoint: function () {
                    var t = this.activeIndex, e = this.initialized, i = this.loopedSlides;
                    void 0 === i && (i = 0);
                    var s = this.params, n = this.$el, a = s.breakpoints;
                    if (a && (!a || 0 !== Object.keys(a).length)) {
                        var o = this.getBreakpoint(a);
                        if (o && this.currentBreakpoint !== o) {
                            var r = o in a ? a[o] : void 0;
                            r && ["slidesPerView", "spaceBetween", "slidesPerGroup", "slidesPerGroupSkip", "slidesPerColumn"].forEach(function (t) {
                                var e = r[t];
                                void 0 !== e && (r[t] = "slidesPerView" !== t || "AUTO" !== e && "auto" !== e ? "slidesPerView" === t ? parseFloat(e) : parseInt(e, 10) : "auto")
                            });
                            var l = r || this.originalParams, c = s.slidesPerColumn > 1, h = l.slidesPerColumn > 1;
                            c && !h ? n.removeClass(s.containerModifierClass + "multirow " + s.containerModifierClass + "multirow-column") : !c && h && (n.addClass(s.containerModifierClass + "multirow"), "column" === l.slidesPerColumnFill && n.addClass(s.containerModifierClass + "multirow-column"));
                            var u = l.direction && l.direction !== s.direction,
                                p = s.loop && (l.slidesPerView !== s.slidesPerView || u);
                            u && e && this.changeDirection(), d.extend(this.params, l), d.extend(this, {
                                allowTouchMove: this.params.allowTouchMove,
                                allowSlideNext: this.params.allowSlideNext,
                                allowSlidePrev: this.params.allowSlidePrev
                            }), this.currentBreakpoint = o, p && e && (this.loopDestroy(), this.loopCreate(), this.updateSlides(), this.slideTo(t - i + this.loopedSlides, 0, !1)), this.emit("breakpoint", l)
                        }
                    }
                }, getBreakpoint: function (t) {
                    if (t) {
                        var e = !1, i = Object.keys(t).map(function (t) {
                            if ("string" == typeof t && t.startsWith("@")) {
                                var e = parseFloat(t.substr(1));
                                return {value: l.innerHeight * e, point: t}
                            }
                            return {value: t, point: t}
                        });
                        i.sort(function (t, e) {
                            return parseInt(t.value, 10) - parseInt(e.value, 10)
                        });
                        for (var s = 0; s < i.length; s += 1) {
                            var n = i[s], a = n.point;
                            n.value <= l.innerWidth && (e = a)
                        }
                        return e || "max"
                    }
                }
            }, checkOverflow: {
                checkOverflow: function () {
                    var t = this.params, e = this.isLocked,
                        i = this.slides.length > 0 && t.slidesOffsetBefore + t.spaceBetween * (this.slides.length - 1) + this.slides[0].offsetWidth * this.slides.length;
                    t.slidesOffsetBefore && t.slidesOffsetAfter && i ? this.isLocked = i <= this.size : this.isLocked = 1 === this.snapGrid.length, this.allowSlideNext = !this.isLocked, this.allowSlidePrev = !this.isLocked, e !== this.isLocked && this.emit(this.isLocked ? "lock" : "unlock"), e && e !== this.isLocked && (this.isEnd = !1, this.navigation.update())
                }
            }, classes: {
                addClasses: function () {
                    var t = this.classNames, e = this.params, i = this.rtl, s = this.$el, n = [];
                    n.push("initialized"), n.push(e.direction), e.freeMode && n.push("free-mode"), e.autoHeight && n.push("autoheight"), i && n.push("rtl"), e.slidesPerColumn > 1 && (n.push("multirow"), "column" === e.slidesPerColumnFill && n.push("multirow-column")), B.android && n.push("android"), B.ios && n.push("ios"), e.cssMode && n.push("css-mode"), n.forEach(function (i) {
                        t.push(e.containerModifierClass + i)
                    }), s.addClass(t.join(" "))
                }, removeClasses: function () {
                    var t = this.$el, e = this.classNames;
                    t.removeClass(e.join(" "))
                }
            }, images: {
                loadImage: function (t, e, i, s, n, a) {
                    function o() {
                        a && a()
                    }

                    var r;
                    t.complete && n ? o() : e ? ((r = new l.Image).onload = o, r.onerror = o, s && (r.sizes = s), i && (r.srcset = i), e && (r.src = e)) : o()
                }, preloadImages: function () {
                    function t() {
                        null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")))
                    }

                    var e = this;
                    e.imagesToLoad = e.$el.find("img");
                    for (var i = 0; i < e.imagesToLoad.length; i += 1) {
                        var s = e.imagesToLoad[i];
                        e.loadImage(s, s.currentSrc || s.getAttribute("src"), s.srcset || s.getAttribute("srcset"), s.sizes || s.getAttribute("sizes"), !0, t)
                    }
                }
            }
        }, F = {}, Y = function (e) {
            function i() {
                for (var s, n, a, o = [], r = arguments.length; r--;) o[r] = arguments[r];
                1 === o.length && o[0].constructor && o[0].constructor === Object ? a = o[0] : (n = (s = o)[0], a = s[1]), a || (a = {}), a = d.extend({}, a), n && !a.el && (a.el = n), e.call(this, a), Object.keys(R).forEach(function (t) {
                    Object.keys(R[t]).forEach(function (e) {
                        i.prototype[e] || (i.prototype[e] = R[t][e])
                    })
                });
                var l = this;
                void 0 === l.modules && (l.modules = {}), Object.keys(l.modules).forEach(function (t) {
                    var e = l.modules[t];
                    if (e.params) {
                        var i = Object.keys(e.params)[0], s = e.params[i];
                        if ("object" != typeof s || null === s) return;
                        if (!(i in a && "enabled" in s)) return;
                        !0 === a[i] && (a[i] = {enabled: !0}), "object" != typeof a[i] || "enabled" in a[i] || (a[i].enabled = !0), a[i] || (a[i] = {enabled: !1})
                    }
                });
                var c = d.extend({}, V);
                l.useModulesParams(c), l.params = d.extend({}, c, F, a), l.originalParams = d.extend({}, l.params), l.passedParams = d.extend({}, a), l.$ = t;
                var h = t(l.params.el);
                if (n = h[0]) {
                    if (h.length > 1) {
                        var p = [];
                        return h.each(function (t, e) {
                            var s = d.extend({}, a, {el: e});
                            p.push(new i(s))
                        }), p
                    }
                    var f, v, m;
                    return n.swiper = l, h.data("swiper", l), n && n.shadowRoot && n.shadowRoot.querySelector ? (f = t(n.shadowRoot.querySelector("." + l.params.wrapperClass))).children = function (t) {
                        return h.children(t)
                    } : f = h.children("." + l.params.wrapperClass), d.extend(l, {
                        $el: h,
                        el: n,
                        $wrapperEl: f,
                        wrapperEl: f[0],
                        classNames: [],
                        slides: t(),
                        slidesGrid: [],
                        snapGrid: [],
                        slidesSizesGrid: [],
                        isHorizontal: function () {
                            return "horizontal" === l.params.direction
                        },
                        isVertical: function () {
                            return "vertical" === l.params.direction
                        },
                        rtl: "rtl" === n.dir.toLowerCase() || "rtl" === h.css("direction"),
                        rtlTranslate: "horizontal" === l.params.direction && ("rtl" === n.dir.toLowerCase() || "rtl" === h.css("direction")),
                        wrongRTL: "-webkit-box" === f.css("display"),
                        activeIndex: 0,
                        realIndex: 0,
                        isBeginning: !0,
                        isEnd: !1,
                        translate: 0,
                        previousTranslate: 0,
                        progress: 0,
                        velocity: 0,
                        animating: !1,
                        allowSlideNext: l.params.allowSlideNext,
                        allowSlidePrev: l.params.allowSlidePrev,
                        touchEvents: (v = ["touchstart", "touchmove", "touchend", "touchcancel"], m = ["mousedown", "mousemove", "mouseup"], u.pointerEvents && (m = ["pointerdown", "pointermove", "pointerup"]), l.touchEventsTouch = {
                            start: v[0],
                            move: v[1],
                            end: v[2],
                            cancel: v[3]
                        }, l.touchEventsDesktop = {
                            start: m[0],
                            move: m[1],
                            end: m[2]
                        }, u.touch || !l.params.simulateTouch ? l.touchEventsTouch : l.touchEventsDesktop),
                        touchEventsData: {
                            isTouched: void 0,
                            isMoved: void 0,
                            allowTouchCallbacks: void 0,
                            touchStartTime: void 0,
                            isScrolling: void 0,
                            currentTranslate: void 0,
                            startTranslate: void 0,
                            allowThresholdMove: void 0,
                            formElements: "input, select, option, textarea, button, video, label",
                            lastClickTime: d.now(),
                            clickTimeout: void 0,
                            velocities: [],
                            allowMomentumBounce: void 0,
                            isTouchEvent: void 0,
                            startMoving: void 0
                        },
                        allowClick: !0,
                        allowTouchMove: l.params.allowTouchMove,
                        touches: {startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0},
                        imagesToLoad: [],
                        imagesLoaded: 0
                    }), l.useModules(), l.params.init && l.init(), l
                }
            }

            e && (i.__proto__ = e), (i.prototype = Object.create(e && e.prototype)).constructor = i;
            var s = {
                extendedDefaults: {configurable: !0},
                defaults: {configurable: !0},
                Class: {configurable: !0},
                $: {configurable: !0}
            };
            return i.prototype.slidesPerViewDynamic = function () {
                var t = this.params, e = this.slides, i = this.slidesGrid, s = this.size, n = this.activeIndex, a = 1;
                if (t.centeredSlides) {
                    for (var o, r = e[n].swiperSlideSize, l = n + 1; l < e.length; l += 1) e[l] && !o && (a += 1, (r += e[l].swiperSlideSize) > s && (o = !0));
                    for (var c = n - 1; c >= 0; c -= 1) e[c] && !o && (a += 1, (r += e[c].swiperSlideSize) > s && (o = !0))
                } else for (var h = n + 1; h < e.length; h += 1) i[h] - i[n] < s && (a += 1);
                return a
            }, i.prototype.update = function () {
                function t() {
                    var t = e.rtlTranslate ? -1 * e.translate : e.translate,
                        i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
                    e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses()
                }

                var e = this;
                if (e && !e.destroyed) {
                    var i = e.snapGrid, s = e.params;
                    s.breakpoints && e.setBreakpoint(), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), e.params.freeMode ? (t(), e.params.autoHeight && e.updateAutoHeight()) : (("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0)) || t(), s.watchOverflow && i !== e.snapGrid && e.checkOverflow(), e.emit("update")
                }
            }, i.prototype.changeDirection = function (t, e) {
                void 0 === e && (e = !0);
                var i = this.params.direction;
                return t || (t = "horizontal" === i ? "vertical" : "horizontal"), t === i || "horizontal" !== t && "vertical" !== t ? this : (this.$el.removeClass("" + this.params.containerModifierClass + i).addClass("" + this.params.containerModifierClass + t), this.params.direction = t, this.slides.each(function (e, i) {
                    "vertical" === t ? i.style.width = "" : i.style.height = ""
                }), this.emit("changeDirection"), e && this.update(), this)
            }, i.prototype.init = function () {
                this.initialized || (this.emit("beforeInit"), this.params.breakpoints && this.setBreakpoint(), this.addClasses(), this.params.loop && this.loopCreate(), this.updateSize(), this.updateSlides(), this.params.watchOverflow && this.checkOverflow(), this.params.grabCursor && this.setGrabCursor(), this.params.preloadImages && this.preloadImages(), this.params.loop ? this.slideTo(this.params.initialSlide + this.loopedSlides, 0, this.params.runCallbacksOnInit) : this.slideTo(this.params.initialSlide, 0, this.params.runCallbacksOnInit), this.attachEvents(), this.initialized = !0, this.emit("init"))
            }, i.prototype.destroy = function (t, e) {
                void 0 === t && (t = !0), void 0 === e && (e = !0);
                var i = this, s = i.params, n = i.$el, a = i.$wrapperEl, o = i.slides;
                return void 0 === i.params || i.destroyed ? null : (i.emit("beforeDestroy"), i.initialized = !1, i.detachEvents(), s.loop && i.loopDestroy(), e && (i.removeClasses(), n.removeAttr("style"), a.removeAttr("style"), o && o.length && o.removeClass([s.slideVisibleClass, s.slideActiveClass, s.slideNextClass, s.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")), i.emit("destroy"), Object.keys(i.eventsListeners).forEach(function (t) {
                    i.off(t)
                }), !1 !== t && (i.$el[0].swiper = null, i.$el.data("swiper", null), d.deleteProps(i)), i.destroyed = !0, null)
            }, i.extendDefaults = function (t) {
                d.extend(F, t)
            }, s.extendedDefaults.get = function () {
                return F
            }, s.defaults.get = function () {
                return V
            }, s.Class.get = function () {
                return e
            }, s.$.get = function () {
                return t
            }, Object.defineProperties(i, s), i
        }(p), X = {name: "device", proto: {device: B}, static: {device: B}},
        j = {name: "support", proto: {support: u}, static: {support: u}}, W = {
            isEdge: !!l.navigator.userAgent.match(/Edge/g), isSafari: function () {
                var t = l.navigator.userAgent.toLowerCase();
                return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0
            }(), isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(l.navigator.userAgent)
        }, N = {name: "browser", proto: {browser: W}, static: {browser: W}}, _ = {
            name: "resize", create: function () {
                var t = this;
                d.extend(t, {
                    resize: {
                        resizeHandler: function () {
                            t && !t.destroyed && t.initialized && (t.emit("beforeResize"), t.emit("resize"))
                        }, orientationChangeHandler: function () {
                            t && !t.destroyed && t.initialized && t.emit("orientationchange")
                        }
                    }
                })
            }, on: {
                init: function () {
                    l.addEventListener("resize", this.resize.resizeHandler), l.addEventListener("orientationchange", this.resize.orientationChangeHandler)
                }, destroy: function () {
                    l.removeEventListener("resize", this.resize.resizeHandler), l.removeEventListener("orientationchange", this.resize.orientationChangeHandler)
                }
            }
        }, G = {
            func: l.MutationObserver || l.WebkitMutationObserver, attach: function (t, e) {
                void 0 === e && (e = {});
                var i = this, s = new (0, G.func)(function (t) {
                    if (1 !== t.length) {
                        var e = function () {
                            i.emit("observerUpdate", t[0])
                        };
                        l.requestAnimationFrame ? l.requestAnimationFrame(e) : l.setTimeout(e, 0)
                    } else i.emit("observerUpdate", t[0])
                });
                s.observe(t, {
                    attributes: void 0 === e.attributes || e.attributes,
                    childList: void 0 === e.childList || e.childList,
                    characterData: void 0 === e.characterData || e.characterData
                }), i.observer.observers.push(s)
            }, init: function () {
                if (u.observer && this.params.observer) {
                    if (this.params.observeParents) for (var t = this.$el.parents(), e = 0; e < t.length; e += 1) this.observer.attach(t[e]);
                    this.observer.attach(this.$el[0], {childList: this.params.observeSlideChildren}), this.observer.attach(this.$wrapperEl[0], {attributes: !1})
                }
            }, destroy: function () {
                this.observer.observers.forEach(function (t) {
                    t.disconnect()
                }), this.observer.observers = []
            }
        }, q = {
            name: "observer",
            params: {observer: !1, observeParents: !1, observeSlideChildren: !1},
            create: function () {
                d.extend(this, {
                    observer: {
                        init: G.init.bind(this),
                        attach: G.attach.bind(this),
                        destroy: G.destroy.bind(this),
                        observers: []
                    }
                })
            },
            on: {
                init: function () {
                    this.observer.init()
                }, destroy: function () {
                    this.observer.destroy()
                }
            }
        }, U = {
            update: function (t) {
                function e() {
                    i.updateSlides(), i.updateProgress(), i.updateSlidesClasses(), i.lazy && i.params.lazy.enabled && i.lazy.load()
                }

                var i = this, s = i.params, n = s.slidesPerView, a = s.slidesPerGroup, o = s.centeredSlides,
                    r = i.params.virtual, l = r.addSlidesBefore, c = r.addSlidesAfter, h = i.virtual, u = h.from, p = h.to,
                    f = h.slides, v = h.slidesGrid, m = h.renderSlide, g = h.offset;
                i.updateActiveIndex();
                var b, y, w, x = i.activeIndex || 0;
                b = i.rtlTranslate ? "right" : i.isHorizontal() ? "left" : "top", o ? (y = Math.floor(n / 2) + a + l, w = Math.floor(n / 2) + a + c) : (y = n + (a - 1) + l, w = a + c);
                var S = Math.max((x || 0) - w, 0), T = Math.min((x || 0) + y, f.length - 1),
                    E = (i.slidesGrid[S] || 0) - (i.slidesGrid[0] || 0);
                if (d.extend(i.virtual, {
                    from: S,
                    to: T,
                    offset: E,
                    slidesGrid: i.slidesGrid
                }), u === S && p === T && !t) return i.slidesGrid !== v && E !== g && i.slides.css(b, E + "px"), void i.updateProgress();
                if (i.params.virtual.renderExternal) return i.params.virtual.renderExternal.call(i, {
                    offset: E,
                    from: S,
                    to: T,
                    slides: function () {
                        for (var t = [], e = S; e <= T; e += 1) t.push(f[e]);
                        return t
                    }()
                }), void e();
                var C = [], M = [];
                if (t) i.$wrapperEl.find("." + i.params.slideClass).remove(); else for (var k = u; k <= p; k += 1) (k < S || k > T) && i.$wrapperEl.find("." + i.params.slideClass + '[data-swiper-slide-index="' + k + '"]').remove();
                for (var P = 0; P < f.length; P += 1) P >= S && P <= T && (void 0 === p || t ? M.push(P) : (P > p && M.push(P), P < u && C.push(P)));
                M.forEach(function (t) {
                    i.$wrapperEl.append(m(f[t], t))
                }), C.sort(function (t, e) {
                    return e - t
                }).forEach(function (t) {
                    i.$wrapperEl.prepend(m(f[t], t))
                }), i.$wrapperEl.children(".swiper-slide").css(b, E + "px"), e()
            }, renderSlide: function (e, i) {
                var s = this.params.virtual;
                if (s.cache && this.virtual.cache[i]) return this.virtual.cache[i];
                var n = t(s.renderSlide ? s.renderSlide.call(this, e, i) : '<div class="' + this.params.slideClass + '" data-swiper-slide-index="' + i + '">' + e + "</div>");
                return n.attr("data-swiper-slide-index") || n.attr("data-swiper-slide-index", i), s.cache && (this.virtual.cache[i] = n), n
            }, appendSlide: function (t) {
                if ("object" == typeof t && "length" in t) for (var e = 0; e < t.length; e += 1) t[e] && this.virtual.slides.push(t[e]); else this.virtual.slides.push(t);
                this.virtual.update(!0)
            }, prependSlide: function (t) {
                var e = this.activeIndex, i = e + 1, s = 1;
                if (Array.isArray(t)) {
                    for (var n = 0; n < t.length; n += 1) t[n] && this.virtual.slides.unshift(t[n]);
                    i = e + t.length, s = t.length
                } else this.virtual.slides.unshift(t);
                if (this.params.virtual.cache) {
                    var a = this.virtual.cache, o = {};
                    Object.keys(a).forEach(function (t) {
                        var e = a[t], i = e.attr("data-swiper-slide-index");
                        i && e.attr("data-swiper-slide-index", parseInt(i, 10) + 1), o[parseInt(t, 10) + s] = e
                    }), this.virtual.cache = o
                }
                this.virtual.update(!0), this.slideTo(i, 0)
            }, removeSlide: function (t) {
                if (null != t) {
                    var e = this.activeIndex;
                    if (Array.isArray(t)) for (var i = t.length - 1; i >= 0; i -= 1) this.virtual.slides.splice(t[i], 1), this.params.virtual.cache && delete this.virtual.cache[t[i]], t[i] < e && (e -= 1), e = Math.max(e, 0); else this.virtual.slides.splice(t, 1), this.params.virtual.cache && delete this.virtual.cache[t], t < e && (e -= 1), e = Math.max(e, 0);
                    this.virtual.update(!0), this.slideTo(e, 0)
                }
            }, removeAllSlides: function () {
                this.virtual.slides = [], this.params.virtual.cache && (this.virtual.cache = {}), this.virtual.update(!0), this.slideTo(0, 0)
            }
        }, K = {
            name: "virtual",
            params: {
                virtual: {
                    enabled: !1,
                    slides: [],
                    cache: !0,
                    renderSlide: null,
                    renderExternal: null,
                    addSlidesBefore: 0,
                    addSlidesAfter: 0
                }
            },
            create: function () {
                d.extend(this, {
                    virtual: {
                        update: U.update.bind(this),
                        appendSlide: U.appendSlide.bind(this),
                        prependSlide: U.prependSlide.bind(this),
                        removeSlide: U.removeSlide.bind(this),
                        removeAllSlides: U.removeAllSlides.bind(this),
                        renderSlide: U.renderSlide.bind(this),
                        slides: this.params.virtual.slides,
                        cache: {}
                    }
                })
            },
            on: {
                beforeInit: function () {
                    if (this.params.virtual.enabled) {
                        this.classNames.push(this.params.containerModifierClass + "virtual");
                        var t = {watchSlidesProgress: !0};
                        d.extend(this.params, t), d.extend(this.originalParams, t), this.params.initialSlide || this.virtual.update()
                    }
                }, setTranslate: function () {
                    this.params.virtual.enabled && this.virtual.update()
                }
            }
        }, Z = {
            handle: function (t) {
                var e = this.rtlTranslate, i = t;
                i.originalEvent && (i = i.originalEvent);
                var s = i.keyCode || i.charCode;
                if (!this.allowSlideNext && (this.isHorizontal() && 39 === s || this.isVertical() && 40 === s || 34 === s)) return !1;
                if (!this.allowSlidePrev && (this.isHorizontal() && 37 === s || this.isVertical() && 38 === s || 33 === s)) return !1;
                if (!(i.shiftKey || i.altKey || i.ctrlKey || i.metaKey || r.activeElement && r.activeElement.nodeName && ("input" === r.activeElement.nodeName.toLowerCase() || "textarea" === r.activeElement.nodeName.toLowerCase()))) {
                    if (this.params.keyboard.onlyInViewport && (33 === s || 34 === s || 37 === s || 39 === s || 38 === s || 40 === s)) {
                        var n = !1;
                        if (this.$el.parents("." + this.params.slideClass).length > 0 && 0 === this.$el.parents("." + this.params.slideActiveClass).length) return;
                        var a = l.innerWidth, o = l.innerHeight, c = this.$el.offset();
                        e && (c.left -= this.$el[0].scrollLeft);
                        for (var h = [[c.left, c.top], [c.left + this.width, c.top], [c.left, c.top + this.height], [c.left + this.width, c.top + this.height]], d = 0; d < h.length; d += 1) {
                            var u = h[d];
                            u[0] >= 0 && u[0] <= a && u[1] >= 0 && u[1] <= o && (n = !0)
                        }
                        if (!n) return
                    }
                    this.isHorizontal() ? (33 !== s && 34 !== s && 37 !== s && 39 !== s || (i.preventDefault ? i.preventDefault() : i.returnValue = !1), (34 !== s && 39 !== s || e) && (33 !== s && 37 !== s || !e) || this.slideNext(), (33 !== s && 37 !== s || e) && (34 !== s && 39 !== s || !e) || this.slidePrev()) : (33 !== s && 34 !== s && 38 !== s && 40 !== s || (i.preventDefault ? i.preventDefault() : i.returnValue = !1), 34 !== s && 40 !== s || this.slideNext(), 33 !== s && 38 !== s || this.slidePrev()), this.emit("keyPress", s)
                }
            }, enable: function () {
                this.keyboard.enabled || (t(r).on("keydown", this.keyboard.handle), this.keyboard.enabled = !0)
            }, disable: function () {
                this.keyboard.enabled && (t(r).off("keydown", this.keyboard.handle), this.keyboard.enabled = !1)
            }
        }, Q = {
            name: "keyboard", params: {keyboard: {enabled: !1, onlyInViewport: !0}}, create: function () {
                d.extend(this, {
                    keyboard: {
                        enabled: !1,
                        enable: Z.enable.bind(this),
                        disable: Z.disable.bind(this),
                        handle: Z.handle.bind(this)
                    }
                })
            }, on: {
                init: function () {
                    this.params.keyboard.enabled && this.keyboard.enable()
                }, destroy: function () {
                    this.keyboard.enabled && this.keyboard.disable()
                }
            }
        }, J = {
            lastScrollTime: d.now(), lastEventBeforeSnap: void 0, recentWheelEvents: [], event: function () {
                return l.navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : function () {
                    var t = "onwheel" in r;
                    if (!t) {
                        var e = r.createElement("div");
                        e.setAttribute("onwheel", "return;"), t = "function" == typeof e.onwheel
                    }
                    return !t && r.implementation && r.implementation.hasFeature && !0 !== r.implementation.hasFeature("", "") && (t = r.implementation.hasFeature("Events.wheel", "3.0")), t
                }() ? "wheel" : "mousewheel"
            }, normalize: function (t) {
                var e = 0, i = 0, s = 0, n = 0;
                return "detail" in t && (i = t.detail), "wheelDelta" in t && (i = -t.wheelDelta / 120), "wheelDeltaY" in t && (i = -t.wheelDeltaY / 120), "wheelDeltaX" in t && (e = -t.wheelDeltaX / 120), "axis" in t && t.axis === t.HORIZONTAL_AXIS && (e = i, i = 0), s = 10 * e, n = 10 * i, "deltaY" in t && (n = t.deltaY), "deltaX" in t && (s = t.deltaX), t.shiftKey && !s && (s = n, n = 0), (s || n) && t.deltaMode && (1 === t.deltaMode ? (s *= 40, n *= 40) : (s *= 800, n *= 800)), s && !e && (e = s < 1 ? -1 : 1), n && !i && (i = n < 1 ? -1 : 1), {
                    spinX: e,
                    spinY: i,
                    pixelX: s,
                    pixelY: n
                }
            }, handleMouseEnter: function () {
                this.mouseEntered = !0
            }, handleMouseLeave: function () {
                this.mouseEntered = !1
            }, handle: function (e) {
                var i = e, s = this, n = s.params.mousewheel;
                s.params.cssMode && i.preventDefault();
                var a = s.$el;
                if ("container" !== s.params.mousewheel.eventsTarged && (a = t(s.params.mousewheel.eventsTarged)), !s.mouseEntered && !a[0].contains(i.target) && !n.releaseOnEdges) return !0;
                i.originalEvent && (i = i.originalEvent);
                var o = 0, r = s.rtlTranslate ? -1 : 1, l = J.normalize(i);
                if (n.forceToAxis) if (s.isHorizontal()) {
                    if (!(Math.abs(l.pixelX) > Math.abs(l.pixelY))) return !0;
                    o = l.pixelX * r
                } else {
                    if (!(Math.abs(l.pixelY) > Math.abs(l.pixelX))) return !0;
                    o = l.pixelY
                } else o = Math.abs(l.pixelX) > Math.abs(l.pixelY) ? -l.pixelX * r : -l.pixelY;
                if (0 === o) return !0;
                if (n.invert && (o = -o), s.params.freeMode) {
                    var c = {time: d.now(), delta: Math.abs(o), direction: Math.sign(o)},
                        h = s.mousewheel.lastEventBeforeSnap,
                        u = h && c.time < h.time + 500 && c.delta <= h.delta && c.direction === h.direction;
                    if (!u) {
                        s.mousewheel.lastEventBeforeSnap = void 0, s.params.loop && s.loopFix();
                        var p = s.getTranslate() + o * n.sensitivity, f = s.isBeginning, v = s.isEnd;
                        if (p >= s.minTranslate() && (p = s.minTranslate()), p <= s.maxTranslate() && (p = s.maxTranslate()), s.setTransition(0), s.setTranslate(p), s.updateProgress(), s.updateActiveIndex(), s.updateSlidesClasses(), (!f && s.isBeginning || !v && s.isEnd) && s.updateSlidesClasses(), s.params.freeModeSticky) {
                            clearTimeout(s.mousewheel.timeout), s.mousewheel.timeout = void 0;
                            var m = s.mousewheel.recentWheelEvents;
                            m.length >= 15 && m.shift();
                            var g = m.length ? m[m.length - 1] : void 0, b = m[0];
                            if (m.push(c), g && (c.delta > g.delta || c.direction !== g.direction)) m.splice(0); else if (m.length >= 15 && c.time - b.time < 500 && b.delta - c.delta >= 1 && c.delta <= 6) {
                                var y = o > 0 ? .8 : .2;
                                s.mousewheel.lastEventBeforeSnap = c, m.splice(0), s.mousewheel.timeout = d.nextTick(function () {
                                    s.slideToClosest(s.params.speed, !0, void 0, y)
                                }, 0)
                            }
                            s.mousewheel.timeout || (s.mousewheel.timeout = d.nextTick(function () {
                                s.mousewheel.lastEventBeforeSnap = c, m.splice(0), s.slideToClosest(s.params.speed, !0, void 0, .5)
                            }, 500))
                        }
                        if (u || s.emit("scroll", i), s.params.autoplay && s.params.autoplayDisableOnInteraction && s.autoplay.stop(), p === s.minTranslate() || p === s.maxTranslate()) return !0
                    }
                } else {
                    var w = {time: d.now(), delta: Math.abs(o), direction: Math.sign(o), raw: e},
                        x = s.mousewheel.recentWheelEvents;
                    x.length >= 2 && x.shift();
                    var S = x.length ? x[x.length - 1] : void 0;
                    if (x.push(w), S ? (w.direction !== S.direction || w.delta > S.delta) && s.mousewheel.animateSlider(w) : s.mousewheel.animateSlider(w), s.mousewheel.releaseScroll(w)) return !0
                }
                return i.preventDefault ? i.preventDefault() : i.returnValue = !1, !1
            }, animateSlider: function (t) {
                return t.delta >= 6 && d.now() - this.mousewheel.lastScrollTime < 60 || (t.direction < 0 ? this.isEnd && !this.params.loop || this.animating || (this.slideNext(), this.emit("scroll", t.raw)) : this.isBeginning && !this.params.loop || this.animating || (this.slidePrev(), this.emit("scroll", t.raw)), this.mousewheel.lastScrollTime = (new l.Date).getTime(), !1)
            }, releaseScroll: function (t) {
                var e = this.params.mousewheel;
                if (t.direction < 0) {
                    if (this.isEnd && !this.params.loop && e.releaseOnEdges) return !0
                } else if (this.isBeginning && !this.params.loop && e.releaseOnEdges) return !0;
                return !1
            }, enable: function () {
                var e = J.event();
                if (this.params.cssMode) return this.wrapperEl.removeEventListener(e, this.mousewheel.handle), !0;
                if (!e) return !1;
                if (this.mousewheel.enabled) return !1;
                var i = this.$el;
                return "container" !== this.params.mousewheel.eventsTarged && (i = t(this.params.mousewheel.eventsTarged)), i.on("mouseenter", this.mousewheel.handleMouseEnter), i.on("mouseleave", this.mousewheel.handleMouseLeave), i.on(e, this.mousewheel.handle), this.mousewheel.enabled = !0, !0
            }, disable: function () {
                var e = J.event();
                if (this.params.cssMode) return this.wrapperEl.addEventListener(e, this.mousewheel.handle), !0;
                if (!e) return !1;
                if (!this.mousewheel.enabled) return !1;
                var i = this.$el;
                return "container" !== this.params.mousewheel.eventsTarged && (i = t(this.params.mousewheel.eventsTarged)), i.off(e, this.mousewheel.handle), this.mousewheel.enabled = !1, !0
            }
        }, tt = {
            update: function () {
                var t = this.params.navigation;
                if (!this.params.loop) {
                    var e = this.navigation, i = e.$nextEl, s = e.$prevEl;
                    s && s.length > 0 && (this.isBeginning ? s.addClass(t.disabledClass) : s.removeClass(t.disabledClass), s[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](t.lockClass)), i && i.length > 0 && (this.isEnd ? i.addClass(t.disabledClass) : i.removeClass(t.disabledClass), i[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](t.lockClass))
                }
            }, onPrevClick: function (t) {
                t.preventDefault(), this.isBeginning && !this.params.loop || this.slidePrev()
            }, onNextClick: function (t) {
                t.preventDefault(), this.isEnd && !this.params.loop || this.slideNext()
            }, init: function () {
                var e, i, s = this.params.navigation;
                (s.nextEl || s.prevEl) && (s.nextEl && (e = t(s.nextEl), this.params.uniqueNavElements && "string" == typeof s.nextEl && e.length > 1 && 1 === this.$el.find(s.nextEl).length && (e = this.$el.find(s.nextEl))), s.prevEl && (i = t(s.prevEl), this.params.uniqueNavElements && "string" == typeof s.prevEl && i.length > 1 && 1 === this.$el.find(s.prevEl).length && (i = this.$el.find(s.prevEl))), e && e.length > 0 && e.on("click", this.navigation.onNextClick), i && i.length > 0 && i.on("click", this.navigation.onPrevClick), d.extend(this.navigation, {
                    $nextEl: e,
                    nextEl: e && e[0],
                    $prevEl: i,
                    prevEl: i && i[0]
                }))
            }, destroy: function () {
                var t = this.navigation, e = t.$nextEl, i = t.$prevEl;
                e && e.length && (e.off("click", this.navigation.onNextClick), e.removeClass(this.params.navigation.disabledClass)), i && i.length && (i.off("click", this.navigation.onPrevClick), i.removeClass(this.params.navigation.disabledClass))
            }
        }, et = {
            update: function () {
                var e = this.rtl, i = this.params.pagination;
                if (i.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
                    var s,
                        n = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length,
                        a = this.pagination.$el,
                        o = this.params.loop ? Math.ceil((n - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length;
                    if (this.params.loop ? ((s = Math.ceil((this.activeIndex - this.loopedSlides) / this.params.slidesPerGroup)) > n - 1 - 2 * this.loopedSlides && (s -= n - 2 * this.loopedSlides), s > o - 1 && (s -= o), s < 0 && "bullets" !== this.params.paginationType && (s = o + s)) : s = void 0 !== this.snapIndex ? this.snapIndex : this.activeIndex || 0, "bullets" === i.type && this.pagination.bullets && this.pagination.bullets.length > 0) {
                        var r, l, c, h = this.pagination.bullets;
                        if (i.dynamicBullets && (this.pagination.bulletSize = h.eq(0)[this.isHorizontal() ? "outerWidth" : "outerHeight"](!0), a.css(this.isHorizontal() ? "width" : "height", this.pagination.bulletSize * (i.dynamicMainBullets + 4) + "px"), i.dynamicMainBullets > 1 && void 0 !== this.previousIndex && (this.pagination.dynamicBulletIndex += s - this.previousIndex, this.pagination.dynamicBulletIndex > i.dynamicMainBullets - 1 ? this.pagination.dynamicBulletIndex = i.dynamicMainBullets - 1 : this.pagination.dynamicBulletIndex < 0 && (this.pagination.dynamicBulletIndex = 0)), r = s - this.pagination.dynamicBulletIndex, c = ((l = r + (Math.min(h.length, i.dynamicMainBullets) - 1)) + r) / 2), h.removeClass(i.bulletActiveClass + " " + i.bulletActiveClass + "-next " + i.bulletActiveClass + "-next-next " + i.bulletActiveClass + "-prev " + i.bulletActiveClass + "-prev-prev " + i.bulletActiveClass + "-main"), a.length > 1) h.each(function (e, n) {
                            var a = t(n), o = a.index();
                            o === s && a.addClass(i.bulletActiveClass), i.dynamicBullets && (o >= r && o <= l && a.addClass(i.bulletActiveClass + "-main"), o === r && a.prev().addClass(i.bulletActiveClass + "-prev").prev().addClass(i.bulletActiveClass + "-prev-prev"), o === l && a.next().addClass(i.bulletActiveClass + "-next").next().addClass(i.bulletActiveClass + "-next-next"))
                        }); else {
                            var d = h.eq(s), u = d.index();
                            if (d.addClass(i.bulletActiveClass), i.dynamicBullets) {
                                for (var p = h.eq(r), f = h.eq(l), v = r; v <= l; v += 1) h.eq(v).addClass(i.bulletActiveClass + "-main");
                                if (this.params.loop) if (u >= h.length - i.dynamicMainBullets) {
                                    for (var m = i.dynamicMainBullets; m >= 0; m -= 1) h.eq(h.length - m).addClass(i.bulletActiveClass + "-main");
                                    h.eq(h.length - i.dynamicMainBullets - 1).addClass(i.bulletActiveClass + "-prev")
                                } else p.prev().addClass(i.bulletActiveClass + "-prev").prev().addClass(i.bulletActiveClass + "-prev-prev"), f.next().addClass(i.bulletActiveClass + "-next").next().addClass(i.bulletActiveClass + "-next-next"); else p.prev().addClass(i.bulletActiveClass + "-prev").prev().addClass(i.bulletActiveClass + "-prev-prev"), f.next().addClass(i.bulletActiveClass + "-next").next().addClass(i.bulletActiveClass + "-next-next")
                            }
                        }
                        if (i.dynamicBullets) {
                            var g = Math.min(h.length, i.dynamicMainBullets + 4),
                                b = (this.pagination.bulletSize * g - this.pagination.bulletSize) / 2 - c * this.pagination.bulletSize,
                                y = e ? "right" : "left";
                            h.css(this.isHorizontal() ? y : "top", b + "px")
                        }
                    }
                    if ("fraction" === i.type && (a.find("." + i.currentClass).text(i.formatFractionCurrent(s + 1)), a.find("." + i.totalClass).text(i.formatFractionTotal(o))), "progressbar" === i.type) {
                        var w;
                        w = i.progressbarOpposite ? this.isHorizontal() ? "vertical" : "horizontal" : this.isHorizontal() ? "horizontal" : "vertical";
                        var x = (s + 1) / o, S = 1, T = 1;
                        "horizontal" === w ? S = x : T = x, a.find("." + i.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + S + ") scaleY(" + T + ")").transition(this.params.speed)
                    }
                    "custom" === i.type && i.renderCustom ? (a.html(i.renderCustom(this, s + 1, o)), this.emit("paginationRender", this, a[0])) : this.emit("paginationUpdate", this, a[0]), a[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](i.lockClass)
                }
            }, render: function () {
                var t = this.params.pagination;
                if (t.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
                    var e = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length,
                        i = this.pagination.$el, s = "";
                    if ("bullets" === t.type) {
                        for (var n = this.params.loop ? Math.ceil((e - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length, a = 0; a < n; a += 1) t.renderBullet ? s += t.renderBullet.call(this, a, t.bulletClass) : s += "<" + t.bulletElement + ' class="' + t.bulletClass + '"></' + t.bulletElement + ">";
                        i.html(s), this.pagination.bullets = i.find("." + t.bulletClass)
                    }
                    "fraction" === t.type && (s = t.renderFraction ? t.renderFraction.call(this, t.currentClass, t.totalClass) : '<span class="' + t.currentClass + '"></span> / <span class="' + t.totalClass + '"></span>', i.html(s)), "progressbar" === t.type && (s = t.renderProgressbar ? t.renderProgressbar.call(this, t.progressbarFillClass) : '<span class="' + t.progressbarFillClass + '"></span>', i.html(s)), "custom" !== t.type && this.emit("paginationRender", this.pagination.$el[0])
                }
            }, init: function () {
                var e = this, i = e.params.pagination;
                if (i.el) {
                    var s = t(i.el);
                    0 !== s.length && (e.params.uniqueNavElements && "string" == typeof i.el && s.length > 1 && 1 === e.$el.find(i.el).length && (s = e.$el.find(i.el)), "bullets" === i.type && i.clickable && s.addClass(i.clickableClass), s.addClass(i.modifierClass + i.type), "bullets" === i.type && i.dynamicBullets && (s.addClass("" + i.modifierClass + i.type + "-dynamic"), e.pagination.dynamicBulletIndex = 0, i.dynamicMainBullets < 1 && (i.dynamicMainBullets = 1)), "progressbar" === i.type && i.progressbarOpposite && s.addClass(i.progressbarOppositeClass), i.clickable && s.on("click", "." + i.bulletClass, function (i) {
                        i.preventDefault();
                        var s = t(this).index() * e.params.slidesPerGroup;
                        e.params.loop && (s += e.loopedSlides), e.slideTo(s)
                    }), d.extend(e.pagination, {$el: s, el: s[0]}))
                }
            }, destroy: function () {
                var t = this.params.pagination;
                if (t.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
                    var e = this.pagination.$el;
                    e.removeClass(t.hiddenClass), e.removeClass(t.modifierClass + t.type), this.pagination.bullets && this.pagination.bullets.removeClass(t.bulletActiveClass), t.clickable && e.off("click", "." + t.bulletClass)
                }
            }
        }, it = {
            setTranslate: function () {
                if (this.params.scrollbar.el && this.scrollbar.el) {
                    var t = this.scrollbar, e = this.rtlTranslate, i = this.progress, s = t.dragSize, n = t.trackSize,
                        a = t.$dragEl, o = t.$el, r = this.params.scrollbar, l = s, c = (n - s) * i;
                    e ? (c = -c) > 0 ? (l = s - c, c = 0) : -c + s > n && (l = n + c) : c < 0 ? (l = s + c, c = 0) : c + s > n && (l = n - c), this.isHorizontal() ? (a.transform("translate3d(" + c + "px, 0, 0)"), a[0].style.width = l + "px") : (a.transform("translate3d(0px, " + c + "px, 0)"), a[0].style.height = l + "px"), r.hide && (clearTimeout(this.scrollbar.timeout), o[0].style.opacity = 1, this.scrollbar.timeout = setTimeout(function () {
                        o[0].style.opacity = 0, o.transition(400)
                    }, 1e3))
                }
            }, setTransition: function (t) {
                this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(t)
            }, updateSize: function () {
                if (this.params.scrollbar.el && this.scrollbar.el) {
                    var t = this.scrollbar, e = t.$dragEl, i = t.$el;
                    e[0].style.width = "", e[0].style.height = "";
                    var s, n = this.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight, a = this.size / this.virtualSize,
                        o = a * (n / this.size);
                    s = "auto" === this.params.scrollbar.dragSize ? n * a : parseInt(this.params.scrollbar.dragSize, 10), this.isHorizontal() ? e[0].style.width = s + "px" : e[0].style.height = s + "px", i[0].style.display = a >= 1 ? "none" : "", this.params.scrollbar.hide && (i[0].style.opacity = 0), d.extend(t, {
                        trackSize: n,
                        divider: a,
                        moveDivider: o,
                        dragSize: s
                    }), t.$el[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](this.params.scrollbar.lockClass)
                }
            }, getPointerPosition: function (t) {
                return this.isHorizontal() ? "touchstart" === t.type || "touchmove" === t.type ? t.targetTouches[0].clientX : t.clientX : "touchstart" === t.type || "touchmove" === t.type ? t.targetTouches[0].clientY : t.clientY
            }, setDragPosition: function (t) {
                var e, i = this.scrollbar, s = this.rtlTranslate, n = i.$el, a = i.dragSize, o = i.trackSize,
                    r = i.dragStartPos;
                e = (i.getPointerPosition(t) - n.offset()[this.isHorizontal() ? "left" : "top"] - (null !== r ? r : a / 2)) / (o - a), e = Math.max(Math.min(e, 1), 0), s && (e = 1 - e);
                var l = this.minTranslate() + (this.maxTranslate() - this.minTranslate()) * e;
                this.updateProgress(l), this.setTranslate(l), this.updateActiveIndex(), this.updateSlidesClasses()
            }, onDragStart: function (t) {
                var e = this.params.scrollbar, i = this.scrollbar, s = this.$wrapperEl, n = i.$el, a = i.$dragEl;
                this.scrollbar.isTouched = !0, this.scrollbar.dragStartPos = t.target === a[0] || t.target === a ? i.getPointerPosition(t) - t.target.getBoundingClientRect()[this.isHorizontal() ? "left" : "top"] : null, t.preventDefault(), t.stopPropagation(), s.transition(100), a.transition(100), i.setDragPosition(t), clearTimeout(this.scrollbar.dragTimeout), n.transition(0), e.hide && n.css("opacity", 1), this.params.cssMode && this.$wrapperEl.css("scroll-snap-type", "none"), this.emit("scrollbarDragStart", t)
            }, onDragMove: function (t) {
                var e = this.scrollbar, i = this.$wrapperEl, s = e.$el, n = e.$dragEl;
                this.scrollbar.isTouched && (t.preventDefault ? t.preventDefault() : t.returnValue = !1, e.setDragPosition(t), i.transition(0), s.transition(0), n.transition(0), this.emit("scrollbarDragMove", t))
            }, onDragEnd: function (t) {
                var e = this.params.scrollbar, i = this.scrollbar, s = this.$wrapperEl, n = i.$el;
                this.scrollbar.isTouched && (this.scrollbar.isTouched = !1, this.params.cssMode && (this.$wrapperEl.css("scroll-snap-type", ""), s.transition("")), e.hide && (clearTimeout(this.scrollbar.dragTimeout), this.scrollbar.dragTimeout = d.nextTick(function () {
                    n.css("opacity", 0), n.transition(400)
                }, 1e3)), this.emit("scrollbarDragEnd", t), e.snapOnRelease && this.slideToClosest())
            }, enableDraggable: function () {
                if (this.params.scrollbar.el) {
                    var t = this.scrollbar, e = this.touchEventsTouch, i = this.touchEventsDesktop, s = this.params,
                        n = t.$el[0], a = !(!u.passiveListener || !s.passiveListeners) && {passive: !1, capture: !1},
                        o = !(!u.passiveListener || !s.passiveListeners) && {passive: !0, capture: !1};
                    u.touch ? (n.addEventListener(e.start, this.scrollbar.onDragStart, a), n.addEventListener(e.move, this.scrollbar.onDragMove, a), n.addEventListener(e.end, this.scrollbar.onDragEnd, o)) : (n.addEventListener(i.start, this.scrollbar.onDragStart, a), r.addEventListener(i.move, this.scrollbar.onDragMove, a), r.addEventListener(i.end, this.scrollbar.onDragEnd, o))
                }
            }, disableDraggable: function () {
                if (this.params.scrollbar.el) {
                    var t = this.scrollbar, e = this.touchEventsTouch, i = this.touchEventsDesktop, s = this.params,
                        n = t.$el[0], a = !(!u.passiveListener || !s.passiveListeners) && {passive: !1, capture: !1},
                        o = !(!u.passiveListener || !s.passiveListeners) && {passive: !0, capture: !1};
                    u.touch ? (n.removeEventListener(e.start, this.scrollbar.onDragStart, a), n.removeEventListener(e.move, this.scrollbar.onDragMove, a), n.removeEventListener(e.end, this.scrollbar.onDragEnd, o)) : (n.removeEventListener(i.start, this.scrollbar.onDragStart, a), r.removeEventListener(i.move, this.scrollbar.onDragMove, a), r.removeEventListener(i.end, this.scrollbar.onDragEnd, o))
                }
            }, init: function () {
                if (this.params.scrollbar.el) {
                    var e = this.scrollbar, i = this.$el, s = this.params.scrollbar, n = t(s.el);
                    this.params.uniqueNavElements && "string" == typeof s.el && n.length > 1 && 1 === i.find(s.el).length && (n = i.find(s.el));
                    var a = n.find("." + this.params.scrollbar.dragClass);
                    0 === a.length && (a = t('<div class="' + this.params.scrollbar.dragClass + '"></div>'), n.append(a)), d.extend(e, {
                        $el: n,
                        el: n[0],
                        $dragEl: a,
                        dragEl: a[0]
                    }), s.draggable && e.enableDraggable()
                }
            }, destroy: function () {
                this.scrollbar.disableDraggable()
            }
        }, st = {
            setTransform: function (e, i) {
                var s = this.rtl, n = t(e), a = s ? -1 : 1, o = n.attr("data-swiper-parallax") || "0",
                    r = n.attr("data-swiper-parallax-x"), l = n.attr("data-swiper-parallax-y"),
                    c = n.attr("data-swiper-parallax-scale"), h = n.attr("data-swiper-parallax-opacity");
                if (r || l ? (r = r || "0", l = l || "0") : this.isHorizontal() ? (r = o, l = "0") : (l = o, r = "0"), r = r.indexOf("%") >= 0 ? parseInt(r, 10) * i * a + "%" : r * i * a + "px", l = l.indexOf("%") >= 0 ? parseInt(l, 10) * i + "%" : l * i + "px", null != h) {
                    var d = h - (h - 1) * (1 - Math.abs(i));
                    n[0].style.opacity = d
                }
                if (null == c) n.transform("translate3d(" + r + ", " + l + ", 0px)"); else {
                    var u = c - (c - 1) * (1 - Math.abs(i));
                    n.transform("translate3d(" + r + ", " + l + ", 0px) scale(" + u + ")")
                }
            }, setTranslate: function () {
                var e = this, i = e.$el, s = e.slides, n = e.progress, a = e.snapGrid;
                i.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(function (t, i) {
                    e.parallax.setTransform(i, n)
                }), s.each(function (i, s) {
                    var o = s.progress;
                    e.params.slidesPerGroup > 1 && "auto" !== e.params.slidesPerView && (o += Math.ceil(i / 2) - n * (a.length - 1)), o = Math.min(Math.max(o, -1), 1), t(s).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(function (t, i) {
                        e.parallax.setTransform(i, o)
                    })
                })
            }, setTransition: function (e) {
                void 0 === e && (e = this.params.speed), this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(function (i, s) {
                    var n = t(s), a = parseInt(n.attr("data-swiper-parallax-duration"), 10) || e;
                    0 === e && (a = 0), n.transition(a)
                })
            }
        }, nt = {
            getDistanceBetweenTouches: function (t) {
                if (t.targetTouches.length < 2) return 1;
                var e = t.targetTouches[0].pageX, i = t.targetTouches[0].pageY, s = t.targetTouches[1].pageX,
                    n = t.targetTouches[1].pageY;
                return Math.sqrt(Math.pow(s - e, 2) + Math.pow(n - i, 2))
            }, onGestureStart: function (e) {
                var i = this.params.zoom, s = this.zoom, n = s.gesture;
                if (s.fakeGestureTouched = !1, s.fakeGestureMoved = !1, !u.gestures) {
                    if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
                    s.fakeGestureTouched = !0, n.scaleStart = nt.getDistanceBetweenTouches(e)
                }
                n.$slideEl && n.$slideEl.length || (n.$slideEl = t(e.target).closest(".swiper-slide"), 0 === n.$slideEl.length && (n.$slideEl = this.slides.eq(this.activeIndex)), n.$imageEl = n.$slideEl.find("img, svg, canvas"), n.$imageWrapEl = n.$imageEl.parent("." + i.containerClass), n.maxRatio = n.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio, 0 !== n.$imageWrapEl.length) ? (n.$imageEl.transition(0), this.zoom.isScaling = !0) : n.$imageEl = void 0
            }, onGestureChange: function (t) {
                var e = this.params.zoom, i = this.zoom, s = i.gesture;
                if (!u.gestures) {
                    if ("touchmove" !== t.type || "touchmove" === t.type && t.targetTouches.length < 2) return;
                    i.fakeGestureMoved = !0, s.scaleMove = nt.getDistanceBetweenTouches(t)
                }
                s.$imageEl && 0 !== s.$imageEl.length && (u.gestures ? i.scale = t.scale * i.currentScale : i.scale = s.scaleMove / s.scaleStart * i.currentScale, i.scale > s.maxRatio && (i.scale = s.maxRatio - 1 + Math.pow(i.scale - s.maxRatio + 1, .5)), i.scale < e.minRatio && (i.scale = e.minRatio + 1 - Math.pow(e.minRatio - i.scale + 1, .5)), s.$imageEl.transform("translate3d(0,0,0) scale(" + i.scale + ")"))
            }, onGestureEnd: function (t) {
                var e = this.params.zoom, i = this.zoom, s = i.gesture;
                if (!u.gestures) {
                    if (!i.fakeGestureTouched || !i.fakeGestureMoved) return;
                    if ("touchend" !== t.type || "touchend" === t.type && t.changedTouches.length < 2 && !B.android) return;
                    i.fakeGestureTouched = !1, i.fakeGestureMoved = !1
                }
                s.$imageEl && 0 !== s.$imageEl.length && (i.scale = Math.max(Math.min(i.scale, s.maxRatio), e.minRatio), s.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale(" + i.scale + ")"), i.currentScale = i.scale, i.isScaling = !1, 1 === i.scale && (s.$slideEl = void 0))
            }, onTouchStart: function (t) {
                var e = this.zoom, i = e.gesture, s = e.image;
                i.$imageEl && 0 !== i.$imageEl.length && (s.isTouched || (B.android && t.preventDefault(), s.isTouched = !0, s.touchesStart.x = "touchstart" === t.type ? t.targetTouches[0].pageX : t.pageX, s.touchesStart.y = "touchstart" === t.type ? t.targetTouches[0].pageY : t.pageY))
            }, onTouchMove: function (t) {
                var e = this.zoom, i = e.gesture, s = e.image, n = e.velocity;
                if (i.$imageEl && 0 !== i.$imageEl.length && (this.allowClick = !1, s.isTouched && i.$slideEl)) {
                    s.isMoved || (s.width = i.$imageEl[0].offsetWidth, s.height = i.$imageEl[0].offsetHeight, s.startX = d.getTranslate(i.$imageWrapEl[0], "x") || 0, s.startY = d.getTranslate(i.$imageWrapEl[0], "y") || 0, i.slideWidth = i.$slideEl[0].offsetWidth, i.slideHeight = i.$slideEl[0].offsetHeight, i.$imageWrapEl.transition(0), this.rtl && (s.startX = -s.startX, s.startY = -s.startY));
                    var a = s.width * e.scale, o = s.height * e.scale;
                    if (!(a < i.slideWidth && o < i.slideHeight)) {
                        if (s.minX = Math.min(i.slideWidth / 2 - a / 2, 0), s.maxX = -s.minX, s.minY = Math.min(i.slideHeight / 2 - o / 2, 0), s.maxY = -s.minY, s.touchesCurrent.x = "touchmove" === t.type ? t.targetTouches[0].pageX : t.pageX, s.touchesCurrent.y = "touchmove" === t.type ? t.targetTouches[0].pageY : t.pageY, !s.isMoved && !e.isScaling) {
                            if (this.isHorizontal() && (Math.floor(s.minX) === Math.floor(s.startX) && s.touchesCurrent.x < s.touchesStart.x || Math.floor(s.maxX) === Math.floor(s.startX) && s.touchesCurrent.x > s.touchesStart.x)) return void (s.isTouched = !1);
                            if (!this.isHorizontal() && (Math.floor(s.minY) === Math.floor(s.startY) && s.touchesCurrent.y < s.touchesStart.y || Math.floor(s.maxY) === Math.floor(s.startY) && s.touchesCurrent.y > s.touchesStart.y)) return void (s.isTouched = !1)
                        }
                        t.preventDefault(), t.stopPropagation(), s.isMoved = !0, s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX, s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY, s.currentX < s.minX && (s.currentX = s.minX + 1 - Math.pow(s.minX - s.currentX + 1, .8)), s.currentX > s.maxX && (s.currentX = s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, .8)), s.currentY < s.minY && (s.currentY = s.minY + 1 - Math.pow(s.minY - s.currentY + 1, .8)), s.currentY > s.maxY && (s.currentY = s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, .8)), n.prevPositionX || (n.prevPositionX = s.touchesCurrent.x), n.prevPositionY || (n.prevPositionY = s.touchesCurrent.y), n.prevTime || (n.prevTime = Date.now()), n.x = (s.touchesCurrent.x - n.prevPositionX) / (Date.now() - n.prevTime) / 2, n.y = (s.touchesCurrent.y - n.prevPositionY) / (Date.now() - n.prevTime) / 2, Math.abs(s.touchesCurrent.x - n.prevPositionX) < 2 && (n.x = 0), Math.abs(s.touchesCurrent.y - n.prevPositionY) < 2 && (n.y = 0), n.prevPositionX = s.touchesCurrent.x, n.prevPositionY = s.touchesCurrent.y, n.prevTime = Date.now(), i.$imageWrapEl.transform("translate3d(" + s.currentX + "px, " + s.currentY + "px,0)")
                    }
                }
            }, onTouchEnd: function () {
                var t = this.zoom, e = t.gesture, i = t.image, s = t.velocity;
                if (e.$imageEl && 0 !== e.$imageEl.length) {
                    if (!i.isTouched || !i.isMoved) return i.isTouched = !1, void (i.isMoved = !1);
                    i.isTouched = !1, i.isMoved = !1;
                    var n = 300, a = 300, o = s.x * n, r = i.currentX + o, l = s.y * a, c = i.currentY + l;
                    0 !== s.x && (n = Math.abs((r - i.currentX) / s.x)), 0 !== s.y && (a = Math.abs((c - i.currentY) / s.y));
                    var h = Math.max(n, a);
                    i.currentX = r, i.currentY = c;
                    var d = i.width * t.scale, u = i.height * t.scale;
                    i.minX = Math.min(e.slideWidth / 2 - d / 2, 0), i.maxX = -i.minX, i.minY = Math.min(e.slideHeight / 2 - u / 2, 0), i.maxY = -i.minY, i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX), i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY), e.$imageWrapEl.transition(h).transform("translate3d(" + i.currentX + "px, " + i.currentY + "px,0)")
                }
            }, onTransitionEnd: function () {
                var t = this.zoom, e = t.gesture;
                e.$slideEl && this.previousIndex !== this.activeIndex && (e.$imageEl.transform("translate3d(0,0,0) scale(1)"), e.$imageWrapEl.transform("translate3d(0,0,0)"), t.scale = 1, t.currentScale = 1, e.$slideEl = void 0, e.$imageEl = void 0, e.$imageWrapEl = void 0)
            }, toggle: function (t) {
                var e = this.zoom;
                e.scale && 1 !== e.scale ? e.out() : e.in(t)
            }, in: function (e) {
                var i, s, n, a, o, r, l, c, h, d, u, p, f, v, m, g, b = this.zoom, y = this.params.zoom, w = b.gesture,
                    x = b.image;
                w.$slideEl || (w.$slideEl = this.clickedSlide ? t(this.clickedSlide) : this.slides.eq(this.activeIndex), w.$imageEl = w.$slideEl.find("img, svg, canvas"), w.$imageWrapEl = w.$imageEl.parent("." + y.containerClass)), w.$imageEl && 0 !== w.$imageEl.length && (w.$slideEl.addClass("" + y.zoomedSlideClass), void 0 === x.touchesStart.x && e ? (i = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX, s = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (i = x.touchesStart.x, s = x.touchesStart.y), b.scale = w.$imageWrapEl.attr("data-swiper-zoom") || y.maxRatio, b.currentScale = w.$imageWrapEl.attr("data-swiper-zoom") || y.maxRatio, e ? (m = w.$slideEl[0].offsetWidth, g = w.$slideEl[0].offsetHeight, n = w.$slideEl.offset().left + m / 2 - i, a = w.$slideEl.offset().top + g / 2 - s, l = w.$imageEl[0].offsetWidth, c = w.$imageEl[0].offsetHeight, h = l * b.scale, d = c * b.scale, f = -(u = Math.min(m / 2 - h / 2, 0)), v = -(p = Math.min(g / 2 - d / 2, 0)), (o = n * b.scale) < u && (o = u), o > f && (o = f), (r = a * b.scale) < p && (r = p), r > v && (r = v)) : (o = 0, r = 0), w.$imageWrapEl.transition(300).transform("translate3d(" + o + "px, " + r + "px,0)"), w.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + b.scale + ")"))
            }, out: function () {
                var e = this.zoom, i = this.params.zoom, s = e.gesture;
                s.$slideEl || (s.$slideEl = this.clickedSlide ? t(this.clickedSlide) : this.slides.eq(this.activeIndex), s.$imageEl = s.$slideEl.find("img, svg, canvas"), s.$imageWrapEl = s.$imageEl.parent("." + i.containerClass)), s.$imageEl && 0 !== s.$imageEl.length && (e.scale = 1, e.currentScale = 1, s.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), s.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), s.$slideEl.removeClass("" + i.zoomedSlideClass), s.$slideEl = void 0)
            }, enable: function () {
                var t = this.zoom;
                if (!t.enabled) {
                    t.enabled = !0;
                    var e = !("touchstart" !== this.touchEvents.start || !u.passiveListener || !this.params.passiveListeners) && {
                        passive: !0,
                        capture: !1
                    }, i = !u.passiveListener || {passive: !1, capture: !0};
                    u.gestures ? (this.$wrapperEl.on("gesturestart", ".swiper-slide", t.onGestureStart, e), this.$wrapperEl.on("gesturechange", ".swiper-slide", t.onGestureChange, e), this.$wrapperEl.on("gestureend", ".swiper-slide", t.onGestureEnd, e)) : "touchstart" === this.touchEvents.start && (this.$wrapperEl.on(this.touchEvents.start, ".swiper-slide", t.onGestureStart, e), this.$wrapperEl.on(this.touchEvents.move, ".swiper-slide", t.onGestureChange, i), this.$wrapperEl.on(this.touchEvents.end, ".swiper-slide", t.onGestureEnd, e), this.touchEvents.cancel && this.$wrapperEl.on(this.touchEvents.cancel, ".swiper-slide", t.onGestureEnd, e)), this.$wrapperEl.on(this.touchEvents.move, "." + this.params.zoom.containerClass, t.onTouchMove, i)
                }
            }, disable: function () {
                var t = this.zoom;
                if (t.enabled) {
                    this.zoom.enabled = !1;
                    var e = !("touchstart" !== this.touchEvents.start || !u.passiveListener || !this.params.passiveListeners) && {
                        passive: !0,
                        capture: !1
                    }, i = !u.passiveListener || {passive: !1, capture: !0};
                    u.gestures ? (this.$wrapperEl.off("gesturestart", ".swiper-slide", t.onGestureStart, e), this.$wrapperEl.off("gesturechange", ".swiper-slide", t.onGestureChange, e), this.$wrapperEl.off("gestureend", ".swiper-slide", t.onGestureEnd, e)) : "touchstart" === this.touchEvents.start && (this.$wrapperEl.off(this.touchEvents.start, ".swiper-slide", t.onGestureStart, e), this.$wrapperEl.off(this.touchEvents.move, ".swiper-slide", t.onGestureChange, i), this.$wrapperEl.off(this.touchEvents.end, ".swiper-slide", t.onGestureEnd, e), this.touchEvents.cancel && this.$wrapperEl.off(this.touchEvents.cancel, ".swiper-slide", t.onGestureEnd, e)), this.$wrapperEl.off(this.touchEvents.move, "." + this.params.zoom.containerClass, t.onTouchMove, i)
                }
            }
        }, at = {
            loadInSlide: function (e, i) {
                void 0 === i && (i = !0);
                var s = this, n = s.params.lazy;
                if (void 0 !== e && 0 !== s.slides.length) {
                    var a = s.virtual && s.params.virtual.enabled ? s.$wrapperEl.children("." + s.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : s.slides.eq(e),
                        o = a.find("." + n.elementClass + ":not(." + n.loadedClass + "):not(." + n.loadingClass + ")");
                    !a.hasClass(n.elementClass) || a.hasClass(n.loadedClass) || a.hasClass(n.loadingClass) || (o = o.add(a[0])), 0 !== o.length && o.each(function (e, o) {
                        var r = t(o);
                        r.addClass(n.loadingClass);
                        var l = r.attr("data-background"), c = r.attr("data-src"), h = r.attr("data-srcset"),
                            d = r.attr("data-sizes");
                        s.loadImage(r[0], c || l, h, d, !1, function () {
                            if (null != s && s && (!s || s.params) && !s.destroyed) {
                                if (l ? (r.css("background-image", 'url("' + l + '")'), r.removeAttr("data-background")) : (h && (r.attr("srcset", h), r.removeAttr("data-srcset")), d && (r.attr("sizes", d), r.removeAttr("data-sizes")), c && (r.attr("src", c), r.removeAttr("data-src"))), r.addClass(n.loadedClass).removeClass(n.loadingClass), a.find("." + n.preloaderClass).remove(), s.params.loop && i) {
                                    var t = a.attr("data-swiper-slide-index");
                                    if (a.hasClass(s.params.slideDuplicateClass)) {
                                        var e = s.$wrapperEl.children('[data-swiper-slide-index="' + t + '"]:not(.' + s.params.slideDuplicateClass + ")");
                                        s.lazy.loadInSlide(e.index(), !1)
                                    } else {
                                        var o = s.$wrapperEl.children("." + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + t + '"]');
                                        s.lazy.loadInSlide(o.index(), !1)
                                    }
                                }
                                s.emit("lazyImageReady", a[0], r[0])
                            }
                        }), s.emit("lazyImageLoad", a[0], r[0])
                    })
                }
            }, load: function () {
                function e(t) {
                    if (l) {
                        if (n.children("." + a.slideClass + '[data-swiper-slide-index="' + t + '"]').length) return !0
                    } else if (o[t]) return !0;
                    return !1
                }

                function i(e) {
                    return l ? t(e).attr("data-swiper-slide-index") : t(e).index()
                }

                var s = this, n = s.$wrapperEl, a = s.params, o = s.slides, r = s.activeIndex,
                    l = s.virtual && a.virtual.enabled, c = a.lazy, h = a.slidesPerView;
                if ("auto" === h && (h = 0), s.lazy.initialImageLoaded || (s.lazy.initialImageLoaded = !0), s.params.watchSlidesVisibility) n.children("." + a.slideVisibleClass).each(function (e, i) {
                    var n = l ? t(i).attr("data-swiper-slide-index") : t(i).index();
                    s.lazy.loadInSlide(n)
                }); else if (h > 1) for (var d = r; d < r + h; d += 1) e(d) && s.lazy.loadInSlide(d); else s.lazy.loadInSlide(r);
                if (c.loadPrevNext) if (h > 1 || c.loadPrevNextAmount && c.loadPrevNextAmount > 1) {
                    for (var u = c.loadPrevNextAmount, p = h, f = Math.min(r + p + Math.max(u, p), o.length), v = Math.max(r - Math.max(p, u), 0), m = r + h; m < f; m += 1) e(m) && s.lazy.loadInSlide(m);
                    for (var g = v; g < r; g += 1) e(g) && s.lazy.loadInSlide(g)
                } else {
                    var b = n.children("." + a.slideNextClass);
                    b.length > 0 && s.lazy.loadInSlide(i(b));
                    var y = n.children("." + a.slidePrevClass);
                    y.length > 0 && s.lazy.loadInSlide(i(y))
                }
            }
        }, ot = {
            LinearSpline: function (t, e) {
                var i, s, n, a, o;
                return this.x = t, this.y = e, this.lastIndex = t.length - 1, this.interpolate = function (t) {
                    return t ? (o = function (t, e) {
                        for (s = -1, i = t.length; i - s > 1;) t[n = i + s >> 1] <= e ? s = n : i = n;
                        return i
                    }(this.x, t), a = o - 1, (t - this.x[a]) * (this.y[o] - this.y[a]) / (this.x[o] - this.x[a]) + this.y[a]) : 0
                }, this
            }, getInterpolateFunction: function (t) {
                this.controller.spline || (this.controller.spline = this.params.loop ? new ot.LinearSpline(this.slidesGrid, t.slidesGrid) : new ot.LinearSpline(this.snapGrid, t.snapGrid))
            }, setTranslate: function (t, e) {
                function i(t) {
                    var e = a.rtlTranslate ? -a.translate : a.translate;
                    "slide" === a.params.controller.by && (a.controller.getInterpolateFunction(t), n = -a.controller.spline.interpolate(-e)), n && "container" !== a.params.controller.by || (s = (t.maxTranslate() - t.minTranslate()) / (a.maxTranslate() - a.minTranslate()), n = (e - a.minTranslate()) * s + t.minTranslate()), a.params.controller.inverse && (n = t.maxTranslate() - n), t.updateProgress(n), t.setTranslate(n, a), t.updateActiveIndex(), t.updateSlidesClasses()
                }

                var s, n, a = this, o = a.controller.control;
                if (Array.isArray(o)) for (var r = 0; r < o.length; r += 1) o[r] !== e && o[r] instanceof Y && i(o[r]); else o instanceof Y && e !== o && i(o)
            }, setTransition: function (t, e) {
                function i(e) {
                    e.setTransition(t, n), 0 !== t && (e.transitionStart(), e.params.autoHeight && d.nextTick(function () {
                        e.updateAutoHeight()
                    }), e.$wrapperEl.transitionEnd(function () {
                        a && (e.params.loop && "slide" === n.params.controller.by && e.loopFix(), e.transitionEnd())
                    }))
                }

                var s, n = this, a = n.controller.control;
                if (Array.isArray(a)) for (s = 0; s < a.length; s += 1) a[s] !== e && a[s] instanceof Y && i(a[s]); else a instanceof Y && e !== a && i(a)
            }
        }, rt = {
            makeElFocusable: function (t) {
                return t.attr("tabIndex", "0"), t
            }, addElRole: function (t, e) {
                return t.attr("role", e), t
            }, addElLabel: function (t, e) {
                return t.attr("aria-label", e), t
            }, disableEl: function (t) {
                return t.attr("aria-disabled", !0), t
            }, enableEl: function (t) {
                return t.attr("aria-disabled", !1), t
            }, onEnterKey: function (e) {
                var i = this.params.a11y;
                if (13 === e.keyCode) {
                    var s = t(e.target);
                    this.navigation && this.navigation.$nextEl && s.is(this.navigation.$nextEl) && (this.isEnd && !this.params.loop || this.slideNext(), this.isEnd ? this.a11y.notify(i.lastSlideMessage) : this.a11y.notify(i.nextSlideMessage)), this.navigation && this.navigation.$prevEl && s.is(this.navigation.$prevEl) && (this.isBeginning && !this.params.loop || this.slidePrev(), this.isBeginning ? this.a11y.notify(i.firstSlideMessage) : this.a11y.notify(i.prevSlideMessage)), this.pagination && s.is("." + this.params.pagination.bulletClass) && s[0].click()
                }
            }, notify: function (t) {
                var e = this.a11y.liveRegion;
                0 !== e.length && (e.html(""), e.html(t))
            }, updateNavigation: function () {
                if (!this.params.loop && this.navigation) {
                    var t = this.navigation, e = t.$nextEl, i = t.$prevEl;
                    i && i.length > 0 && (this.isBeginning ? this.a11y.disableEl(i) : this.a11y.enableEl(i)), e && e.length > 0 && (this.isEnd ? this.a11y.disableEl(e) : this.a11y.enableEl(e))
                }
            }, updatePagination: function () {
                var e = this, i = e.params.a11y;
                e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.bullets.each(function (s, n) {
                    var a = t(n);
                    e.a11y.makeElFocusable(a), e.a11y.addElRole(a, "button"), e.a11y.addElLabel(a, i.paginationBulletMessage.replace(/{{index}}/, a.index() + 1))
                })
            }, init: function () {
                this.$el.append(this.a11y.liveRegion);
                var t, e, i = this.params.a11y;
                this.navigation && this.navigation.$nextEl && (t = this.navigation.$nextEl), this.navigation && this.navigation.$prevEl && (e = this.navigation.$prevEl), t && (this.a11y.makeElFocusable(t), this.a11y.addElRole(t, "button"), this.a11y.addElLabel(t, i.nextSlideMessage), t.on("keydown", this.a11y.onEnterKey)), e && (this.a11y.makeElFocusable(e), this.a11y.addElRole(e, "button"), this.a11y.addElLabel(e, i.prevSlideMessage), e.on("keydown", this.a11y.onEnterKey)), this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.on("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey)
            }, destroy: function () {
                var t, e;
                this.a11y.liveRegion && this.a11y.liveRegion.length > 0 && this.a11y.liveRegion.remove(), this.navigation && this.navigation.$nextEl && (t = this.navigation.$nextEl), this.navigation && this.navigation.$prevEl && (e = this.navigation.$prevEl), t && t.off("keydown", this.a11y.onEnterKey), e && e.off("keydown", this.a11y.onEnterKey), this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.off("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey)
            }
        }, lt = {
            init: function () {
                if (this.params.history) {
                    if (!l.history || !l.history.pushState) return this.params.history.enabled = !1, void (this.params.hashNavigation.enabled = !0);
                    var t = this.history;
                    t.initialized = !0, t.paths = lt.getPathValues(), (t.paths.key || t.paths.value) && (t.scrollToSlide(0, t.paths.value, this.params.runCallbacksOnInit), this.params.history.replaceState || l.addEventListener("popstate", this.history.setHistoryPopState))
                }
            }, destroy: function () {
                this.params.history.replaceState || l.removeEventListener("popstate", this.history.setHistoryPopState)
            }, setHistoryPopState: function () {
                this.history.paths = lt.getPathValues(), this.history.scrollToSlide(this.params.speed, this.history.paths.value, !1)
            }, getPathValues: function () {
                var t = l.location.pathname.slice(1).split("/").filter(function (t) {
                    return "" !== t
                }), e = t.length;
                return {key: t[e - 2], value: t[e - 1]}
            }, setHistory: function (t, e) {
                if (this.history.initialized && this.params.history.enabled) {
                    var i = this.slides.eq(e), s = lt.slugify(i.attr("data-history"));
                    l.location.pathname.includes(t) || (s = t + "/" + s);
                    var n = l.history.state;
                    n && n.value === s || (this.params.history.replaceState ? l.history.replaceState({value: s}, null, s) : l.history.pushState({value: s}, null, s))
                }
            }, slugify: function (t) {
                return t.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
            }, scrollToSlide: function (t, e, i) {
                if (e) for (var s = 0, n = this.slides.length; s < n; s += 1) {
                    var a = this.slides.eq(s);
                    if (lt.slugify(a.attr("data-history")) === e && !a.hasClass(this.params.slideDuplicateClass)) {
                        var o = a.index();
                        this.slideTo(o, t, i)
                    }
                } else this.slideTo(0, t, i)
            }
        }, ct = {
            onHashCange: function () {
                var t = r.location.hash.replace("#", "");
                if (t !== this.slides.eq(this.activeIndex).attr("data-hash")) {
                    var e = this.$wrapperEl.children("." + this.params.slideClass + '[data-hash="' + t + '"]').index();
                    if (void 0 === e) return;
                    this.slideTo(e)
                }
            }, setHash: function () {
                if (this.hashNavigation.initialized && this.params.hashNavigation.enabled) if (this.params.hashNavigation.replaceState && l.history && l.history.replaceState) l.history.replaceState(null, null, "#" + this.slides.eq(this.activeIndex).attr("data-hash") || ""); else {
                    var t = this.slides.eq(this.activeIndex), e = t.attr("data-hash") || t.attr("data-history");
                    r.location.hash = e || ""
                }
            }, init: function () {
                if (!(!this.params.hashNavigation.enabled || this.params.history && this.params.history.enabled)) {
                    this.hashNavigation.initialized = !0;
                    var e = r.location.hash.replace("#", "");
                    if (e) for (var i = 0, s = this.slides.length; i < s; i += 1) {
                        var n = this.slides.eq(i);
                        if ((n.attr("data-hash") || n.attr("data-history")) === e && !n.hasClass(this.params.slideDuplicateClass)) {
                            var a = n.index();
                            this.slideTo(a, 0, this.params.runCallbacksOnInit, !0)
                        }
                    }
                    this.params.hashNavigation.watchState && t(l).on("hashchange", this.hashNavigation.onHashCange)
                }
            }, destroy: function () {
                this.params.hashNavigation.watchState && t(l).off("hashchange", this.hashNavigation.onHashCange)
            }
        }, ht = {
            run: function () {
                var t = this, e = t.slides.eq(t.activeIndex), i = t.params.autoplay.delay;
                e.attr("data-swiper-autoplay") && (i = e.attr("data-swiper-autoplay") || t.params.autoplay.delay), clearTimeout(t.autoplay.timeout), t.autoplay.timeout = d.nextTick(function () {
                    t.params.autoplay.reverseDirection ? t.params.loop ? (t.loopFix(), t.slidePrev(t.params.speed, !0, !0), t.emit("autoplay")) : t.isBeginning ? t.params.autoplay.stopOnLastSlide ? t.autoplay.stop() : (t.slideTo(t.slides.length - 1, t.params.speed, !0, !0), t.emit("autoplay")) : (t.slidePrev(t.params.speed, !0, !0), t.emit("autoplay")) : t.params.loop ? (t.loopFix(), t.slideNext(t.params.speed, !0, !0), t.emit("autoplay")) : t.isEnd ? t.params.autoplay.stopOnLastSlide ? t.autoplay.stop() : (t.slideTo(0, t.params.speed, !0, !0), t.emit("autoplay")) : (t.slideNext(t.params.speed, !0, !0), t.emit("autoplay")), t.params.cssMode && t.autoplay.running && t.autoplay.run()
                }, i)
            }, start: function () {
                return void 0 === this.autoplay.timeout && !this.autoplay.running && (this.autoplay.running = !0, this.emit("autoplayStart"), this.autoplay.run(), !0)
            }, stop: function () {
                return !!this.autoplay.running && void 0 !== this.autoplay.timeout && (this.autoplay.timeout && (clearTimeout(this.autoplay.timeout), this.autoplay.timeout = void 0), this.autoplay.running = !1, this.emit("autoplayStop"), !0)
            }, pause: function (t) {
                this.autoplay.running && (this.autoplay.paused || (this.autoplay.timeout && clearTimeout(this.autoplay.timeout), this.autoplay.paused = !0, 0 !== t && this.params.autoplay.waitForTransition ? (this.$wrapperEl[0].addEventListener("transitionend", this.autoplay.onTransitionEnd), this.$wrapperEl[0].addEventListener("webkitTransitionEnd", this.autoplay.onTransitionEnd)) : (this.autoplay.paused = !1, this.autoplay.run())))
            }
        }, dt = {
            setTranslate: function () {
                for (var t = this.slides, e = 0; e < t.length; e += 1) {
                    var i = this.slides.eq(e), s = -i[0].swiperSlideOffset;
                    this.params.virtualTranslate || (s -= this.translate);
                    var n = 0;
                    this.isHorizontal() || (n = s, s = 0);
                    var a = this.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(i[0].progress), 0) : 1 + Math.min(Math.max(i[0].progress, -1), 0);
                    i.css({opacity: a}).transform("translate3d(" + s + "px, " + n + "px, 0px)")
                }
            }, setTransition: function (t) {
                var e = this, i = e.slides, s = e.$wrapperEl;
                if (i.transition(t), e.params.virtualTranslate && 0 !== t) {
                    var n = !1;
                    i.transitionEnd(function () {
                        if (!n && e && !e.destroyed) {
                            n = !0, e.animating = !1;
                            for (var t = ["webkitTransitionEnd", "transitionend"], i = 0; i < t.length; i += 1) s.trigger(t[i])
                        }
                    })
                }
            }
        }, ut = {
            setTranslate: function () {
                var e, i = this.$el, s = this.$wrapperEl, n = this.slides, a = this.width, o = this.height,
                    r = this.rtlTranslate, l = this.size, c = this.params.cubeEffect, h = this.isHorizontal(),
                    d = this.virtual && this.params.virtual.enabled, u = 0;
                c.shadow && (h ? (0 === (e = s.find(".swiper-cube-shadow")).length && (e = t('<div class="swiper-cube-shadow"></div>'), s.append(e)), e.css({height: a + "px"})) : 0 === (e = i.find(".swiper-cube-shadow")).length && (e = t('<div class="swiper-cube-shadow"></div>'), i.append(e)));
                for (var p = 0; p < n.length; p += 1) {
                    var f = n.eq(p), v = p;
                    d && (v = parseInt(f.attr("data-swiper-slide-index"), 10));
                    var m = 90 * v, g = Math.floor(m / 360);
                    r && (m = -m, g = Math.floor(-m / 360));
                    var b = Math.max(Math.min(f[0].progress, 1), -1), y = 0, w = 0, x = 0;
                    v % 4 == 0 ? (y = 4 * -g * l, x = 0) : (v - 1) % 4 == 0 ? (y = 0, x = 4 * -g * l) : (v - 2) % 4 == 0 ? (y = l + 4 * g * l, x = l) : (v - 3) % 4 == 0 && (y = -l, x = 3 * l + 4 * l * g), r && (y = -y), h || (w = y, y = 0);
                    var S = "rotateX(" + (h ? 0 : -m) + "deg) rotateY(" + (h ? m : 0) + "deg) translate3d(" + y + "px, " + w + "px, " + x + "px)";
                    if (b <= 1 && b > -1 && (u = 90 * v + 90 * b, r && (u = 90 * -v - 90 * b)), f.transform(S), c.slideShadows) {
                        var T = h ? f.find(".swiper-slide-shadow-left") : f.find(".swiper-slide-shadow-top"),
                            E = h ? f.find(".swiper-slide-shadow-right") : f.find(".swiper-slide-shadow-bottom");
                        0 === T.length && (T = t('<div class="swiper-slide-shadow-' + (h ? "left" : "top") + '"></div>'), f.append(T)), 0 === E.length && (E = t('<div class="swiper-slide-shadow-' + (h ? "right" : "bottom") + '"></div>'), f.append(E)), T.length && (T[0].style.opacity = Math.max(-b, 0)), E.length && (E[0].style.opacity = Math.max(b, 0))
                    }
                }
                if (s.css({
                    "-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
                    "-moz-transform-origin": "50% 50% -" + l / 2 + "px",
                    "-ms-transform-origin": "50% 50% -" + l / 2 + "px",
                    "transform-origin": "50% 50% -" + l / 2 + "px"
                }), c.shadow) if (h) e.transform("translate3d(0px, " + (a / 2 + c.shadowOffset) + "px, " + -a / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + c.shadowScale + ")"); else {
                    var C = Math.abs(u) - 90 * Math.floor(Math.abs(u) / 90),
                        M = 1.5 - (Math.sin(2 * C * Math.PI / 360) / 2 + Math.cos(2 * C * Math.PI / 360) / 2),
                        k = c.shadowScale, P = c.shadowScale / M, $ = c.shadowOffset;
                    e.transform("scale3d(" + k + ", 1, " + P + ") translate3d(0px, " + (o / 2 + $) + "px, " + -o / 2 / P + "px) rotateX(-90deg)")
                }
                var L = W.isSafari || W.isUiWebView ? -l / 2 : 0;
                s.transform("translate3d(0px,0," + L + "px) rotateX(" + (this.isHorizontal() ? 0 : u) + "deg) rotateY(" + (this.isHorizontal() ? -u : 0) + "deg)")
            }, setTransition: function (t) {
                var e = this.$el;
                this.slides.transition(t).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(t), this.params.cubeEffect.shadow && !this.isHorizontal() && e.find(".swiper-cube-shadow").transition(t)
            }
        }, pt = {
            setTranslate: function () {
                for (var e = this.slides, i = this.rtlTranslate, s = 0; s < e.length; s += 1) {
                    var n = e.eq(s), a = n[0].progress;
                    this.params.flipEffect.limitRotation && (a = Math.max(Math.min(n[0].progress, 1), -1));
                    var o = -180 * a, r = 0, l = -n[0].swiperSlideOffset, c = 0;
                    if (this.isHorizontal() ? i && (o = -o) : (c = l, l = 0, r = -o, o = 0), n[0].style.zIndex = -Math.abs(Math.round(a)) + e.length, this.params.flipEffect.slideShadows) {
                        var h = this.isHorizontal() ? n.find(".swiper-slide-shadow-left") : n.find(".swiper-slide-shadow-top"),
                            d = this.isHorizontal() ? n.find(".swiper-slide-shadow-right") : n.find(".swiper-slide-shadow-bottom");
                        0 === h.length && (h = t('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "left" : "top") + '"></div>'), n.append(h)), 0 === d.length && (d = t('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "right" : "bottom") + '"></div>'), n.append(d)), h.length && (h[0].style.opacity = Math.max(-a, 0)), d.length && (d[0].style.opacity = Math.max(a, 0))
                    }
                    n.transform("translate3d(" + l + "px, " + c + "px, 0px) rotateX(" + r + "deg) rotateY(" + o + "deg)")
                }
            }, setTransition: function (t) {
                var e = this, i = e.slides, s = e.activeIndex, n = e.$wrapperEl;
                if (i.transition(t).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(t), e.params.virtualTranslate && 0 !== t) {
                    var a = !1;
                    i.eq(s).transitionEnd(function () {
                        if (!a && e && !e.destroyed) {
                            a = !0, e.animating = !1;
                            for (var t = ["webkitTransitionEnd", "transitionend"], i = 0; i < t.length; i += 1) n.trigger(t[i])
                        }
                    })
                }
            }
        }, ft = {
            setTranslate: function () {
                for (var e = this.width, i = this.height, s = this.slides, n = this.$wrapperEl, a = this.slidesSizesGrid, o = this.params.coverflowEffect, r = this.isHorizontal(), l = this.translate, c = r ? e / 2 - l : i / 2 - l, h = r ? o.rotate : -o.rotate, d = o.depth, p = 0, f = s.length; p < f; p += 1) {
                    var v = s.eq(p), m = a[p], g = (c - v[0].swiperSlideOffset - m / 2) / m * o.modifier, b = r ? h * g : 0,
                        y = r ? 0 : h * g, w = -d * Math.abs(g), x = r ? 0 : o.stretch * g, S = r ? o.stretch * g : 0;
                    Math.abs(S) < .001 && (S = 0), Math.abs(x) < .001 && (x = 0), Math.abs(w) < .001 && (w = 0), Math.abs(b) < .001 && (b = 0), Math.abs(y) < .001 && (y = 0);
                    var T = "translate3d(" + S + "px," + x + "px," + w + "px)  rotateX(" + y + "deg) rotateY(" + b + "deg)";
                    if (v.transform(T), v[0].style.zIndex = 1 - Math.abs(Math.round(g)), o.slideShadows) {
                        var E = r ? v.find(".swiper-slide-shadow-left") : v.find(".swiper-slide-shadow-top"),
                            C = r ? v.find(".swiper-slide-shadow-right") : v.find(".swiper-slide-shadow-bottom");
                        0 === E.length && (E = t('<div class="swiper-slide-shadow-' + (r ? "left" : "top") + '"></div>'), v.append(E)), 0 === C.length && (C = t('<div class="swiper-slide-shadow-' + (r ? "right" : "bottom") + '"></div>'), v.append(C)), E.length && (E[0].style.opacity = g > 0 ? g : 0), C.length && (C[0].style.opacity = -g > 0 ? -g : 0)
                    }
                }
                (u.pointerEvents || u.prefixedPointerEvents) && (n[0].style.perspectiveOrigin = c + "px 50%")
            }, setTransition: function (t) {
                this.slides.transition(t).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(t)
            }
        }, vt = {
            init: function () {
                var t = this.params.thumbs, e = this.constructor;
                t.swiper instanceof e ? (this.thumbs.swiper = t.swiper, d.extend(this.thumbs.swiper.originalParams, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                }), d.extend(this.thumbs.swiper.params, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                })) : d.isObject(t.swiper) && (this.thumbs.swiper = new e(d.extend({}, t.swiper, {
                    watchSlidesVisibility: !0,
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                })), this.thumbs.swiperCreated = !0), this.thumbs.swiper.$el.addClass(this.params.thumbs.thumbsContainerClass), this.thumbs.swiper.on("tap", this.thumbs.onThumbClick)
            }, onThumbClick: function () {
                var e = this.thumbs.swiper;
                if (e) {
                    var i = e.clickedIndex, s = e.clickedSlide;
                    if (!(s && t(s).hasClass(this.params.thumbs.slideThumbActiveClass) || null == i)) {
                        var n;
                        if (n = e.params.loop ? parseInt(t(e.clickedSlide).attr("data-swiper-slide-index"), 10) : i, this.params.loop) {
                            var a = this.activeIndex;
                            this.slides.eq(a).hasClass(this.params.slideDuplicateClass) && (this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft, a = this.activeIndex);
                            var o = this.slides.eq(a).prevAll('[data-swiper-slide-index="' + n + '"]').eq(0).index(),
                                r = this.slides.eq(a).nextAll('[data-swiper-slide-index="' + n + '"]').eq(0).index();
                            n = void 0 === o ? r : void 0 === r ? o : r - a < a - o ? r : o
                        }
                        this.slideTo(n)
                    }
                }
            }, update: function (t) {
                var e = this.thumbs.swiper;
                if (e) {
                    var i = "auto" === e.params.slidesPerView ? e.slidesPerViewDynamic() : e.params.slidesPerView;
                    if (this.realIndex !== e.realIndex) {
                        var s, n = e.activeIndex;
                        if (e.params.loop) {
                            e.slides.eq(n).hasClass(e.params.slideDuplicateClass) && (e.loopFix(), e._clientLeft = e.$wrapperEl[0].clientLeft, n = e.activeIndex);
                            var a = e.slides.eq(n).prevAll('[data-swiper-slide-index="' + this.realIndex + '"]').eq(0).index(),
                                o = e.slides.eq(n).nextAll('[data-swiper-slide-index="' + this.realIndex + '"]').eq(0).index();
                            s = void 0 === a ? o : void 0 === o ? a : o - n == n - a ? n : o - n < n - a ? o : a
                        } else s = this.realIndex;
                        e.visibleSlidesIndexes && e.visibleSlidesIndexes.indexOf(s) < 0 && (e.params.centeredSlides ? s = s > n ? s - Math.floor(i / 2) + 1 : s + Math.floor(i / 2) - 1 : s > n && (s = s - i + 1), e.slideTo(s, t ? 0 : void 0))
                    }
                    var r = 1, l = this.params.thumbs.slideThumbActiveClass;
                    if (this.params.slidesPerView > 1 && !this.params.centeredSlides && (r = this.params.slidesPerView), this.params.thumbs.multipleActiveThumbs || (r = 1), r = Math.floor(r), e.slides.removeClass(l), e.params.loop || e.params.virtual && e.params.virtual.enabled) for (var c = 0; c < r; c += 1) e.$wrapperEl.children('[data-swiper-slide-index="' + (this.realIndex + c) + '"]').addClass(l); else for (var h = 0; h < r; h += 1) e.slides.eq(this.realIndex + h).addClass(l)
                }
            }
        }, mt = [X, j, N, _, q, K, Q, {
            name: "mousewheel",
            params: {
                mousewheel: {
                    enabled: !1,
                    releaseOnEdges: !1,
                    invert: !1,
                    forceToAxis: !1,
                    sensitivity: 1,
                    eventsTarged: "container"
                }
            },
            create: function () {
                d.extend(this, {
                    mousewheel: {
                        enabled: !1,
                        enable: J.enable.bind(this),
                        disable: J.disable.bind(this),
                        handle: J.handle.bind(this),
                        handleMouseEnter: J.handleMouseEnter.bind(this),
                        handleMouseLeave: J.handleMouseLeave.bind(this),
                        animateSlider: J.animateSlider.bind(this),
                        releaseScroll: J.releaseScroll.bind(this),
                        lastScrollTime: d.now(),
                        lastEventBeforeSnap: void 0,
                        recentWheelEvents: []
                    }
                })
            },
            on: {
                init: function () {
                    !this.params.mousewheel.enabled && this.params.cssMode && this.mousewheel.disable(), this.params.mousewheel.enabled && this.mousewheel.enable()
                }, destroy: function () {
                    this.params.cssMode && this.mousewheel.enable(), this.mousewheel.enabled && this.mousewheel.disable()
                }
            }
        }, {
            name: "navigation",
            params: {
                navigation: {
                    nextEl: null,
                    prevEl: null,
                    hideOnClick: !1,
                    disabledClass: "swiper-button-disabled",
                    hiddenClass: "swiper-button-hidden",
                    lockClass: "swiper-button-lock"
                }
            },
            create: function () {
                d.extend(this, {
                    navigation: {
                        init: tt.init.bind(this),
                        update: tt.update.bind(this),
                        destroy: tt.destroy.bind(this),
                        onNextClick: tt.onNextClick.bind(this),
                        onPrevClick: tt.onPrevClick.bind(this)
                    }
                })
            },
            on: {
                init: function () {
                    this.navigation.init(), this.navigation.update()
                }, toEdge: function () {
                    this.navigation.update()
                }, fromEdge: function () {
                    this.navigation.update()
                }, destroy: function () {
                    this.navigation.destroy()
                }, click: function (e) {
                    var i, s = this.navigation, n = s.$nextEl, a = s.$prevEl;
                    !this.params.navigation.hideOnClick || t(e.target).is(a) || t(e.target).is(n) || (n ? i = n.hasClass(this.params.navigation.hiddenClass) : a && (i = a.hasClass(this.params.navigation.hiddenClass)), !0 === i ? this.emit("navigationShow", this) : this.emit("navigationHide", this), n && n.toggleClass(this.params.navigation.hiddenClass), a && a.toggleClass(this.params.navigation.hiddenClass))
                }
            }
        }, {
            name: "pagination",
            params: {
                pagination: {
                    el: null,
                    bulletElement: "span",
                    clickable: !1,
                    hideOnClick: !1,
                    renderBullet: null,
                    renderProgressbar: null,
                    renderFraction: null,
                    renderCustom: null,
                    progressbarOpposite: !1,
                    type: "bullets",
                    dynamicBullets: !1,
                    dynamicMainBullets: 1,
                    formatFractionCurrent: function (t) {
                        return t
                    },
                    formatFractionTotal: function (t) {
                        return t
                    },
                    bulletClass: "swiper-pagination-bullet",
                    bulletActiveClass: "swiper-pagination-bullet-active",
                    modifierClass: "swiper-pagination-",
                    currentClass: "swiper-pagination-current",
                    totalClass: "swiper-pagination-total",
                    hiddenClass: "swiper-pagination-hidden",
                    progressbarFillClass: "swiper-pagination-progressbar-fill",
                    progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
                    clickableClass: "swiper-pagination-clickable",
                    lockClass: "swiper-pagination-lock"
                }
            },
            create: function () {
                d.extend(this, {
                    pagination: {
                        init: et.init.bind(this),
                        render: et.render.bind(this),
                        update: et.update.bind(this),
                        destroy: et.destroy.bind(this),
                        dynamicBulletIndex: 0
                    }
                })
            },
            on: {
                init: function () {
                    this.pagination.init(), this.pagination.render(), this.pagination.update()
                }, activeIndexChange: function () {
                    this.params.loop ? this.pagination.update() : void 0 === this.snapIndex && this.pagination.update()
                }, snapIndexChange: function () {
                    this.params.loop || this.pagination.update()
                }, slidesLengthChange: function () {
                    this.params.loop && (this.pagination.render(), this.pagination.update())
                }, snapGridLengthChange: function () {
                    this.params.loop || (this.pagination.render(), this.pagination.update())
                }, destroy: function () {
                    this.pagination.destroy()
                }, click: function (e) {
                    this.params.pagination.el && this.params.pagination.hideOnClick && this.pagination.$el.length > 0 && !t(e.target).hasClass(this.params.pagination.bulletClass) && (!0 === this.pagination.$el.hasClass(this.params.pagination.hiddenClass) ? this.emit("paginationShow", this) : this.emit("paginationHide", this), this.pagination.$el.toggleClass(this.params.pagination.hiddenClass))
                }
            }
        }, {
            name: "scrollbar",
            params: {
                scrollbar: {
                    el: null,
                    dragSize: "auto",
                    hide: !1,
                    draggable: !1,
                    snapOnRelease: !0,
                    lockClass: "swiper-scrollbar-lock",
                    dragClass: "swiper-scrollbar-drag"
                }
            },
            create: function () {
                d.extend(this, {
                    scrollbar: {
                        init: it.init.bind(this),
                        destroy: it.destroy.bind(this),
                        updateSize: it.updateSize.bind(this),
                        setTranslate: it.setTranslate.bind(this),
                        setTransition: it.setTransition.bind(this),
                        enableDraggable: it.enableDraggable.bind(this),
                        disableDraggable: it.disableDraggable.bind(this),
                        setDragPosition: it.setDragPosition.bind(this),
                        getPointerPosition: it.getPointerPosition.bind(this),
                        onDragStart: it.onDragStart.bind(this),
                        onDragMove: it.onDragMove.bind(this),
                        onDragEnd: it.onDragEnd.bind(this),
                        isTouched: !1,
                        timeout: null,
                        dragTimeout: null
                    }
                })
            },
            on: {
                init: function () {
                    this.scrollbar.init(), this.scrollbar.updateSize(), this.scrollbar.setTranslate()
                }, update: function () {
                    this.scrollbar.updateSize()
                }, resize: function () {
                    this.scrollbar.updateSize()
                }, observerUpdate: function () {
                    this.scrollbar.updateSize()
                }, setTranslate: function () {
                    this.scrollbar.setTranslate()
                }, setTransition: function (t) {
                    this.scrollbar.setTransition(t)
                }, destroy: function () {
                    this.scrollbar.destroy()
                }
            }
        }, {
            name: "parallax", params: {parallax: {enabled: !1}}, create: function () {
                d.extend(this, {
                    parallax: {
                        setTransform: st.setTransform.bind(this),
                        setTranslate: st.setTranslate.bind(this),
                        setTransition: st.setTransition.bind(this)
                    }
                })
            }, on: {
                beforeInit: function () {
                    this.params.parallax.enabled && (this.params.watchSlidesProgress = !0, this.originalParams.watchSlidesProgress = !0)
                }, init: function () {
                    this.params.parallax.enabled && this.parallax.setTranslate()
                }, setTranslate: function () {
                    this.params.parallax.enabled && this.parallax.setTranslate()
                }, setTransition: function (t) {
                    this.params.parallax.enabled && this.parallax.setTransition(t)
                }
            }
        }, {
            name: "zoom",
            params: {
                zoom: {
                    enabled: !1,
                    maxRatio: 3,
                    minRatio: 1,
                    toggle: !0,
                    containerClass: "swiper-zoom-container",
                    zoomedSlideClass: "swiper-slide-zoomed"
                }
            },
            create: function () {
                var t = this, e = {
                    enabled: !1,
                    scale: 1,
                    currentScale: 1,
                    isScaling: !1,
                    gesture: {
                        $slideEl: void 0,
                        slideWidth: void 0,
                        slideHeight: void 0,
                        $imageEl: void 0,
                        $imageWrapEl: void 0,
                        maxRatio: 3
                    },
                    image: {
                        isTouched: void 0,
                        isMoved: void 0,
                        currentX: void 0,
                        currentY: void 0,
                        minX: void 0,
                        minY: void 0,
                        maxX: void 0,
                        maxY: void 0,
                        width: void 0,
                        height: void 0,
                        startX: void 0,
                        startY: void 0,
                        touchesStart: {},
                        touchesCurrent: {}
                    },
                    velocity: {x: void 0, y: void 0, prevPositionX: void 0, prevPositionY: void 0, prevTime: void 0}
                };
                "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach(function (i) {
                    e[i] = nt[i].bind(t)
                }), d.extend(t, {zoom: e});
                var i = 1;
                Object.defineProperty(t.zoom, "scale", {
                    get: function () {
                        return i
                    }, set: function (e) {
                        if (i !== e) {
                            var s = t.zoom.gesture.$imageEl ? t.zoom.gesture.$imageEl[0] : void 0,
                                n = t.zoom.gesture.$slideEl ? t.zoom.gesture.$slideEl[0] : void 0;
                            t.emit("zoomChange", e, s, n)
                        }
                        i = e
                    }
                })
            },
            on: {
                init: function () {
                    this.params.zoom.enabled && this.zoom.enable()
                }, destroy: function () {
                    this.zoom.disable()
                }, touchStart: function (t) {
                    this.zoom.enabled && this.zoom.onTouchStart(t)
                }, touchEnd: function (t) {
                    this.zoom.enabled && this.zoom.onTouchEnd(t)
                }, doubleTap: function (t) {
                    this.params.zoom.enabled && this.zoom.enabled && this.params.zoom.toggle && this.zoom.toggle(t)
                }, transitionEnd: function () {
                    this.zoom.enabled && this.params.zoom.enabled && this.zoom.onTransitionEnd()
                }, slideChange: function () {
                    this.zoom.enabled && this.params.zoom.enabled && this.params.cssMode && this.zoom.onTransitionEnd()
                }
            }
        }, {
            name: "lazy",
            params: {
                lazy: {
                    enabled: !1,
                    loadPrevNext: !1,
                    loadPrevNextAmount: 1,
                    loadOnTransitionStart: !1,
                    elementClass: "swiper-lazy",
                    loadingClass: "swiper-lazy-loading",
                    loadedClass: "swiper-lazy-loaded",
                    preloaderClass: "swiper-lazy-preloader"
                }
            },
            create: function () {
                d.extend(this, {
                    lazy: {
                        initialImageLoaded: !1,
                        load: at.load.bind(this),
                        loadInSlide: at.loadInSlide.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function () {
                    this.params.lazy.enabled && this.params.preloadImages && (this.params.preloadImages = !1)
                }, init: function () {
                    this.params.lazy.enabled && !this.params.loop && 0 === this.params.initialSlide && this.lazy.load()
                }, scroll: function () {
                    this.params.freeMode && !this.params.freeModeSticky && this.lazy.load()
                }, resize: function () {
                    this.params.lazy.enabled && this.lazy.load()
                }, scrollbarDragMove: function () {
                    this.params.lazy.enabled && this.lazy.load()
                }, transitionStart: function () {
                    this.params.lazy.enabled && (this.params.lazy.loadOnTransitionStart || !this.params.lazy.loadOnTransitionStart && !this.lazy.initialImageLoaded) && this.lazy.load()
                }, transitionEnd: function () {
                    this.params.lazy.enabled && !this.params.lazy.loadOnTransitionStart && this.lazy.load()
                }, slideChange: function () {
                    this.params.lazy.enabled && this.params.cssMode && this.lazy.load()
                }
            }
        }, {
            name: "controller", params: {controller: {control: void 0, inverse: !1, by: "slide"}}, create: function () {
                d.extend(this, {
                    controller: {
                        control: this.params.controller.control,
                        getInterpolateFunction: ot.getInterpolateFunction.bind(this),
                        setTranslate: ot.setTranslate.bind(this),
                        setTransition: ot.setTransition.bind(this)
                    }
                })
            }, on: {
                update: function () {
                    this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
                }, resize: function () {
                    this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
                }, observerUpdate: function () {
                    this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
                }, setTranslate: function (t, e) {
                    this.controller.control && this.controller.setTranslate(t, e)
                }, setTransition: function (t, e) {
                    this.controller.control && this.controller.setTransition(t, e)
                }
            }
        }, {
            name: "a11y",
            params: {
                a11y: {
                    enabled: !0,
                    notificationClass: "swiper-notification",
                    prevSlideMessage: "Previous slide",
                    nextSlideMessage: "Next slide",
                    firstSlideMessage: "This is the first slide",
                    lastSlideMessage: "This is the last slide",
                    paginationBulletMessage: "Go to slide {{index}}"
                }
            },
            create: function () {
                var e = this;
                d.extend(e, {a11y: {liveRegion: t('<span class="' + e.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')}}), Object.keys(rt).forEach(function (t) {
                    e.a11y[t] = rt[t].bind(e)
                })
            },
            on: {
                init: function () {
                    this.params.a11y.enabled && (this.a11y.init(), this.a11y.updateNavigation())
                }, toEdge: function () {
                    this.params.a11y.enabled && this.a11y.updateNavigation()
                }, fromEdge: function () {
                    this.params.a11y.enabled && this.a11y.updateNavigation()
                }, paginationUpdate: function () {
                    this.params.a11y.enabled && this.a11y.updatePagination()
                }, destroy: function () {
                    this.params.a11y.enabled && this.a11y.destroy()
                }
            }
        }, {
            name: "history", params: {history: {enabled: !1, replaceState: !1, key: "slides"}}, create: function () {
                d.extend(this, {
                    history: {
                        init: lt.init.bind(this),
                        setHistory: lt.setHistory.bind(this),
                        setHistoryPopState: lt.setHistoryPopState.bind(this),
                        scrollToSlide: lt.scrollToSlide.bind(this),
                        destroy: lt.destroy.bind(this)
                    }
                })
            }, on: {
                init: function () {
                    this.params.history.enabled && this.history.init()
                }, destroy: function () {
                    this.params.history.enabled && this.history.destroy()
                }, transitionEnd: function () {
                    this.history.initialized && this.history.setHistory(this.params.history.key, this.activeIndex)
                }, slideChange: function () {
                    this.history.initialized && this.params.cssMode && this.history.setHistory(this.params.history.key, this.activeIndex)
                }
            }
        }, {
            name: "hash-navigation",
            params: {hashNavigation: {enabled: !1, replaceState: !1, watchState: !1}},
            create: function () {
                d.extend(this, {
                    hashNavigation: {
                        initialized: !1,
                        init: ct.init.bind(this),
                        destroy: ct.destroy.bind(this),
                        setHash: ct.setHash.bind(this),
                        onHashCange: ct.onHashCange.bind(this)
                    }
                })
            },
            on: {
                init: function () {
                    this.params.hashNavigation.enabled && this.hashNavigation.init()
                }, destroy: function () {
                    this.params.hashNavigation.enabled && this.hashNavigation.destroy()
                }, transitionEnd: function () {
                    this.hashNavigation.initialized && this.hashNavigation.setHash()
                }, slideChange: function () {
                    this.hashNavigation.initialized && this.params.cssMode && this.hashNavigation.setHash()
                }
            }
        }, {
            name: "autoplay",
            params: {
                autoplay: {
                    enabled: !1,
                    delay: 3e3,
                    waitForTransition: !0,
                    disableOnInteraction: !0,
                    stopOnLastSlide: !1,
                    reverseDirection: !1
                }
            },
            create: function () {
                var t = this;
                d.extend(t, {
                    autoplay: {
                        running: !1,
                        paused: !1,
                        run: ht.run.bind(t),
                        start: ht.start.bind(t),
                        stop: ht.stop.bind(t),
                        pause: ht.pause.bind(t),
                        onVisibilityChange: function () {
                            "hidden" === document.visibilityState && t.autoplay.running && t.autoplay.pause(), "visible" === document.visibilityState && t.autoplay.paused && (t.autoplay.run(), t.autoplay.paused = !1)
                        },
                        onTransitionEnd: function (e) {
                            t && !t.destroyed && t.$wrapperEl && e.target === this && (t.$wrapperEl[0].removeEventListener("transitionend", t.autoplay.onTransitionEnd), t.$wrapperEl[0].removeEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd), t.autoplay.paused = !1, t.autoplay.running ? t.autoplay.run() : t.autoplay.stop())
                        }
                    }
                })
            },
            on: {
                init: function () {
                    this.params.autoplay.enabled && (this.autoplay.start(), document.addEventListener("visibilitychange", this.autoplay.onVisibilityChange))
                }, beforeTransitionStart: function (t, e) {
                    this.autoplay.running && (e || !this.params.autoplay.disableOnInteraction ? this.autoplay.pause(t) : this.autoplay.stop())
                }, sliderFirstMove: function () {
                    this.autoplay.running && (this.params.autoplay.disableOnInteraction ? this.autoplay.stop() : this.autoplay.pause())
                }, touchEnd: function () {
                    this.params.cssMode && this.autoplay.paused && !this.params.autoplay.disableOnInteraction && this.autoplay.run()
                }, destroy: function () {
                    this.autoplay.running && this.autoplay.stop(), document.removeEventListener("visibilitychange", this.autoplay.onVisibilityChange)
                }
            }
        }, {
            name: "effect-fade", params: {fadeEffect: {crossFade: !1}}, create: function () {
                d.extend(this, {
                    fadeEffect: {
                        setTranslate: dt.setTranslate.bind(this),
                        setTransition: dt.setTransition.bind(this)
                    }
                })
            }, on: {
                beforeInit: function () {
                    if ("fade" === this.params.effect) {
                        this.classNames.push(this.params.containerModifierClass + "fade");
                        var t = {
                            slidesPerView: 1,
                            slidesPerColumn: 1,
                            slidesPerGroup: 1,
                            watchSlidesProgress: !0,
                            spaceBetween: 0,
                            virtualTranslate: !0
                        };
                        d.extend(this.params, t), d.extend(this.originalParams, t)
                    }
                }, setTranslate: function () {
                    "fade" === this.params.effect && this.fadeEffect.setTranslate()
                }, setTransition: function (t) {
                    "fade" === this.params.effect && this.fadeEffect.setTransition(t)
                }
            }
        }, {
            name: "effect-cube",
            params: {cubeEffect: {slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: .94}},
            create: function () {
                d.extend(this, {
                    cubeEffect: {
                        setTranslate: ut.setTranslate.bind(this),
                        setTransition: ut.setTransition.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function () {
                    if ("cube" === this.params.effect) {
                        this.classNames.push(this.params.containerModifierClass + "cube"), this.classNames.push(this.params.containerModifierClass + "3d");
                        var t = {
                            slidesPerView: 1,
                            slidesPerColumn: 1,
                            slidesPerGroup: 1,
                            watchSlidesProgress: !0,
                            resistanceRatio: 0,
                            spaceBetween: 0,
                            centeredSlides: !1,
                            virtualTranslate: !0
                        };
                        d.extend(this.params, t), d.extend(this.originalParams, t)
                    }
                }, setTranslate: function () {
                    "cube" === this.params.effect && this.cubeEffect.setTranslate()
                }, setTransition: function (t) {
                    "cube" === this.params.effect && this.cubeEffect.setTransition(t)
                }
            }
        }, {
            name: "effect-flip", params: {flipEffect: {slideShadows: !0, limitRotation: !0}}, create: function () {
                d.extend(this, {
                    flipEffect: {
                        setTranslate: pt.setTranslate.bind(this),
                        setTransition: pt.setTransition.bind(this)
                    }
                })
            }, on: {
                beforeInit: function () {
                    if ("flip" === this.params.effect) {
                        this.classNames.push(this.params.containerModifierClass + "flip"), this.classNames.push(this.params.containerModifierClass + "3d");
                        var t = {
                            slidesPerView: 1,
                            slidesPerColumn: 1,
                            slidesPerGroup: 1,
                            watchSlidesProgress: !0,
                            spaceBetween: 0,
                            virtualTranslate: !0
                        };
                        d.extend(this.params, t), d.extend(this.originalParams, t)
                    }
                }, setTranslate: function () {
                    "flip" === this.params.effect && this.flipEffect.setTranslate()
                }, setTransition: function (t) {
                    "flip" === this.params.effect && this.flipEffect.setTransition(t)
                }
            }
        }, {
            name: "effect-coverflow",
            params: {coverflowEffect: {rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0}},
            create: function () {
                d.extend(this, {
                    coverflowEffect: {
                        setTranslate: ft.setTranslate.bind(this),
                        setTransition: ft.setTransition.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function () {
                    "coverflow" === this.params.effect && (this.classNames.push(this.params.containerModifierClass + "coverflow"), this.classNames.push(this.params.containerModifierClass + "3d"), this.params.watchSlidesProgress = !0, this.originalParams.watchSlidesProgress = !0)
                }, setTranslate: function () {
                    "coverflow" === this.params.effect && this.coverflowEffect.setTranslate()
                }, setTransition: function (t) {
                    "coverflow" === this.params.effect && this.coverflowEffect.setTransition(t)
                }
            }
        }, {
            name: "thumbs",
            params: {
                thumbs: {
                    multipleActiveThumbs: !0,
                    swiper: null,
                    slideThumbActiveClass: "swiper-slide-thumb-active",
                    thumbsContainerClass: "swiper-container-thumbs"
                }
            },
            create: function () {
                d.extend(this, {
                    thumbs: {
                        swiper: null,
                        init: vt.init.bind(this),
                        update: vt.update.bind(this),
                        onThumbClick: vt.onThumbClick.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function () {
                    var t = this.params.thumbs;
                    t && t.swiper && (this.thumbs.init(), this.thumbs.update(!0))
                }, slideChange: function () {
                    this.thumbs.swiper && this.thumbs.update()
                }, update: function () {
                    this.thumbs.swiper && this.thumbs.update()
                }, resize: function () {
                    this.thumbs.swiper && this.thumbs.update()
                }, observerUpdate: function () {
                    this.thumbs.swiper && this.thumbs.update()
                }, setTransition: function (t) {
                    var e = this.thumbs.swiper;
                    e && e.setTransition(t)
                }, beforeDestroy: function () {
                    var t = this.thumbs.swiper;
                    t && this.thumbs.swiperCreated && t && t.destroy()
                }
            }
        }];
    return void 0 === Y.use && (Y.use = Y.Class.use, Y.installModule = Y.Class.installModule), Y.use(mt), Y
}), function (t) {
    function e(e, i, s, n) {
        var a = e.text().split(i), o = "";
        a.length && (t(a).each(function (t, e) {
            o += '<span class="' + s + (t + 1) + '">' + e + "</span>" + n
        }), e.empty().append(o))
    }

    var i = {
        init: function () {
            return this.each(function () {
                e(t(this), "", "char", "")
            })
        }, words: function () {
            return this.each(function () {
                e(t(this), " ", "word", " ")
            })
        }, lines: function () {
            return this.each(function () {
                var i = "eefec303079ad17405c889e092e105b0";
                e(t(this).children("br").replaceWith(i).end(), i, "line", "")
            })
        }
    };
    t.fn.lettering = function (e) {
        return e && i[e] ? i[e].apply(this, [].slice.call(arguments, 1)) : "letters" !== e && e ? (t.error("Method " + e + " does not exist on jQuery.lettering"), this) : i.init.apply(this, [].slice.call(arguments, 0))
    }
}(jQuery), function (t) {
    "use strict";

    function e(e) {
        return /In/.test(e) || t.inArray(e, t.fn.textillate.defaults.inEffects) >= 0
    }

    function i(e) {
        return /Out/.test(e) || t.inArray(e, t.fn.textillate.defaults.outEffects) >= 0
    }

    function s(t) {
        return "true" !== t && "false" !== t ? t : "true" === t
    }

    function n(e) {
        var i = e.attributes || [], n = {};
        return i.length ? (t.each(i, function (t, e) {
            var i = e.nodeName.replace(/delayscale/, "delayScale");
            /^data-in-*/.test(i) ? (n.in = n.in || {}, n.in[i.replace(/data-in-/, "")] = s(e.nodeValue)) : /^data-out-*/.test(i) ? (n.out = n.out || {}, n.out[i.replace(/data-out-/, "")] = s(e.nodeValue)) : /^data-*/.test(i) && (n[i.replace(/data-/, "")] = s(e.nodeValue))
        }), n) : n
    }

    function a(s, n, a) {
        var o = s.length;
        o ? (n.shuffle && (s = function (t) {
            for (var e, i, s = t.length; s; e = parseInt(Math.random() * s), i = t[--s], t[s] = t[e], t[e] = i) ;
            return t
        }(s)), n.reverse && (s = s.toArray().reverse()), t.each(s, function (s, r) {
            function l() {
                e(n.effect) ? c.css("visibility", "visible") : i(n.effect) && c.css("visibility", "hidden"), !(o -= 1) && a && a()
            }

            var c = t(r), h = n.sync ? n.delay : n.delay * s * n.delayScale;
            c.text() ? setTimeout(function () {
                !function (t, e, i) {
                    t.addClass("animated " + e).css("visibility", "visible").show(), t.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                        t.removeClass("animated " + e), i && i()
                    })
                }(c, n.effect, l)
            }, h) : l()
        })) : a && a()
    }

    t.fn.textillate = function (s, o) {
        return this.each(function () {
            var r = t(this), l = r.data("textillate"),
                c = t.extend(!0, {}, t.fn.textillate.defaults, n(this), "object" == typeof s && s);
            l ? "string" == typeof s ? l[s].apply(l, [].concat(o)) : l.setOptions.call(l, c) : r.data("textillate", l = new function (s, o) {
                var r = this, l = t(s);
                r.init = function () {
                    r.$texts = l.find(o.selector), r.$texts.length || (r.$texts = t('<ul class="texts"><li>' + l.html() + "</li></ul>"), l.html(r.$texts)), r.$texts.hide(), r.$current = t("<span>").html(r.$texts.find(":first-child").html()).prependTo(l), e(o.in.effect) ? r.$current.css("visibility", "hidden") : i(o.out.effect) && r.$current.css("visibility", "visible"), r.setOptions(o), r.timeoutRun = null, setTimeout(function () {
                        r.options.autoStart && r.start()
                    }, r.options.initialDelay)
                }, r.setOptions = function (t) {
                    r.options = t
                }, r.triggerEvent = function (e) {
                    var i = t.Event(e + ".tlt");
                    return l.trigger(i, r), i
                }, r.in = function (s, o) {
                    s = s || 0;
                    var c, h = r.$texts.find(":nth-child(" + ((s || 0) + 1) + ")"),
                        d = t.extend(!0, {}, r.options, h.length ? n(h[0]) : {});
                    h.addClass("current"), r.triggerEvent("inAnimationBegin"), l.attr("data-active", h.data("id")), r.$current.html(h.html()).lettering("words"), "char" == r.options.type && r.$current.find('[class^="word"]').css({
                        display: "inline-block",
                        "-webkit-transform": "translate3d(0,0,0)",
                        "-moz-transform": "translate3d(0,0,0)",
                        "-o-transform": "translate3d(0,0,0)",
                        transform: "translate3d(0,0,0)"
                    }).each(function () {
                        t(this).lettering()
                    }), c = r.$current.find('[class^="' + r.options.type + '"]').css("display", "inline-block"), e(d.in.effect) ? c.css("visibility", "hidden") : i(d.in.effect) && c.css("visibility", "visible"), r.currentIndex = s, a(c, d.in, function () {
                        r.triggerEvent("inAnimationEnd"), d.in.callback && d.in.callback(), o && o(r)
                    })
                }, r.out = function (e) {
                    var i = r.$texts.find(":nth-child(" + ((r.currentIndex || 0) + 1) + ")"),
                        s = r.$current.find('[class^="' + r.options.type + '"]'),
                        o = t.extend(!0, {}, r.options, i.length ? n(i[0]) : {});
                    r.triggerEvent("outAnimationBegin"), a(s, o.out, function () {
                        i.removeClass("current"), r.triggerEvent("outAnimationEnd"), l.removeAttr("data-active"), o.out.callback && o.out.callback(), e && e(r)
                    })
                }, r.start = function (t) {
                    setTimeout(function () {
                        r.triggerEvent("start"), function t(e) {
                            r.in(e, function () {
                                var i = r.$texts.children().length;
                                e += 1, !r.options.loop && e >= i ? (r.options.callback && r.options.callback(), r.triggerEvent("end")) : (e %= i, r.timeoutRun = setTimeout(function () {
                                    r.out(function () {
                                        t(e)
                                    })
                                }, r.options.minDisplayTime))
                            })
                        }(t || 0)
                    }, r.options.initialDelay)
                }, r.stop = function () {
                    r.timeoutRun && (clearInterval(r.timeoutRun), r.timeoutRun = null)
                }, r.init()
            }(this, c))
        })
    }, t.fn.textillate.defaults = {
        selector: ".texts",
        loop: !1,
        minDisplayTime: 200,
        initialDelay: .5,
        in: {
            effect: "fadeInLeftBig",
            delayScale: 1.5,
            delay: 50,
            sync: !1,
            reverse: !1,
            shuffle: !1,
            callback: function () {
            }
        },
        out: {
            effect: "fadeInRight",
            delayScale: 1.5,
            delay: 50,
            sync: !1,
            reverse: !1,
            shuffle: !1,
            callback: function () {
            }
        },
        autoStart: !0,
        callback: function () {
        },
        type: "char"
    }
}(jQuery), function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).LocomotiveScroll = e()
}(this, function () {
    "use strict";

    function t(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function e(t, e) {
        for (var i = 0; i < e.length; i++) {
            var s = e[i];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(t, s.key, s)
        }
    }

    function i(t, i, s) {
        return i && e(t.prototype, i), s && e(t, s), t
    }

    function s(t, e, i) {
        return e in t ? Object.defineProperty(t, e, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = i, t
    }

    function n(t, e) {
        var i = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var s = Object.getOwnPropertySymbols(t);
            e && (s = s.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            })), i.push.apply(i, s)
        }
        return i
    }

    function a(t) {
        for (var e = 1; e < arguments.length; e++) {
            var i = null != arguments[e] ? arguments[e] : {};
            e % 2 ? n(Object(i), !0).forEach(function (e) {
                s(t, e, i[e])
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : n(Object(i)).forEach(function (e) {
                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e))
            })
        }
        return t
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                writable: !0,
                configurable: !0
            }
        }), e && l(t, e)
    }

    function r(t) {
        return (r = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        })(t)
    }

    function l(t, e) {
        return (l = Object.setPrototypeOf || function (t, e) {
            return t.__proto__ = e, t
        })(t, e)
    }

    function c(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
    }

    function h(t) {
        var e = function () {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Date.prototype.toString.call(Reflect.construct(Date, [], function () {
                })), !0
            } catch (t) {
                return !1
            }
        }();
        return function () {
            var i, s = r(t);
            if (e) {
                var n = r(this).constructor;
                i = Reflect.construct(s, arguments, n)
            } else i = s.apply(this, arguments);
            return function (t, e) {
                return !e || "object" != typeof e && "function" != typeof e ? c(t) : e
            }(this, i)
        }
    }

    function d(t, e, i) {
        return (d = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function (t, e, i) {
            var s = function (t, e) {
                for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = r(t));) ;
                return t
            }(t, e);
            if (s) {
                var n = Object.getOwnPropertyDescriptor(s, e);
                return n.get ? n.get.call(i) : n.value
            }
        })(t, e, i || t)
    }

    function u(t, e) {
        return function (t) {
            if (Array.isArray(t)) return t
        }(t) || function (t, e) {
            if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) {
                var i = [], s = !0, n = !1, a = void 0;
                try {
                    for (var o, r = t[Symbol.iterator](); !(s = (o = r.next()).done) && (i.push(o.value), !e || i.length !== e); s = !0) ;
                } catch (t) {
                    n = !0, a = t
                } finally {
                    try {
                        s || null == r.return || r.return()
                    } finally {
                        if (n) throw a
                    }
                }
                return i
            }
        }(t, e) || f(t, e) || function () {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function p(t) {
        return function (t) {
            if (Array.isArray(t)) return v(t)
        }(t) || function (t) {
            if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t)
        }(t) || f(t) || function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function f(t, e) {
        if (t) {
            if ("string" == typeof t) return v(t, e);
            var i = Object.prototype.toString.call(t).slice(8, -1);
            return "Object" === i && t.constructor && (i = t.constructor.name), "Map" === i || "Set" === i ? Array.from(t) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? v(t, e) : void 0
        }
    }

    function v(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var i = 0, s = new Array(e); i < e; i++) s[i] = t[i];
        return s
    }

    function m(t, e) {
        return t(e = {exports: {}}, e.exports), e.exports
    }

    function g() {
    }

    function b(t, e) {
        return function () {
            return t.apply(e, arguments)
        }
    }

    function y(t) {
        !function (t) {
            if (!t) return console.warn("bindAll requires at least one argument.");
            var e = Array.prototype.slice.call(arguments, 1);
            if (0 === e.length) for (var i in t) X.call(t, i) && "function" == typeof t[i] && "[object Function]" == Y.call(t[i]) && e.push(i);
            for (var s = 0; s < e.length; s++) {
                var n = e[s];
                t[n] = b(t[n], t)
            }
        }(this, "_onWheel", "_onMouseWheel", "_onTouchStart", "_onTouchMove", "_onKeyDown"), this.el = window, t && t.el && (this.el = t.el, delete t.el), this.options = H({
            mouseMultiplier: 1,
            touchMultiplier: 2,
            firefoxMultiplier: 15,
            keyStep: 120,
            preventTouch: !1,
            unpreventTouchClass: "vs-touchmove-allowed",
            limitInertia: !1,
            useKeyboard: !0,
            useTouch: !0
        }, t), this.options.limitInertia && (this._lethargy = new j), this._emitter = new V, this._event = {
            y: 0,
            x: 0,
            deltaX: 0,
            deltaY: 0
        }, this.touchStartX = null, this.touchStartY = null, this.bodyTouchAction = null, void 0 !== this.options.passive && (this.listenerOptions = {passive: this.options.passive})
    }

    function w(t, e, i) {
        return (1 - i) * t + i * e
    }

    function x(t) {
        var e = {};
        if (window.getComputedStyle) {
            var i = getComputedStyle(t), s = i.transform || i.webkitTransform || i.mozTransform,
                n = s.match(/^matrix3d\((.+)\)$/);
            return n ? (e.x = n ? parseFloat(n[1].split(", ")[12]) : 0, e.y = n ? parseFloat(n[1].split(", ")[13]) : 0) : (n = s.match(/^matrix\((.+)\)$/), e.x = n ? parseFloat(n[1].split(", ")[4]) : 0, e.y = n ? parseFloat(n[1].split(", ")[5]) : 0), e
        }
    }

    function S(t) {
        for (var e = []; t && t !== document; t = t.parentNode) e.push(t);
        return e
    }

    function T(t, e) {
        return 1 - 3 * e + 3 * t
    }

    function E(t, e) {
        return 3 * e - 6 * t
    }

    function C(t) {
        return 3 * t
    }

    function M(t, e, i) {
        return ((T(e, i) * t + E(e, i)) * t + C(e)) * t
    }

    function k(t, e, i) {
        return 3 * T(e, i) * t * t + 2 * E(e, i) * t + C(e)
    }

    function P(t) {
        return t
    }

    var $ = {
            el: document,
            name: "scroll",
            offset: [0, 0],
            repeat: !1,
            smooth: !1,
            initPosition: {x: 0, y: 0},
            direction: "vertical",
            gestureDirection: "vertical",
            reloadOnContextChange: !1,
            lerp: .1,
            class: "is-inview",
            scrollbarContainer: !1,
            scrollbarClass: "c-scrollbar",
            scrollingClass: "has-scroll-scrolling",
            draggingClass: "has-scroll-dragging",
            smoothClass: "has-scroll-smooth",
            initClass: "has-scroll-init",
            getSpeed: !1,
            getDirection: !1,
            scrollFromAnywhere: !1,
            multiplier: 1,
            firefoxMultiplier: 50,
            touchMultiplier: 2,
            resetNativeScroll: !0,
            tablet: {smooth: !1, direction: "vertical", gestureDirection: "vertical", breakpoint: 1024},
            smartphone: {smooth: !1, direction: "vertical", gestureDirection: "vertical"}
        }, L = function () {
            function e() {
                var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                t(this, e), Object.assign(this, $, i), this.smartphone = $.smartphone, i.smartphone && Object.assign(this.smartphone, i.smartphone), this.tablet = $.tablet, i.tablet && Object.assign(this.tablet, i.tablet), this.namespace = "locomotive", this.html = document.documentElement, this.windowHeight = window.innerHeight, this.windowWidth = window.innerWidth, this.windowMiddle = {
                    x: this.windowWidth / 2,
                    y: this.windowHeight / 2
                }, this.els = {}, this.currentElements = {}, this.listeners = {}, this.hasScrollTicking = !1, this.hasCallEventSet = !1, this.checkScroll = this.checkScroll.bind(this), this.checkResize = this.checkResize.bind(this), this.checkEvent = this.checkEvent.bind(this), this.instance = {
                    scroll: {
                        x: 0,
                        y: 0
                    }, limit: {x: this.html.offsetHeight, y: this.html.offsetHeight}, currentElements: this.currentElements
                }, this.isMobile ? this.isTablet ? this.context = "tablet" : this.context = "smartphone" : this.context = "desktop", this.isMobile && (this.direction = this[this.context].direction), "horizontal" === this.direction ? this.directionAxis = "x" : this.directionAxis = "y", this.getDirection && (this.instance.direction = null), this.getDirection && (this.instance.speed = 0), this.html.classList.add(this.initClass), window.addEventListener("resize", this.checkResize, !1)
            }

            return i(e, [{
                key: "init", value: function () {
                    this.initEvents()
                }
            }, {
                key: "checkScroll", value: function () {
                    this.dispatchScroll()
                }
            }, {
                key: "checkResize", value: function () {
                    var t = this;
                    this.resizeTick || (this.resizeTick = !0, requestAnimationFrame(function () {
                        t.resize(), t.resizeTick = !1
                    }))
                }
            }, {
                key: "resize", value: function () {
                }
            }, {
                key: "checkContext", value: function () {
                    if (this.reloadOnContextChange) {
                        this.isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1 || this.windowWidth < this.tablet.breakpoint, this.isTablet = this.isMobile && this.windowWidth >= this.tablet.breakpoint;
                        var t = this.context;
                        this.isMobile ? this.isTablet ? this.context = "tablet" : this.context = "smartphone" : this.context = "desktop", t != this.context && ("desktop" == t ? this.smooth : this[t].smooth) != ("desktop" == this.context ? this.smooth : this[this.context].smooth) && window.location.reload()
                    }
                }
            }, {
                key: "initEvents", value: function () {
                    var t = this;
                    this.scrollToEls = this.el.querySelectorAll("[data-".concat(this.name, "-to]")), this.setScrollTo = this.setScrollTo.bind(this), this.scrollToEls.forEach(function (e) {
                        e.addEventListener("click", t.setScrollTo, !1)
                    })
                }
            }, {
                key: "setScrollTo", value: function (t) {
                    t.preventDefault(), this.scrollTo(t.currentTarget.getAttribute("data-".concat(this.name, "-href")) || t.currentTarget.getAttribute("href"), {offset: t.currentTarget.getAttribute("data-".concat(this.name, "-offset"))})
                }
            }, {
                key: "addElements", value: function () {
                }
            }, {
                key: "detectElements", value: function (t) {
                    var e = this, i = this.instance.scroll.y, s = i + this.windowHeight, n = this.instance.scroll.x,
                        a = n + this.windowWidth;
                    Object.entries(this.els).forEach(function (o) {
                        var r = u(o, 2), l = r[0], c = r[1];
                        if (!c || c.inView && !t || ("horizontal" === e.direction ? a >= c.left && n < c.right && e.setInView(c, l) : s >= c.top && i < c.bottom && e.setInView(c, l)), c && c.inView) if ("horizontal" === e.direction) {
                            var h = c.right - c.left;
                            c.progress = (e.instance.scroll.x - (c.left - e.windowWidth)) / (h + e.windowWidth), (a < c.left || n > c.right) && e.setOutOfView(c, l)
                        } else {
                            var d = c.bottom - c.top;
                            c.progress = (e.instance.scroll.y - (c.top - e.windowHeight)) / (d + e.windowHeight), (s < c.top || i > c.bottom) && e.setOutOfView(c, l)
                        }
                    }), this.hasScrollTicking = !1
                }
            }, {
                key: "setInView", value: function (t, e) {
                    this.els[e].inView = !0, t.el.classList.add(t.class), this.currentElements[e] = t, t.call && this.hasCallEventSet && (this.dispatchCall(t, "enter"), t.repeat || (this.els[e].call = !1))
                }
            }, {
                key: "setOutOfView", value: function (t, e) {
                    var i = this;
                    this.els[e].inView = !1, Object.keys(this.currentElements).forEach(function (t) {
                        t === e && delete i.currentElements[t]
                    }), t.call && this.hasCallEventSet && this.dispatchCall(t, "exit"), t.repeat && t.el.classList.remove(t.class)
                }
            }, {
                key: "dispatchCall", value: function (t, e) {
                    this.callWay = e, this.callValue = t.call.split(",").map(function (t) {
                        return t.trim()
                    }), this.callObj = t, 1 == this.callValue.length && (this.callValue = this.callValue[0]);
                    var i = new Event(this.namespace + "call");
                    this.el.dispatchEvent(i)
                }
            }, {
                key: "dispatchScroll", value: function () {
                    var t = new Event(this.namespace + "scroll");
                    this.el.dispatchEvent(t)
                }
            }, {
                key: "setEvents", value: function (t, e) {
                    this.listeners[t] || (this.listeners[t] = []);
                    var i = this.listeners[t];
                    i.push(e), 1 === i.length && this.el.addEventListener(this.namespace + t, this.checkEvent, !1), "call" === t && (this.hasCallEventSet = !0, this.detectElements(!0))
                }
            }, {
                key: "unsetEvents", value: function (t, e) {
                    if (this.listeners[t]) {
                        var i = this.listeners[t], s = i.indexOf(e);
                        s < 0 || (i.splice(s, 1), 0 === i.index && this.el.removeEventListener(this.namespace + t, this.checkEvent, !1))
                    }
                }
            }, {
                key: "checkEvent", value: function (t) {
                    var e = this, i = t.type.replace(this.namespace, ""), s = this.listeners[i];
                    s && 0 !== s.length && s.forEach(function (t) {
                        switch (i) {
                            case"scroll":
                                return t(e.instance);
                            case"call":
                                return t(e.callValue, e.callWay, e.callObj);
                            default:
                                return t()
                        }
                    })
                }
            }, {
                key: "startScroll", value: function () {
                }
            }, {
                key: "stopScroll", value: function () {
                }
            }, {
                key: "setScroll", value: function (t, e) {
                    this.instance.scroll = {x: 0, y: 0}
                }
            }, {
                key: "destroy", value: function () {
                    var t = this;
                    window.removeEventListener("resize", this.checkResize, !1), Object.keys(this.listeners).forEach(function (e) {
                        t.el.removeEventListener(t.namespace + e, t.checkEvent, !1)
                    }), this.listeners = {}, this.scrollToEls.forEach(function (e) {
                        e.removeEventListener("click", t.setScrollTo, !1)
                    }), this.html.classList.remove(this.initClass)
                }
            }]), e
        }(),
        A = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
        z = m(function (t, e) {
            t.exports = {
                polyfill: function () {
                    function t(t, e) {
                        this.scrollLeft = t, this.scrollTop = e
                    }

                    function e(t) {
                        if (null === t || "object" != typeof t || void 0 === t.behavior || "auto" === t.behavior || "instant" === t.behavior) return !0;
                        if ("object" == typeof t && "smooth" === t.behavior) return !1;
                        throw new TypeError("behavior member of ScrollOptions " + t.behavior + " is not a valid value for enumeration ScrollBehavior.")
                    }

                    function i(t, e) {
                        return "Y" === e ? t.clientHeight + p < t.scrollHeight : "X" === e ? t.clientWidth + p < t.scrollWidth : void 0
                    }

                    function s(t, e) {
                        var i = r.getComputedStyle(t, null)["overflow" + e];
                        return "auto" === i || "scroll" === i
                    }

                    function n(t) {
                        var e = i(t, "Y") && s(t, "Y"), n = i(t, "X") && s(t, "X");
                        return e || n
                    }

                    function a(t) {
                        var e, i, s, n, o = (u() - t.startTime) / 468;
                        n = o = o > 1 ? 1 : o, e = .5 * (1 - Math.cos(Math.PI * n)), i = t.startX + (t.x - t.startX) * e, s = t.startY + (t.y - t.startY) * e, t.method.call(t.scrollable, i, s), i === t.x && s === t.y || r.requestAnimationFrame(a.bind(r, t))
                    }

                    function o(e, i, s) {
                        var n, o, c, h, p = u();
                        e === l.body ? (n = r, o = r.scrollX || r.pageXOffset, c = r.scrollY || r.pageYOffset, h = d.scroll) : (n = e, o = e.scrollLeft, c = e.scrollTop, h = t), a({
                            scrollable: n,
                            method: h,
                            startTime: p,
                            startX: o,
                            startY: c,
                            x: i,
                            y: s
                        })
                    }

                    var r = window, l = document;
                    if (!("scrollBehavior" in l.documentElement.style) || !0 === r.__forceSmoothScrollPolyfill__) {
                        var c, h = r.HTMLElement || r.Element, d = {
                                scroll: r.scroll || r.scrollTo,
                                scrollBy: r.scrollBy,
                                elementScroll: h.prototype.scroll || t,
                                scrollIntoView: h.prototype.scrollIntoView
                            }, u = r.performance && r.performance.now ? r.performance.now.bind(r.performance) : Date.now,
                            p = (c = r.navigator.userAgent, new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(c) ? 1 : 0);
                        r.scroll = r.scrollTo = function () {
                            void 0 !== arguments[0] && (!0 !== e(arguments[0]) ? o.call(r, l.body, void 0 !== arguments[0].left ? ~~arguments[0].left : r.scrollX || r.pageXOffset, void 0 !== arguments[0].top ? ~~arguments[0].top : r.scrollY || r.pageYOffset) : d.scroll.call(r, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : r.scrollX || r.pageXOffset, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : r.scrollY || r.pageYOffset))
                        }, r.scrollBy = function () {
                            void 0 !== arguments[0] && (e(arguments[0]) ? d.scrollBy.call(r, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : 0, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0) : o.call(r, l.body, ~~arguments[0].left + (r.scrollX || r.pageXOffset), ~~arguments[0].top + (r.scrollY || r.pageYOffset)))
                        }, h.prototype.scroll = h.prototype.scrollTo = function () {
                            if (void 0 !== arguments[0]) if (!0 !== e(arguments[0])) {
                                var t = arguments[0].left, i = arguments[0].top;
                                o.call(this, this, void 0 === t ? this.scrollLeft : ~~t, void 0 === i ? this.scrollTop : ~~i)
                            } else {
                                if ("number" == typeof arguments[0] && void 0 === arguments[1]) throw new SyntaxError("Value could not be converted");
                                d.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left : "object" != typeof arguments[0] ? ~~arguments[0] : this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top : void 0 !== arguments[1] ? ~~arguments[1] : this.scrollTop)
                            }
                        }, h.prototype.scrollBy = function () {
                            void 0 !== arguments[0] && (!0 !== e(arguments[0]) ? this.scroll({
                                left: ~~arguments[0].left + this.scrollLeft,
                                top: ~~arguments[0].top + this.scrollTop,
                                behavior: arguments[0].behavior
                            }) : d.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop))
                        }, h.prototype.scrollIntoView = function () {
                            if (!0 !== e(arguments[0])) {
                                var t = function (t) {
                                    for (; t !== l.body && !1 === n(t);) t = t.parentNode || t.host;
                                    return t
                                }(this), i = t.getBoundingClientRect(), s = this.getBoundingClientRect();
                                t !== l.body ? (o.call(this, t, t.scrollLeft + s.left - i.left, t.scrollTop + s.top - i.top), "fixed" !== r.getComputedStyle(t).position && r.scrollBy({
                                    left: i.left,
                                    top: i.top,
                                    behavior: "smooth"
                                })) : r.scrollBy({left: s.left, top: s.top, behavior: "smooth"})
                            } else d.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0])
                        }
                    }
                }
            }
        }), I = (z.polyfill, function (e) {
            function s() {
                var e, i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return t(this, s), (e = n.call(this, i)).resetNativeScroll && (history.scrollRestoration && (history.scrollRestoration = "manual"), window.scrollTo(0, 0)), window.addEventListener("scroll", e.checkScroll, !1), void 0 === window.smoothscrollPolyfill && (window.smoothscrollPolyfill = z, window.smoothscrollPolyfill.polyfill()), e
            }

            o(s, L);
            var n = h(s);
            return i(s, [{
                key: "init", value: function () {
                    this.instance.scroll.y = window.pageYOffset, this.addElements(), this.detectElements(), d(r(s.prototype), "init", this).call(this)
                }
            }, {
                key: "checkScroll", value: function () {
                    var t = this;
                    d(r(s.prototype), "checkScroll", this).call(this), this.getDirection && this.addDirection(), this.getSpeed && (this.addSpeed(), this.speedTs = Date.now()), this.instance.scroll.y = window.pageYOffset, Object.entries(this.els).length && (this.hasScrollTicking || (requestAnimationFrame(function () {
                        t.detectElements()
                    }), this.hasScrollTicking = !0))
                }
            }, {
                key: "addDirection", value: function () {
                    window.pageYOffset > this.instance.scroll.y ? "down" !== this.instance.direction && (this.instance.direction = "down") : window.pageYOffset < this.instance.scroll.y && "up" !== this.instance.direction && (this.instance.direction = "up")
                }
            }, {
                key: "addSpeed", value: function () {
                    window.pageYOffset != this.instance.scroll.y ? this.instance.speed = (window.pageYOffset - this.instance.scroll.y) / Math.max(1, Date.now() - this.speedTs) : this.instance.speed = 0
                }
            }, {
                key: "resize", value: function () {
                    Object.entries(this.els).length && (this.windowHeight = window.innerHeight, this.updateElements())
                }
            }, {
                key: "addElements", value: function () {
                    var t = this;
                    this.els = {}, this.el.querySelectorAll("[data-" + this.name + "]").forEach(function (e, i) {
                        e.getBoundingClientRect();
                        var s, n, a, o = e.dataset[t.name + "Class"] || t.class,
                            r = "string" == typeof e.dataset[t.name + "Id"] ? e.dataset[t.name + "Id"] : i,
                            l = "string" == typeof e.dataset[t.name + "Offset"] ? e.dataset[t.name + "Offset"].split(",") : t.offset,
                            c = e.dataset[t.name + "Repeat"], h = e.dataset[t.name + "Call"],
                            d = e.dataset[t.name + "Target"],
                            u = (a = void 0 !== d ? document.querySelector("".concat(d)) : e).getBoundingClientRect();
                        s = u.top + t.instance.scroll.y, n = u.left + t.instance.scroll.x;
                        var p = s + a.offsetHeight, f = n + a.offsetWidth;
                        c = "false" != c && (null != c || t.repeat);
                        var v = t.getRelativeOffset(l), m = {
                            el: e,
                            targetEl: a,
                            id: r,
                            class: o,
                            top: s += v[0],
                            bottom: p -= v[1],
                            left: n,
                            right: f,
                            offset: l,
                            progress: 0,
                            repeat: c,
                            inView: !1,
                            call: h
                        };
                        t.els[r] = m, e.classList.contains(o) && t.setInView(t.els[r], r)
                    })
                }
            }, {
                key: "updateElements", value: function () {
                    var t = this;
                    Object.entries(this.els).forEach(function (e) {
                        var i = u(e, 2), s = i[0], n = i[1],
                            a = n.targetEl.getBoundingClientRect().top + t.instance.scroll.y,
                            o = a + n.targetEl.offsetHeight, r = t.getRelativeOffset(n.offset);
                        t.els[s].top = a + r[0], t.els[s].bottom = o - r[1]
                    }), this.hasScrollTicking = !1
                }
            }, {
                key: "getRelativeOffset", value: function (t) {
                    var e = [0, 0];
                    if (t) for (var i = 0; i < t.length; i++) "string" == typeof t[i] ? t[i].includes("%") ? e[i] = parseInt(t[i].replace("%", "") * this.windowHeight / 100) : e[i] = parseInt(t[i]) : e[i] = t[i];
                    return e
                }
            }, {
                key: "scrollTo", value: function (t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        i = parseInt(e.offset) || 0, s = !!e.callback && e.callback;
                    if ("string" == typeof t) {
                        if ("top" === t) t = this.html; else if ("bottom" === t) t = this.html.offsetHeight - window.innerHeight; else if (!(t = document.querySelector(t))) return
                    } else if ("number" == typeof t) t = parseInt(t); else if (!t || !t.tagName) return void console.warn("`target` parameter is not valid");
                    if (i = "number" != typeof t ? t.getBoundingClientRect().top + i + this.instance.scroll.y : t + i, s) {
                        i = i.toFixed();
                        var n = function t() {
                            window.pageYOffset.toFixed() === i && (window.removeEventListener("scroll", t), s())
                        };
                        window.addEventListener("scroll", n)
                    }
                    window.scrollTo({top: i, behavior: "smooth"})
                }
            }, {
                key: "update", value: function () {
                    this.addElements(), this.detectElements()
                }
            }, {
                key: "destroy", value: function () {
                    d(r(s.prototype), "destroy", this).call(this), window.removeEventListener("scroll", this.checkScroll, !1)
                }
            }]), s
        }()), O = Object.getOwnPropertySymbols, D = Object.prototype.hasOwnProperty,
        B = Object.prototype.propertyIsEnumerable, H = function () {
            try {
                if (!Object.assign) return !1;
                var t = new String("abc");
                if (t[5] = "de", "5" === Object.getOwnPropertyNames(t)[0]) return !1;
                for (var e = {}, i = 0; i < 10; i++) e["_" + String.fromCharCode(i)] = i;
                if ("0123456789" !== Object.getOwnPropertyNames(e).map(function (t) {
                    return e[t]
                }).join("")) return !1;
                var s = {};
                return "abcdefghijklmnopqrst".split("").forEach(function (t) {
                    s[t] = t
                }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, s)).join("")
            } catch (t) {
                return !1
            }
        }() ? Object.assign : function (t, e) {
            for (var i, s, n = function (t) {
                if (null == t) throw new TypeError("Object.assign cannot be called with null or undefined");
                return Object(t)
            }(t), a = 1; a < arguments.length; a++) {
                for (var o in i = Object(arguments[a])) D.call(i, o) && (n[o] = i[o]);
                if (O) {
                    s = O(i);
                    for (var r = 0; r < s.length; r++) B.call(i, s[r]) && (n[s[r]] = i[s[r]])
                }
            }
            return n
        };
    g.prototype = {
        on: function (t, e, i) {
            var s = this.e || (this.e = {});
            return (s[t] || (s[t] = [])).push({fn: e, ctx: i}), this
        }, once: function (t, e, i) {
            function s() {
                n.off(t, s), e.apply(i, arguments)
            }

            var n = this;
            return s._ = e, this.on(t, s, i)
        }, emit: function (t) {
            for (var e = [].slice.call(arguments, 1), i = ((this.e || (this.e = {}))[t] || []).slice(), s = 0, n = i.length; s < n; s++) i[s].fn.apply(i[s].ctx, e);
            return this
        }, off: function (t, e) {
            var i = this.e || (this.e = {}), s = i[t], n = [];
            if (s && e) for (var a = 0, o = s.length; a < o; a++) s[a].fn !== e && s[a].fn._ !== e && n.push(s[a]);
            return n.length ? i[t] = n : delete i[t], this
        }
    };
    var V = g, R = m(function (t, e) {
        (function () {
            (null !== e ? e : this).Lethargy = function () {
                function t(t, e, i, s) {
                    this.stability = null != t ? Math.abs(t) : 8, this.sensitivity = null != e ? 1 + Math.abs(e) : 100, this.tolerance = null != i ? 1 + Math.abs(i) : 1.1, this.delay = null != s ? s : 150, this.lastUpDeltas = function () {
                        var t, e, i;
                        for (i = [], t = 1, e = 2 * this.stability; 1 <= e ? t <= e : t >= e; 1 <= e ? t++ : t--) i.push(null);
                        return i
                    }.call(this), this.lastDownDeltas = function () {
                        var t, e, i;
                        for (i = [], t = 1, e = 2 * this.stability; 1 <= e ? t <= e : t >= e; 1 <= e ? t++ : t--) i.push(null);
                        return i
                    }.call(this), this.deltasTimestamp = function () {
                        var t, e, i;
                        for (i = [], t = 1, e = 2 * this.stability; 1 <= e ? t <= e : t >= e; 1 <= e ? t++ : t--) i.push(null);
                        return i
                    }.call(this)
                }

                return t.prototype.check = function (t) {
                    var e;
                    return null != (t = t.originalEvent || t).wheelDelta ? e = t.wheelDelta : null != t.deltaY ? e = -40 * t.deltaY : null == t.detail && 0 !== t.detail || (e = -40 * t.detail), this.deltasTimestamp.push(Date.now()), this.deltasTimestamp.shift(), e > 0 ? (this.lastUpDeltas.push(e), this.lastUpDeltas.shift(), this.isInertia(1)) : (this.lastDownDeltas.push(e), this.lastDownDeltas.shift(), this.isInertia(-1))
                }, t.prototype.isInertia = function (t) {
                    var e, i, s, n, a, o, r;
                    return null === (e = -1 === t ? this.lastDownDeltas : this.lastUpDeltas)[0] ? t : !(this.deltasTimestamp[2 * this.stability - 2] + this.delay > Date.now() && e[0] === e[2 * this.stability - 1]) && (s = e.slice(0, this.stability), i = e.slice(this.stability, 2 * this.stability), r = s.reduce(function (t, e) {
                        return t + e
                    }), a = i.reduce(function (t, e) {
                        return t + e
                    }), o = r / s.length, n = a / i.length, Math.abs(o) < Math.abs(n * this.tolerance) && this.sensitivity < Math.abs(n) && t)
                }, t.prototype.showLastUpDeltas = function () {
                    return this.lastUpDeltas
                }, t.prototype.showLastDownDeltas = function () {
                    return this.lastDownDeltas
                }, t
            }()
        }).call(A)
    }), F = {
        hasWheelEvent: "onwheel" in document,
        hasMouseWheelEvent: "onmousewheel" in document,
        hasTouch: "ontouchstart" in window || window.TouchEvent || window.DocumentTouch && document instanceof DocumentTouch,
        hasTouchWin: navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1,
        hasPointer: !!window.navigator.msPointerEnabled,
        hasKeyDown: "onkeydown" in document,
        isFirefox: navigator.userAgent.indexOf("Firefox") > -1
    }, Y = Object.prototype.toString, X = Object.prototype.hasOwnProperty, j = R.Lethargy, W = "virtualscroll", N = y;
    y.prototype._notify = function (t) {
        var e = this._event;
        e.x += e.deltaX, e.y += e.deltaY, this._emitter.emit(W, {
            x: e.x,
            y: e.y,
            deltaX: e.deltaX,
            deltaY: e.deltaY,
            originalEvent: t
        })
    }, y.prototype._onWheel = function (t) {
        var e = this.options;
        if (!this._lethargy || !1 !== this._lethargy.check(t)) {
            var i = this._event;
            i.deltaX = t.wheelDeltaX || -1 * t.deltaX, i.deltaY = t.wheelDeltaY || -1 * t.deltaY, F.isFirefox && 1 == t.deltaMode && (i.deltaX *= e.firefoxMultiplier, i.deltaY *= e.firefoxMultiplier), i.deltaX *= e.mouseMultiplier, i.deltaY *= e.mouseMultiplier, this._notify(t)
        }
    }, y.prototype._onMouseWheel = function (t) {
        if (!this.options.limitInertia || !1 !== this._lethargy.check(t)) {
            var e = this._event;
            e.deltaX = t.wheelDeltaX ? t.wheelDeltaX : 0, e.deltaY = t.wheelDeltaY ? t.wheelDeltaY : t.wheelDelta, this._notify(t)
        }
    }, y.prototype._onTouchStart = function (t) {
        var e = t.targetTouches ? t.targetTouches[0] : t;
        this.touchStartX = e.pageX, this.touchStartY = e.pageY
    }, y.prototype._onTouchMove = function (t) {
        var e = this.options;
        e.preventTouch && !t.target.classList.contains(e.unpreventTouchClass) && t.preventDefault();
        var i = this._event, s = t.targetTouches ? t.targetTouches[0] : t;
        i.deltaX = (s.pageX - this.touchStartX) * e.touchMultiplier, i.deltaY = (s.pageY - this.touchStartY) * e.touchMultiplier, this.touchStartX = s.pageX, this.touchStartY = s.pageY, this._notify(t)
    }, y.prototype._onKeyDown = function (t) {
        var e = this._event;
        e.deltaX = e.deltaY = 0;
        var i = window.innerHeight - 40;
        switch (t.keyCode) {
            case 37:
            case 38:
                e.deltaY = this.options.keyStep;
                break;
            case 39:
            case 40:
                e.deltaY = -this.options.keyStep;
                break;
            case t.shiftKey:
                e.deltaY = i;
                break;
            case 32:
                e.deltaY = -i;
                break;
            default:
                return
        }
        this._notify(t)
    }, y.prototype._bind = function () {
        F.hasWheelEvent && this.el.addEventListener("wheel", this._onWheel, this.listenerOptions), F.hasMouseWheelEvent && this.el.addEventListener("mousewheel", this._onMouseWheel, this.listenerOptions), F.hasTouch && this.options.useTouch && (this.el.addEventListener("touchstart", this._onTouchStart, this.listenerOptions), this.el.addEventListener("touchmove", this._onTouchMove, this.listenerOptions)), F.hasPointer && F.hasTouchWin && (this.bodyTouchAction = document.body.style.msTouchAction, document.body.style.msTouchAction = "none", this.el.addEventListener("MSPointerDown", this._onTouchStart, !0), this.el.addEventListener("MSPointerMove", this._onTouchMove, !0)), F.hasKeyDown && this.options.useKeyboard && document.addEventListener("keydown", this._onKeyDown)
    }, y.prototype._unbind = function () {
        F.hasWheelEvent && this.el.removeEventListener("wheel", this._onWheel), F.hasMouseWheelEvent && this.el.removeEventListener("mousewheel", this._onMouseWheel), F.hasTouch && (this.el.removeEventListener("touchstart", this._onTouchStart), this.el.removeEventListener("touchmove", this._onTouchMove)), F.hasPointer && F.hasTouchWin && (document.body.style.msTouchAction = this.bodyTouchAction, this.el.removeEventListener("MSPointerDown", this._onTouchStart, !0), this.el.removeEventListener("MSPointerMove", this._onTouchMove, !0)), F.hasKeyDown && this.options.useKeyboard && document.removeEventListener("keydown", this._onKeyDown)
    }, y.prototype.on = function (t, e) {
        this._emitter.on(W, t, e);
        var i = this._emitter.e;
        i && i[W] && 1 === i[W].length && this._bind()
    }, y.prototype.off = function (t, e) {
        this._emitter.off(W, t, e);
        var i = this._emitter.e;
        (!i[W] || i[W].length <= 0) && this._unbind()
    }, y.prototype.reset = function () {
        var t = this._event;
        t.x = 0, t.y = 0
    }, y.prototype.destroy = function () {
        this._emitter.off(), this._unbind()
    };
    var _ = "function" == typeof Float32Array, G = function (e) {
        function s() {
            var e, i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return t(this, s), history.scrollRestoration && (history.scrollRestoration = "manual"), window.scrollTo(0, 0), (e = n.call(this, i)).inertia && (e.lerp = .1 * e.inertia), e.isScrolling = !1, e.isDraggingScrollbar = !1, e.isTicking = !1, e.hasScrollTicking = !1, e.parallaxElements = {}, e.stop = !1, e.scrollbarContainer = i.scrollbarContainer, e.checkKey = e.checkKey.bind(c(e)), window.addEventListener("keydown", e.checkKey, !1), e
        }

        o(s, L);
        var n = h(s);
        return i(s, [{
            key: "init", value: function () {
                var t = this;
                this.html.classList.add(this.smoothClass), this.html.setAttribute("data-".concat(this.name, "-direction"), this.direction), this.instance = a({
                    delta: {
                        x: this.initPosition.x,
                        y: this.initPosition.y
                    }, scroll: {x: this.initPosition.x, y: this.initPosition.y}
                }, this.instance), this.vs = new N({
                    el: this.scrollFromAnywhere ? document : this.el,
                    mouseMultiplier: navigator.platform.indexOf("Win") > -1 ? 1 : .4,
                    firefoxMultiplier: this.firefoxMultiplier,
                    touchMultiplier: this.touchMultiplier,
                    useKeyboard: !1,
                    passive: !0
                }), this.vs.on(function (e) {
                    t.stop || t.isDraggingScrollbar || requestAnimationFrame(function () {
                        t.updateDelta(e), t.isScrolling || t.startScrolling()
                    })
                }), this.setScrollLimit(), this.initScrollBar(), this.addSections(), this.addElements(), this.checkScroll(!0), this.transformElements(!0, !0), d(r(s.prototype), "init", this).call(this)
            }
        }, {
            key: "setScrollLimit", value: function () {
                if (this.instance.limit.y = this.el.offsetHeight - this.windowHeight, "horizontal" === this.direction) {
                    for (var t = 0, e = this.el.children, i = 0; i < e.length; i++) t += e[i].offsetWidth;
                    this.instance.limit.x = t - this.windowWidth
                }
            }
        }, {
            key: "startScrolling", value: function () {
                this.startScrollTs = Date.now(), this.isScrolling = !0, this.checkScroll(), this.html.classList.add(this.scrollingClass)
            }
        }, {
            key: "stopScrolling", value: function () {
                cancelAnimationFrame(this.checkScrollRaf), this.scrollToRaf && (cancelAnimationFrame(this.scrollToRaf), this.scrollToRaf = null), this.isScrolling = !1, this.instance.scroll.y = Math.round(this.instance.scroll.y), this.html.classList.remove(this.scrollingClass)
            }
        }, {
            key: "checkKey", value: function (t) {
                var e = this;
                if (this.stop) 9 == t.keyCode && requestAnimationFrame(function () {
                    e.html.scrollTop = 0, document.body.scrollTop = 0, e.html.scrollLeft = 0, document.body.scrollLeft = 0
                }); else {
                    switch (t.keyCode) {
                        case 9:
                            requestAnimationFrame(function () {
                                e.html.scrollTop = 0, document.body.scrollTop = 0, e.html.scrollLeft = 0, document.body.scrollLeft = 0, e.scrollTo(document.activeElement, {offset: -window.innerHeight / 2})
                            });
                            break;
                        case 38:
                            this.instance.delta[this.directionAxis] -= 240;
                            break;
                        case 40:
                            this.instance.delta[this.directionAxis] += 240;
                            break;
                        case 33:
                            this.instance.delta[this.directionAxis] -= window.innerHeight;
                            break;
                        case 34:
                            this.instance.delta[this.directionAxis] += window.innerHeight;
                            break;
                        case 36:
                            this.instance.delta[this.directionAxis] -= this.instance.limit[this.directionAxis];
                            break;
                        case 35:
                            this.instance.delta[this.directionAxis] += this.instance.limit[this.directionAxis];
                            break;
                        case 32:
                            document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement || (t.shiftKey ? this.instance.delta[this.directionAxis] -= window.innerHeight : this.instance.delta[this.directionAxis] += window.innerHeight);
                            break;
                        default:
                            return
                    }
                    this.instance.delta[this.directionAxis] < 0 && (this.instance.delta[this.directionAxis] = 0), this.instance.delta[this.directionAxis] > this.instance.limit[this.directionAxis] && (this.instance.delta[this.directionAxis] = this.instance.limit[this.directionAxis]), this.stopScrolling(), this.isScrolling = !0, this.checkScroll(), this.html.classList.add(this.scrollingClass)
                }
            }
        }, {
            key: "checkScroll", value: function () {
                var t = this, e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                if (e || this.isScrolling || this.isDraggingScrollbar) {
                    this.hasScrollTicking || (this.checkScrollRaf = requestAnimationFrame(function () {
                        return t.checkScroll()
                    }), this.hasScrollTicking = !0), this.updateScroll();
                    var i = Math.abs(this.instance.delta[this.directionAxis] - this.instance.scroll[this.directionAxis]),
                        n = Date.now() - this.startScrollTs;
                    if (!this.animatingScroll && n > 100 && (i < .5 && 0 != this.instance.delta[this.directionAxis] || i < .5 && 0 == this.instance.delta[this.directionAxis]) && this.stopScrolling(), Object.entries(this.sections).forEach(function (i) {
                        var s = u(i, 2), n = (s[0], s[1]);
                        n.persistent || t.instance.scroll[t.directionAxis] > n.offset[t.directionAxis] && t.instance.scroll[t.directionAxis] < n.limit[t.directionAxis] ? ("horizontal" === t.direction ? t.transform(n.el, -t.instance.scroll[t.directionAxis], 0) : t.transform(n.el, 0, -t.instance.scroll[t.directionAxis]), n.inView || (n.inView = !0, n.el.style.opacity = 1, n.el.style.pointerEvents = "all", n.el.setAttribute("data-".concat(t.name, "-section-inview"), ""))) : ((n.inView || e) && (n.inView = !1, n.el.style.opacity = 0, n.el.style.pointerEvents = "none", n.el.removeAttribute("data-".concat(t.name, "-section-inview"))), t.transform(n.el, 0, 0))
                    }), this.getDirection && this.addDirection(), this.getSpeed && (this.addSpeed(), this.speedTs = Date.now()), this.detectElements(), this.transformElements(), this.hasScrollbar) {
                        var a = this.instance.scroll[this.directionAxis] / this.instance.limit[this.directionAxis] * this.scrollBarLimit[this.directionAxis];
                        "horizontal" === this.direction ? this.transform(this.scrollbarThumb, a, 0) : this.transform(this.scrollbarThumb, 0, a)
                    }
                    d(r(s.prototype), "checkScroll", this).call(this), this.hasScrollTicking = !1
                }
            }
        }, {
            key: "resize", value: function () {
                this.windowHeight = window.innerHeight, this.windowWidth = window.innerWidth, this.checkContext(), this.windowMiddle = {
                    x: this.windowWidth / 2,
                    y: this.windowHeight / 2
                }, this.update()
            }
        }, {
            key: "updateDelta", value: function (t) {
                var e,
                    i = this[this.context] && this[this.context].gestureDirection ? this[this.context].gestureDirection : this.gestureDirection;
                e = "both" === i ? t.deltaX + t.deltaY : "vertical" === i ? t.deltaY : "horizontal" === i ? t.deltaX : t.deltaY, this.instance.delta[this.directionAxis] -= e * this.multiplier, this.instance.delta[this.directionAxis] < 0 && (this.instance.delta[this.directionAxis] = 0), this.instance.delta[this.directionAxis] > this.instance.limit[this.directionAxis] && (this.instance.delta[this.directionAxis] = this.instance.limit[this.directionAxis])
            }
        }, {
            key: "updateScroll", value: function (t) {
                this.isScrolling || this.isDraggingScrollbar ? this.instance.scroll[this.directionAxis] = w(this.instance.scroll[this.directionAxis], this.instance.delta[this.directionAxis], this.lerp) : this.instance.scroll[this.directionAxis] > this.instance.limit[this.directionAxis] ? this.setScroll(this.instance.scroll[this.directionAxis], this.instance.limit[this.directionAxis]) : this.instance.scroll.y < 0 ? this.setScroll(this.instance.scroll[this.directionAxis], 0) : this.setScroll(this.instance.scroll[this.directionAxis], this.instance.delta[this.directionAxis])
            }
        }, {
            key: "addDirection", value: function () {
                this.instance.delta.y > this.instance.scroll.y ? "down" !== this.instance.direction && (this.instance.direction = "down") : this.instance.delta.y < this.instance.scroll.y && "up" !== this.instance.direction && (this.instance.direction = "up"), this.instance.delta.x > this.instance.scroll.x ? "right" !== this.instance.direction && (this.instance.direction = "right") : this.instance.delta.x < this.instance.scroll.x && "left" !== this.instance.direction && (this.instance.direction = "left")
            }
        }, {
            key: "addSpeed", value: function () {
                this.instance.delta[this.directionAxis] != this.instance.scroll[this.directionAxis] ? this.instance.speed = (this.instance.delta[this.directionAxis] - this.instance.scroll[this.directionAxis]) / Math.max(1, Date.now() - this.speedTs) : this.instance.speed = 0
            }
        }, {
            key: "initScrollBar", value: function () {
                if (this.scrollbar = document.createElement("span"), this.scrollbarThumb = document.createElement("span"), this.scrollbar.classList.add("".concat(this.scrollbarClass)), this.scrollbarThumb.classList.add("".concat(this.scrollbarClass, "_thumb")), this.scrollbar.append(this.scrollbarThumb), this.scrollbarContainer ? this.scrollbarContainer.append(this.scrollbar) : document.body.append(this.scrollbar), this.getScrollBar = this.getScrollBar.bind(this), this.releaseScrollBar = this.releaseScrollBar.bind(this), this.moveScrollBar = this.moveScrollBar.bind(this), this.scrollbarThumb.addEventListener("mousedown", this.getScrollBar), window.addEventListener("mouseup", this.releaseScrollBar), window.addEventListener("mousemove", this.moveScrollBar), this.hasScrollbar = !1, "horizontal" == this.direction) {
                    if (this.instance.limit.x + this.windowWidth <= this.windowWidth) return
                } else if (this.instance.limit.y + this.windowHeight <= this.windowHeight) return;
                this.hasScrollbar = !0, this.scrollbarBCR = this.scrollbar.getBoundingClientRect(), this.scrollbarHeight = this.scrollbarBCR.height, this.scrollbarWidth = this.scrollbarBCR.width, "horizontal" === this.direction ? this.scrollbarThumb.style.width = "".concat(this.scrollbarWidth * this.scrollbarWidth / (this.instance.limit.x + this.scrollbarWidth), "px") : this.scrollbarThumb.style.height = "".concat(this.scrollbarHeight * this.scrollbarHeight / (this.instance.limit.y + this.scrollbarHeight), "px"), this.scrollbarThumbBCR = this.scrollbarThumb.getBoundingClientRect(), this.scrollBarLimit = {
                    x: this.scrollbarWidth - this.scrollbarThumbBCR.width,
                    y: this.scrollbarHeight - this.scrollbarThumbBCR.height
                }
            }
        }, {
            key: "reinitScrollBar", value: function () {
                if (this.hasScrollbar = !1, "horizontal" == this.direction) {
                    if (this.instance.limit.x + this.windowWidth <= this.windowWidth) return
                } else if (this.instance.limit.y + this.windowHeight <= this.windowHeight) return;
                this.hasScrollbar = !0, this.scrollbarBCR = this.scrollbar.getBoundingClientRect(), this.scrollbarHeight = this.scrollbarBCR.height, this.scrollbarWidth = this.scrollbarBCR.width, "horizontal" === this.direction ? this.scrollbarThumb.style.width = "".concat(this.scrollbarWidth * this.scrollbarWidth / (this.instance.limit.x + this.scrollbarWidth), "px") : this.scrollbarThumb.style.height = "".concat(this.scrollbarHeight * this.scrollbarHeight / (this.instance.limit.y + this.scrollbarHeight), "px"), this.scrollbarThumbBCR = this.scrollbarThumb.getBoundingClientRect(), this.scrollBarLimit = {
                    x: this.scrollbarWidth - this.scrollbarThumbBCR.width,
                    y: this.scrollbarHeight - this.scrollbarThumbBCR.height
                }
            }
        }, {
            key: "destroyScrollBar", value: function () {
                this.scrollbarThumb.removeEventListener("mousedown", this.getScrollBar), window.removeEventListener("mouseup", this.releaseScrollBar), window.removeEventListener("mousemove", this.moveScrollBar), this.scrollbar.remove()
            }
        }, {
            key: "getScrollBar", value: function (t) {
                this.isDraggingScrollbar = !0, this.checkScroll(), this.html.classList.remove(this.scrollingClass), this.html.classList.add(this.draggingClass)
            }
        }, {
            key: "releaseScrollBar", value: function (t) {
                this.isDraggingScrollbar = !1, this.html.classList.add(this.scrollingClass), this.html.classList.remove(this.draggingClass)
            }
        }, {
            key: "moveScrollBar", value: function (t) {
                var e = this;
                this.isDraggingScrollbar && requestAnimationFrame(function () {
                    var i = 100 * (t.clientX - e.scrollbarBCR.left) / e.scrollbarWidth * e.instance.limit.x / 100,
                        s = 100 * (t.clientY - e.scrollbarBCR.top) / e.scrollbarHeight * e.instance.limit.y / 100;
                    s > 0 && s < e.instance.limit.y && (e.instance.delta.y = s), i > 0 && i < e.instance.limit.x && (e.instance.delta.x = i)
                })
            }
        }, {
            key: "addElements", value: function () {
                var t = this;
                this.els = {}, this.parallaxElements = {}, this.el.querySelectorAll("[data-".concat(this.name, "]")).forEach(function (e, i) {
                    var s, n, a, o = S(e), r = Object.entries(t.sections).map(function (t) {
                            var e = u(t, 2);
                            return e[0], e[1]
                        }).find(function (t) {
                            return o.includes(t.el)
                        }), l = e.dataset[t.name + "Class"] || t.class,
                        c = "string" == typeof e.dataset[t.name + "Id"] ? e.dataset[t.name + "Id"] : "el" + i,
                        h = e.dataset[t.name + "Repeat"], d = e.dataset[t.name + "Call"],
                        p = e.dataset[t.name + "Position"], f = e.dataset[t.name + "Delay"],
                        v = e.dataset[t.name + "Direction"], m = "string" == typeof e.dataset[t.name + "Sticky"],
                        g = !!e.dataset[t.name + "Speed"] && parseFloat(e.dataset[t.name + "Speed"]) / 10,
                        b = "string" == typeof e.dataset[t.name + "Offset"] ? e.dataset[t.name + "Offset"].split(",") : t.offset,
                        y = e.dataset[t.name + "Target"],
                        w = (a = void 0 !== y ? document.querySelector("".concat(y)) : e).getBoundingClientRect();
                    null === r || r.inView ? (s = w.top + t.instance.scroll.y - x(a).y, n = w.left + t.instance.scroll.x - x(a).x) : (s = w.top - x(r.el).y - x(a).y, n = w.left - x(r.el).x - x(a).x);
                    var T = s + a.offsetHeight, E = n + a.offsetWidth, C = {x: (E - n) / 2 + n, y: (T - s) / 2 + s};
                    if (m) {
                        var M = e.getBoundingClientRect(), k = M.top, P = M.left, $ = {x: P - n, y: k - s};
                        s += window.innerHeight, n += window.innerWidth, T = k + a.offsetHeight - e.offsetHeight - $[t.directionAxis], C = {
                            x: ((E = P + a.offsetWidth - e.offsetWidth - $[t.directionAxis]) - n) / 2 + n,
                            y: (T - s) / 2 + s
                        }
                    }
                    h = "false" != h && (null != h || t.repeat);
                    var L = [0, 0];
                    if (b) if ("horizontal" === t.direction) {
                        for (var A = 0; A < b.length; A++) "string" == typeof b[A] ? b[A].includes("%") ? L[A] = parseInt(b[A].replace("%", "") * t.windowWidth / 100) : L[A] = parseInt(b[A]) : L[A] = b[A];
                        n += L[0], E -= L[1]
                    } else {
                        for (A = 0; A < b.length; A++) "string" == typeof b[A] ? b[A].includes("%") ? L[A] = parseInt(b[A].replace("%", "") * t.windowHeight / 100) : L[A] = parseInt(b[A]) : L[A] = b[A];
                        s += L[0], T -= L[1]
                    }
                    var z = {
                        el: e,
                        id: c,
                        class: l,
                        section: r,
                        top: s,
                        middle: C,
                        bottom: T,
                        left: n,
                        right: E,
                        offset: b,
                        progress: 0,
                        repeat: h,
                        inView: !1,
                        call: d,
                        speed: g,
                        delay: f,
                        position: p,
                        target: a,
                        direction: v,
                        sticky: m
                    };
                    t.els[c] = z, e.classList.contains(l) && t.setInView(t.els[c], c), (!1 !== g || m) && (t.parallaxElements[c] = z)
                })
            }
        }, {
            key: "addSections", value: function () {
                var t = this;
                this.sections = {};
                var e = this.el.querySelectorAll("[data-".concat(this.name, "-section]"));
                0 === e.length && (e = [this.el]), e.forEach(function (e, i) {
                    var s = "string" == typeof e.dataset[t.name + "Id"] ? e.dataset[t.name + "Id"] : "section" + i,
                        n = e.getBoundingClientRect(), a = {
                            x: n.left - 1.5 * window.innerWidth - x(e).x,
                            y: n.top - 1.5 * window.innerHeight - x(e).y
                        }, o = {x: a.x + n.width + 2 * window.innerWidth, y: a.y + n.height + 2 * window.innerHeight},
                        r = "string" == typeof e.dataset[t.name + "Persistent"];
                    e.setAttribute("data-scroll-section-id", s);
                    var l = {el: e, offset: a, limit: o, inView: !1, persistent: r, id: s};
                    t.sections[s] = l
                })
            }
        }, {
            key: "transform", value: function (t, e, i, s) {
                var n;
                if (s) {
                    var a = x(t), o = w(a.x, e, s), r = w(a.y, i, s);
                    n = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(o, ",").concat(r, ",0,1)")
                } else n = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(e, ",").concat(i, ",0,1)");
                t.style.webkitTransform = n, t.style.msTransform = n, t.style.transform = n
            }
        }, {
            key: "transformElements", value: function (t) {
                var e = this, i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                    s = this.instance.scroll.x + this.windowWidth, n = this.instance.scroll.y + this.windowHeight, a = {
                        x: this.instance.scroll.x + this.windowMiddle.x,
                        y: this.instance.scroll.y + this.windowMiddle.y
                    };
                Object.entries(this.parallaxElements).forEach(function (o) {
                    var r = u(o, 2), l = (r[0], r[1]), c = !1;
                    if (t && (c = 0), l.inView || i) switch (l.position) {
                        case"top":
                            c = e.instance.scroll[e.directionAxis] * -l.speed;
                            break;
                        case"elementTop":
                            c = (n - l.top) * -l.speed;
                            break;
                        case"bottom":
                            c = (e.instance.limit[e.directionAxis] - n + e.windowHeight) * l.speed;
                            break;
                        case"left":
                            c = e.instance.scroll[e.directionAxis] * -l.speed;
                            break;
                        case"elementLeft":
                            c = (s - l.left) * -l.speed;
                            break;
                        case"right":
                            c = (e.instance.limit[e.directionAxis] - s + e.windowHeight) * l.speed;
                            break;
                        default:
                            c = (a[e.directionAxis] - l.middle[e.directionAxis]) * -l.speed
                    }
                    l.sticky && (c = l.inView ? "horizontal" === e.direction ? e.instance.scroll.x - l.left + window.innerWidth : e.instance.scroll.y - l.top + window.innerHeight : "horizontal" === e.direction ? e.instance.scroll.x < l.left - window.innerWidth && e.instance.scroll.x < l.left - window.innerWidth / 2 ? 0 : e.instance.scroll.x > l.right && e.instance.scroll.x > l.right + 100 && l.right - l.left + window.innerWidth : e.instance.scroll.y < l.top - window.innerHeight && e.instance.scroll.y < l.top - window.innerHeight / 2 ? 0 : e.instance.scroll.y > l.bottom && e.instance.scroll.y > l.bottom + 100 && l.bottom - l.top + window.innerHeight), !1 !== c && ("horizontal" === l.direction || "horizontal" === e.direction && "vertical" !== l.direction ? e.transform(l.el, c, 0, !t && l.delay) : e.transform(l.el, 0, c, !t && l.delay))
                })
            }
        }, {
            key: "scrollTo", value: function (t) {
                var e = this, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    s = parseInt(i.offset) || 0, n = isNaN(parseInt(i.duration)) ? 1e3 : parseInt(i.duration),
                    a = i.easing || [.25, 0, .35, 1], o = !!i.disableLerp, r = !!i.callback && i.callback;
                if (a = function (t, e, i, s) {
                    function n(e) {
                        for (var s = 0, n = 1; 10 !== n && a[n] <= e; ++n) s += .1;
                        var o = s + (e - a[--n]) / (a[n + 1] - a[n]) * .1, r = k(o, t, i);
                        return r >= .001 ? function (t, e, i, s) {
                            for (var n = 0; n < 4; ++n) {
                                var a = k(e, i, s);
                                if (0 === a) return e;
                                e -= (M(e, i, s) - t) / a
                            }
                            return e
                        }(e, o, t, i) : 0 === r ? o : function (t, e, i, s, n) {
                            var a, o, r = 0;
                            do {
                                (a = M(o = e + (i - e) / 2, s, n) - t) > 0 ? i = o : e = o
                            } while (Math.abs(a) > 1e-7 && ++r < 10);
                            return o
                        }(e, s, s + .1, t, i)
                    }

                    if (!(0 <= t && t <= 1 && 0 <= i && i <= 1)) throw new Error("bezier x values must be in [0, 1] range");
                    if (t === e && i === s) return P;
                    for (var a = _ ? new Float32Array(11) : new Array(11), o = 0; o < 11; ++o) a[o] = M(.1 * o, t, i);
                    return function (t) {
                        return 0 === t ? 0 : 1 === t ? 1 : M(n(t), e, s)
                    }
                }.apply(void 0, p(a)), "string" == typeof t) {
                    if ("top" === t) t = 0; else if ("bottom" === t) t = this.instance.limit.y; else if ("left" === t) t = 0; else if ("right" === t) t = this.instance.limit.x; else if (!(t = document.querySelector(t))) return
                } else if ("number" == typeof t) t = parseInt(t); else if (!t || !t.tagName) return void console.warn("`target` parameter is not valid");
                if ("number" != typeof t) {
                    if (!S(t).includes(this.el)) return;
                    var l = t.getBoundingClientRect(), c = l.top, h = l.left, d = S(t).find(function (t) {
                        return Object.entries(e.sections).map(function (t) {
                            var e = u(t, 2);
                            return e[0], e[1]
                        }).find(function (e) {
                            return e.el == t
                        })
                    }), f = 0;
                    f = d ? x(d)[this.directionAxis] : -this.instance.scroll[this.directionAxis], s = "horizontal" === this.direction ? h + s - f : c + s - f
                } else s = t + s;
                var v = parseFloat(this.instance.delta[this.directionAxis]),
                    m = Math.max(0, Math.min(s, this.instance.limit[this.directionAxis])) - v, g = function (t) {
                        o ? "horizontal" === e.direction ? e.setScroll(v + m * t, e.instance.delta.y) : e.setScroll(e.instance.delta.x, v + m * t) : e.instance.delta[e.directionAxis] = v + m * t
                    };
                this.animatingScroll = !0, this.stopScrolling(), this.startScrolling();
                var b = Date.now();
                !function t() {
                    var i = (Date.now() - b) / n;
                    i > 1 ? (g(1), e.animatingScroll = !1, 0 == n && e.update(), r && r()) : (e.scrollToRaf = requestAnimationFrame(t), g(a(i)))
                }()
            }
        }, {
            key: "update", value: function () {
                this.setScrollLimit(), this.addSections(), this.addElements(), this.detectElements(), this.updateScroll(), this.transformElements(!0), this.reinitScrollBar(), this.checkScroll(!0)
            }
        }, {
            key: "startScroll", value: function () {
                this.stop = !1
            }
        }, {
            key: "stopScroll", value: function () {
                this.stop = !0
            }
        }, {
            key: "setScroll", value: function (t, e) {
                this.instance = a(a({}, this.instance), {}, {scroll: {x: t, y: e}, delta: {x: t, y: e}, speed: 0})
            }
        }, {
            key: "destroy", value: function () {
                d(r(s.prototype), "destroy", this).call(this), this.stopScrolling(), this.html.classList.remove(this.smoothClass), this.vs.destroy(), this.destroyScrollBar(), window.removeEventListener("keydown", this.checkKey, !1)
            }
        }]), s
    }();
    return function () {
        function e() {
            var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            t(this, e), this.options = i, Object.assign(this, $, i), this.smartphone = $.smartphone, i.smartphone && Object.assign(this.smartphone, i.smartphone), this.tablet = $.tablet, i.tablet && Object.assign(this.tablet, i.tablet), this.smooth || "horizontal" != this.direction || console.warn("🚨 `smooth:false` & `horizontal` direction are not yet compatible"), this.tablet.smooth || "horizontal" != this.tablet.direction || console.warn("🚨 `smooth:false` & `horizontal` direction are not yet compatible (tablet)"), this.smartphone.smooth || "horizontal" != this.smartphone.direction || console.warn("🚨 `smooth:false` & `horizontal` direction are not yet compatible (smartphone)"), this.init()
        }

        return i(e, [{
            key: "init", value: function () {
                if (this.options.isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1 || window.innerWidth < this.tablet.breakpoint, this.options.isTablet = this.options.isMobile && window.innerWidth >= this.tablet.breakpoint, this.smooth && !this.options.isMobile || this.tablet.smooth && this.options.isTablet || this.smartphone.smooth && this.options.isMobile && !this.options.isTablet ? this.scroll = new G(this.options) : this.scroll = new I(this.options), this.scroll.init(), window.location.hash) {
                    var t = window.location.hash.slice(1, window.location.hash.length), e = document.getElementById(t);
                    e && this.scroll.scrollTo(e)
                }
            }
        }, {
            key: "update", value: function () {
                this.scroll.update()
            }
        }, {
            key: "start", value: function () {
                this.scroll.startScroll()
            }
        }, {
            key: "stop", value: function () {
                this.scroll.stopScroll()
            }
        }, {
            key: "scrollTo", value: function (t, e) {
                this.scroll.scrollTo(t, e)
            }
        }, {
            key: "setScroll", value: function (t, e) {
                this.scroll.setScroll(t, e)
            }
        }, {
            key: "on", value: function (t, e) {
                this.scroll.setEvents(t, e)
            }
        }, {
            key: "off", value: function (t, e) {
                this.scroll.unsetEvents(t, e)
            }
        }, {
            key: "destroy", value: function () {
                this.scroll.destroy()
            }
        }]), e
    }()
}), function (t, e, i, s) {
    "use strict";

    function n(t) {
        var e = i(t.currentTarget), s = t.data ? t.data.options : {}, n = e.attr("data-fancybox") || "", a = 0, o = [];
        t.isDefaultPrevented() || (t.preventDefault(), n ? (o = s.selector ? i(s.selector) : t.data ? t.data.items : [], o = o.length ? o.filter('[data-fancybox="' + n + '"]') : i('[data-fancybox="' + n + '"]'), (a = o.index(e)) < 0 && (a = 0)) : o = [e], i.fancybox.open(o, s, a))
    }

    if (i) {
        if (i.fn.fancybox) return void ("console" in t && console.log("fancyBox already initialized"));
        var a = {
                loop: !1,
                margin: [44, 0],
                gutter: 50,
                keyboard: !0,
                arrows: !0,
                infobar: !0,
                toolbar: !0,
                buttons: ["slideShow", "fullScreen", "thumbs", "close"],
                idleTime: 4,
                smallBtn: "auto",
                protect: !1,
                modal: !1,
                image: {preload: "auto"},
                ajax: {settings: {data: {fancybox: !0}}},
                iframe: {
                    tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',
                    preload: !0,
                    css: {},
                    attr: {scrolling: "auto"}
                },
                animationEffect: "zoom",
                animationDuration: 500,
                zoomOpacity: "auto",
                transitionEffect: "fade",
                transitionDuration: 366,
                slideClass: "",
                baseClass: "",
                baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div></div></div>',
                spinnerTpl: '<div class="fancybox-loading"></div>',
                errorTpl: '<div class="fancybox-error"><p>{{ERROR}}<p></div>',
                btnTpl: {
                    download: '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}"><svg viewBox="0 0 40 40"><path d="M20,23 L20,8 L20,23 L13,16 L20,23 L27,16 L20,23 M9,28 L31,28" /></svg></a>',
                    slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg viewBox="0 0 40 40"><path d="M13,12 L27,20 L13,27 Z" /><path d="M15,10 v19 M23,10 v19" /></svg></button>',
                    fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}"><svg viewBox="0 0 40 40"><path d="M9,12 h22 v16 h-22 v-16 v16 h22 v-16 Z" /></svg></button>',
                    thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg viewBox="0 0 120 120"><path d="M30,30 h14 v14 h-14 Z M50,30 h14 v14 h-14 Z M70,30 h14 v14 h-14 Z M30,50 h14 v14 h-14 Z M50,50 h14 v14 h-14 Z M70,50 h14 v14 h-14 Z M30,70 h14 v14 h-14 Z M50,70 h14 v14 h-14 Z M70,70 h14 v14 h-14 Z" /></svg></button>',
                    close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg viewBox="0 0 40 40"><path d="M10,10 L30,30 M30,10 L10,30" /></svg></button>',
                    smallBtn: '<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"></button>',
                    arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><svg viewBox="0 0 40 40"><path d="M10,20 L30,20 L10,20 L18,28 L10,20 L18,12 L10,20"></path></svg></button>',
                    arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><svg viewBox="0 0 40 40"><path d="M30,20 L10,20 L30,20 L22,28 L30,20 L22,12 L30,20"></path></svg></button>'
                },
                parentEl: "body",
                autoFocus: !0,
                backFocus: !0,
                trapFocus: !0,
                fullScreen: {autoStart: !1},
                touch: {vertical: !0, momentum: !0},
                hash: null,
                media: {},
                slideShow: {autoStart: !1, speed: 4e3},
                thumbs: {autoStart: !1, hideOnClose: !0},
                onInit: i.noop,
                beforeLoad: i.noop,
                afterLoad: i.noop,
                beforeShow: i.noop,
                afterShow: i.noop,
                beforeClose: i.noop,
                afterClose: i.noop,
                onActivate: i.noop,
                onDeactivate: i.noop,
                clickContent: function (t, e) {
                    return "image" === t.type && "zoom"
                },
                clickSlide: "close",
                clickOutside: "close",
                dblclickContent: !1,
                dblclickSlide: !1,
                dblclickOutside: !1,
                mobile: {
                    clickContent: function (t, e) {
                        return "image" === t.type && "toggleControls"
                    }, clickSlide: function (t, e) {
                        return "image" === t.type ? "toggleControls" : "close"
                    }, dblclickContent: function (t, e) {
                        return "image" === t.type && "zoom"
                    }, dblclickSlide: function (t, e) {
                        return "image" === t.type && "zoom"
                    }
                },
                lang: "en",
                i18n: {
                    en: {
                        CLOSE: "Close",
                        NEXT: "Next",
                        PREV: "Previous",
                        ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
                        PLAY_START: "幻灯片播放",
                        PLAY_STOP: "停止播放",
                        FULL_SCREEN: "全屏展示",
                        THUMBS: "显示缩略图",
                        DOWNLOAD: "Download",
                        SHARE: "Share"
                    },
                    de: {
                        CLOSE: "Schliessen",
                        NEXT: "Weiter",
                        PREV: "Zurück",
                        ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.",
                        PLAY_START: "Diaschau starten",
                        PLAY_STOP: "Diaschau beenden",
                        FULL_SCREEN: "Vollbild",
                        THUMBS: "Vorschaubilder",
                        DOWNLOAD: "Herunterladen",
                        SHARE: "Teilen"
                    }
                }
            }, o = i(t), r = i(e), l = 0,
            c = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function (e) {
                return t.setTimeout(e, 1e3 / 60)
            }, h = function () {
                var t, i = e.createElement("fakeelement"), n = {
                    transition: "transitionend",
                    OTransition: "oTransitionEnd",
                    MozTransition: "transitionend",
                    WebkitTransition: "webkitTransitionEnd"
                };
                for (t in n) if (i.style[t] !== s) return n[t]
            }(), d = function (t) {
                return t && t.length && t[0].offsetHeight
            }, u = function (t, s, n) {
                var o = this;
                o.opts = i.extend(!0, {index: n}, a, s || {}), i.fancybox.isMobile && (o.opts = i.extend(!0, {}, o.opts, o.opts.mobile)), s && i.isArray(s.buttons) && (o.opts.buttons = s.buttons), o.id = o.opts.id || ++l, o.group = [], o.currIndex = parseInt(o.opts.index, 10) || 0, o.prevIndex = null, o.prevPos = null, o.currPos = 0, o.firstRun = null, o.createGroup(t), o.group.length && (o.$lastFocus = i(e.activeElement).blur(), o.slides = {}, o.init(t))
            };
        i.extend(u.prototype, {
            init: function () {
                var n, a, o, l = this, c = l.group[l.currIndex], h = c.opts, d = i.fancybox.scrollbarWidth;
                l.scrollTop = r.scrollTop(), l.scrollLeft = r.scrollLeft(), i.fancybox.getInstance() || (i("body").addClass("fancybox-active"), /iPad|iPhone|iPod/.test(navigator.userAgent) && !t.MSStream ? "image" !== c.type && i("body").css("top", -1 * i("body").scrollTop()).addClass("fancybox-iosfix") : !i.fancybox.isMobile && e.body.scrollHeight > t.innerHeight && (d === s && (n = i('<div style="width:50px;height:50px;overflow:scroll;" />').appendTo("body"), d = i.fancybox.scrollbarWidth = n[0].offsetWidth - n[0].clientWidth, n.remove()), i("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar { margin-right: ' + d + "px; }</style>"), i("body").addClass("compensate-for-scrollbar"))), o = "", i.each(h.buttons, function (t, e) {
                    o += h.btnTpl[e] || ""
                }), a = i(l.translate(l, h.baseTpl.replace("{{buttons}}", o).replace("{{arrows}}", h.btnTpl.arrowLeft + h.btnTpl.arrowRight))).attr("id", "fancybox-container-" + l.id).addClass("fancybox-is-hidden").addClass(h.baseClass).data("FancyBox", l).prependTo(h.parentEl), l.$refs = {container: a}, ["bg", "inner", "infobar", "toolbar", "stage", "caption"].forEach(function (t) {
                    l.$refs[t] = a.find(".fancybox-" + t)
                }), l.trigger("onInit"), l.activate(), l.jumpTo(l.currIndex)
            }, translate: function (t, e) {
                var i = t.opts.i18n[t.opts.lang];
                return e.replace(/\{\{(\w+)\}\}/g, function (t, e) {
                    var n = i[e];
                    return n === s ? t : n
                })
            }, createGroup: function (t) {
                var e = this, n = i.makeArray(t);
                i.each(n, function (t, n) {
                    var a, o, r, l, c = {}, h = {};
                    i.isPlainObject(n) ? (c = n, h = n.opts || n) : "object" === i.type(n) && i(n).length ? (a = i(n), h = a.data(), h = i.extend({}, h, h.options || {}), h.$orig = a, c.src = h.src || a.attr("href"), c.type || c.src || (c.type = "inline", c.src = n)) : c = {
                        type: "html",
                        src: n + ""
                    }, c.opts = i.extend(!0, {}, e.opts, h), i.isArray(h.buttons) && (c.opts.buttons = h.buttons), o = c.type || c.opts.type, r = c.src || "", !o && r && (r.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? o = "image" : r.match(/\.(pdf)((\?|#).*)?$/i) ? o = "pdf" : "#" === r.charAt(0) && (o = "inline")), c.type = o, c.index = e.group.length, c.opts.$orig && !c.opts.$orig.length && delete c.opts.$orig, !c.opts.$thumb && c.opts.$orig && (c.opts.$thumb = c.opts.$orig.find("img:first")), c.opts.$thumb && !c.opts.$thumb.length && delete c.opts.$thumb, "function" === i.type(c.opts.caption) && (c.opts.caption = c.opts.caption.apply(n, [e, c])), c.opts.caption && (c.opts.caption = c.opts.caption === s ? "" : c.opts.caption + ""), "ajax" === o && (l = r.split(/\s+/, 2)).length > 1 && (c.src = l.shift(), c.opts.filter = l.shift()), "auto" == c.opts.smallBtn && (i.inArray(o, ["html", "inline", "ajax"]) > -1 ? (c.opts.toolbar = !1, c.opts.smallBtn = !0) : c.opts.smallBtn = !1), "pdf" === o && (c.type = "iframe", c.opts.iframe.preload = !1), c.opts.modal && (c.opts = i.extend(!0, c.opts, {
                        infobar: 0,
                        toolbar: 0,
                        smallBtn: 0,
                        keyboard: 0,
                        slideShow: 0,
                        fullScreen: 0,
                        thumbs: 0,
                        touch: 0,
                        clickContent: !1,
                        clickSlide: !1,
                        clickOutside: !1,
                        dblclickContent: !1,
                        dblclickSlide: !1,
                        dblclickOutside: !1
                    })), e.group.push(c)
                })
            }, addEvents: function () {
                var s = this;
                s.removeEvents(), s.$refs.container.on("click.fb-close", "[data-fancybox-close]", function (t) {
                    t.stopPropagation(), t.preventDefault(), s.close(t)
                }).on("click.fb-prev touchend.fb-prev", "[data-fancybox-prev]", function (t) {
                    t.stopPropagation(), t.preventDefault(), s.previous()
                }).on("click.fb-next touchend.fb-next", "[data-fancybox-next]", function (t) {
                    t.stopPropagation(), t.preventDefault(), s.next()
                }), o.on("orientationchange.fb resize.fb", function (t) {
                    t && t.originalEvent && "resize" === t.originalEvent.type ? c(function () {
                        s.update()
                    }) : (s.$refs.stage.hide(), setTimeout(function () {
                        s.$refs.stage.show(), s.update()
                    }, 600))
                }), r.on("focusin.fb", function (t) {
                    var n = i.fancybox ? i.fancybox.getInstance() : null;
                    n.isClosing || !n.current || !n.current.opts.trapFocus || i(t.target).hasClass("fancybox-container") || i(t.target).is(e) || n && "fixed" !== i(t.target).css("position") && !n.$refs.container.has(t.target).length && (t.stopPropagation(), n.focus(), o.scrollTop(s.scrollTop).scrollLeft(s.scrollLeft))
                }), r.on("keydown.fb", function (t) {
                    var e = s.current, n = t.keyCode || t.which;
                    if (e && e.opts.keyboard && !i(t.target).is("input") && !i(t.target).is("textarea")) return 8 === n || 27 === n ? (t.preventDefault(), void s.close(t)) : 37 === n || 38 === n ? (t.preventDefault(), void s.previous()) : 39 === n || 40 === n ? (t.preventDefault(), void s.next()) : void s.trigger("afterKeydown", t, n)
                }), s.group[s.currIndex].opts.idleTime && (s.idleSecondsCounter = 0, r.on("mousemove.fb-idle mouseenter.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle", function () {
                    s.idleSecondsCounter = 0, s.isIdle && s.showControls(), s.isIdle = !1
                }), s.idleInterval = t.setInterval(function () {
                    s.idleSecondsCounter++, s.idleSecondsCounter >= s.group[s.currIndex].opts.idleTime && (s.isIdle = !0, s.idleSecondsCounter = 0, s.hideControls())
                }, 1e3))
            }, removeEvents: function () {
                var e = this;
                o.off("orientationchange.fb resize.fb"), r.off("focusin.fb keydown.fb .fb-idle"), this.$refs.container.off(".fb-close .fb-prev .fb-next"), e.idleInterval && (t.clearInterval(e.idleInterval), e.idleInterval = null)
            }, previous: function (t) {
                return this.jumpTo(this.currPos - 1, t)
            }, next: function (t) {
                return this.jumpTo(this.currPos + 1, t)
            }, jumpTo: function (t, e, n) {
                var a, o, r, l, c, h, u, p = this, f = p.group.length;
                if (!(p.isSliding || p.isClosing || p.isAnimating && p.firstRun)) {
                    if (t = parseInt(t, 10), !(o = p.current ? p.current.opts.loop : p.opts.loop) && (t < 0 || t >= f)) return !1;
                    if (a = p.firstRun = null === p.firstRun, !(f < 2 && !a && p.isSliding)) {
                        if (l = p.current, p.prevIndex = p.currIndex, p.prevPos = p.currPos, r = p.createSlide(t), f > 1 && ((o || r.index > 0) && p.createSlide(t - 1), (o || r.index < f - 1) && p.createSlide(t + 1)), p.current = r, p.currIndex = r.index, p.currPos = r.pos, p.trigger("beforeShow", a), p.updateControls(), h = i.fancybox.getTranslate(r.$slide), r.isMoved = (0 !== h.left || 0 !== h.top) && !r.$slide.hasClass("fancybox-animated"), r.forcedDuration = s, i.isNumeric(e) ? r.forcedDuration = e : e = r.opts[a ? "animationDuration" : "transitionDuration"], e = parseInt(e, 10), a) return r.opts.animationEffect && e && p.$refs.container.css("transition-duration", e + "ms"), p.$refs.container.removeClass("fancybox-is-hidden"), d(p.$refs.container), p.$refs.container.addClass("fancybox-is-open"), r.$slide.addClass("fancybox-slide--current"), p.loadSlide(r), void p.preload();
                        i.each(p.slides, function (t, e) {
                            i.fancybox.stop(e.$slide)
                        }), r.$slide.removeClass("fancybox-slide--next fancybox-slide--previous").addClass("fancybox-slide--current"), r.isMoved ? (c = Math.round(r.$slide.width()), i.each(p.slides, function (t, s) {
                            var n = s.pos - r.pos;
                            i.fancybox.animate(s.$slide, {top: 0, left: n * c + n * s.opts.gutter}, e, function () {
                                s.$slide.removeAttr("style").removeClass("fancybox-slide--next fancybox-slide--previous"), s.pos === p.currPos && (r.isMoved = !1, p.complete())
                            })
                        })) : p.$refs.stage.children().removeAttr("style"), r.isLoaded ? p.revealContent(r) : p.loadSlide(r), p.preload(), l.pos !== r.pos && (u = "fancybox-slide--" + (l.pos > r.pos ? "next" : "previous"), l.$slide.removeClass("fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous"), l.isComplete = !1, e && (r.isMoved || r.opts.transitionEffect) && (r.isMoved ? l.$slide.addClass(u) : (u = "fancybox-animated " + u + " fancybox-fx-" + r.opts.transitionEffect, i.fancybox.animate(l.$slide, u, e, function () {
                            l.$slide.removeClass(u).removeAttr("style")
                        }))))
                    }
                }
            }, createSlide: function (t) {
                var e, s, n = this;
                return s = t % n.group.length, s = s < 0 ? n.group.length + s : s, !n.slides[t] && n.group[s] && (e = i('<div class="fancybox-slide"></div>').appendTo(n.$refs.stage), n.slides[t] = i.extend(!0, {}, n.group[s], {
                    pos: t,
                    $slide: e,
                    isLoaded: !1
                }), n.updateSlide(n.slides[t])), n.slides[t]
            }, scaleToActual: function (t, e, n) {
                var a, o, r, l, c, h = this, d = h.current, u = d.$content, p = parseInt(d.$slide.width(), 10),
                    f = parseInt(d.$slide.height(), 10), v = d.width, m = d.height;
                "image" != d.type || d.hasError || !u || h.isAnimating || (i.fancybox.stop(u), h.isAnimating = !0, t = t === s ? .5 * p : t, e = e === s ? .5 * f : e, a = i.fancybox.getTranslate(u), l = v / a.width, c = m / a.height, o = .5 * p - .5 * v, r = .5 * f - .5 * m, v > p && ((o = a.left * l - (t * l - t)) > 0 && (o = 0), o < p - v && (o = p - v)), m > f && ((r = a.top * c - (e * c - e)) > 0 && (r = 0), r < f - m && (r = f - m)), h.updateCursor(v, m), i.fancybox.animate(u, {
                    top: r,
                    left: o,
                    scaleX: l,
                    scaleY: c
                }, n || 330, function () {
                    h.isAnimating = !1
                }), h.SlideShow && h.SlideShow.isActive && h.SlideShow.stop())
            }, scaleToFit: function (t) {
                var e, s = this, n = s.current, a = n.$content;
                "image" != n.type || n.hasError || !a || s.isAnimating || (i.fancybox.stop(a), s.isAnimating = !0, e = s.getFitPos(n), s.updateCursor(e.width, e.height), i.fancybox.animate(a, {
                    top: e.top,
                    left: e.left,
                    scaleX: e.width / a.width(),
                    scaleY: e.height / a.height()
                }, t || 330, function () {
                    s.isAnimating = !1
                }))
            }, getFitPos: function (t) {
                var e, s, n, a, r, l = t.$content, c = t.width, h = t.height, d = t.opts.margin;
                return !(!l || !l.length || !c && !h) && ("number" === i.type(d) && (d = [d, d]), 2 == d.length && (d = [d[0], d[1], d[0], d[1]]), o.width() < 800 && (d = [0, 0, 0, 0]), e = parseInt(this.$refs.stage.width(), 10) - (d[1] + d[3]), s = parseInt(this.$refs.stage.height(), 10) - (d[0] + d[2]), n = Math.min(1, e / c, s / h), a = Math.floor(n * c), r = Math.floor(n * h), {
                    top: Math.floor(.5 * (s - r)) + d[0],
                    left: Math.floor(.5 * (e - a)) + d[3],
                    width: a,
                    height: r
                })
            }, update: function () {
                var t = this;
                i.each(t.slides, function (e, i) {
                    t.updateSlide(i)
                })
            }, updateSlide: function (t) {
                var e = this, s = t.$content;
                s && (t.width || t.height) && (i.fancybox.stop(s), i.fancybox.setTranslate(s, e.getFitPos(t)), t.pos === e.currPos && e.updateCursor()), t.$slide.trigger("refresh"), e.trigger("onUpdate", t)
            }, updateCursor: function (t, e) {
                var i = this,
                    n = i.$refs.container.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-drag fancybox-can-zoomOut");
                i.current && !i.isClosing && (i.isZoomable() ? (n.addClass("fancybox-is-zoomable"), (t !== s && e !== s ? t < i.current.width && e < i.current.height : i.isScaledDown()) ? n.addClass("fancybox-can-zoomIn") : i.current.opts.touch ? n.addClass("fancybox-can-drag") : n.addClass("fancybox-can-zoomOut")) : i.current.opts.touch && n.addClass("fancybox-can-drag"))
            }, isZoomable: function () {
                var t, e = this, s = e.current;
                if (s && !e.isClosing) return !!("image" === s.type && s.isLoaded && !s.hasError && ("zoom" === s.opts.clickContent || i.isFunction(s.opts.clickContent) && "zoom" === s.opts.clickContent(s)) && (t = e.getFitPos(s), s.width > t.width || s.height > t.height))
            }, isScaledDown: function () {
                var t = this.current, e = t.$content, s = !1;
                return e && (s = i.fancybox.getTranslate(e), s = s.width < t.width || s.height < t.height), s
            }, canPan: function () {
                var t = this.current, e = t.$content, i = !1;
                return e && (i = this.getFitPos(t), i = Math.abs(e.width() - i.width) > 1 || Math.abs(e.height() - i.height) > 1), i
            }, loadSlide: function (t) {
                var e, s, n, a = this;
                if (!t.isLoading && !t.isLoaded) {
                    switch (t.isLoading = !0, a.trigger("beforeLoad", t), e = t.type, (s = t.$slide).off("refresh").trigger("onReset").addClass("fancybox-slide--" + (e || "unknown")).addClass(t.opts.slideClass), e) {
                        case"image":
                            a.setImage(t);
                            break;
                        case"iframe":
                            a.setIframe(t);
                            break;
                        case"html":
                            a.setContent(t, t.src || t.content);
                            break;
                        case"inline":
                            i(t.src).length ? a.setContent(t, i(t.src)) : a.setError(t);
                            break;
                        case"ajax":
                            a.showLoading(t), n = i.ajax(i.extend({}, t.opts.ajax.settings, {
                                url: t.src,
                                success: function (e, i) {
                                    "success" === i && a.setContent(t, e)
                                },
                                error: function (e, i) {
                                    e && "abort" !== i && a.setError(t)
                                }
                            })), s.one("onReset", function () {
                                n.abort()
                            });
                            break;
                        default:
                            a.setError(t)
                    }
                    return !0
                }
            }, setImage: function (e) {
                var s, n, a, o, r = this, l = e.opts.srcset || e.opts.image.srcset;
                if (l) {
                    a = t.devicePixelRatio || 1, o = t.innerWidth * a, (n = l.split(",").map(function (t) {
                        var e = {};
                        return t.trim().split(/\s+/).forEach(function (t, i) {
                            var s = parseInt(t.substring(0, t.length - 1), 10);
                            return 0 === i ? e.url = t : void (s && (e.value = s, e.postfix = t[t.length - 1]))
                        }), e
                    })).sort(function (t, e) {
                        return t.value - e.value
                    });
                    for (var c = 0; c < n.length; c++) {
                        var h = n[c];
                        if ("w" === h.postfix && h.value >= o || "x" === h.postfix && h.value >= a) {
                            s = h;
                            break
                        }
                    }
                    !s && n.length && (s = n[n.length - 1]), s && (e.src = s.url, e.width && e.height && "w" == s.postfix && (e.height = e.width / e.height * s.value, e.width = s.value))
                }
                e.$content = i('<div class="fancybox-image-wrap"></div>').addClass("fancybox-is-hidden").appendTo(e.$slide), !1 !== e.opts.preload && e.opts.width && e.opts.height && (e.opts.thumb || e.opts.$thumb) ? (e.width = e.opts.width, e.height = e.opts.height, e.$ghost = i("<img />").one("error", function () {
                    i(this).remove(), e.$ghost = null, r.setBigImage(e)
                }).one("load", function () {
                    r.afterLoad(e), r.setBigImage(e)
                }).addClass("fancybox-image").appendTo(e.$content).attr("src", e.opts.thumb || e.opts.$thumb.attr("src"))) : r.setBigImage(e)
            }, setBigImage: function (t) {
                var e = this, s = i("<img />");
                t.$image = s.one("error", function () {
                    e.setError(t)
                }).one("load", function () {
                    clearTimeout(t.timouts), t.timouts = null, e.isClosing || (t.width = this.naturalWidth, t.height = this.naturalHeight, t.opts.image.srcset && s.attr("sizes", "100vw").attr("srcset", t.opts.image.srcset), e.hideLoading(t), t.$ghost ? t.timouts = setTimeout(function () {
                        t.timouts = null, t.$ghost.hide()
                    }, Math.min(300, Math.max(1e3, t.height / 1600))) : e.afterLoad(t))
                }).addClass("fancybox-image").attr("src", t.src).appendTo(t.$content), (s[0].complete || "complete" == s[0].readyState) && s[0].naturalWidth && s[0].naturalHeight ? s.trigger("load") : s[0].error ? s.trigger("error") : t.timouts = setTimeout(function () {
                    s[0].complete || t.hasError || e.showLoading(t)
                }, 100)
            }, setIframe: function (t) {
                var e, n = this, a = t.opts.iframe, o = t.$slide;
                t.$content = i('<div class="fancybox-content' + (a.preload ? " fancybox-is-hidden" : "") + '"></div>').css(a.css).appendTo(o), e = i(a.tpl.replace(/\{rnd\}/g, (new Date).getTime())).attr(a.attr).appendTo(t.$content), a.preload ? (n.showLoading(t), e.on("load.fb error.fb", function (e) {
                    this.isReady = 1, t.$slide.trigger("refresh"), n.afterLoad(t)
                }), o.on("refresh.fb", function () {
                    var i, n, o = t.$content, r = a.css.width, l = a.css.height;
                    if (1 === e[0].isReady) {
                        try {
                            n = e.contents().find("body")
                        } catch (t) {
                        }
                        n && n.length && (r === s && (i = e[0].contentWindow.document.documentElement.scrollWidth, r = Math.ceil(n.outerWidth(!0) + (o.width() - i)), r += o.outerWidth() - o.innerWidth()), l === s && (l = Math.ceil(n.outerHeight(!0)), l += o.outerHeight() - o.innerHeight()), r && o.width(r), l && o.height(l)), o.removeClass("fancybox-is-hidden")
                    }
                })) : this.afterLoad(t), e.attr("src", t.src), !0 === t.opts.smallBtn && t.$content.prepend(n.translate(t, t.opts.btnTpl.smallBtn)), o.one("onReset", function () {
                    try {
                        i(this).find("iframe").hide().attr("src", "//about:blank")
                    } catch (t) {
                    }
                    i(this).empty(), t.isLoaded = !1
                })
            }, setContent: function (t, e) {
                var s = this;
                s.isClosing || (s.hideLoading(t), t.$slide.empty(), function (t) {
                    return t && t.hasOwnProperty && t instanceof i
                }(e) && e.parent().length ? (e.parent(".fancybox-slide--inline").trigger("onReset"), t.$placeholder = i("<div></div>").hide().insertAfter(e), e.css("display", "inline-block")) : t.hasError || ("string" === i.type(e) && 3 === (e = i("<div>").append(i.trim(e)).contents())[0].nodeType && (e = i("<div>").html(e)), t.opts.filter && (e = i("<div>").html(e).find(t.opts.filter))), t.$slide.one("onReset", function () {
                    t.$placeholder && (t.$placeholder.after(e.hide()).remove(), t.$placeholder = null), t.$smallBtn && (t.$smallBtn.remove(), t.$smallBtn = null), t.hasError || (i(this).empty(), t.isLoaded = !1)
                }), t.$content = i(e).appendTo(t.$slide), t.opts.smallBtn && !t.$smallBtn && (t.$smallBtn = i(s.translate(t, t.opts.btnTpl.smallBtn)).appendTo(t.$content.filter("div").first())), this.afterLoad(t))
            }, setError: function (t) {
                t.hasError = !0, t.$slide.removeClass("fancybox-slide--" + t.type), this.setContent(t, this.translate(t, t.opts.errorTpl))
            }, showLoading: function (t) {
                (t = t || this.current) && !t.$spinner && (t.$spinner = i(this.opts.spinnerTpl).appendTo(t.$slide))
            }, hideLoading: function (t) {
                (t = t || this.current) && t.$spinner && (t.$spinner.remove(), delete t.$spinner)
            }, afterLoad: function (t) {
                var e = this;
                e.isClosing || (t.isLoading = !1, t.isLoaded = !0, e.trigger("afterLoad", t), e.hideLoading(t), t.opts.protect && t.$content && !t.hasError && (t.$content.on("contextmenu.fb", function (t) {
                    return 2 == t.button && t.preventDefault(), !0
                }), "image" === t.type && i('<div class="fancybox-spaceball"></div>').appendTo(t.$content)), e.revealContent(t))
            }, revealContent: function (t) {
                var e, n, a, o, r, l = this, c = t.$slide, h = !1;
                return e = t.opts[l.firstRun ? "animationEffect" : "transitionEffect"], a = t.opts[l.firstRun ? "animationDuration" : "transitionDuration"], a = parseInt(t.forcedDuration === s ? a : t.forcedDuration, 10), !t.isMoved && t.pos === l.currPos && a || (e = !1), "zoom" !== e || t.pos === l.currPos && a && "image" === t.type && !t.hasError && (h = l.getThumbPos(t)) || (e = "fade"), "zoom" === e ? (r = l.getFitPos(t), r.scaleX = r.width / h.width, r.scaleY = r.height / h.height, delete r.width, delete r.height, "auto" == (o = t.opts.zoomOpacity) && (o = Math.abs(t.width / t.height - h.width / h.height) > .1), o && (h.opacity = .1, r.opacity = 1), i.fancybox.setTranslate(t.$content.removeClass("fancybox-is-hidden"), h), d(t.$content), void i.fancybox.animate(t.$content, r, a, function () {
                    l.complete()
                })) : (l.updateSlide(t), e ? (i.fancybox.stop(c), n = "fancybox-animated fancybox-slide--" + (t.pos >= l.prevPos ? "next" : "previous") + " fancybox-fx-" + e, c.removeAttr("style").removeClass("fancybox-slide--current fancybox-slide--next fancybox-slide--previous").addClass(n), t.$content.removeClass("fancybox-is-hidden"), d(c), void i.fancybox.animate(c, "fancybox-slide--current", a, function (e) {
                    c.removeClass(n).removeAttr("style"), t.pos === l.currPos && l.complete()
                }, !0)) : (d(c), t.$content.removeClass("fancybox-is-hidden"), void (t.pos === l.currPos && l.complete())))
            }, getThumbPos: function (s) {
                var n, a = !1, o = s.opts.$thumb, r = o ? o.offset() : 0;
                return r && o[0].ownerDocument === e && function (e) {
                    for (var s = e[0], n = s.getBoundingClientRect(), a = []; null !== s.parentElement;) "hidden" !== i(s.parentElement).css("overflow") && "auto" !== i(s.parentElement).css("overflow") || a.push(s.parentElement.getBoundingClientRect()), s = s.parentElement;
                    return a.every(function (t) {
                        var e = Math.min(n.right, t.right) - Math.max(n.left, t.left),
                            i = Math.min(n.bottom, t.bottom) - Math.max(n.top, t.top);
                        return e > 0 && i > 0
                    }) && n.bottom > 0 && n.right > 0 && n.left < i(t).width() && n.top < i(t).height()
                }(o) && (n = this.$refs.stage.offset(), a = {
                    top: r.top - n.top + parseFloat(o.css("border-top-width") || 0),
                    left: r.left - n.left + parseFloat(o.css("border-left-width") || 0),
                    width: o.width(),
                    height: o.height(),
                    scaleX: 1,
                    scaleY: 1
                }), a
            }, complete: function () {
                var t = this, s = t.current, n = {};
                s.isMoved || !s.isLoaded || s.isComplete || (s.isComplete = !0, s.$slide.siblings().trigger("onReset"), d(s.$slide), s.$slide.addClass("fancybox-slide--complete"), i.each(t.slides, function (e, s) {
                    s.pos >= t.currPos - 1 && s.pos <= t.currPos + 1 ? n[s.pos] = s : s && (i.fancybox.stop(s.$slide), s.$slide.off().remove())
                }), t.slides = n, t.updateCursor(), t.trigger("afterShow"), (i(e.activeElement).is("[disabled]") || s.opts.autoFocus && "image" != s.type && "iframe" !== s.type) && t.focus())
            }, preload: function () {
                var t, e, i = this;
                i.group.length < 2 || (t = i.slides[i.currPos + 1], e = i.slides[i.currPos - 1], t && "image" === t.type && i.loadSlide(t), e && "image" === e.type && i.loadSlide(e))
            }, focus: function () {
                var t, e = this.current;
                this.isClosing || (e && e.isComplete && ((t = e.$slide.find("input[autofocus]:enabled:visible:first")).length || (t = e.$slide.find("button,:input,[tabindex],a").filter(":enabled:visible:first"))), (t = t && t.length ? t : this.$refs.container).focus())
            }, activate: function () {
                var t = this;
                i(".fancybox-container").each(function () {
                    var e = i(this).data("FancyBox");
                    e && e.uid !== t.uid && !e.isClosing && e.trigger("onDeactivate")
                }), (t.current || t.isIdle) && (t.$refs.container.index() > 0 && t.$refs.container.prependTo(e.body), t.update(), t.updateControls()), t.trigger("onActivate"), t.addEvents()
            }, close: function (t, e) {
                var s, n, a, o, r, l, d = this, u = d.current, p = function () {
                    d.cleanUp(t)
                };
                return !(d.isClosing || (d.isClosing = !0, !1 === d.trigger("beforeClose", t) ? (d.isClosing = !1, c(function () {
                    d.update()
                }), 1) : (d.removeEvents(), u.timouts && clearTimeout(u.timouts), a = u.$content, s = u.opts.animationEffect, n = i.isNumeric(e) ? e : s ? u.opts.animationDuration : 0, u.$slide.off(h).removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"), u.$slide.siblings().trigger("onReset").remove(), n && d.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing"), d.hideLoading(u), d.hideControls(), d.updateCursor(), "zoom" !== s || !0 !== t && a && n && "image" === u.type && !u.hasError && (l = d.getThumbPos(u)) || (s = "fade"), "zoom" === s ? (i.fancybox.stop(a), r = i.fancybox.getTranslate(a), r.width = r.width * r.scaleX, r.height = r.height * r.scaleY, "auto" == (o = u.opts.zoomOpacity) && (o = Math.abs(u.width / u.height - l.width / l.height) > .1), o && (l.opacity = 0), r.scaleX = r.width / l.width, r.scaleY = r.height / l.height, r.width = l.width, r.height = l.height, i.fancybox.setTranslate(u.$content, r), i.fancybox.animate(u.$content, l, n, p), 0) : (s && n ? !0 === t ? setTimeout(p, n) : i.fancybox.animate(u.$slide.removeClass("fancybox-slide--current"), "fancybox-animated fancybox-slide--previous fancybox-fx-" + s, n, p) : p(), 0))))
            }, cleanUp: function (t) {
                var s, n, a = this, r = i("body");
                a.current.$slide.trigger("onReset"), a.$refs.container.empty().remove(), a.trigger("afterClose", t), a.$lastFocus && a.current.opts.backFocus && a.$lastFocus.focus(), a.current = null, (s = i.fancybox.getInstance()) ? s.activate() : (o.scrollTop(a.scrollTop).scrollLeft(a.scrollLeft), r.removeClass("fancybox-active compensate-for-scrollbar"), r.hasClass("fancybox-iosfix") && (n = parseInt(e.body.style.top, 10), r.removeClass("fancybox-iosfix").css("top", "").scrollTop(-1 * n)), i("#fancybox-style-noscroll").remove())
            }, trigger: function (t, e) {
                var s, n = Array.prototype.slice.call(arguments, 1), a = this, o = e && e.opts ? e : a.current;
                return o ? n.unshift(o) : o = a, n.unshift(a), i.isFunction(o.opts[t]) && (s = o.opts[t].apply(o, n)), !1 === s ? s : void ("afterClose" === t ? r.trigger(t + ".fb", n) : a.$refs.container.trigger(t + ".fb", n))
            }, updateControls: function (t) {
                var e = this, s = e.current, n = s.index, a = s.opts.caption, o = e.$refs.caption;
                s.$slide.trigger("refresh"), e.$caption = a && a.length ? o.html(a) : null, e.isHiddenControls || e.showControls(), i("[data-fancybox-count]").html(e.group.length), i("[data-fancybox-index]").html(n + 1), i("[data-fancybox-prev]").prop("disabled", !s.opts.loop && n <= 0), i("[data-fancybox-next]").prop("disabled", !s.opts.loop && n >= e.group.length - 1), "image" === s.type ? i("[data-fancybox-download]").attr("href", s.opts.image.src || s.src) : i("[data-fancybox-download]").hide()
            }, hideControls: function () {
                this.isHiddenControls = !0, this.$refs.container.removeClass("fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav")
            }, showControls: function () {
                var t = this, e = t.current ? t.current.opts : t.opts, i = t.$refs.container;
                t.isHiddenControls = !1, t.idleSecondsCounter = 0, i.toggleClass("fancybox-show-toolbar", !(!e.toolbar || !e.buttons)).toggleClass("fancybox-show-infobar", !!(e.infobar && t.group.length > 1)).toggleClass("fancybox-show-nav", !!(e.arrows && t.group.length > 1)).toggleClass("fancybox-is-modal", !!e.modal), t.$caption ? i.addClass("fancybox-show-caption ") : i.removeClass("fancybox-show-caption")
            }, toggleControls: function () {
                this.isHiddenControls ? this.showControls() : this.hideControls()
            }
        }), i.fancybox = {
            version: "3.2.0-beta.2",
            defaults: a,
            getInstance: function (t) {
                var e = i('.fancybox-container:not(".fancybox-is-closing"):first').data("FancyBox"),
                    s = Array.prototype.slice.call(arguments, 1);
                return e instanceof u && ("string" === i.type(t) ? e[t].apply(e, s) : "function" === i.type(t) && t.apply(e, s), e)
            },
            open: function (t, e, i) {
                return new u(t, e, i)
            },
            close: function (t) {
                var e = this.getInstance();
                e && (e.close(), !0 === t && this.close())
            },
            destroy: function () {
                this.close(!0), r.off("click.fb-start")
            },
            isMobile: e.createTouch !== s && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),
            use3d: function () {
                var i = e.createElement("div");
                return t.getComputedStyle && t.getComputedStyle(i).getPropertyValue("transform") && !(e.documentMode && e.documentMode < 11)
            }(),
            getTranslate: function (t) {
                var e;
                if (!t || !t.length) return !1;
                if ((e = t.eq(0).css("transform")) && -1 !== e.indexOf("matrix") ? (e = e.split("(")[1], e = e.split(")")[0], e = e.split(",")) : e = [], e.length) e = e.length > 10 ? [e[13], e[12], e[0], e[5]] : [e[5], e[4], e[0], e[3]], e = e.map(parseFloat); else {
                    e = [0, 0, 1, 1];
                    var i = /\.*translate\((.*)px,(.*)px\)/i.exec(t.eq(0).attr("style"));
                    i && (e[0] = parseFloat(i[2]), e[1] = parseFloat(i[1]))
                }
                return {
                    top: e[0],
                    left: e[1],
                    scaleX: e[2],
                    scaleY: e[3],
                    opacity: parseFloat(t.css("opacity")),
                    width: t.width(),
                    height: t.height()
                }
            },
            setTranslate: function (t, e) {
                var i = "", n = {};
                if (t && e) return e.left === s && e.top === s || (i = (e.left === s ? t.position().left : e.left) + "px, " + (e.top === s ? t.position().top : e.top) + "px", i = this.use3d ? "translate3d(" + i + ", 0px)" : "translate(" + i + ")"), e.scaleX !== s && e.scaleY !== s && (i = (i.length ? i + " " : "") + "scale(" + e.scaleX + ", " + e.scaleY + ")"), i.length && (n.transform = i), e.opacity !== s && (n.opacity = e.opacity), e.width !== s && (n.width = e.width), e.height !== s && (n.height = e.height), t.css(n)
            },
            animate: function (t, e, n, a, o) {
                var r = h || "transitionend";
                i.isFunction(n) && (a = n, n = null), i.isPlainObject(e) || t.removeAttr("style"), t.on(r, function (n) {
                    (!n || !n.originalEvent || t.is(n.originalEvent.target) && "z-index" != n.originalEvent.propertyName) && (t.off(r), i.isPlainObject(e) ? e.scaleX !== s && e.scaleY !== s && (t.css("transition-duration", "0ms"), e.width = Math.round(t.width() * e.scaleX), e.height = Math.round(t.height() * e.scaleY), e.scaleX = 1, e.scaleY = 1, i.fancybox.setTranslate(t, e)) : !0 !== o && t.removeClass(e), i.isFunction(a) && a(n))
                }), i.isNumeric(n) && t.css("transition-duration", n + "ms"), i.isPlainObject(e) ? i.fancybox.setTranslate(t, e) : t.addClass(e), t.data("timer", setTimeout(function () {
                    t.trigger("transitionend")
                }, n + 16))
            },
            stop: function (t) {
                clearTimeout(t.data("timer")), t.off(h)
            }
        }, i.fn.fancybox = function (t) {
            var e;
            return t = t || {}, (e = t.selector || !1) ? i("body").off("click.fb-start", e).on("click.fb-start", e, {options: t}, n) : this.off("click.fb-start").on("click.fb-start", {
                items: this,
                options: t
            }, n), this
        }, r.on("click.fb-start", "[data-fancybox]", n)
    }
}(window, document, window.jQuery || jQuery), function (t) {
    "use strict";
    var e = function (e, i, s) {
        if (e) return s = s || "", "object" === t.type(s) && (s = t.param(s, !0)), t.each(i, function (t, i) {
            e = e.replace("$" + t, i || "")
        }), s.length && (e += (e.indexOf("?") > 0 ? "&" : "?") + s), e
    }, i = {
        youtube: {
            matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
            params: {autoplay: 1, autohide: 1, fs: 1, rel: 0, hd: 1, wmode: "transparent", enablejsapi: 1, html5: 1},
            paramPlace: 8,
            type: "iframe",
            url: "//www.youtube.com/embed/$4",
            thumb: "//img.youtube.com/vi/$4/hqdefault.jpg"
        },
        vimeo: {
            matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
            params: {autoplay: 1, hd: 1, show_title: 1, show_byline: 1, show_portrait: 0, fullscreen: 1, api: 1},
            paramPlace: 3,
            type: "iframe",
            url: "//player.vimeo.com/video/$2"
        },
        metacafe: {
            matcher: /metacafe.com\/watch\/(\d+)\/(.*)?/,
            type: "iframe",
            url: "//www.metacafe.com/embed/$1/?ap=1"
        },
        dailymotion: {
            matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
            params: {additionalInfos: 0, autoStart: 1},
            type: "iframe",
            url: "//www.dailymotion.com/embed/video/$1"
        },
        vine: {matcher: /vine.co\/v\/([a-zA-Z0-9\?\=\-]+)/, type: "iframe", url: "//vine.co/v/$1/embed/simple"},
        instagram: {
            matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
            type: "image",
            url: "//$1/p/$2/media/?size=l"
        },
        gmap_place: {
            matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
            type: "iframe",
            url: function (t) {
                return "//maps.google." + t[2] + "/?ll=" + (t[9] ? t[9] + "&z=" + Math.floor(t[10]) + (t[12] ? t[12].replace(/^\//, "&") : "") : t[12]) + "&output=" + (t[12] && t[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
            }
        },
        gmap_search: {
            matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
            type: "iframe",
            url: function (t) {
                return "//maps.google." + t[2] + "/maps?q=" + t[5].replace("query=", "q=").replace("api=1", "") + "&output=embed"
            }
        }
    };
    t(document).on("onInit.fb", function (s, n) {
        t.each(n.group, function (s, n) {
            var a, o, r, l, c, h, d, u = n.src || "", p = !1;
            n.type || (a = t.extend(!0, {}, i, n.opts.media), t.each(a, function (i, s) {
                if (r = u.match(s.matcher), h = {}, d = i, r) {
                    if (p = s.type, s.paramPlace && r[s.paramPlace]) {
                        "?" == (c = r[s.paramPlace])[0] && (c = c.substring(1)), c = c.split("&");
                        for (var a = 0; a < c.length; ++a) {
                            var f = c[a].split("=", 2);
                            2 == f.length && (h[f[0]] = decodeURIComponent(f[1].replace(/\+/g, " ")))
                        }
                    }
                    return l = t.extend(!0, {}, s.params, n.opts[i], h), u = "function" === t.type(s.url) ? s.url.call(this, r, l, n) : e(s.url, r, l), o = "function" === t.type(s.thumb) ? s.thumb.call(this, r, l, n) : e(s.thumb, r), "vimeo" === d && (u = u.replace("&%23", "#")), !1
                }
            }), p ? (n.src = u, n.type = p, n.opts.thumb || n.opts.$thumb && n.opts.$thumb.length || (n.opts.thumb = o), "iframe" === p && (t.extend(!0, n.opts, {
                iframe: {
                    preload: !1,
                    attr: {scrolling: "no"}
                }
            }), n.contentProvider = d, n.opts.slideClass += " fancybox-slide--" + ("gmap_place" == d || "gmap_search" == d ? "map" : "video"))) : u && (n.type = "image"))
        })
    })
}(window.jQuery || jQuery), function (t, e, i) {
    "use strict";
    var s = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function (e) {
            return t.setTimeout(e, 1e3 / 60)
        },
        n = t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.mozCancelAnimationFrame || t.oCancelAnimationFrame || function (e) {
            t.clearTimeout(e)
        }, a = function (e) {
            var i = [];
            e = (e = e.originalEvent || e || t.e).touches && e.touches.length ? e.touches : e.changedTouches && e.changedTouches.length ? e.changedTouches : [e];
            for (var s in e) e[s].pageX ? i.push({x: e[s].pageX, y: e[s].pageY}) : e[s].clientX && i.push({
                x: e[s].clientX,
                y: e[s].clientY
            });
            return i
        }, o = function (t, e, i) {
            return e && t ? "x" === i ? t.x - e.x : "y" === i ? t.y - e.y : Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)) : 0
        }, r = function (t) {
            if (t.is('a,area,button,[role="button"],input,label,select,summary,textarea') || i.isFunction(t.get(0).onclick) || t.data("selectable")) return !0;
            for (var e = 0, s = t[0].attributes, n = s.length; e < n; e++) if ("data-fancybox-" === s[e].nodeName.substr(0, 14)) return !0;
            return !1
        }, l = function (e) {
            var i = t.getComputedStyle(e)["overflow-y"], s = t.getComputedStyle(e)["overflow-x"],
                n = ("scroll" === i || "auto" === i) && e.scrollHeight > e.clientHeight,
                a = ("scroll" === s || "auto" === s) && e.scrollWidth > e.clientWidth;
            return n || a
        }, c = function (t) {
            for (var e = !1; !(e = l(t.get(0))) && ((t = t.parent()).length && !t.hasClass("fancybox-stage") && !t.is("body"));) ;
            return e
        }, h = function (t) {
            var e = this;
            e.instance = t, e.$bg = t.$refs.bg, e.$stage = t.$refs.stage, e.$container = t.$refs.container, e.destroy(), e.$container.on("touchstart.fb.touch mousedown.fb.touch", i.proxy(e, "ontouchstart"))
        };
    h.prototype.destroy = function () {
        this.$container.off(".fb.touch")
    }, h.prototype.ontouchstart = function (s) {
        var n = this, l = i(s.target), h = n.instance, d = h.current, u = d.$content, p = "touchstart" == s.type;
        if (p && n.$container.off("mousedown.fb.touch"), !d || n.instance.isAnimating || n.instance.isClosing) return s.stopPropagation(), void s.preventDefault();
        if ((!s.originalEvent || 2 != s.originalEvent.button) && l.length && !r(l) && !r(l.parent()) && !(s.originalEvent.clientX > l[0].clientWidth + l.offset().left) && (n.startPoints = a(s), n.startPoints && !(n.startPoints.length > 1 && h.isSliding))) {
            if (n.$target = l, n.$content = u, n.canTap = !0, i(e).off(".fb.touch"), i(e).on(p ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", i.proxy(n, "ontouchend")), i(e).on(p ? "touchmove.fb.touch" : "mousemove.fb.touch", i.proxy(n, "ontouchmove")), !h.current.opts.touch && !h.canPan() || !l.is(n.$stage) && !n.$stage.find(l).length) return void (l.is("img") && s.preventDefault());
            s.stopPropagation(), i.fancybox.isMobile && (c(n.$target) || c(n.$target.parent())) || s.preventDefault(), n.canvasWidth = Math.round(d.$slide[0].clientWidth), n.canvasHeight = Math.round(d.$slide[0].clientHeight), n.startTime = (new Date).getTime(), n.distanceX = n.distanceY = n.distance = 0, n.isPanning = !1, n.isSwiping = !1, n.isZooming = !1, n.sliderStartPos = n.sliderLastPos || {
                top: 0,
                left: 0
            }, n.contentStartPos = i.fancybox.getTranslate(n.$content), n.contentLastPos = null, 1 !== n.startPoints.length || n.isZooming || (n.canTap = !h.isSliding, "image" === d.type && (n.contentStartPos.width > n.canvasWidth + 1 || n.contentStartPos.height > n.canvasHeight + 1) ? (i.fancybox.stop(n.$content), n.$content.css("transition-duration", "0ms"), n.isPanning = !0) : n.isSwiping = !0, n.$container.addClass("fancybox-controls--isGrabbing")), 2 !== n.startPoints.length || h.isAnimating || d.hasError || "image" !== d.type || !d.isLoaded && !d.$ghost || (n.isZooming = !0, n.isSwiping = !1, n.isPanning = !1, i.fancybox.stop(n.$content), n.$content.css("transition-duration", "0ms"), n.centerPointStartX = .5 * (n.startPoints[0].x + n.startPoints[1].x) - i(t).scrollLeft(), n.centerPointStartY = .5 * (n.startPoints[0].y + n.startPoints[1].y) - i(t).scrollTop(), n.percentageOfImageAtPinchPointX = (n.centerPointStartX - n.contentStartPos.left) / n.contentStartPos.width, n.percentageOfImageAtPinchPointY = (n.centerPointStartY - n.contentStartPos.top) / n.contentStartPos.height, n.startDistanceBetweenFingers = o(n.startPoints[0], n.startPoints[1]))
        }
    }, h.prototype.ontouchmove = function (t) {
        var e = this;
        if (e.newPoints = a(t), i.fancybox.isMobile && (c(e.$target) || c(e.$target.parent()))) return t.stopPropagation(), void (e.canTap = !1);
        if ((e.instance.current.opts.touch || e.instance.canPan()) && e.newPoints && e.newPoints.length && (e.distanceX = o(e.newPoints[0], e.startPoints[0], "x"), e.distanceY = o(e.newPoints[0], e.startPoints[0], "y"), e.distance = o(e.newPoints[0], e.startPoints[0]), e.distance > 0)) {
            if (!e.$target.is(e.$stage) && !e.$stage.find(e.$target).length) return;
            t.stopPropagation(), t.preventDefault(), e.isSwiping ? e.onSwipe() : e.isPanning ? e.onPan() : e.isZooming && e.onZoom()
        }
    }, h.prototype.onSwipe = function () {
        var e, a = this, o = a.isSwiping, r = a.sliderStartPos.left || 0;
        !0 === o ? Math.abs(a.distance) > 10 && (a.canTap = !1, a.instance.group.length < 2 && a.instance.opts.touch.vertical ? a.isSwiping = "y" : a.instance.isSliding || !1 === a.instance.opts.touch.vertical || "auto" === a.instance.opts.touch.vertical && i(t).width() > 800 ? a.isSwiping = "x" : (e = Math.abs(180 * Math.atan2(a.distanceY, a.distanceX) / Math.PI), a.isSwiping = e > 45 && e < 135 ? "y" : "x"), a.instance.isSliding = a.isSwiping, a.startPoints = a.newPoints, i.each(a.instance.slides, function (t, e) {
            i.fancybox.stop(e.$slide), e.$slide.css("transition-duration", "0ms"), e.inTransition = !1, e.pos === a.instance.current.pos && (a.sliderStartPos.left = i.fancybox.getTranslate(e.$slide).left)
        }), a.instance.SlideShow && a.instance.SlideShow.isActive && a.instance.SlideShow.stop()) : ("x" == o && (a.distanceX > 0 && (a.instance.group.length < 2 || 0 === a.instance.current.index && !a.instance.current.opts.loop) ? r += Math.pow(a.distanceX, .8) : a.distanceX < 0 && (a.instance.group.length < 2 || a.instance.current.index === a.instance.group.length - 1 && !a.instance.current.opts.loop) ? r -= Math.pow(-a.distanceX, .8) : r += a.distanceX), a.sliderLastPos = {
            top: "x" == o ? 0 : a.sliderStartPos.top + a.distanceY,
            left: r
        }, a.requestId && (n(a.requestId), a.requestId = null), a.requestId = s(function () {
            a.sliderLastPos && (i.each(a.instance.slides, function (t, e) {
                var s = e.pos - a.instance.currPos;
                i.fancybox.setTranslate(e.$slide, {
                    top: a.sliderLastPos.top,
                    left: a.sliderLastPos.left + s * a.canvasWidth + s * e.opts.gutter
                })
            }), a.$container.addClass("fancybox-is-sliding"))
        }))
    }, h.prototype.onPan = function () {
        var t, e, a, o = this;
        o.canTap = !1, t = o.contentStartPos.width > o.canvasWidth ? o.contentStartPos.left + o.distanceX : o.contentStartPos.left, e = o.contentStartPos.top + o.distanceY, (a = o.limitMovement(t, e, o.contentStartPos.width, o.contentStartPos.height)).scaleX = o.contentStartPos.scaleX, a.scaleY = o.contentStartPos.scaleY, o.contentLastPos = a, o.requestId && (n(o.requestId), o.requestId = null), o.requestId = s(function () {
            i.fancybox.setTranslate(o.$content, o.contentLastPos)
        })
    }, h.prototype.limitMovement = function (t, e, i, s) {
        var n, a, o, r, l = this, c = l.canvasWidth, h = l.canvasHeight, d = l.contentStartPos.left,
            u = l.contentStartPos.top, p = l.distanceX, f = l.distanceY;
        return n = Math.max(0, .5 * c - .5 * i), a = Math.max(0, .5 * h - .5 * s), o = Math.min(c - i, .5 * c - .5 * i), r = Math.min(h - s, .5 * h - .5 * s), i > c && (p > 0 && t > n && (t = n - 1 + Math.pow(-n + d + p, .8) || 0), p < 0 && t < o && (t = o + 1 - Math.pow(o - d - p, .8) || 0)), s > h && (f > 0 && e > a && (e = a - 1 + Math.pow(-a + u + f, .8) || 0), f < 0 && e < r && (e = r + 1 - Math.pow(r - u - f, .8) || 0)), {
            top: e,
            left: t
        }
    }, h.prototype.limitPosition = function (t, e, i, s) {
        var n = this.canvasWidth, a = this.canvasHeight;
        return i > n ? (t = t > 0 ? 0 : t, t = t < n - i ? n - i : t) : t = Math.max(0, n / 2 - i / 2), s > a ? (e = e > 0 ? 0 : e, e = e < a - s ? a - s : e) : e = Math.max(0, a / 2 - s / 2), {
            top: e,
            left: t
        }
    }, h.prototype.onZoom = function () {
        var e = this, a = e.contentStartPos.width, r = e.contentStartPos.height, l = e.contentStartPos.left,
            c = e.contentStartPos.top, h = o(e.newPoints[0], e.newPoints[1]) / e.startDistanceBetweenFingers,
            d = Math.floor(a * h), u = Math.floor(r * h), p = (a - d) * e.percentageOfImageAtPinchPointX,
            f = (r - u) * e.percentageOfImageAtPinchPointY,
            v = (e.newPoints[0].x + e.newPoints[1].x) / 2 - i(t).scrollLeft(),
            m = (e.newPoints[0].y + e.newPoints[1].y) / 2 - i(t).scrollTop(), g = v - e.centerPointStartX, b = {
                top: c + (f + (m - e.centerPointStartY)),
                left: l + (p + g),
                scaleX: e.contentStartPos.scaleX * h,
                scaleY: e.contentStartPos.scaleY * h
            };
        e.canTap = !1, e.newWidth = d, e.newHeight = u, e.contentLastPos = b, e.requestId && (n(e.requestId), e.requestId = null), e.requestId = s(function () {
            i.fancybox.setTranslate(e.$content, e.contentLastPos)
        })
    }, h.prototype.ontouchend = function (t) {
        var s = this, o = Math.max((new Date).getTime() - s.startTime, 1), r = s.isSwiping, l = s.isPanning,
            c = s.isZooming;
        return s.endPoints = a(t), s.$container.removeClass("fancybox-controls--isGrabbing"), i(e).off(".fb.touch"), s.requestId && (n(s.requestId), s.requestId = null), s.isSwiping = !1, s.isPanning = !1, s.isZooming = !1, s.canTap ? s.onTap(t) : (s.speed = 366, s.velocityX = s.distanceX / o * .5, s.velocityY = s.distanceY / o * .5, s.speedX = Math.max(.5 * s.speed, Math.min(1.5 * s.speed, 1 / Math.abs(s.velocityX) * s.speed)), void (l ? s.endPanning() : c ? s.endZooming() : s.endSwiping(r)))
    }, h.prototype.endSwiping = function (t) {
        var e = this, s = !1;
        e.instance.isSliding = !1, e.sliderLastPos = null, "y" == t && Math.abs(e.distanceY) > 50 ? (i.fancybox.animate(e.instance.current.$slide, {
            top: e.sliderStartPos.top + e.distanceY + 150 * e.velocityY,
            opacity: 0
        }, 150), s = e.instance.close(!0, 300)) : "x" == t && e.distanceX > 50 && e.instance.group.length > 1 ? s = e.instance.previous(e.speedX) : "x" == t && e.distanceX < -50 && e.instance.group.length > 1 && (s = e.instance.next(e.speedX)), !1 !== s || "x" != t && "y" != t || e.instance.jumpTo(e.instance.current.index, 150), e.$container.removeClass("fancybox-is-sliding")
    }, h.prototype.endPanning = function () {
        var t, e, s, n = this;
        n.contentLastPos && (!1 === n.instance.current.opts.touch.momentum ? (t = n.contentLastPos.left, e = n.contentLastPos.top) : (t = n.contentLastPos.left + n.velocityX * n.speed, e = n.contentLastPos.top + n.velocityY * n.speed), s = n.limitPosition(t, e, n.contentStartPos.width, n.contentStartPos.height), s.width = n.contentStartPos.width, s.height = n.contentStartPos.height, i.fancybox.animate(n.$content, s, 330))
    }, h.prototype.endZooming = function () {
        var t, e, s, n, a = this, o = a.instance.current, r = a.newWidth, l = a.newHeight;
        a.contentLastPos && (t = a.contentLastPos.left, e = a.contentLastPos.top, n = {
            top: e,
            left: t,
            width: r,
            height: l,
            scaleX: 1,
            scaleY: 1
        }, i.fancybox.setTranslate(a.$content, n), r < a.canvasWidth && l < a.canvasHeight ? a.instance.scaleToFit(150) : r > o.width || l > o.height ? a.instance.scaleToActual(a.centerPointStartX, a.centerPointStartY, 150) : (s = a.limitPosition(t, e, r, l), i.fancybox.setTranslate(a.content, i.fancybox.getTranslate(a.$content)), i.fancybox.animate(a.$content, s, 150)))
    }, h.prototype.onTap = function (t) {
        var e, s = this, n = i(t.target), o = s.instance, r = o.current, l = t && a(t) || s.startPoints,
            c = l[0] ? l[0].x - s.$stage.offset().left : 0, h = l[0] ? l[0].y - s.$stage.offset().top : 0,
            d = function (e) {
                var n = r.opts[e];
                if (i.isFunction(n) && (n = n.apply(o, [r, t])), n) switch (n) {
                    case"close":
                        o.close(s.startEvent);
                        break;
                    case"toggleControls":
                        o.toggleControls(!0);
                        break;
                    case"next":
                        o.next();
                        break;
                    case"nextOrClose":
                        o.group.length > 1 ? o.next() : o.close(s.startEvent);
                        break;
                    case"zoom":
                        "image" == r.type && (r.isLoaded || r.$ghost) && (o.canPan() ? o.scaleToFit() : o.isScaledDown() ? o.scaleToActual(c, h) : o.group.length < 2 && o.close(s.startEvent))
                }
            };
        if (!(t.originalEvent && 2 == t.originalEvent.button || o.isSliding || c > n[0].clientWidth + n.offset().left)) {
            if (n.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) e = "Outside"; else if (n.is(".fancybox-slide")) e = "Slide"; else {
                if (!o.current.$content || !o.current.$content.has(t.target).length) return;
                e = "Content"
            }
            if (s.tapped) {
                if (clearTimeout(s.tapped), s.tapped = null, Math.abs(c - s.tapX) > 50 || Math.abs(h - s.tapY) > 50 || o.isSliding) return this;
                d("dblclick" + e)
            } else s.tapX = c, s.tapY = h, r.opts["dblclick" + e] && r.opts["dblclick" + e] !== r.opts["click" + e] ? s.tapped = setTimeout(function () {
                s.tapped = null, d("click" + e)
            }, 300) : d("click" + e);
            return this
        }
    }, i(e).on("onActivate.fb", function (t, e) {
        e && !e.Guestures && (e.Guestures = new h(e))
    }), i(e).on("beforeClose.fb", function (t, e) {
        e && e.Guestures && e.Guestures.destroy()
    })
}(window, document, window.jQuery || jQuery), function (t, e) {
    "use strict";
    var i = function (t) {
        this.instance = t, this.init()
    };
    e.extend(i.prototype, {
        timer: null, isActive: !1, $button: null, speed: 3e3, init: function () {
            var t = this;
            t.$button = t.instance.$refs.toolbar.find("[data-fancybox-play]").on("click", function () {
                t.toggle()
            }), (t.instance.group.length < 2 || !t.instance.group[t.instance.currIndex].opts.slideShow) && t.$button.hide()
        }, set: function (t) {
            var e = this;
            console.info("== set; force: " + t), e.instance && e.instance.current && (!0 === t || e.instance.current.opts.loop || e.instance.currIndex < e.instance.group.length - 1) ? (console.info("!!"), e.timer = setTimeout(function () {
                console.info(">> " + (e.instance.current.index + 1 % e.instance.group.length - 1)), e.instance.jumpTo(e.instance.current.index % e.instance.group.length - 1)
            }, e.instance.current.opts.slideShow.speed || e.speed)) : (e.stop(), e.instance.idleSecondsCounter = 0, e.instance.showControls())
        }, clear: function () {
            clearTimeout(this.timer), this.timer = null
        }, start: function () {
            var t = this, e = t.instance.current;
            e && (console.info(e), t.isActive = !0, t.$button.attr("title", e.opts.i18n[e.opts.lang].PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause"), t.set(!0))
        }, stop: function () {
            var t = this, e = t.instance.current;
            t.clear(), t.$button.attr("title", e.opts.i18n[e.opts.lang].PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play"), t.isActive = !1
        }, toggle: function () {
            var t = this;
            t.isActive ? t.stop() : t.start()
        }
    }), e(t).on({
        "onInit.fb": function (t, e) {
            e && !e.SlideShow && (e.SlideShow = new i(e))
        }, "beforeShow.fb": function (t, e, i, s) {
            var n = e && e.SlideShow;
            s ? n && i.opts.slideShow.autoStart && n.start() : n && n.isActive && n.clear()
        }, "afterShow.fb": function (t, e, i) {
            var s = e && e.SlideShow;
            s && s.isActive && s.set()
        }, "afterKeydown.fb": function (i, s, n, a, o) {
            var r = s && s.SlideShow;
            !r || !n.opts.slideShow || 80 !== o && 32 !== o || e(t.activeElement).is("button,a,input") || (a.preventDefault(), r.toggle())
        }, "beforeClose.fb onDeactivate.fb": function (t, e) {
            var i = e && e.SlideShow;
            i && i.stop()
        }
    }), e(t).on("visibilitychange", function () {
        var i = e.fancybox.getInstance(), s = i && i.SlideShow;
        s && s.isActive && (t.hidden ? s.clear() : s.set())
    })
}(document, window.jQuery || jQuery), function (t, e) {
    "use strict";
    var i = function () {
        var e, i, s,
            n = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]],
            a = {};
        for (i = 0; i < n.length; i++) if ((e = n[i]) && e[1] in t) {
            for (s = 0; s < e.length; s++) a[n[0][s]] = e[s];
            return a
        }
        return !1
    }();
    if (i) {
        var s = {
            request: function (e) {
                (e = e || t.documentElement)[i.requestFullscreen](e.ALLOW_KEYBOARD_INPUT)
            }, exit: function () {
                t[i.exitFullscreen]()
            }, toggle: function (e) {
                e = e || t.documentElement, this.isFullscreen() ? this.exit() : this.request(e)
            }, isFullscreen: function () {
                return Boolean(t[i.fullscreenElement])
            }, enabled: function () {
                return Boolean(t[i.fullscreenEnabled])
            }
        };
        e(t).on({
            "onInit.fb": function (t, e) {
                var i;
                e && e.group[e.currIndex].opts.fullScreen ? ((i = e.$refs.container).on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function (t) {
                    t.stopPropagation(), t.preventDefault(), s.toggle(i[0])
                }), e.opts.fullScreen && !0 === e.opts.fullScreen.autoStart && s.request(i[0]), e.FullScreen = s) : e && e.$refs.toolbar.find("[data-fancybox-fullscreen]").hide()
            }, "afterKeydown.fb": function (t, e, i, s, n) {
                e && e.FullScreen && 70 === n && (s.preventDefault(), e.FullScreen.toggle(e.$refs.container[0]))
            }, "beforeClose.fb": function (t) {
                t && t.FullScreen && s.exit()
            }
        }), e(t).on(i.fullscreenchange, function () {
            var t = s.isFullscreen(), i = e.fancybox.getInstance();
            i && (i.current && "image" === i.current.type && i.isAnimating && (i.current.$content.css("transition", "none"), i.isAnimating = !1, i.update(!0, !0, 0)), i.trigger("onFullscreenChange", t), i.$refs.container.toggleClass("fancybox-is-fullscreen", t))
        })
    } else e && e.fancybox && (e.fancybox.defaults.btnTpl.fullScreen = !1)
}(document, window.jQuery || jQuery), function (t, e) {
    "use strict";
    var i = function (t) {
        this.instance = t, this.init()
    };
    e.extend(i.prototype, {
        $button: null, $grid: null, $list: null, isVisible: !1, init: function () {
            var t = this, e = t.instance.group[0], i = t.instance.group[1];
            t.$button = t.instance.$refs.toolbar.find("[data-fancybox-thumbs]"), t.instance.group.length > 1 && t.instance.group[t.instance.currIndex].opts.thumbs && ("image" == e.type || e.opts.thumb || e.opts.$thumb) && ("image" == i.type || i.opts.thumb || i.opts.$thumb) ? (t.$button.on("click", function () {
                t.toggle()
            }), t.isActive = !0) : (t.$button.hide(), t.isActive = !1)
        }, create: function () {
            var t, i, s = this.instance;
            this.$grid = e('<div class="fancybox-thumbs"></div>').appendTo(s.$refs.container), t = "<ul>", e.each(s.group, function (e, s) {
                (i = s.opts.thumb || (s.opts.$thumb ? s.opts.$thumb.attr("src") : null)) || "image" !== s.type || (i = s.src), i && i.length && (t += '<li data-index="' + e + '"  tabindex="0" class="fancybox-thumbs-loading"><img data-src="' + i + '" /></li>')
            }), t += "</ul>", this.$list = e(t).appendTo(this.$grid).on("click", "li", function () {
                s.jumpTo(e(this).data("index"))
            }), this.$list.find("img").hide().one("load", function () {
                var t, i, s, n, a = e(this).parent().removeClass("fancybox-thumbs-loading"), o = a.outerWidth(),
                    r = a.outerHeight();
                t = this.naturalWidth || this.width, n = (i = this.naturalHeight || this.height) / r, (s = t / o) >= 1 && n >= 1 && (s > n ? (t /= n, i = r) : (t = o, i /= s)), e(this).css({
                    width: Math.floor(t),
                    height: Math.floor(i),
                    "margin-top": Math.min(0, Math.floor(.3 * r - .3 * i)),
                    "margin-left": Math.min(0, Math.floor(.5 * o - .5 * t))
                }).show()
            }).each(function () {
                this.src = e(this).data("src")
            })
        }, focus: function () {
            this.instance.current && this.$list.children().removeClass("fancybox-thumbs-active").filter('[data-index="' + this.instance.current.index + '"]').addClass("fancybox-thumbs-active").focus()
        }, close: function () {
            this.$grid.hide()
        }, update: function () {
            this.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible), this.isVisible ? (this.$grid || this.create(), this.instance.trigger("onThumbsShow"), this.focus()) : this.$grid && this.instance.trigger("onThumbsHide"), this.instance.update()
        }, hide: function () {
            this.isVisible = !1, this.update()
        }, show: function () {
            this.isVisible = !0, this.update()
        }, toggle: function () {
            this.isVisible = !this.isVisible, this.update()
        }
    }), e(t).on({
        "onInit.fb": function (t, e) {
            e && !e.Thumbs && (e.Thumbs = new i(e))
        }, "beforeShow.fb": function (t, e, i, s) {
            var n = e && e.Thumbs;
            if (n && n.isActive) {
                if (i.modal) return n.$button.hide(), void n.hide();
                s && !0 === i.opts.thumbs.autoStart && n.show(), n.isVisible && n.focus()
            }
        }, "afterKeydown.fb": function (t, e, i, s, n) {
            var a = e && e.Thumbs;
            a && a.isActive && 71 === n && (s.preventDefault(), a.toggle())
        }, "beforeClose.fb": function (t, e) {
            var i = e && e.Thumbs;
            i && i.isVisible && !1 !== e.opts.thumbs.hideOnClose && i.close()
        }
    })
}(document, window.jQuery || jQuery), function (t, e) {
    "use strict";
    e.extend(!0, e.fancybox.defaults, {
        btnTpl: {share: '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg viewBox="0 0 40 40"><path d="M6,30 C8,18 27,14 23,16 L23,10 L33,20 L23,29 L23,24 C14,24 7,28 6,30 Z"></svg></button>'},
        shareTpl: '<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a href="https://www.facebook.com/sharer/sharer.php?u={{src}}" target="_blank" class="fancybox-share_button"><svg version="1.1" viewBox="0 0 32 32" fill="#3b5998"><path d="M27.6 3h-23.2c-.8 0-1.4.6-1.4 1.4v23.1c0 .9.6 1.5 1.4 1.5h12.5v-10.1h-3.4v-3.9h3.4v-2.9c0-3.4 2.1-5.2 5-5.2 1.4 0 2.7.1 3 .2v3.5h-2.1c-1.6 0-1.9.8-1.9 1.9v2.5h3.9l-.5 3.9h-3.4v10.1h6.6c.8 0 1.4-.6 1.4-1.4v-23.2c.1-.8-.5-1.4-1.3-1.4z"></path></svg><span>Facebook</span></a><a href="https://www.pinterest.com/pin/create/button/?url={{src}}&amp;description={{descr}}" target="_blank" class="fancybox-share_button"><svg version="1.1" viewBox="0 0 32 32" fill="#c92228"><path d="M16 3c-7.2 0-13 5.8-13 13 0 5.5 3.4 10.2 8.3 12.1-.1-1-.2-2.6 0-3.7.2-1 1.5-6.5 1.5-6.5s-.4-.8-.4-1.9c0-1.8 1-3.2 2.4-3.2 1.1 0 1.6.8 1.6 1.8 0 1.1-.7 2.8-1.1 4.3-.3 1.3.6 2.3 1.9 2.3 2.3 0 4.1-2.4 4.1-6 0-3.1-2.2-5.3-5.4-5.3-3.7 0-5.9 2.8-5.9 5.6 0 1.1.4 2.3 1 3 .1.1.1.2.1.4-.1.4-.3 1.3-.4 1.5-.1.2-.2.3-.4.2-1.6-.8-2.6-3.1-2.6-5 0-4.1 3-7.9 8.6-7.9 4.5 0 8 3.2 8 7.5 0 4.5-2.8 8.1-6.7 8.1-1.3 0-2.6-.7-3-1.5 0 0-.7 2.5-.8 3.1-.3 1.1-1.1 2.5-1.6 3.4 1.2.4 2.5.6 3.8.6 7.2 0 13-5.8 13-13 0-7.1-5.8-12.9-13-12.9z"></path></svg><span>Pinterest</span></a><a href="https://twitter.com/intent/tweet?url={{src}}&amp;text={{descr}}" target="_blank" class="fancybox-share_button"><svg version="1.1" viewBox="0 0 32 32" fill="#1da1f2"><path d="M30 7.3c-1 .5-2.1.8-3.3.9 1.2-.7 2.1-1.8 2.5-3.2-1.1.7-2.3 1.1-3.6 1.4-1-1.1-2.5-1.8-4.2-1.8-3.2 0-5.7 2.6-5.7 5.7 0 .5.1.9.1 1.3-4.8-.2-9-2.5-11.8-6-.5.9-.8 1.9-.8 3 0 2 1 3.8 2.6 4.8-.9 0-1.8-.3-2.6-.7v.1c0 2.8 2 5.1 4.6 5.6-.5.1-1 .2-1.5.2-.4 0-.7 0-1.1-.1.7 2.3 2.9 3.9 5.4 4-2 1.5-4.4 2.5-7.1 2.5-.5 0-.9 0-1.4-.1 2.5 1.6 5.6 2.6 8.8 2.6 10.6 0 16.3-8.8 16.3-16.3v-.7c1.1-1 2-2 2.8-3.2z"></path></svg><span>Twitter</span></a></p></div>'
    }), e(t).on("click", "[data-fancybox-share]", function () {
        var t = e.fancybox.getInstance();
        t && e.fancybox.open({
            src: t.translate(t, t.current.opts.shareTpl.replace(/\{\{src\}\}/g, encodeURI(t.current.src)).replace(/\{\{descr\}\}/g, encodeURI(t.current.caption || ""))),
            type: "html",
            opts: {autoFocus: !1, animationEffect: "fade"}
        })
    })
}(document, window.jQuery || jQuery), function (t, e, i) {
    "use strict";

    function s() {
        var t = e.location.hash.substr(1), i = t.split("-"),
            s = i.length > 1 && /^\+?\d+$/.test(i[i.length - 1]) ? parseInt(i.pop(-1), 10) || 1 : 1, n = i.join("-");
        return s < 1 && (s = 1), {hash: t, index: s, gallery: n}
    }

    function n(t) {
        var e;
        "" !== t.gallery && ((e = i("[data-fancybox='" + i.escapeSelector(t.gallery) + "']").eq(t.index - 1)).length || (e = i("#" + i.escapeSelector(t.gallery))), e.length && (o = !1, e.trigger("click")))
    }

    function a(t) {
        var e;
        return !!t && ((e = t.current ? t.current.opts : t.opts).hash || (e.$orig ? e.$orig.data("fancybox") : ""))
    }

    i.escapeSelector || (i.escapeSelector = function (t) {
        return (t + "").replace(/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, function (t, e) {
            return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t
        })
    });
    var o = !0, r = null, l = null;
    i(function () {
        i(t).on({
            "onInit.fb": function (t, e) {
                var i, n;
                !1 !== e.group[e.currIndex].opts.hash && (i = s(), (n = a(e)) && i.gallery && n == i.gallery && (e.currIndex = i.index - 1))
            }, "beforeShow.fb": function (i, s, n) {
                var c;
                n && !1 !== n.opts.hash && (c = a(s)) && "" !== c && (e.location.hash.indexOf(c) < 0 && (s.opts.origHash = e.location.hash), r = c + (s.group.length > 1 ? "-" + (n.index + 1) : ""), "replaceState" in e.history ? (l && clearTimeout(l), l = setTimeout(function () {
                    e.history[o ? "pushState" : "replaceState"]({}, t.title, e.location.pathname + e.location.search + "#" + r), l = null, o = !1
                }, 300)) : e.location.hash = r)
            }, "beforeClose.fb": function (s, n, o) {
                var c, h;
                l && clearTimeout(l), !1 !== o.opts.hash && (c = a(n), h = n && n.opts.origHash ? n.opts.origHash : "", c && "" !== c && ("replaceState" in history ? e.history.replaceState({}, t.title, e.location.pathname + e.location.search + h) : (e.location.hash = h, i(e).scrollTop(n.scrollTop).scrollLeft(n.scrollLeft))), r = null)
            }
        }), i(e).on("hashchange.fb", function () {
            var t = s();
            i.fancybox.getInstance() ? !r || r === t.gallery + "-" + t.index || 1 === t.index && r == t.gallery || (r = null, i.fancybox.close()) : "" !== t.gallery && n(t)
        }), n(s())
    })
}(document, window, window.jQuery || jQuery), function (t, e, i, s, n) {
    "function" == typeof define && define.amd ? define(function () {
        return t.fullpage = s(e, i), t.fullpage
    }) : "object" == typeof exports ? module.exports = s(e, i) : e.fullpage = s(e, i)
}(this, window, document, function (t, e) {
    "use strict";

    function i(i, c) {
        function m(t, e) {
            t || _e(0), Ke("autoScrolling", t, e);
            var i = n(st)[0];
            if (c.autoScrolling && !c.scrollBar) l(si, {
                overflow: "hidden",
                height: "100%"
            }), y(Ii.recordHistory, "internal"), l(pi, {
                "-ms-touch-action": "none",
                "touch-action": "none"
            }), null != i && _e(i.offsetTop); else if (l(si, {
                overflow: "visible",
                height: "initial"
            }), y(!!c.autoScrolling && Ii.recordHistory, "internal"), l(pi, {
                "-ms-touch-action": "",
                "touch-action": ""
            }), null != i) {
                var s = le(i.offsetTop);
                s.element.scrollTo(0, s.options)
            }
        }

        function y(t, e) {
            Ke("recordHistory", t, e)
        }

        function T(t, e) {
            Ke("scrollingSpeed", t, e)
        }

        function L(t, e) {
            Ke("fitToSection", t, e)
        }

        function F(i) {
            i ? (function () {
                var i, s = "";
                t.addEventListener ? i = "addEventListener" : (i = "attachEvent", s = "on");
                var n = "onwheel" in e.createElement("div") ? "wheel" : void 0 !== e.onmousewheel ? "mousewheel" : "DOMMouseScroll",
                    a = !!Ei && {passive: !1};
                "DOMMouseScroll" == n ? e[i](s + "MozMousePixelScroll", ee, a) : e[i](s + n, ee, a)
            }(), pi.addEventListener("mousedown", xe), pi.addEventListener("mouseup", Se)) : (e.addEventListener ? (e.removeEventListener("mousewheel", ee, !1), e.removeEventListener("wheel", ee, !1), e.removeEventListener("MozMousePixelScroll", ee, !1)) : e.detachEvent("onmousewheel", ee), pi.removeEventListener("mousedown", xe), pi.removeEventListener("mouseup", Se))
        }

        function At(t, e) {
            void 0 !== e ? (e = e.replace(/ /g, "").split(",")).forEach(function (e) {
                qe(t, e, "m")
            }) : qe(t, "all", "m")
        }

        function zt(t) {
            t ? (F(!0), function () {
                if (di || ui) {
                    c.autoScrolling && (ni.removeEventListener(Si.touchmove, Kt, {passive: !1}), ni.addEventListener(Si.touchmove, Kt, {passive: !1}));
                    var t = c.touchWrapper;
                    t.removeEventListener(Si.touchstart, Jt), t.removeEventListener(Si.touchmove, Zt, {passive: !1}), t.addEventListener(Si.touchstart, Jt), t.addEventListener(Si.touchmove, Zt, {passive: !1})
                }
            }()) : (F(!1), function () {
                if (di || ui) {
                    c.autoScrolling && (ni.removeEventListener(Si.touchmove, Zt, {passive: !1}), ni.removeEventListener(Si.touchmove, Kt, {passive: !1}));
                    var t = c.touchWrapper;
                    t.removeEventListener(Si.touchstart, Jt), t.removeEventListener(Si.touchmove, Zt, {passive: !1})
                }
            }())
        }

        function It(t, e) {
            void 0 !== e ? (e = e.replace(/ /g, "").split(",")).forEach(function (e) {
                qe(t, e, "k")
            }) : (qe(t, "all", "k"), c.keyboardScrolling = t)
        }

        function Ot() {
            var t = h(n(st)[0], it);
            t || !c.loopTop && !c.continuousVertical || (t = f(n(it))), null != t && ne(t, null, !0)
        }

        function Dt() {
            var t = d(n(st)[0], it);
            t || !c.loopBottom && !c.continuousVertical || (t = n(it)[0]), null != t && ne(t, null, !1)
        }

        function Bt(t, e) {
            T(0, "internal"), Ht(t, e), T(Ii.scrollingSpeed, "internal")
        }

        function Ht(t, e) {
            var i = He(t);
            void 0 !== e ? Ve(t, e) : null != i && ne(i)
        }

        function Vt(t) {
            ie("right", t)
        }

        function Rt(t) {
            ie("left", t)
        }

        function Ft(e) {
            if (!o(pi, G)) {
                vi = !0, fi = r();
                for (var i = n(it), s = 0; s < i.length; ++s) {
                    var a = i[s], h = n(bt, a)[0], d = n(vt, a);
                    c.verticalCentered && l(n(at, a), {height: De(a) + "px"}), l(a, {height: fi + "px"}), d.length > 1 && Me(h, n(mt, h)[0])
                }
                c.scrollOverflow && wi.createScrollBarForAll();
                var u = v(n(st)[0], it);
                u && Bt(u + 1), vi = !1, O(c.afterResize) && e && c.afterResize.call(pi, t.innerWidth, t.innerHeight), O(c.afterReBuild) && !e && c.afterReBuild.call(pi)
            }
        }

        function Yt(t) {
            var e = o(ni, N);
            t ? e || (m(!1, "internal"), L(!1, "internal"), g(n(ct)), w(ni, N), O(c.afterResponsive) && c.afterResponsive.call(pi, t), c.scrollOverflow && wi.createScrollBarForAll()) : e && (m(Ii.autoScrolling, "internal"), L(Ii.autoScrolling, "internal"), b(n(ct)), x(ni, N), O(c.afterResponsive) && c.afterResponsive.call(pi, t))
        }

        function Xt(t) {
            var e = t.target;
            e && k(e, ct + " a") ? function (t) {
                I(t);
                var e = v(k(this, ct + " li"));
                ne(n(it)[e])
            }.call(e, t) : B(e, dt) ? function () {
                D(u(this), "click")
            }.call(e) : B(e, Ct) ? function () {
                var t = k(this, it);
                o(this, Mt) ? yi.m.left && Rt(t) : yi.m.right && Vt(t)
            }.call(e, t) : B(e, Et) || null != k(e, Et) ? function (t) {
                I(t);
                var e = n(bt, k(this, it))[0];
                Me(e, n(vt, e)[v(k(this, "li"))])
            }.call(e, t) : k(e, c.menu + " [data-menuanchor]") && function (t) {
                !n(c.menu)[0] || !c.lockAnchors && c.anchors.length || (I(t), Ht(this.getAttribute("data-menuanchor")))
            }.call(e, t)
        }

        function jt(t, i) {
            e["fp_" + t] = i, e.addEventListener(t, Wt, !0)
        }

        function Wt(t) {
            t.target != e && ("touchend" === t.type && (Di = !1, setTimeout(function () {
                Di = !0
            }, 800)), "mouseenter" !== t.type || Di) && c.normalScrollElements.split(",").forEach(function (i) {
                null != k(t.target, i) && zt(e["fp_" + t.type])
            })
        }

        function Nt(t, e) {
            return c.navigationTooltips[t] || c.anchors[t] || e + " " + (t + 1)
        }

        function _t() {
            var t = n(st)[0];
            w(t, Q), de(t), ue(t), c.scrollOverflow && c.scrollOverflowHandler.afterLoad(), function () {
                var t = He(be().section);
                return !t || void 0 !== t && v(t) === v(ci)
            }() && O(c.afterLoad) && ae("afterLoad", {
                activeSection: null,
                element: t,
                direction: null,
                anchorLink: t.getAttribute("data-anchor"),
                sectionIndex: v(t, it)
            }), O(c.afterRender) && ae("afterRender")
        }

        function Gt() {
            var t;
            if (!c.autoScrolling || c.scrollBar) {
                var e = A(), i = function (t) {
                    var e = t > Hi ? "down" : "up";
                    return Hi = t, ji = t, e
                }(e), s = 0, a = e + r() / 2, l = ni.offsetHeight - r() === e, h = n(it);
                if (l) s = h.length - 1; else if (e) for (var d = 0; d < h.length; ++d) h[d].offsetTop <= a && (s = d); else s = 0;
                if (function (t) {
                    var e = n(st)[0].offsetTop, i = e + r();
                    return "up" == t ? i >= A() + r() : e <= A()
                }(i) && (o(n(st)[0], Q) || (w(n(st)[0], Q), x(z(n(st)[0]), Q))), t = h[s], !o(t, K)) {
                    Bi = !0;
                    var u, p, f = n(st)[0], m = v(f, it) + 1, g = Ie(t), b = t.getAttribute("data-anchor"),
                        y = v(t, it) + 1, S = n(mt, t)[0], T = {
                            activeSection: f,
                            sectionIndex: y - 1,
                            anchorLink: b,
                            element: t,
                            leavingSection: m,
                            direction: g
                        };
                    S && (p = S.getAttribute("data-anchor"), u = v(S)), gi && (w(t, K), x(z(t), K), O(c.onLeave) && ae("onLeave", T), O(c.afterLoad) && ae("afterLoad", T), fe(f), de(t), ue(t), ze(b, y - 1), c.anchors.length && (oi = b), Fe(u, p, b, y)), clearTimeout($i), $i = setTimeout(function () {
                        Bi = !1
                    }, 100)
                }
                c.fitToSection && (clearTimeout(Li), Li = setTimeout(function () {
                    c.fitToSection && n(st)[0].offsetHeight <= fi && qt()
                }, c.fitToSectionDelay))
            }
        }

        function qt() {
            gi && (vi = !0, ne(n(st)[0]), vi = !1)
        }

        function Ut(t) {
            if (yi.m[t]) {
                var e = "down" === t ? Dt : Ot;
                if (c.scrollOverflow) {
                    var i = c.scrollOverflowHandler.scrollable(n(st)[0]), s = "down" === t ? "bottom" : "top";
                    if (null != i) {
                        if (!c.scrollOverflowHandler.isScrolled(s, i)) return !0;
                        e()
                    } else e()
                } else e()
            }
        }

        function Kt(t) {
            c.autoScrolling && Qt(t) && yi.m.up && I(t)
        }

        function Zt(e) {
            var i = k(e.target, it) || n(st)[0];
            if (Qt(e)) {
                c.autoScrolling && I(e);
                var s = We(e);
                Fi = s.y, Yi = s.x, n(bt, i).length && Math.abs(Ri - Yi) > Math.abs(Vi - Fi) ? !hi && Math.abs(Ri - Yi) > t.innerWidth / 100 * c.touchSensitivity && (Ri > Yi ? yi.m.right && Vt(i) : yi.m.left && Rt(i)) : c.autoScrolling && gi && Math.abs(Vi - Fi) > t.innerHeight / 100 * c.touchSensitivity && (Vi > Fi ? Ut("down") : Fi > Vi && Ut("up"))
            }
        }

        function Qt(t) {
            return void 0 === t.pointerType || "mouse" != t.pointerType
        }

        function Jt(t) {
            if (c.fitToSection && (zi = !1), Qt(t)) {
                var e = We(t);
                Vi = e.y, Ri = e.x
            }
        }

        function te(t, e) {
            for (var i = 0, s = t.slice(Math.max(t.length - e, 1)), n = 0; n < s.length; n++) i += s[n];
            return Math.ceil(i / e)
        }

        function ee(e) {
            var i = (new Date).getTime(), s = o(n(J)[0], rt);
            if (!yi.m.down && !yi.m.up) return I(e), !1;
            if (c.autoScrolling && !li && !s) {
                var a = (e = e || t.event).wheelDelta || -e.deltaY || -e.detail, r = Math.max(-1, Math.min(1, a)),
                    l = void 0 !== e.wheelDeltaX || void 0 !== e.deltaX,
                    h = Math.abs(e.wheelDeltaX) < Math.abs(e.wheelDelta) || Math.abs(e.deltaX) < Math.abs(e.deltaY) || !l;
                bi.length > 149 && bi.shift(), bi.push(Math.abs(a)), c.scrollBar && I(e);
                var d = i - Xi;
                return Xi = i, d > 200 && (bi = []), gi && te(bi, 10) >= te(bi, 70) && h && Ut(r < 0 ? "down" : "up"), !1
            }
            c.fitToSection && (zi = !1)
        }

        function ie(t, e) {
            var i = null == e ? n(st)[0] : e, s = n(bt, i)[0];
            if (!(null == s || hi || n(vt, s).length < 2)) {
                var a = n(mt, s)[0], o = null;
                if (null == (o = "left" === t ? h(a, vt) : d(a, vt))) {
                    if (!c.loopHorizontal) return;
                    var r = z(a);
                    o = "left" === t ? r[r.length - 1] : r[0]
                }
                hi = !ai.test.isTesting, Me(s, o, t)
            }
        }

        function se() {
            for (var t = n(mt), e = 0; e < t.length; e++) Ne(t[e], "internal")
        }

        function ne(t, e, i) {
            if (null != t) {
                var s, a, r = {
                    element: t,
                    callback: e,
                    isMovementUp: i,
                    dtop: function (t) {
                        var e = t.offsetHeight, i = t.offsetTop, s = i, n = i > ji, a = s - fi + e,
                            o = c.bigSectionsDestination;
                        return e > fi ? (n || o) && "bottom" !== o || (s = a) : (n || vi && null == p(t)) && (s = a), ji = s, s
                    }(t),
                    yMovement: Ie(t),
                    anchorLink: t.getAttribute("data-anchor"),
                    sectionIndex: v(t, it),
                    activeSlide: n(mt, t)[0],
                    activeSection: n(st)[0],
                    leavingSection: v(n(st), it) + 1,
                    localIsResizing: vi
                };
                if (!(r.activeSection == t && !vi || c.scrollBar && A() === r.dtop && !o(t, ot))) {
                    if (null != r.activeSlide && (s = r.activeSlide.getAttribute("data-anchor"), a = v(r.activeSlide)), !r.localIsResizing) {
                        var l = r.yMovement;
                        if (void 0 !== i && (l = i ? "up" : "down"), r.direction = l, O(c.onLeave) && !1 === ae("onLeave", r)) return
                    }
                    c.autoScrolling && c.continuousVertical && void 0 !== r.isMovementUp && (!r.isMovementUp && "up" == r.yMovement || r.isMovementUp && "down" == r.yMovement) && (r = function (t) {
                        return t.isMovementUp ? $(n(st)[0], Y(t.activeSection, it)) : P(n(st)[0], X(t.activeSection, it).reverse()), _e(n(st)[0].offsetTop), se(), t.wrapAroundElements = t.activeSection, t.dtop = t.element.offsetTop, t.yMovement = Ie(t.element), t.leavingSection = v(t.activeSection, it) + 1, t.sectionIndex = v(t.element, it), t
                    }(r)), r.localIsResizing || fe(r.activeSection), c.scrollOverflow && c.scrollOverflowHandler.beforeLeave(), w(t, K), x(z(t), K), de(t), c.scrollOverflow && c.scrollOverflowHandler.onLeave(), gi = ai.test.isTesting, Fe(a, s, r.anchorLink, r.sectionIndex), function (t) {
                        if (c.css3 && c.autoScrolling && !c.scrollBar) Be("translate3d(0px, -" + Math.round(t.dtop) + "px, 0px)", !0), c.scrollingSpeed ? (clearTimeout(ki), ki = setTimeout(function () {
                            ce(t)
                        }, c.scrollingSpeed)) : ce(t); else {
                            var e = le(t.dtop);
                            ai.test.top = -t.dtop + "px", Qe(e.element, e.options, c.scrollingSpeed, function () {
                                c.scrollBar ? setTimeout(function () {
                                    ce(t)
                                }, 30) : ce(t)
                            })
                        }
                    }(r), oi = r.anchorLink, ze(r.anchorLink, r.sectionIndex)
                }
            }
        }

        function ae(t, e) {
            var i = function (t, e) {
                var i;
                return (i = c.v2compatible ? {
                    afterRender: function () {
                        return [pi]
                    }, onLeave: function () {
                        return [e.activeSection, e.leavingSection, e.sectionIndex + 1, e.direction]
                    }, afterLoad: function () {
                        return [e.element, e.anchorLink, e.sectionIndex + 1]
                    }, afterSlideLoad: function () {
                        return [e.destiny, e.anchorLink, e.sectionIndex + 1, e.slideAnchor, e.slideIndex]
                    }, onSlideLeave: function () {
                        return [e.prevSlide, e.anchorLink, e.sectionIndex + 1, e.prevSlideIndex, e.direction, e.slideIndex]
                    }
                } : {
                    afterRender: function () {
                        return {section: oe(n(st)[0]), slide: re(n(mt, n(st)[0])[0])}
                    }, onLeave: function () {
                        return {origin: oe(e.activeSection), destination: oe(e.element), direction: e.direction}
                    }, afterLoad: function () {
                        return i.onLeave()
                    }, afterSlideLoad: function () {
                        return {
                            section: oe(e.section),
                            origin: re(e.prevSlide),
                            destination: re(e.destiny),
                            direction: e.direction
                        }
                    }, onSlideLeave: function () {
                        return i.afterSlideLoad()
                    }
                })[t]()
            }(t, e);
            if (c.v2compatible) {
                if (!1 === c[t].apply(i[0], i.slice(1))) return !1
            } else if (D(pi, t, i), !1 === c[t].apply(i[Object.keys(i)[0]], function (t) {
                return Object.keys(t).map(function (e) {
                    return t[e]
                })
            }(i))) return !1;
            return !0
        }

        function oe(t) {
            return t ? new ei(t) : null
        }

        function re(t) {
            return t ? new function (t) {
                ti.call(this, t, vt)
            }(t) : null
        }

        function le(e) {
            var i = {};
            return c.autoScrolling && !c.scrollBar ? (i.options = -e, i.element = n(W)[0]) : (i.options = e, i.element = t), i
        }

        function ce(t) {
            !function (t) {
                null != t.wrapAroundElements && (t.isMovementUp ? $(n(it)[0], t.wrapAroundElements) : P(n(it)[n(it).length - 1], t.wrapAroundElements), _e(n(st)[0].offsetTop), se())
            }(t), O(c.afterLoad) && !t.localIsResizing && ae("afterLoad", t), c.scrollOverflow && c.scrollOverflowHandler.afterLoad(), t.localIsResizing || ue(t.element), w(t.element, Q), x(z(t.element), Q), gi = !0, O(t.callback) && t.callback()
        }

        function he(t, e) {
            t.setAttribute(e, t.getAttribute("data-" + e)), t.removeAttribute("data-" + e)
        }

        function de(t) {
            c.lazyLoading && n("img[data-src], img[data-srcset], source[data-src], source[data-srcset], video[data-src], audio[data-src], iframe[data-src]", ve(t)).forEach(function (t) {
                if (["src", "srcset"].forEach(function (e) {
                    var i = t.getAttribute("data-" + e);
                    null != i && i && he(t, e)
                }), B(t, "source")) {
                    var e = k(t, "video, audio");
                    e && e.load()
                }
            })
        }

        function ue(t) {
            var e = ve(t);
            n("video, audio", e).forEach(function (t) {
                t.hasAttribute("data-autoplay") && "function" == typeof t.play && t.play()
            }), n('iframe[src*="youtube.com/embed/"]', e).forEach(function (t) {
                t.hasAttribute("data-autoplay") && pe(t), t.onload = function () {
                    t.hasAttribute("data-autoplay") && pe(t)
                }
            })
        }

        function pe(t) {
            t.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*")
        }

        function fe(t) {
            var e = ve(t);
            n("video, audio", e).forEach(function (t) {
                t.hasAttribute("data-keepplaying") || "function" != typeof t.pause || t.pause()
            }), n('iframe[src*="youtube.com/embed/"]', e).forEach(function (t) {
                /youtube\.com\/embed\//.test(t.getAttribute("src")) && !t.hasAttribute("data-keepplaying") && t.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*")
            })
        }

        function ve(t) {
            var e = n(mt, t);
            return e.length && (t = e[0]), t
        }

        function me() {
            var t = be(), e = t.section, i = t.slide;
            e && (c.animateAnchor ? Ve(e, i) : Bt(e, i))
        }

        function ge() {
            if (!Bi && !c.lockAnchors) {
                var t = be(), e = t.section, i = t.slide, s = void 0 === oi, n = void 0 === oi && void 0 === i && !hi;
                e && e.length && (e && e !== oi && !s || n || !hi && ri != i) && Ve(e, i)
            }
        }

        function be() {
            var e, i, s = t.location.hash;
            if (s.length) {
                var n = s.replace("#", "").split("/"), a = s.indexOf("#/") > -1;
                e = a ? "/" + n[1] : decodeURIComponent(n[0]);
                var o = a ? n[2] : n[1];
                o && o.length && (i = decodeURIComponent(o))
            }
            return {section: e, slide: i}
        }

        function ye(t) {
            clearTimeout(Ai);
            var i = e.activeElement, s = t.keyCode;
            9 === s ? function (t) {
                function i(t) {
                    return I(t), o[0] ? o[0].focus() : null
                }

                var s = t.shiftKey, a = e.activeElement, o = Te(ve(n(st)[0]));
                (function (t) {
                    var i = Te(e), s = i.indexOf(e.activeElement), n = i[t.shiftKey ? s - 1 : s + 1], a = re(k(n, vt)),
                        o = oe(k(n, it));
                    return !a && !o
                })(t) || (a ? null == k(a, st + "," + st + " " + mt) && (a = i(t)) : i(t), (!s && a == o[o.length - 1] || s && a == o[0]) && I(t))
            }(t) : B(i, "textarea") || B(i, "input") || B(i, "select") || "true" === i.getAttribute("contentEditable") || "" === i.getAttribute("contentEditable") || !c.keyboardScrolling || !c.autoScrolling || ([40, 38, 32, 33, 34].indexOf(s) > -1 && I(t), li = t.ctrlKey, Ai = setTimeout(function () {
                !function (t) {
                    var e = t.shiftKey;
                    if (gi || !([37, 39].indexOf(t.keyCode) < 0)) switch (t.keyCode) {
                        case 38:
                        case 33:
                            yi.k.up && Ot();
                            break;
                        case 32:
                            if (e && yi.k.up) {
                                Ot();
                                break
                            }
                        case 40:
                        case 34:
                            yi.k.down && Dt();
                            break;
                        case 36:
                            yi.k.up && Ht(1);
                            break;
                        case 35:
                            yi.k.down && Ht(n(it).length);
                            break;
                        case 37:
                            yi.k.left && Rt();
                            break;
                        case 39:
                            yi.k.right && Vt()
                    }
                }(t)
            }, 150))
        }

        function we(t) {
            mi && (li = t.ctrlKey)
        }

        function xe(t) {
            2 == t.which && (Wi = t.pageY, pi.addEventListener("mousemove", Ce))
        }

        function Se(t) {
            2 == t.which && pi.removeEventListener("mousemove", Ce)
        }

        function Te(t) {
            return [].slice.call(n(Ti, t)).filter(function (t) {
                return "-1" !== t.getAttribute("tabindex") && null !== t.offsetParent
            })
        }

        function Ee() {
            mi = !1, li = !1
        }

        function Ce(t) {
            gi && (t.pageY < Wi && yi.m.up ? Ot() : t.pageY > Wi && yi.m.down && Dt()), Wi = t.pageY
        }

        function Me(t, e, i) {
            var s = k(t, it), a = {
                slides: t,
                destiny: e,
                direction: i,
                destinyPos: {left: e.offsetLeft},
                slideIndex: v(e),
                section: s,
                sectionIndex: v(s, it),
                anchorLink: s.getAttribute("data-anchor"),
                slidesNav: n(Tt, s)[0],
                slideAnchor: Xe(e),
                prevSlide: n(mt, s)[0],
                prevSlideIndex: v(n(mt, s)[0]),
                localIsResizing: vi
            };
            a.xMovement = function (t, e) {
                return t == e ? "none" : t > e ? "left" : "right"
            }(a.prevSlideIndex, a.slideIndex), a.direction = a.direction ? a.direction : a.xMovement, a.localIsResizing || (gi = !1), c.onSlideLeave && !a.localIsResizing && "none" !== a.xMovement && O(c.onSlideLeave) && !1 === ae("onSlideLeave", a) ? hi = !1 : (w(e, K), x(z(e), K), a.localIsResizing || (fe(a.prevSlide), de(e)), !c.loopHorizontal && c.controlArrows && (H(n(Pt, s), 0 !== a.slideIndex), H(n(Lt, s), null != p(e))), o(s, K) && !a.localIsResizing && Fe(a.slideIndex, a.slideAnchor, a.anchorLink, a.sectionIndex), function (t, e, i) {
                var s = e.destinyPos;
                if (c.css3) {
                    var a = "translate3d(-" + Math.round(s.left) + "px, 0px, 0px)";
                    ai.test.translate3dH[e.sectionIndex] = a, l(Le(n(wt, t)), Ge(a)), Pi = setTimeout(function () {
                        ke(e)
                    }, c.scrollingSpeed)
                } else ai.test.left[e.sectionIndex] = Math.round(s.left), Qe(t, Math.round(s.left), c.scrollingSpeed, function () {
                    ke(e)
                })
            }(t, a))
        }

        function ke(t) {
            !function (t, e) {
                c.slidesNavigation && null != t && (x(n(Z, t), K), w(n("a", n("li", t)[e]), K))
            }(t.slidesNav, t.slideIndex), t.localIsResizing || (O(c.afterSlideLoad) && ae("afterSlideLoad", t), gi = !0, ue(t.destiny)), hi = !1
        }

        function Pe() {
            if ($e(), di) {
                var t = e.activeElement;
                if (!B(t, "textarea") && !B(t, "input") && !B(t, "select")) {
                    var i = r();
                    Math.abs(i - Ni) > 20 * Math.max(Ni, i) / 100 && (Mi = setTimeout(function () {
                        Ft(!0), Ni = i
                    }, navigator.userAgent.match("CriOS") ? 50 : 0))
                }
            } else clearTimeout(Mi), Mi = setTimeout(function () {
                Ft(!0)
            }, 350)
        }

        function $e() {
            var e = c.responsive || c.responsiveWidth, i = c.responsiveHeight, s = e && t.innerWidth < e,
                n = i && t.innerHeight < i;
            e && i ? Yt(s || n) : e ? Yt(s) : i && Yt(n)
        }

        function Le(t) {
            var e = "all " + c.scrollingSpeed + "ms " + c.easingcss3;
            return x(t, _), l(t, {"-webkit-transition": e, transition: e})
        }

        function Ae(t) {
            return w(t, _)
        }

        function ze(t, e) {
            !function (t) {
                n(c.menu).forEach(function (e) {
                    c.menu && null != e && (x(n(Z, e), K), w(n('[data-menuanchor="' + t + '"]', e), K))
                })
            }(t), function (t, e) {
                c.navigation && null != n(ct)[0] && (x(n(Z, n(ct)[0]), K), t ? w(n('a[href="#' + t + '"]', n(ct)[0]), K) : w(n("a", n("li", n(ct)[0])[e]), K))
            }(t, e)
        }

        function Ie(t) {
            var e = v(n(st)[0], it), i = v(t, it);
            return e == i ? "none" : e > i ? "up" : "down"
        }

        function Oe(t) {
            if (!o(t, xt)) {
                var i = e.createElement("div");
                i.className = nt, i.style.height = De(t) + "px", w(t, xt), C(t, i)
            }
        }

        function De(t) {
            var e = fi;
            if (c.paddingTop || c.paddingBottom) {
                var i = t;
                o(i, et) || (i = k(t, it));
                var s = parseInt(getComputedStyle(i)["padding-top"]) + parseInt(getComputedStyle(i)["padding-bottom"]);
                e = fi - s
            }
            return e
        }

        function Be(t, e) {
            e ? Le(pi) : Ae(pi), l(pi, Ge(t)), ai.test.translate3d = t, setTimeout(function () {
                x(pi, _)
            }, 10)
        }

        function He(t) {
            var e = n(it + '[data-anchor="' + t + '"]', pi)[0];
            if (!e) {
                var i = void 0 !== t ? t - 1 : 0;
                e = n(it)[i]
            }
            return e
        }

        function Ve(t, e) {
            var i = He(t);
            if (null != i) {
                var s = function (t, e) {
                    var i = n(vt + '[data-anchor="' + t + '"]', e)[0];
                    return null == i && (t = void 0 !== t ? t : 0, i = n(vt, e)[t]), i
                }(e, i);
                Xe(i) === oi || o(i, K) ? Re(s) : ne(i, function () {
                    Re(s)
                })
            }
        }

        function Re(t) {
            null != t && Me(k(t, bt), t)
        }

        function Fe(t, e, i, s) {
            var n = "";
            c.anchors.length && !c.lockAnchors && (t ? (null != i && (n = i), null == e && (e = t), ri = e, Ye(n + "/" + e)) : null != t ? (ri = e, Ye(i)) : Ye(i)), je()
        }

        function Ye(e) {
            if (c.recordHistory) location.hash = e; else if (di || ui) t.history.replaceState(void 0, void 0, "#" + e); else {
                var i = t.location.href.split("#")[0];
                t.location.replace(i + "#" + e)
            }
        }

        function Xe(t) {
            if (!t) return null;
            var e = t.getAttribute("data-anchor"), i = v(t);
            return null == e && (e = i), e
        }

        function je() {
            var t = n(st)[0], e = n(mt, t)[0], i = Xe(t), s = Xe(e), a = String(i);
            e && (a = a + "-" + s), a = a.replace("/", "-").replace("#", "");
            var o = new RegExp("\\b\\s?" + U + "-[^\\s]+\\b", "g");
            ni.className = ni.className.replace(o, ""), w(ni, U + "-" + a)
        }

        function We(t) {
            var e = [];
            return e.y = void 0 !== t.pageY && (t.pageY || t.pageX) ? t.pageY : t.touches[0].pageY, e.x = void 0 !== t.pageX && (t.pageY || t.pageX) ? t.pageX : t.touches[0].pageX, ui && Qt(t) && c.scrollBar && void 0 !== t.touches && (e.y = t.touches[0].pageY, e.x = t.touches[0].pageX), e
        }

        function Ne(t, e) {
            T(0, "internal"), void 0 !== e && (vi = !0), Me(k(t, bt), t), void 0 !== e && (vi = !1), T(Ii.scrollingSpeed, "internal")
        }

        function _e(t) {
            var e = Math.round(t);
            if (c.css3 && c.autoScrolling && !c.scrollBar) Be("translate3d(0px, -" + e + "px, 0px)", !1); else if (c.autoScrolling && !c.scrollBar) l(pi, {top: -e + "px"}), ai.test.top = -e + "px"; else {
                var i = le(e);
                Je(i.element, i.options)
            }
        }

        function Ge(t) {
            return {"-webkit-transform": t, "-moz-transform": t, "-ms-transform": t, transform: t}
        }

        function qe(t, e, i) {
            "all" !== e ? yi[i][e] = t : Object.keys(yi[i]).forEach(function (e) {
                yi[i][e] = t
            })
        }

        function Ue(i) {
            m(!1, "internal"), At(!0), zt(!1), It(!1), w(pi, G), clearTimeout(Pi), clearTimeout(ki), clearTimeout(Mi), clearTimeout($i), clearTimeout(Li), t.removeEventListener("scroll", Gt), t.removeEventListener("hashchange", ge), t.removeEventListener("resize", Pe), e.removeEventListener("keydown", ye), e.removeEventListener("keyup", we), ["click", "touchstart"].forEach(function (t) {
                e.removeEventListener(t, Xt)
            }), ["mouseenter", "touchstart", "mouseleave", "touchend"].forEach(function (t) {
                e.removeEventListener(t, Wt, !0)
            }), clearTimeout(Pi), clearTimeout(ki), i && (_e(0), n("img[data-src], source[data-src], audio[data-src], iframe[data-src]", pi).forEach(function (t) {
                he(t, "src")
            }), n("img[data-srcset]").forEach(function (t) {
                he(t, "srcset")
            }), R(n(ct + ", " + Tt + ", " + Ct)), l(n(it), {
                height: "",
                "background-color": "",
                padding: ""
            }), l(n(vt), {width: ""}), l(pi, {
                height: "",
                position: "",
                "-ms-touch-action": "",
                "touch-action": ""
            }), l(si, {
                overflow: "",
                height: ""
            }), x(n("html"), q), x(ni, N), ni.className.split(/\s+/).forEach(function (t) {
                0 === t.indexOf(U) && x(ni, t)
            }), n(it + ", " + vt).forEach(function (t) {
                c.scrollOverflowHandler && c.scrollOverflow && c.scrollOverflowHandler.remove(t), x(t, xt + " " + K + " " + Q), t.getAttribute("data-fp-styles") && t.setAttribute("style", t.getAttribute("data-fp-styles")), o(t, et) && !Oi && t.removeAttribute("data-anchor")
            }), Ae(pi), [at, wt, bt].forEach(function (t) {
                n(t, pi).forEach(function (t) {
                    M(t)
                })
            }), l(pi, {
                "-webkit-transition": "none",
                transition: "none"
            }), t.scrollTo(0, 0), [et, ft, yt].forEach(function (t) {
                x(n("." + t), t)
            }))
        }

        function Ke(t, e, i) {
            c[t] = e, "internal" !== i && (Ii[t] = e)
        }

        function Ze() {
            var t = c.licenseKey, e = "font-size: 15px;background:yellow;";
            ii && t && t.length < 20 && (console.warn("%c This website was made using fullPage.js slider. More info on the following website:", e), console.warn("%c https://alvarotrigo.com/fullPage/", e)), o(n("html"), q) ? s("error", "Fullpage.js can only be initialized once and you are doing it multiple times!") : (c.continuousVertical && (c.loopTop || c.loopBottom) && (c.continuousVertical = !1, s("warn", "Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), !c.scrollOverflow || !c.scrollBar && c.autoScrolling || s("warn", "Options scrollBar:true and autoScrolling:false are mutually exclusive with scrollOverflow:true. Sections with scrollOverflow might not work well in Firefox"), !c.continuousVertical || !c.scrollBar && c.autoScrolling || (c.continuousVertical = !1, s("warn", "Scroll bars (`scrollBar:true` or `autoScrolling:false`) are mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), c.scrollOverflow && null == c.scrollOverflowHandler && (c.scrollOverflow = !1, s("error", "The option `scrollOverflow:true` requires the file `scrolloverflow.min.js`. Please include it before fullPage.js.")), ["fadingEffect", "continuousHorizontal", "scrollHorizontally", "interlockedSlides", "resetSliders", "responsiveSlides", "offsetSections", "dragAndMove", "scrollOverflowReset", "parallax", "cards"].forEach(function (t) {
                c[t] && s("warn", "fullpage.js extensions require fullpage.extensions.min.js file instead of the usual fullpage.js. Requested: " + t)
            }), c.anchors.forEach(function (t) {
                var e = [].slice.call(n("[name]")).filter(function (e) {
                    return e.getAttribute("name") && e.getAttribute("name").toLowerCase() == t.toLowerCase()
                }), i = [].slice.call(n("[id]")).filter(function (e) {
                    return e.getAttribute("id") && e.getAttribute("id").toLowerCase() == t.toLowerCase()
                });
                (i.length || e.length) && (s("error", "data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE)."), i.length && s("error", '"' + t + '" is is being used by another element `id` property'), e.length && s("error", '"' + t + '" is is being used by another element `name` property'))
            }))
        }

        function Qe(e, i, s, n) {
            var a = function (e) {
                return e.self != t && o(e, gt) ? e.scrollLeft : !c.autoScrolling || c.scrollBar ? A() : e.offsetTop
            }(e), r = i - a, l = 0;
            zi = !0;
            var h = function () {
                if (zi) {
                    var o = i;
                    l += 20, s && (o = t.fp_easings[c.easing](l, a, r, s)), Je(e, o), l < s ? setTimeout(h, 20) : void 0 !== n && n()
                } else l < s && n()
            };
            h()
        }

        function Je(e, i) {
            !c.autoScrolling || c.scrollBar || e.self != t && o(e, gt) ? e.self != t && o(e, gt) ? e.scrollLeft = i : e.scrollTo(0, i) : e.style.top = i + "px"
        }

        function ti(t, e) {
            this.anchor = t.getAttribute("data-anchor"), this.item = t, this.index = v(t, e), this.isLast = this.index === t.parentElement.querySelectorAll(e).length - 1, this.isFirst = !this.index
        }

        function ei(t) {
            ti.call(this, t, it)
        }

        var ii = c && new RegExp("([\\d\\w]{8}-){3}[\\d\\w]{8}|^(?=.*?[A-Y])(?=.*?[a-y])(?=.*?[0-8])(?=.*?[#?!@$%^&*-]).{8,}$").test(c.licenseKey) || e.domain.indexOf("alvarotrigo.com") > -1;
        if (!o(n("html"), q)) {
            var si = n("html, body"), ni = n("body")[0], ai = {};
            c = a({
                menu: !1,
                anchors: [],
                lockAnchors: !1,
                navigation: !1,
                navigationPosition: "right",
                navigationTooltips: [],
                showActiveTooltip: !1,
                slidesNavigation: !1,
                slidesNavPosition: "bottom",
                scrollBar: !1,
                hybrid: !1,
                css3: !0,
                scrollingSpeed: 700,
                autoScrolling: !0,
                fitToSection: !0,
                fitToSectionDelay: 1e3,
                easing: "easeInOutCubic",
                easingcss3: "ease",
                loopBottom: !1,
                loopTop: !1,
                loopHorizontal: !0,
                continuousVertical: !1,
                continuousHorizontal: !1,
                scrollHorizontally: !1,
                interlockedSlides: !1,
                dragAndMove: !1,
                offsetSections: !1,
                resetSliders: !1,
                fadingEffect: !1,
                normalScrollElements: null,
                scrollOverflow: !1,
                scrollOverflowReset: !1,
                scrollOverflowHandler: t.fp_scrolloverflow ? t.fp_scrolloverflow.iscrollHandler : null,
                scrollOverflowOptions: null,
                touchSensitivity: 5,
                touchWrapper: "string" == typeof i ? n(i)[0] : i,
                normalScrollElementTouchThreshold: 5,
                bigSectionsDestination: null,
                keyboardScrolling: !0,
                animateAnchor: !0,
                recordHistory: !0,
                controlArrows: !0,
                controlArrowColor: "#fff",
                verticalCentered: !0,
                sectionsColor: [],
                paddingTop: 0,
                paddingBottom: 0,
                fixedElements: null,
                responsive: 0,
                responsiveWidth: 0,
                responsiveHeight: 0,
                responsiveSlides: !1,
                parallax: !1,
                parallaxOptions: {type: "reveal", percentage: 62, property: "translate"},
                cards: !1,
                cardsOptions: {perspective: 100, fadeContent: !0, fadeBackground: !0},
                sectionSelector: tt,
                slideSelector: pt,
                v2compatible: !1,
                afterLoad: null,
                onLeave: null,
                afterRender: null,
                afterResize: null,
                afterReBuild: null,
                afterSlideLoad: null,
                onSlideLeave: null,
                afterResponsive: null,
                lazyLoading: !0
            }, c);
            var oi, ri, li, ci, hi = !1,
                di = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/),
                ui = "ontouchstart" in t || navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints,
                pi = "string" == typeof i ? n(i)[0] : i, fi = r(), vi = !1, mi = !0, gi = !0, bi = [], yi = {};
            yi.m = {up: !0, down: !0, left: !0, right: !0}, yi.k = a({}, yi.m);
            var wi, xi = t.PointerEvent ? {down: "pointerdown", move: "pointermove"} : {
                    down: "MSPointerDown",
                    move: "MSPointerMove"
                }, Si = {
                    touchmove: "ontouchmove" in t ? "touchmove" : xi.move,
                    touchstart: "ontouchstart" in t ? "touchstart" : xi.down
                },
                Ti = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]',
                Ei = !1;
            try {
                var Ci = Object.defineProperty({}, "passive", {
                    get: function () {
                        Ei = !0
                    }
                });
                t.addEventListener("testPassive", null, Ci), t.removeEventListener("testPassive", null, Ci)
            } catch (t) {
            }
            var Mi, ki, Pi, $i, Li, Ai, zi, Ii = a({}, c), Oi = !1, Di = !0;
            Ze(), t.fp_easings = a(t.fp_easings, {
                easeInOutCubic: function (t, e, i, s) {
                    return (t /= s / 2) < 1 ? i / 2 * t * t * t + e : i / 2 * ((t -= 2) * t * t + 2) + e
                }
            }), pi && (ai.version = "3.0.5", ai.setAutoScrolling = m, ai.setRecordHistory = y, ai.setScrollingSpeed = T, ai.setFitToSection = L, ai.setLockAnchors = function (t) {
                c.lockAnchors = t
            }, ai.setMouseWheelScrolling = F, ai.setAllowScrolling = At, ai.setKeyboardScrolling = It, ai.moveSectionUp = Ot, ai.moveSectionDown = Dt, ai.silentMoveTo = Bt, ai.moveTo = Ht, ai.moveSlideRight = Vt, ai.moveSlideLeft = Rt, ai.fitToSection = qt, ai.reBuild = Ft, ai.setResponsive = Yt, ai.getFullpageData = function () {
                return c
            }, ai.destroy = Ue, ai.getActiveSection = function () {
                return new ei(n(st)[0])
            }, ai.getActiveSlide = function () {
                return re(n(mt, n(st)[0])[0])
            }, ai.test = {
                top: "0px", translate3d: "translate3d(0px, 0px, 0px)", translate3dH: function () {
                    for (var t = [], e = 0; e < n(c.sectionSelector, pi).length; e++) t.push("translate3d(0px, 0px, 0px)");
                    return t
                }(), left: function () {
                    for (var t = [], e = 0; e < n(c.sectionSelector, pi).length; e++) t.push(0);
                    return t
                }(), options: c, setAutoScrolling: m
            }, ai.shared = {afterRenderActions: _t}, t.fullpage_api = ai, c.$ && (c.$.fn.fullpage = ai), c.css3 && (c.css3 = function () {
                var i, s = e.createElement("p"), n = {
                    webkitTransform: "-webkit-transform",
                    OTransform: "-o-transform",
                    msTransform: "-ms-transform",
                    MozTransform: "-moz-transform",
                    transform: "transform"
                };
                s.style.display = "block", e.body.insertBefore(s, null);
                for (var a in n) void 0 !== s.style[a] && (s.style[a] = "translate3d(1px,1px,1px)", i = t.getComputedStyle(s).getPropertyValue(n[a]));
                return e.body.removeChild(s), void 0 !== i && i.length > 0 && "none" !== i
            }()), c.scrollBar = c.scrollBar || c.hybrid, function () {
                if (!c.anchors.length) {
                    var t = "[data-anchor]", e = n(c.sectionSelector.split(",").join(t + ",") + t, pi);
                    e.length && (Oi = !0, e.forEach(function (t) {
                        c.anchors.push(t.getAttribute("data-anchor").toString())
                    }))
                }
                if (!c.navigationTooltips.length) {
                    var t = "[data-tooltip]", i = n(c.sectionSelector.split(",").join(t + ",") + t, pi);
                    i.length && i.forEach(function (t) {
                        c.navigationTooltips.push(t.getAttribute("data-tooltip").toString())
                    })
                }
            }(), function () {
                l(pi, {
                    height: "100%",
                    position: "relative"
                }), w(pi, j), w(n("html"), q), fi = r(), x(pi, G), w(n(c.sectionSelector, pi), et), w(n(c.slideSelector, pi), ft);
                for (var t = n(it), i = 0; i < t.length; i++) {
                    var s = i, a = t[i], h = n(vt, a), d = h.length;
                    a.setAttribute("data-fp-styles", a.getAttribute("style")), function (t, e) {
                        e || null != n(st)[0] || w(t, K), ci = n(st)[0], l(t, {height: fi + "px"}), c.paddingTop && l(t, {"padding-top": c.paddingTop}), c.paddingBottom && l(t, {"padding-bottom": c.paddingBottom}), void 0 !== c.sectionsColor[e] && l(t, {"background-color": c.sectionsColor[e]}), void 0 !== c.anchors[e] && t.setAttribute("data-anchor", c.anchors[e])
                    }(a, s), function (t, e) {
                        void 0 !== c.anchors[e] && o(t, K) && ze(c.anchors[e], e), c.menu && c.css3 && null != k(n(c.menu)[0], W) && n(c.menu).forEach(function (t) {
                            ni.appendChild(t)
                        })
                    }(a, s), d > 0 ? function (t, i, s) {
                        var a = 100 * s, o = 100 / s, r = e.createElement("div");
                        r.className = gt, E(i, r);
                        var h = e.createElement("div");
                        h.className = yt, E(i, h), l(n(wt, t), {width: a + "%"}), s > 1 && (c.controlArrows && function (t) {
                            var e = [V('<div class="' + kt + '"></div>'), V('<div class="' + $t + '"></div>')];
                            P(n(bt, t)[0], e), "#fff" !== c.controlArrowColor && (l(n(Lt, t), {"border-color": "transparent transparent transparent " + c.controlArrowColor}), l(n(Pt, t), {"border-color": "transparent " + c.controlArrowColor + " transparent transparent"})), c.loopHorizontal || g(n(Pt, t))
                        }(t), c.slidesNavigation && function (t, e) {
                            S(V('<div class="' + St + '"><ul></ul></div>'), t);
                            var i = n(Tt, t)[0];
                            w(i, "fp-" + c.slidesNavPosition);
                            for (var s = 0; s < e; s++) S(V('<li><a href="#"><span class="fp-sr-only">' + Nt(s, "Slide") + "</span><span></span></a></li>"), n("ul", i)[0]);
                            l(i, {"margin-left": "-" + i.innerWidth / 2 + "px"}), w(n("a", n("li", i)[0]), K)
                        }(t, s)), i.forEach(function (t) {
                            l(t, {width: o + "%"}), c.verticalCentered && Oe(t)
                        });
                        var d = n(mt, t)[0];
                        null != d && (0 !== v(n(st), it) || 0 === v(n(st), it) && 0 !== v(d)) ? Ne(d, "internal") : w(i[0], K)
                    }(a, h, d) : c.verticalCentered && Oe(a)
                }
                c.fixedElements && c.css3 && n(c.fixedElements).forEach(function (t) {
                    ni.appendChild(t)
                }), c.navigation && function () {
                    var t = e.createElement("div");
                    t.setAttribute("id", lt);
                    var i = e.createElement("ul");
                    t.appendChild(i), S(t, ni);
                    var s = n(ct)[0];
                    w(s, "fp-" + c.navigationPosition), c.showActiveTooltip && w(s, ut);
                    for (var a = "", o = 0; o < n(it).length; o++) {
                        var r = "";
                        c.anchors.length && (r = c.anchors[o]), a += '<li><a href="#' + r + '"><span class="fp-sr-only">' + Nt(o, "Section") + "</span><span></span></a>";
                        var h = c.navigationTooltips[o];
                        void 0 !== h && "" !== h && (a += '<div class="' + ht + " fp-" + c.navigationPosition + '">' + h + "</div>"), a += "</li>"
                    }
                    n("ul", s)[0].innerHTML = a, l(n(ct), {"margin-top": "-" + n(ct)[0].offsetHeight / 2 + "px"}), w(n("a", n("li", n(ct)[0])[v(n(st)[0], it)]), K)
                }(), n('iframe[src*="youtube.com/embed/"]', pi).forEach(function (t) {
                    !function (t, e) {
                        var i = t.getAttribute("src");
                        t.setAttribute("src", i + (/\?/.test(i) ? "&" : "?") + "enablejsapi=1")
                    }(t)
                }), c.scrollOverflow && (wi = c.scrollOverflowHandler.init(c))
            }(), At(!0), zt(!0), m(c.autoScrolling, "internal"), $e(), je(), "complete" === e.readyState && me(), t.addEventListener("load", me), c.scrollOverflow || _t(), t.addEventListener("scroll", Gt), t.addEventListener("hashchange", ge), t.addEventListener("blur", Ee), t.addEventListener("resize", Pe), e.addEventListener("keydown", ye), e.addEventListener("keyup", we), ["click", "touchstart"].forEach(function (t) {
                e.addEventListener(t, Xt)
            }), c.normalScrollElements && (["mouseenter", "touchstart"].forEach(function (t) {
                jt(t, !1)
            }), ["mouseleave", "touchend"].forEach(function (t) {
                jt(t, !0)
            })));
            var Bi = !1, Hi = 0, Vi = 0, Ri = 0, Fi = 0, Yi = 0, Xi = (new Date).getTime(), ji = 0, Wi = 0, Ni = fi;
            return ai
        }
        Ze()
    }

    function s(e, i) {
        t.console && t.console[e] && t.console[e]("fullPage: " + i)
    }

    function n(t, i) {
        return (i = arguments.length > 1 ? i : e) ? i.querySelectorAll(t) : null
    }

    function a(t) {
        t = t || {};
        for (var e = 1, i = arguments.length; e < i; ++e) {
            var s = arguments[e];
            if (s) for (var n in s) s.hasOwnProperty(n) && ("[object Object]" !== Object.prototype.toString.call(s[n]) ? t[n] = s[n] : t[n] = a(t[n], s[n]))
        }
        return t
    }

    function o(t, e) {
        return null != t && (t.classList ? t.classList.contains(e) : new RegExp("(^| )" + e + "( |$)", "gi").test(t.className))
    }

    function r() {
        return "innerHeight" in t ? t.innerHeight : e.documentElement.offsetHeight
    }

    function l(t, e) {
        t = m(t);
        var i;
        for (i in e) if (e.hasOwnProperty(i) && null !== i) for (var s = 0; s < t.length; s++) t[s].style[i] = e[i];
        return t
    }

    function c(t, e, i) {
        for (var s = t[i]; s && !B(s, e);) s = s[i];
        return s
    }

    function h(t, e) {
        return c(t, e, "previousElementSibling")
    }

    function d(t, e) {
        return c(t, e, "nextElementSibling")
    }

    function u(t) {
        return t.previousElementSibling
    }

    function p(t) {
        return t.nextElementSibling
    }

    function f(t) {
        return t[t.length - 1]
    }

    function v(t, e) {
        t = y(t) ? t[0] : t;
        for (var i = null != e ? n(e, t.parentNode) : t.parentNode.childNodes, s = 0, a = 0; a < i.length; a++) {
            if (i[a] == t) return s;
            1 == i[a].nodeType && s++
        }
        return -1
    }

    function m(t) {
        return y(t) ? t : [t]
    }

    function g(t) {
        t = m(t);
        for (var e = 0; e < t.length; e++) t[e].style.display = "none";
        return t
    }

    function b(t) {
        t = m(t);
        for (var e = 0; e < t.length; e++) t[e].style.display = "block";
        return t
    }

    function y(t) {
        return "[object Array]" === Object.prototype.toString.call(t) || "[object NodeList]" === Object.prototype.toString.call(t)
    }

    function w(t, e) {
        t = m(t);
        for (var i = 0; i < t.length; i++) {
            var s = t[i];
            s.classList ? s.classList.add(e) : s.className += " " + e
        }
        return t
    }

    function x(t, e) {
        t = m(t);
        for (var i = e.split(" "), s = 0; s < i.length; s++) {
            e = i[s];
            for (var n = 0; n < t.length; n++) {
                var a = t[n];
                a.classList ? a.classList.remove(e) : a.className = a.className.replace(new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"), " ")
            }
        }
        return t
    }

    function S(t, e) {
        e.appendChild(t)
    }

    function T(t, i, s) {
        var n;
        i = i || e.createElement("div");
        for (var a = 0; a < t.length; a++) {
            var o = t[a];
            (s && !a || !s) && (n = i.cloneNode(!0), o.parentNode.insertBefore(n, o)), n.appendChild(o)
        }
        return t
    }

    function E(t, e) {
        T(t, e, !0)
    }

    function C(t, e) {
        for ("string" == typeof e && (e = V(e)), t.appendChild(e); t.firstChild !== e;) e.appendChild(t.firstChild)
    }

    function M(t) {
        for (var i = e.createDocumentFragment(); t.firstChild;) i.appendChild(t.firstChild);
        t.parentNode.replaceChild(i, t)
    }

    function k(t, e) {
        return t && 1 === t.nodeType ? B(t, e) ? t : k(t.parentNode, e) : null
    }

    function P(t, e) {
        L(t, t.nextSibling, e)
    }

    function $(t, e) {
        L(t, t, e)
    }

    function L(t, e, i) {
        y(i) || ("string" == typeof i && (i = V(i)), i = [i]);
        for (var s = 0; s < i.length; s++) t.parentNode.insertBefore(i[s], e)
    }

    function A() {
        var i = e.documentElement;
        return (t.pageYOffset || i.scrollTop) - (i.clientTop || 0)
    }

    function z(t) {
        return Array.prototype.filter.call(t.parentNode.children, function (e) {
            return e !== t
        })
    }

    function I(t) {
        t.preventDefault ? t.preventDefault() : t.returnValue = !1
    }

    function O(t) {
        if ("function" == typeof t) return !0;
        var e = Object.prototype.toString(t);
        return "[object Function]" === e || "[object GeneratorFunction]" === e
    }

    function D(i, s, n) {
        var a;
        n = void 0 === n ? {} : n, "function" == typeof t.CustomEvent ? a = new CustomEvent(s, {detail: n}) : (a = e.createEvent("CustomEvent")).initCustomEvent(s, !0, !0, n), i.dispatchEvent(a)
    }

    function B(t, e) {
        return (t.matches || t.matchesSelector || t.msMatchesSelector || t.mozMatchesSelector || t.webkitMatchesSelector || t.oMatchesSelector).call(t, e)
    }

    function H(t, e) {
        if ("boolean" == typeof e) for (var i = 0; i < t.length; i++) t[i].style.display = e ? "block" : "none";
        return t
    }

    function V(t) {
        var i = e.createElement("div");
        return i.innerHTML = t.trim(), i.firstChild
    }

    function R(t) {
        t = m(t);
        for (var e = 0; e < t.length; e++) {
            var i = t[e];
            i && i.parentElement && i.parentNode.removeChild(i)
        }
    }

    function F(t, e, i) {
        for (var s = t[i], n = []; s;) (B(s, e) || null == e) && n.push(s), s = s[i];
        return n
    }

    function Y(t, e) {
        return F(t, e, "nextElementSibling")
    }

    function X(t, e) {
        return F(t, e, "previousElementSibling")
    }

    var j = "fullpage-wrapper", W = "." + j, N = "fp-responsive", _ = "fp-notransition", G = "fp-destroyed",
        q = "fp-enabled", U = "fp-viewing", K = "active", Z = "." + K, Q = "fp-completely", J = "." + Q,
        tt = ".section", et = "fp-section", it = "." + et, st = it + Z, nt = "fp-tableCell", at = "." + nt,
        ot = "fp-auto-height", rt = "fp-normal-scroll", lt = "fp-nav", ct = "#" + lt, ht = "fp-tooltip", dt = "." + ht,
        ut = "fp-show-active", pt = ".slide", ft = "fp-slide", vt = "." + ft, mt = vt + Z, gt = "fp-slides",
        bt = "." + gt, yt = "fp-slidesContainer", wt = "." + yt, xt = "fp-table", St = "fp-slidesNav", Tt = "." + St,
        Et = Tt + " a", Ct = ".fp-controlArrow", Mt = "fp-prev", kt = "fp-controlArrow " + Mt, Pt = Ct + "." + Mt,
        $t = "fp-controlArrow fp-next", Lt = Ct + ".fp-next";
    return t.NodeList && !NodeList.prototype.forEach && (NodeList.prototype.forEach = function (e, i) {
        i = i || t;
        for (var s = 0; s < this.length; s++) e.call(i, this[s], s, this)
    }), t.fp_utils = {
        $: n,
        deepExtend: a,
        hasClass: o,
        getWindowHeight: r,
        css: l,
        until: c,
        prevUntil: h,
        nextUntil: d,
        prev: u,
        next: p,
        last: f,
        index: v,
        getList: m,
        hide: g,
        show: b,
        isArrayOrList: y,
        addClass: w,
        removeClass: x,
        appendTo: S,
        wrap: T,
        wrapAll: E,
        wrapInner: C,
        unwrap: M,
        closest: k,
        after: P,
        before: $,
        insertBefore: L,
        getScrollTop: A,
        siblings: z,
        preventDefault: I,
        isFunction: O,
        trigger: D,
        matches: B,
        toggle: H,
        createElementFromHTML: V,
        remove: R,
        filter: function (t, e) {
            Array.prototype.filter.call(t, e)
        },
        untilAll: F,
        nextAll: Y,
        prevAll: X,
        showError: s
    }, i
}), window.jQuery && window.fullpage && function (t, e) {
    "use strict";
    t && e ? t.fn.fullpage = function (i) {
        i.$ = t, new e(this[0], i)
    } : window.fp_utils.showError("error", "jQuery is required to use the jQuery fullpage adapter!")
}(window.jQuery, window.fullpage);
var scroller, __assign = this && this.__assign || function () {
    return (__assign = Object.assign || function (t) {
        for (var e, i = 1, s = arguments.length; i < s; i++) {
            e = arguments[i];
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
        }
        return t
    }).apply(this, arguments)
}, CountUp = function () {
    function t(t, e, i, s) {
        var n = this;
        this.target = t, this.endVal = i, this.options = s, this.defaults = {
            startVal: e || 0,
            decimalPlaces: 0,
            duration: 2,
            useEasing: !0,
            useGrouping: !0,
            smartEasingThreshold: 999,
            smartEasingAmount: 333,
            separator: ",",
            decimal: ".",
            prefix: "",
            suffix: ""
        }, this.finalEndVal = null, this.useEasing = !0, this.countDown = !1, this.error = "", this.startVal = 0, this.paused = !0, this.count = function (t) {
            n.startTime || (n.startTime = t);
            var e = t - n.startTime;
            n.remaining = n.duration - e, n.useEasing ? n.countDown ? n.frameVal = n.startVal - n.easingFn(e, 0, n.startVal - n.endVal, n.duration) : n.frameVal = n.easingFn(e, n.startVal, n.endVal - n.startVal, n.duration) : n.countDown ? n.frameVal = n.startVal - (n.startVal - n.endVal) * (e / n.duration) : n.frameVal = n.startVal + (n.endVal - n.startVal) * (e / n.duration), n.countDown ? n.frameVal = n.frameVal < n.endVal ? n.endVal : n.frameVal : n.frameVal = n.frameVal > n.endVal ? n.endVal : n.frameVal, n.frameVal = Number(n.frameVal.toFixed(n.options.decimalPlaces)), n.printValue(n.frameVal), e < n.duration ? n.rAF = requestAnimationFrame(n.count) : null !== n.finalEndVal ? n.update(n.finalEndVal) : n.callback && n.callback()
        }, this.formatNumber = function (t) {
            var e, i, s, a, o, r = t < 0 ? "-" : "";
            if (e = Math.abs(t).toFixed(n.options.decimalPlaces), e += "", i = e.split("."), s = i[0], a = i.length > 1 ? n.options.decimal + i[1] : "", n.options.useGrouping) {
                o = "";
                for (var l = 0, c = s.length; l < c; ++l) 0 !== l && l % 3 == 0 && (o = n.options.separator + o), o = s[c - l - 1] + o;
                s = o
            }
            return n.options.numerals && n.options.numerals.length && (s = s.replace(/[0-9]/g, function (t) {
                return n.options.numerals[+t]
            }), a = a.replace(/[0-9]/g, function (t) {
                return n.options.numerals[+t]
            })), r + n.options.prefix + s + a + n.options.suffix
        }, this.easeOutExpo = function (t, e, i, s) {
            return i * (1 - Math.pow(2, -10 * t / s)) * 1024 / 1023 + e
        }, this.options = __assign(__assign({}, this.defaults), s), this.formattingFn = this.options.formattingFn ? this.options.formattingFn : this.formatNumber, this.easingFn = this.options.easingFn ? this.options.easingFn : this.easeOutExpo, this.startVal = this.validateValue(this.options.startVal), this.frameVal = this.startVal, this.endVal = this.validateValue(i), this.options.decimalPlaces = Math.max(this.options.decimalPlaces), this.resetDuration(), this.options.separator = String(this.options.separator), this.useEasing = this.options.useEasing, "" === this.options.separator && (this.options.useGrouping = !1), this.el = t, this.el ? this.printValue(this.startVal) : this.error = "[CountUp] target is null or undefined"
    }

    return t.prototype.determineDirectionAndSmartEasing = function () {
        var t = this.finalEndVal ? this.finalEndVal : this.endVal;
        this.countDown = this.startVal > t;
        var e = t - this.startVal;
        if (Math.abs(e) > this.options.smartEasingThreshold) {
            this.finalEndVal = t;
            var i = this.countDown ? 1 : -1;
            this.endVal = t + i * this.options.smartEasingAmount, this.duration = this.duration / 2
        } else this.endVal = t, this.finalEndVal = null;
        this.finalEndVal ? this.useEasing = !1 : this.useEasing = this.options.useEasing
    }, t.prototype.start = function (t) {
        this.error || (this.callback = t, this.duration > 0 ? (this.determineDirectionAndSmartEasing(), this.paused = !1, this.rAF = requestAnimationFrame(this.count)) : this.printValue(this.endVal))
    }, t.prototype.pauseResume = function () {
        this.paused ? (this.startTime = null, this.duration = this.remaining, this.startVal = this.frameVal, this.determineDirectionAndSmartEasing(), this.rAF = requestAnimationFrame(this.count)) : cancelAnimationFrame(this.rAF), this.paused = !this.paused
    }, t.prototype.reset = function () {
        cancelAnimationFrame(this.rAF), this.paused = !0, this.resetDuration(), this.startVal = this.validateValue(this.options.startVal), this.frameVal = this.startVal, this.printValue(this.startVal)
    }, t.prototype.update = function (t) {
        cancelAnimationFrame(this.rAF), this.startTime = null, this.endVal = this.validateValue(t), this.endVal !== this.frameVal && (this.startVal = this.frameVal, this.finalEndVal || this.resetDuration(), this.finalEndVal = null, this.determineDirectionAndSmartEasing(), this.rAF = requestAnimationFrame(this.count))
    }, t.prototype.printValue = function (t) {
        var e = this.formattingFn(t);
        this.el[0].innerHTML = e
    }, t.prototype.ensureNumber = function (t) {
        return "number" == typeof t && !isNaN(t)
    }, t.prototype.validateValue = function (t) {
        var e = Number(t);
        return this.ensureNumber(e) ? e : (this.error = "[CountUp] invalid start or end value: " + t, null)
    }, t.prototype.resetDuration = function () {
        this.startTime = null, this.duration = 1e3 * Number(this.options.duration), this.remaining = this.duration
    }, t
}();
let userAgent = navigator.userAgent.toLowerCase(),
    isIE = -1 != userAgent.indexOf("msie") ? parseInt(userAgent.split("msie")[1]) : -1 != userAgent.indexOf("trident") ? 11 : -1 != userAgent.indexOf("edge") && 12,
    isMac = "Mac68K" == navigator.platform || "MacPPC" == navigator.platform || "Macintosh" == navigator.platform || "MacIntel" == navigator.platform,
    isIEBrows = -1 != navigator.appVersion.indexOf("MSIE") || navigator.appVersion.indexOf("Trident/") > 0,
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isTouch = "ontouchstart" in window, prevScroll = 0, prevDirection = 0, cookie = {
        setCookie: function (t, e) {
            let i = new Date;
            i.setTime(i.getTime() + 2592e6), document.cookie = t + "=" + escape(e) + ";expires=" + i.toGMTString() + ";path=/;"
        }, getCookie: function (t) {
            let e = document.cookie.match(new RegExp("(^| )" + t + "=([^;]*)(;|$)"));
            return null != e ? unescape(e[2]) : null
        }, delCookie: function (t) {
            let e = new Date;
            e.setTime(e.getTime() - 1);
            let i = getCookie(t);
            null != i && (document.cookie = t + "=" + i + ";expires=" + e.toGMTString())
        }
    }, getUrlParam = function (t) {
        let e = new RegExp("(^|&)" + t + "=([^&]*)(&|$)"), i = window.location.search.substr(1).match(e);
        return null != i ? unescape(i[2]) : null
    }, activeSwiperMenu = function (t, e, i, s) {
        $(t).addClass(e), $(t).siblings().removeClass(e), !!i && i.slideTo(s)
    }, toggleHeader = function (t) {
        const e = $(".header-item-animate");
        2 === t && gsap.to(e, .3, {
            ease: "power1.out",
            y: "-100%",
            opacity: 0
        }), 1 === t && gsap.to(e, .3, {ease: "power1.out", y: 0, opacity: 1}), prevDirection = t
    }, fullPageInit = function () {
        $("#fullpage").fullpage({
            scrollingSpeed: 1100,
            easingcss3: "cubic-bezier(0.42,0,0,0.99)",
            fadingEffect: !0,
            responsiveWidth: 1366,
            responsiveSlides: !0,
            onLeave: function (t, e, i, s) {
                $(e.item).find(".NUM").length && num.init()
            }
        })
    }, hideShowHeader = function (t) {
        var e, i = t.scroll.y;
        e = i > prevScroll ? 2 : i < prevScroll ? 1 : 0, prevScroll = i, e !== prevDirection && toggleHeader(e)
    }, scrollInit = function () {
        !!scroller && scroller.destroy(), !!(scroller = new LocomotiveScroll({
            el: document.querySelector("[data-scroll-container]"),
            smooth: !0
        })) && scroller.on("call", function (t, e, i) {
            "fadeIn" === t && gsap.fromTo(i.el, 1.7, {opacity: 0}, {
                ease: "power1.out",
                opacity: 1,
                delay: i.delay ? i.delay : .2
            }), "fadeInUp" === t && gsap.fromTo(i.el, 1.7, {opacity: .7, y: 40}, {
                ease: "power1.out",
                opacity: 1,
                delay: i.delay ? i.delay : .2,
                y: 0
            }), "fadeInLeft" === t && gsap.fromTo(i.el, 1.7, {opacity: 0, x: -20}, {
                ease: "power1.out",
                opacity: 1,
                delay: i.delay ? i.delay : .2,
                x: 0
            }), "fadeInRight" === t && gsap.fromTo(i.el, 1.7, {opacity: 0, x: 20}, {
                ease: "power1.out",
                opacity: 1,
                delay: i.delay ? i.delay : .2,
                x: 0
            }), "scaleIn" === t && gsap.fromTo(i.el, 1.7, {scale: 0}, {
                ease: "power2.out",
                delay: i.delay ? i.delay : .2,
                scale: 1
            }), "flashingText" === t && ($(i.el).addClass("prv-show"), $(i.el).textillate("in")), "countUp" === t && setTimeout(function () {
                num.init()
            }, 500)
        })
    }, num = {
        init: function () {
            $(".count-item").each(function (t, e) {
                let i = $(e), s = i.data("from"), n = i.data("to");
                new CountUp(i, s, n, 1, 2).start()
            })
        }
    }, flashingText = {
        init: function (t) {
            t.textillate("in")
        }
    }, particlesInit = {
        init: function () {
            particlesJS("particles", {
                particles: {
                    number: {value: 160, density: {enable: !0, value_area: 800}},
                    color: {value: "#fefefe"},
                    shape: {
                        type: "circle",
                        stroke: {width: 0, color: "#362cff"},
                        polygon: {nb_sides: 5},
                        image: {src: "img/github.svg", width: 100, height: 100}
                    },
                    opacity: {value: 1, random: !0, anim: {enable: !0, speed: 1, opacity_min: 0, sync: !0}},
                    size: {value: 3, random: !0, anim: {enable: !1, speed: 4, size_min: .3, sync: !1}},
                    line_linked: {enable: !1, distance: 150, color: "#ffffff", opacity: .4, width: 1},
                    move: {
                        enable: !0,
                        speed: .5,
                        direction: "none",
                        random: !0,
                        straight: !1,
                        out_mode: "out",
                        bounce: !1,
                        attract: {enable: !1, rotateX: 600, rotateY: 600}
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {onhover: {enable: !0, mode: "bubble"}, onclick: {enable: !1, mode: "repulse"}, resize: !0},
                    modes: {
                        grab: {distance: 100, line_linked: {opacity: .8}},
                        bubble: {distance: 250, size: 4, duration: 2, opacity: 1, speed: 3},
                        repulse: {distance: 400, duration: .4},
                        push: {particles_nb: 4},
                        remove: {particles_nb: 2}
                    }
                },
                retina_detect: !0
            })
        }
    }, swiper = {
        init: function () {
            var t = new Array;
            $(".swiper-container").each(function (e, i) {
                let s = $(i), n = s.find(".swiper-slide").length, a = s.is(".vertical") ? "vertical" : "horizontal",
                    o = s.is(".swiper-loop"), r = s.data("speed") ? s.data("speed") : 1e3,
                    l = s.data("space") ? s.data("space") : 0,
                    c = !s.is(".vertical") && s.data("columnx") ? s.data("columnx") : s.is(".vertical") && s.data("columny") ? s.data("columny") : 1,
                    h = s.data("columny") ? s.data("columny") : 1, d = s.data("group") ? s.data("group") : 1,
                    u = s.data("initial") ? s.data("initial") - 1 : 0, p = !s.is(".swiper-notouch"),
                    f = !!s.data("watch-progress"), v = s.is("#news_swiper") ? {
                        1366: {slidesPerView: 3},
                        768: {slidesPerView: 2}
                    } : s.is("#company_swiper") ? {
                        768: {slidesPerView: 3},
                        499: {slidesPerView: 2}
                    } : s.is("#testing_swiper") ? {
                        768: {slidesPerView: 3},
                        499: {slidesPerView: 2}
                    } : s.is("#party_swiper") ? {768: {slidesPerView: 3}, 499: {slidesPerView: 2}} : null,
                    m = !!s.data("delay") && {delay: s.data("delay"), stopOnLastSlide: !1, disableOnInteraction: !1},
                    g = !!s.is(".virtual-swiper") && {
                        addSlidesAfter: 1, slides: function () {
                            for (var t = [], e = 0; e < n; e += 1) t.push("");
                            return t
                        }()
                    }, b = !!s.data("pagination-type") && {
                        el: s.parent().find(".swiper-pagination"),
                        type: s.data("pagination-type"),
                        renderCustom: function (t, e, i) {
                            return "0" + e + " - 0" + i
                        },
                        renderBullet: function (t, e) {
                            return '<span class="' + e + '"></span>'
                        },
                        renderFraction: function (t, e) {
                            return '<span class="' + t + '"></span><i>/</i><span class="' + e + '"></span>'
                        },
                        renderProgressbar: function (t) {
                            return '<span class="' + t + '"></span>'
                        },
                        clickable: !0
                    };
                new Swiper(s, {
                    watchOverflow: !0,
                    speed: r,
                    watchSlidesProgress: f,
                    direction: a,
                    autoplay: m,
                    spaceBetween: l,
                    effect: s.data("effect") ? s.data("effect") : "slide",
                    fadeEffect: {crossFade: !0},
                    mousewheel: s.is(".swiper-mousewheel"),
                    initialSlide: u,
                    slidesPerView: c,
                    slidesPerGroup: d,
                    slidesPerColumn: h,
                    slidesPerColumnFill: "row",
                    breakpoints: v,
                    simulateTouch: p,
                    loop: o && n > c,
                    reverseDirection: !!m && !o,
                    parallax: !!s.is(".swiper-parallax"),
                    virtual: g,
                    navigation: {nextEl: s.parent().find(".swiper-btn-next"), prevEl: s.parent().find(".swiper-btn-prev")},
                    pagination: b,
                    on: {
                        init: function (e) {
                            if (s.is(".swiper-controller") && t.push(this), s.is("#banner_swiper")) {
                                var i = $(this.slides[this.realIndex]).find(".flashingText");
                                setTimeout(function () {
                                    flashingText.init(i)
                                }, 400)
                            }
                            if (s.is("#service_pic_swiper")) {
                                n = this;
                                $(".service-main-drop-item").each(function (t) {
                                    $(this).click(function () {
                                        activeSwiperMenu(this, "actived", n, t)
                                    })
                                })
                            }
                            if (s.is("#contact_address_swiper")) {
                                n = this;
                                $(".contact-map .point").each(function (t) {
                                    $(this).click(function () {
                                        activeSwiperMenu(this, "actived", n, t)
                                    })
                                })
                            }
                            if (s.is("#history_swiper")) {
                                var n = this;
                                $(".time-line-item").each(function (t) {
                                    $(this).click(function () {
                                        activeSwiperMenu(this, "actived", n, t)
                                    })
                                })
                            }
                        }, slideChange: function (t) {
                            if (s.is("#service_pic_swiper")) {
                                e = parseInt(this.activeIndex);
                                $(".service-main-drop-item").eq(e).addClass("actived").siblings(".actived").removeClass("actived")
                            }
                            if (s.is("#contact_address_swiper")) {
                                var e = parseInt(this.activeIndex);
                                $(".contact-map .point").eq(e).addClass("actived").siblings(".actived").removeClass("actived")
                            }
                        }, transitionStart: function () {
                            if (s.is("#banner_swiper")) for (var t = 0; t < n; t++) {
                                var e = $(this.slides[this.realIndex]).find(".flashingText");
                                setTimeout(function () {
                                    flashingText.init(e)
                                }, 800)
                            }
                        }
                    }
                })
            }), t.length > 1 && (t[0].controller.control = t[1], t[1].controller.control = t[0])
        }
    };
$(document).on({
    ready: function () {
        isTouch && $("html").addClass("isTouch"), isMobile && $("html").addClass("isMobile"), isMac && $("html").addClass("isMac"), isIE && $("html").addClass("isIE"), $("#fullpage").length && fullPageInit(), $(".swiper-container").length && swiper.init(), $("body").addClass("ready")
    }
}), $(window).on({
    load: function () {
        $("[data-scroll-container]").length && scrollInit(), $("body").addClass("loaded"), particlesInit.init(), setTimeout(function () {
            $(".loading").fadeOut(1e3, function () {
                !!getUrlParam("scrollTo") && scroller.scrollTo("#" + getUrlParam("scrollTo"))
            })
        }, 200)
    }
}), $(".menu-fixed-target").click(function () {
    $(this).stop().toggleClass("is-active"), $(".page-menu").stop().toggleClass("is-show")
}), $(".join-grid>ul").click(function () {
    $(this).siblings(".join-infos").stop().slideToggle(function () {
        !!scroller && scroller.update()
    })
}), $(".circle-content-item").click(function () {
    $(this).addClass("on").siblings(".on").removeClass("on")
}), $(".navbar .search").click(function () {
    $(".search-in-nav").toggleClass("search-show")
}), $(".talent-block-item").on("mouseover", function () {
    var t = $(this).data("des");
    $(".talent-block-t1").html("").append("<span>" + t + "</span>")
}), $(".activity-video-play").click(function () {
    $(this).parents(".content-video-info").hide();
    var t = $(this).parents(".content-video-info").siblings(".content-video").find("video")[0];
    $(this).parents(".content-video-info").siblings(".content-video").addClass("video-played"), t.play();
    var e = setInterval(function () {
        t.ended && ($(this).parents(".content-video-info").show(), $(this).parents(".content-video-info").siblings(".content-video").removeClass("video-played"), clearInterval(e))
    }, 1e3)
}), $(".show-form").click(function () {
    $(".join-form").show()
}), $(".join-form-close").click(function () {
    $(".join-form").hide()
}), $(".search-group a").click(function () {
    var t = $(".search-group input").val();
    !!t && (window.location.href = "search.html?s=" + t)
}), $(".search-result i").click(function () {
    var t = $(".search-result input").val();
    !!t && (window.location.href = "search.html?s=" + t)
});