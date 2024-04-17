    jQuery(document).ready(function () {
        jQuery(".showInCourse").remove();
        var e = document.getElementById("myModal");
        (jQuery("body").on("click", ".close", function () {
            jQuery(this).closest("div.suggestArticleModal").hide();
        }),
        jQuery(document).on("click", ".suggestArticle", function (e) {
            e.preventDefault(), e.stopPropagation();
            var t = jQuery(this);
            null != loginData && loginData.isLoggedIn ? jQuery("#loginCaptchaSuggest").hide() : jQuery("#loginCaptchaSuggest").show(), jQuery(t).closest("ul.header--sidebar.header--nav__items--left").find("div.suggestArticleModal").show();
        }),
        -1 != window.location.href.indexOf("?suggest-an-article")) && ((e = document.getElementsByClassName("myModal")).style.display = "block");
        jQuery("body").on("click", ".updateSubmitButton", function (e) {
            e.preventDefault(), e.stopPropagation();
            var t = jQuery(".updateArticleTitle").val(),
                i = jQuery(".updateArticleDescription").val(),
                a = jQuery(".updateArticleCategory").val(),
                r = jQuery(this);
            if (!loginData.userName) var s = grecaptcha.getResponse(loginSuggestId);
            if ("" != t && "-1" != a && "null" !== a && "" != i && "" != s)
                return (
                    jQuery.ajax({
                        type: "POST",
                        url: utilUrl + "suggestArticleSubmit.php",
                        data: { userName: loginData.userName, articleTitle: t, articleDescription: i, articleCategory: a, "g-recaptcha-response": s },
                        xhrFields: { withCredentials: !0 },
                        cache: !1,
                        success: function (e) {
                            jQuery(".myModal").hide(), showToast(e), r.closest("form").find("input[type=text], textarea").val(""), r.closest("form").find("select").val("4"), grecaptcha.reset(loginSuggestId);
                        },
                    }),
                    !1
                );
            console.log("Please Fill All Fields");
        }),
            jQuery(document).on("click", ".header--profile__dropdown", function () {
                jQuery(".header--dropdown__profile").toggleClass("header--dropdown__profile-open");
            }),
            jQuery(document).on("click", ".header--profile__dropdown_fix", function () {
                jQuery(".header--dropdown__profile_fix").toggleClass("header--dropdown__profile-open_fix");
            }),
            jQuery(document).on("click", "body", function (e) {
                jQuery(e.target).hasClass("header--dropdown__profile") ||
                    jQuery(e.target).parents(".header--dropdown__profile").length ||
                    jQuery(e.target).parents(".header--profile__dropdown").length ||
                    jQuery(".header--dropdown__profile").removeClass("header--dropdown__profile-open"),
                    !jQuery(e.target).hasClass("header--dropdown__profile_fix") && !jQuery(e.target).parents(".header--dropdown__profile_fix").length && jQuery(e.target).parents(".header--profile__dropdown_fix").length,
                    jQuery(e.target).hasClass("header--dropdown__trackmenu") ||
                        jQuery(e.target).parents(".header--dropdown__trackmenu").length ||
                        jQuery(e.target).hasClass("header--tracks__dropdown") ||
                        jQuery(".header--dropdown__trackmenu").hide(),
                    jQuery(e.target).hasClass("header--batches__button") ||
                        jQuery(e.target).parents(".header--batches__content").length ||
                        jQuery(e.target).hasClass(".header--batches__content") ||
                        (jQuery(".header--batches__button").removeClass("header--batches__button-move"), jQuery(".header--batches__content").removeClass("header--batches__content-move"));
            }),
            jQuery(document).on("click", ".header--search__trigger", function () {
                jQuery(".header--search").addClass("header--search__visible"), jQuery("#header--search__input").focus();
            }),
            jQuery(document).on("click", ".header--icon_close", function (e) {
                e.preventDefault(), jQuery(".header--search").removeClass("header--search__visible"), jQuery("#header--search__input").val(""), jQuery(".gsc-results-close-btn").click();
            }),
            jQuery(document).on("keyup", "#header--search__input", function () {
                var e = jQuery.Event("keyup");
                jQuery("#gsc-i-id1").val(jQuery(this).val()).focus().trigger(e);
            }),
            jQuery(document).on("keyup", "body", function (e) {
                jQuery("#header--search__input").val(jQuery("#gsc-i-id1").val());
            }),
            jQuery(document).on("keydown", ".gsc-search-button", function (e) {
                jQuery("#header--search__input").val(jQuery("#gsc-i-id1").val());
            }),
            jQuery("body").on("click", ".gsc-results-close-btn", function () {
                jQuery(".header--search").hasClass("header--search__visible") && jQuery(".header--icon_close").click();
            }),
            jQuery(".header--nav__items--left .header--nav__item").each(function () {
                var e = jQuery(this).children("a").attr("href");
                -1 != window.location.href.indexOf(e) && (jQuery(this).addClass("active"), jQuery(this).children("a").addClass("active"));
            });
        var t = 0,
            i = function () {
                t ||
                    ((t = 1),
                    (function () {
                        "use strict";
                        function e(e) {
                            return "status" === e
                                ? r
                                : g[e]
                                ? g[e].apply(this, Array.prototype.slice.call(arguments, 1))
                                : "function" != typeof e && "string" != typeof e && e
                                ? void _.error("Method " + e + " does not exist on jQuery.sidr")
                                : g.toggle.apply(this, arguments);
                        }
                        var t = {
                            classCallCheck: function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                            },
                        };
                        t.createClass = (function () {
                            function e(e, t) {
                                for (var i = 0; i < t.length; i++) {
                                    var a = t[i];
                                    (a.enumerable = a.enumerable || !1), (a.configurable = !0), "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a);
                                }
                            }
                            return function (t, i, a) {
                                return i && e(t.prototype, i), a && e(t, a), t;
                            };
                        })();
                        var i,
                            a,
                            r = { moving: !1, opened: !1 },
                            s = {
                                isUrl: function (e) {
                                    return !!new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$", "i").test(e);
                                },
                                addPrefixes: function (e) {
                                    this.addPrefix(e, "id"), this.addPrefix(e, "class"), e.removeAttr("style");
                                },
                                addPrefix: function (e, t) {
                                    var i = e.attr(t);
                                    "string" == typeof i && "" !== i && "sidr-inner" !== i && e.attr(t, i.replace(/([A-Za-z0-9_.\-]+)/g, "sidr-" + t + "-$1"));
                                },
                                transitions: (function () {
                                    var e = (document.body || document.documentElement).style,
                                        t = !1,
                                        i = "transition";
                                    return (
                                        i in e
                                            ? (t = !0)
                                            : (function () {
                                                  var a = ["moz", "webkit", "o", "ms"],
                                                      r = void 0,
                                                      s = void 0;
                                                  (i = i.charAt(0).toUpperCase() + i.substr(1)),
                                                      (t = (function () {
                                                          for (s = 0; s < a.length; s++) if ((r = a[s]) + i in e) return !0;
                                                          return !1;
                                                      })()),
                                                      (i = t ? "-" + r.toLowerCase() + "-" + i.toLowerCase() : null);
                                              })(),
                                        { supported: t, property: i }
                                    );
                                })(),
                            },
                            n = jQuery,
                            o = "sidr-animating",
                            l = "open",
                            d = "close",
                            u = "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
                            c = (function () {
                                function e(i) {
                                    t.classCallCheck(this, e),
                                        (this.name = i),
                                        (this.item = n("#" + i)),
                                        (this.openClass = "sidr" === i ? "sidr-open" : "sidr-open " + i + "-open"),
                                        (this.menuWidth = this.item.outerWidth(!0)),
                                        (this.speed = this.item.data("speed")),
                                        (this.side = this.item.data("side")),
                                        (this.displace = this.item.data("displace")),
                                        (this.timing = this.item.data("timing")),
                                        (this.method = this.item.data("method")),
                                        (this.onOpenCallback = this.item.data("onOpen")),
                                        (this.onCloseCallback = this.item.data("onClose")),
                                        (this.onOpenEndCallback = this.item.data("onOpenEnd")),
                                        (this.onCloseEndCallback = this.item.data("onCloseEnd")),
                                        (this.body = n(this.item.data("body")));
                                }
                                return (
                                    t.createClass(e, [
                                        {
                                            key: "getAnimation",
                                            value: function (e, t) {
                                                var i = {},
                                                    a = this.side;
                                                return (i[a] = "open" === e && "body" === t ? this.menuWidth + "px" : "close" === e && "menu" === t ? "-" + this.menuWidth + "px" : 0), i;
                                            },
                                        },
                                        {
                                            key: "prepareBody",
                                            value: function (e) {
                                                var t = "open" === e ? "hidden" : "";
                                                if (this.body.is("body")) {
                                                    var i = n("html"),
                                                        a = i.scrollTop();
                                                    i.css("overflow-x", t).scrollTop(a);
                                                }
                                            },
                                        },
                                        {
                                            key: "openBody",
                                            value: function () {
                                                if (this.displace) {
                                                    var e = s.transitions,
                                                        t = this.body;
                                                    if (e.supported)
                                                        t
                                                            .css(e.property, this.side + " " + this.speed / 1e3 + "s " + this.timing)
                                                            .css(this.side, 0)
                                                            .css({ width: t.width(), position: "absolute" }),
                                                            t.css(this.side, this.menuWidth + "px");
                                                    else {
                                                        var i = this.getAnimation(l, "body");
                                                        t.css({ width: t.width(), position: "absolute" }).animate(i, { queue: !1, duration: this.speed });
                                                    }
                                                }
                                            },
                                        },
                                        {
                                            key: "onCloseBody",
                                            value: function () {
                                                var e = s.transitions,
                                                    t = { width: "", position: "", right: "", left: "" };
                                                e.supported && (t[e.property] = ""), this.body.css(t).unbind(u);
                                            },
                                        },
                                        {
                                            key: "closeBody",
                                            value: function () {
                                                var e = this;
                                                if (this.displace)
                                                    if (s.transitions.supported)
                                                        this.body.css(this.side, 0).one(u, function () {
                                                            e.onCloseBody();
                                                        });
                                                    else {
                                                        var t = this.getAnimation(d, "body");
                                                        this.body.animate(t, {
                                                            queue: !1,
                                                            duration: this.speed,
                                                            complete: function () {
                                                                e.onCloseBody();
                                                            },
                                                        });
                                                    }
                                            },
                                        },
                                        {
                                            key: "moveBody",
                                            value: function (e) {
                                                e === l ? this.openBody() : this.closeBody();
                                            },
                                        },
                                        {
                                            key: "onOpenMenu",
                                            value: function (e) {
                                                var t = this.name;
                                                (r.moving = !1), (r.opened = t), this.item.unbind(u), this.body.removeClass(o).addClass(this.openClass), this.onOpenEndCallback(), "function" == typeof e && e(t);
                                            },
                                        },
                                        {
                                            key: "openMenu",
                                            value: function (e) {
                                                var t = this,
                                                    i = this.item;
                                                if (s.transitions.supported)
                                                    i.css(this.side, 0).one(u, function () {
                                                        t.onOpenMenu(e);
                                                    });
                                                else {
                                                    var a = this.getAnimation(l, "menu");
                                                    i.css("display", "block").animate(a, {
                                                        queue: !1,
                                                        duration: this.speed,
                                                        complete: function () {
                                                            t.onOpenMenu(e);
                                                        },
                                                    });
                                                }
                                            },
                                        },
                                        {
                                            key: "onCloseMenu",
                                            value: function (e) {
                                                this.item.css({ left: "", right: "" }).unbind(u),
                                                    n("html").css("overflow-x", ""),
                                                    (r.moving = !1),
                                                    (r.opened = !1),
                                                    this.body.removeClass(o).removeClass(this.openClass),
                                                    this.onCloseEndCallback(),
                                                    "function" == typeof e && e(name);
                                            },
                                        },
                                        {
                                            key: "closeMenu",
                                            value: function (e) {
                                                var t = this,
                                                    i = this.item;
                                                if (s.transitions.supported)
                                                    i.css(this.side, "").one(u, function () {
                                                        t.onCloseMenu(e);
                                                    });
                                                else {
                                                    var a = this.getAnimation(d, "menu");
                                                    i.animate(a, {
                                                        queue: !1,
                                                        duration: this.speed,
                                                        complete: function () {
                                                            t.onCloseMenu();
                                                        },
                                                    });
                                                }
                                            },
                                        },
                                        {
                                            key: "moveMenu",
                                            value: function (e, t) {
                                                this.body.addClass(o), e === l ? this.openMenu(t) : this.closeMenu(t);
                                            },
                                        },
                                        {
                                            key: "move",
                                            value: function (e, t) {
                                                (r.moving = !0), this.prepareBody(e), this.moveBody(e), this.moveMenu(e, t);
                                            },
                                        },
                                        {
                                            key: "open",
                                            value: function (t) {
                                                var i = this;
                                                if (r.opened !== this.name && !r.moving) {
                                                    if (!1 !== r.opened)
                                                        return void new e(r.opened).close(function () {
                                                            i.open(t);
                                                        });
                                                    this.move("open", t), this.onOpenCallback();
                                                }
                                            },
                                        },
                                        {
                                            key: "close",
                                            value: function (e) {
                                                r.opened !== this.name || r.moving || (this.move("close", e), this.onCloseCallback());
                                            },
                                        },
                                        {
                                            key: "toggle",
                                            value: function (e) {
                                                r.opened === this.name ? this.close(e) : this.open(e);
                                            },
                                        },
                                    ]),
                                    e
                                );
                            })(),
                            m = jQuery,
                            _ = jQuery,
                            p = ["open", "close", "toggle"],
                            g = {},
                            h = function (e) {
                                return function (t, i) {
                                    "function" == typeof t ? ((i = t), (t = "sidr")) : t || (t = "sidr"),
                                        (function (e, t, i) {
                                            var a = new c(t);
                                            switch (e) {
                                                case "open":
                                                    a.open(i);
                                                    break;
                                                case "close":
                                                    a.close(i);
                                                    break;
                                                case "toggle":
                                                    a.toggle(i);
                                                    break;
                                                default:
                                                    m.error("Method " + e + " does not exist on jQuery.sidr");
                                            }
                                        })(e, t, i);
                                };
                            };
                        for (i = 0; i < p.length; i++) g[(a = p[i])] = h(a);
                        var y = jQuery;
                        (jQuery.sidr = e),
                            (jQuery.fn.sidr = function (t) {
                                var i = s.transitions,
                                    a = y.extend(
                                        {
                                            name: "sidr",
                                            speed: 200,
                                            side: "left",
                                            source: null,
                                            renaming: !0,
                                            body: "body",
                                            displace: !0,
                                            timing: "ease",
                                            method: "toggle",
                                            bind: "touchstart click",
                                            onOpen: function () {},
                                            onClose: function () {},
                                            onOpenEnd: function () {},
                                            onCloseEnd: function () {},
                                        },
                                        t
                                    ),
                                    n = a.name,
                                    o = y("#" + n);
                                return (
                                    0 === o.length && (o = y("<div />").attr("id", n).appendTo(y("body"))),
                                    i.supported && o.css(i.property, a.side + " " + a.speed / 1e3 + "s " + a.timing),
                                    o
                                        .addClass("sidr")
                                        .addClass(a.side)
                                        .data({ speed: a.speed, side: a.side, body: a.body, displace: a.displace, timing: a.timing, method: a.method, onOpen: a.onOpen, onClose: a.onClose, onOpenEnd: a.onOpenEnd, onCloseEnd: a.onCloseEnd }),
                                    (o = (function (e, t) {
                                        if ("function" == typeof t.source) {
                                            var i = t.source(name);
                                            e.html(i);
                                        } else if ("string" == typeof t.source && s.isUrl(t.source))
                                            y.get(t.source, function (t) {
                                                e.html(t);
                                            });
                                        else if ("string" == typeof t.source) {
                                            var a = "",
                                                r = t.source.split(",");
                                            if (
                                                (y.each(r, function (e, t) {
                                                    a += '<div class="sidr-inner">' + y(t).html() + "</div>";
                                                }),
                                                t.renaming)
                                            ) {
                                                var n = y("<div />").html(a);
                                                n.find("*").each(function (e, t) {
                                                    var i = y(t);
                                                    s.addPrefixes(i);
                                                }),
                                                    (a = n.html());
                                            }
                                            e.html(a);
                                        } else null !== t.source && y.error("Invalid Sidr Source");
                                        return e;
                                    })(o, a)),
                                    this.each(function () {
                                        var t = y(this),
                                            i = t.data("sidr"),
                                            s = !1;
                                        i ||
                                            ((r.moving = !1),
                                            (r.opened = !1),
                                            t.data("sidr", n),
                                            t.bind(a.bind, function (t) {
                                                t.preventDefault(),
                                                    s ||
                                                        ((s = !0),
                                                        e(a.method, n),
                                                        setTimeout(function () {
                                                            s = !1;
                                                        }, 100));
                                            }));
                                    })
                                );
                            });
                    })(),
                    jQuery("#sidr").html(jQuery("nav:eq(0)").find(".header--sidebar").clone()),
                    jQuery("#header--menu__icon").sidr({
                        name: "sidr",
                        displace: !1,
                        onOpen: function () {
                            jQuery("body").addClass("sidr-not-pushed"), jQuery(".fixed").css("padding-left", "19em"), jQuery("#sidr_overlay").css("display", "block");
                        },
                    }));
            };
        if (
            (jQuery(window).width() < 1102 && i(),
            jQuery(window).resize(function () {
                jQuery(this).width() < 1102 && i();
            }),
            jQuery(".header--tracks__dropdown").click(function () {
                jQuery(".header--dropdown__trackmenu").toggle();
            }),
            jQuery(document).on("keydown", function (e) {
                27 === e.keyCode && jQuery(".header--search").hasClass("header--search__visible") && (e.preventDefault(), jQuery(".header--icon_close").click());
            }),
            jQuery("body").on("click", ".toggleTree", function () {
                jQuery(this).closest(".branch").find("i").toggleClass("glyphicon-plus-sign glyphicon-minus-sign"), jQuery(this).closest(".branch").find(".treeElements").stop().toggle(800);
            }),
            jQuery(window).width() < 768)
        ) {
            jQuery(".branch").find("i").toggleClass("glyphicon-plus-sign glyphicon-minus-sign"), jQuery(".treeElements").hide();
            var a = jQuery(".leftTreeDiv").clone();
            jQuery(".leftTreeDiv").remove(), a.insertBefore("#col_sidebar"), a.insertBefore(jQuery("#sidebar").parent());
        }
        var r,
            s = document.getElementsByClassName("accordion");
        for (r = 0; r < s.length; r++)
            s[r].addEventListener("click", function () {
                this.classList.toggle("active");
                var e = this.nextElementSibling;
                "block" === e.style.display ? (e.style.display = "none") : (e.style.display = "block");
            });
        jQuery("ul.nav-menu > li").addClass("topMainHeading"),
            jQuery(document).on("click", ".wrapper", function (e) {
                "header--search__visible" != jQuery(e.target).attr("class") && (jQuery(".header--search").removeClass("header--search__visible"), jQuery("#header--search__input").val(""), jQuery(".gsc-results-close-btn").click());
            }),
            jQuery("body").on("click", "#sidr_overlay", function () {
                jQuery("#sidr_overlay").css("display", "none"), jQuery.sidr("close", "sidr");
            }),
            (window.onclick = function (t) {
                var i = jQuery(t.target)[0].className.split(" ")[0];
                t.target == e && (e.style.display = "none"), "sub-menu" != i && "right_arrow" != i && "right_arrow" != i && "header--nav__link" != i && "menu-item" != i && "tutorials-head" != i && jQuery(".sub-menu").css("display", "none");
            }),
            jQuery(".topMainHeading").find("a").addClass("header--nav__link nav-link dropdown-toggle");
        jQuery(".topMainHeading").find("a:first").removeAttr("href"),
            jQuery(".sub-menu").find(".menu-item-has-children").find("a:first").removeAttr("href"),
            jQuery(".topMainHeading").find("a:first").append('<i class="tutorials-head material-icons">keyboard_arrow_down</i>'),
            jQuery(".topMainHeading").find(".sub-menu:first").find(".menu-item-has-children").find("a:first").after("<i class='right_arrow material-icons'>keyboard_arrow_right</i>");
        var n = 0;
        jQuery(".topMainHeading").on("click", ".menu-item-has-children", function (e) {
            jQuery(this).parent().find(".sub-menu").css("display", "none"), jQuery(this).find(".right_arrow:first").next().css("display", "block"), (n = 1), e.stopPropagation();
        });
        jQuery("ul.nav-menu > li:first").attr("id");
        var o = "." + jQuery("ul.nav-menu > li:nth-child(2)").attr("id");
        jQuery(".header--nav__link")
            .not(".sub-menu li a")
            .on("click", function () {
                n || jQuery(".sub-menu").css("display", "none"), jQuery(this).next().css("display", "block");
            }),
            jQuery("body").on("click", o, function () {
                (n = 0), jQuery(".sub-menu").css("display", "none"), jQuery(this).find("a:first").next().css("display", "block");
            });
    }),
    jQuery(function () {
        var e = 0,
            t = !1;
        jQuery(window).scroll(function (i) {
            var a = jQuery(this).scrollTop();
            a > e && e >= 200
                ? ((t = !0),
                  jQuery(".header-main__logo").addClass("shrink"),
                  jQuery(".header-main__logo svg:last-child").attr("aria-hidden", !0),
                  jQuery(".header-main__logo svg:first-child").removeClass("normal"),
                  jQuery(".header-main__logo svg:first-child").addClass("ready"))
                : e < 200 &&
                  t &&
                  (jQuery(".header-main__logo").removeClass("shrink"),
                  jQuery(".header-main__logo svg:first-child").removeClass("ready"),
                  jQuery(".header-main__logo svg:first-child").addClass("normal"),
                  jQuery(".header-main__logo svg:last-child").attr("aria-hidden", !1)),
                (e = a);
        }),
            jQuery("body").on(
                "click mouseover",
                "\n       .header-main__list-item[data-expandable=true],\n       .header-sidebar__list-item[data-expandable=true],\n       .gfg-overlay,.header-main__profile,\n       .gcse-search__close,\n       .hide-search",
                function (e) {
                    if ((e.stopPropagation(), window.innerWidth < 992 && "mouseover" == e.type)) return !1;
                    let t = jQuery(this);
                    if (!(t.hasClass("header-sidebar__list-item") || t.hasClass("gfg-overlay") || t.hasClass("header-main__profile") || t.hasClass("gcse-search__close") || t.hasClass("hide-search")) || "mouseover" != e.type) {
                        if (t.hasClass("header-main__list-item")) {
                            jQuery(".gfg-icon_ndot").removeClass("active"), jQuery(".nineDot-menu").attr("data-show", !1);
                            let i = t.hasClass("selected");
                            if (
                                (jQuery(".header-main__list .header-main__list-item[data-expandable=true]").each(function () {
                                    jQuery(this).attr("aria-expanded", !1).removeClass("selected"),
                                        jQuery(".mega-dropdown__list-item.selected").each(function () {
                                            jQuery(this).removeClass("selected").attr("aria-expanded", !1);
                                        });
                                }),
                                "click" == e.type && i)
                            )
                                return void t.attr("aria-expanded", !1).removeClass("selected");
                            t.attr("aria-expanded", !0).addClass("selected");
                        }
                        if (t.hasClass("header-sidebar__list-item")) {
                            let i = t.attr("aria-expanded");
                            if (
                                (jQuery(".header-sidebar__list-item[data-expandable=true]").each(function () {
                                    jQuery(this).attr("aria-expanded", !1).removeClass("selected");
                                }),
                                "click" == e.type && "true" == i)
                            )
                                return void t.attr("aria-expanded", !1).removeClass("selected");
                            t.attr("aria-expanded", !0).addClass("selected");
                        }
                        t.hasClass("gfg-overlay") && jQuery(".hamburger-menu").click(),
                            t.hasClass("header-main__profile") && (jQuery(".gfg-icon_ndot").removeClass("active"), jQuery(".nineDot-menu").attr("data-show", !1), t.toggleClass("selected")),
                            t.hasClass("gcse-search__close") && (jQuery("#gcse-search-input").val(""), t.toggleClass("display-none")),
                            t.hasClass("hide-search") && a(!0, () => {});
                    }
                }
            ),
            jQuery("body").on("click mouseover", ".mega-dropdown__list-item", function (e) {
                if ((e.stopPropagation(), window.innerWidth < 992 && "mouseover" == e.type)) return !1;
                let t = jQuery(this),
                    i = t.hasClass("selected");
                if (
                    (t
                        .parent(".mega-dropdown")
                        .children()
                        .each(function (e) {
                            jQuery(this).attr("aria-expanded", !1).removeClass("selected"),
                                jQuery(this)
                                    .find(".mega-dropdown")
                                    .children("[data-expandable=true]")
                                    .each(function (e) {
                                        jQuery(this).attr("aria-expanded", !1).removeClass("selected");
                                    });
                        }),
                    "click" == e.type && i)
                )
                    return void t.attr("aria-expanded", !1).removeClass("selected");
                t.attr("aria-expanded", !0).addClass("selected");
                let a = $(this).parent()[0],
                    r = $(this)[0],
                    s = r.querySelector("ul");
                if (null !== a && null !== s) {
                    let e = -4 + Math.max(parseInt(a.offsetHeight - s.offsetHeight), 0),
                        t = a.childNodes,
                        i = 0;
                    for (let e = t.length - 1; e >= 0 && ((i += t[e].offsetHeight), t[e] !== r); --e);
                    s.style.setProperty("top", e + "px", "important"), i > s.offsetHeight && ((e = -4 + Math.max(0, a.offsetHeight - i)), s.style.setProperty("top", e + "px", "important"));
                }
            }),
            jQuery("body").on("click", ".header-top__times,.hamburger-menu", function (e) {
                let t = jQuery(this);
                if ((t.hasClass("header-top__times") && (localStorage.setItem("gfgRemoveTN", new Date().getTime()), jQuery(".header-top__notification").hide(100)), t.hasClass("hamburger-menu"))) {
                    if ((e.preventDefault(), jQuery(".header-sidebar__wrapper").toggleClass("open"), jQuery("#gfg-overlay").toggleClass("display-none"), jQuery(this).find(".gfg-burger-1.open").length > 0))
                        return void jQuery(this).children().removeClass("open");
                    jQuery(this).children().addClass("open"), a(!0, () => {});
                }
            }),
            (window.onclick = function (e) {
                "header-main__list-item" !== e.target &&
                    "mega-dropdown__list-item" !== e.target &&
                    jQuery(".header-main__list-item[aria-expanded=true]").each(function (e) {
                        jQuery(this).attr("aria-expanded", !1).removeClass("selected");
                    }),
                    "header-main__profile" !== e.target && jQuery(".header-main__profile").removeClass("selected"),
                    e.target && e.target.classList && -1 == [...e.target.classList].indexOf("gfg-icon_ndot") && (jQuery(".gfg-icon_ndot").removeClass("active"), jQuery(".nineDot-menu").attr("data-show", !1));
                var t = document.getElementById("displayModalBackdrop");
                e.target == t && g();
            }),
            (window.onresize = function () {
                window.innerWidth > 992 && a(!0, () => {}), r();
            });
        (() => {
            jQuery("#sidebar-list").html("");
            let e = [],
                t = "";
            const i = (i) => {
                let a = jQuery(i).children("span").text(),
                    r = [],
                    s = !1,
                    n = jQuery(i).children(".mega-dropdown").children("[data-child=true]");
                (s = !!n.length),
                    (t += `\n                <li class="header-sidebar__list-item" data-expandable=${s} aria-expanded="false">\n                    <span>${a}\n                        <i class="gfg-icon gfg-icon_arrow-down"></i>\n                    </span>\n\n                    `),
                    s && (t += '<ul class="mega-dropdown">'),
                    n.each(function () {
                        let e = jQuery(this),
                            i = {},
                            a = "";
                        if ("true" === e.attr("data-expandable")) {
                            (i.text = e.children("span").text()), (i.href = e.children("span").attr("data-href"));
                            var s = e.find('ul[class="mega-dropdown"]').html();
                            (a = `<span> ${i.text}<i class="gfg-icon gfg-icon_arrow-down"></i></span>`), (a += `<ul class="mega-dropdown">${s}</ul>`);
                        } else (i.text = e.children("a").text()), (i.href = e.children("a").attr("href")), (a = `<a href='${i.href || "#"}'>${i.text}</a>`);
                        r.push(i), (t += `<li class="mega-dropdown__list-item">\n                        ${a}\n                    </li>`);
                    }),
                    (t += s ? "</ul>" : ""),
                    (t += "</li>"),
                    e.push({ parent: a, childrens: r });
            };
            jQuery(".mega-dropdown__list-item[data-parent=true]").each(function (e) {
                i(jQuery(this));
            }),
                jQuery(".header-main__list .header-main__list-item[data-parent=true]").each(function (e) {
                    i(jQuery(this));
                }),
                jQuery("#sidebar-list").append(t);
        })(),
            jQuery("body").on("submit", "#gcse-form", function (e) {
                e.preventDefault(),
                    a(!1, (e) => {
                        e && _();
                    });
            });
        const a = (e = !1, t) => {
            let i = jQuery("#gcse-form"),
                a = i.children("button");
            return a.hasClass("not-expanded") && !e
                ? (jQuery(".googleTranslateToggle.gfg-icon_times").click(), jQuery("#gcse-form").attr("data-sm", !0), i.children("input").attr("aria-expanded", !0), a.removeClass("not-expanded"), a.css("display", "none"), t(!1))
                : e
                ? (jQuery("#gcse-form").attr("data-sm", !1), a.removeAttr("style"), i.children("input").attr("aria-expanded", !1), a.addClass("not-expanded"), jQuery(".gcse-search__close").addClass("display-none"), t(null))
                : t(!0);
        };
        jQuery(".gcse-search__icon-n,.header--search__input-icon").on("click", function (e) {
            e.preventDefault(),
                jQuery(this).addClass("hide-me"),
                jQuery(".gcse-search__close-n").toggleClass("show-me"),
                jQuery(".gsc-control-cse,.gcse_input-class").toggleClass("show-me"),
                jQuery(".googleTranslateToggle.gfg-icon_times").click();
        }),
            jQuery(".gcse-search__close-n").on("click", function (e) {
                e.preventDefault(),
                    jQuery(".gcse-search__icon-n").removeClass("hide-me"),
                    jQuery(".header--search__input-icon").removeClass("hide-me"),
                    jQuery(".gcse-search__close-n").toggleClass("show-me"),
                    jQuery(".gsc-control-cse,.gcse_input-class").toggleClass("show-me");
            }),
            jQuery("body").on("click", ".header-main__slider-arrow", function (e) {
                let t = document.getElementById("hslider"),
                    { scrollLeft: i, children: a } = t;
                for (var r = 0, s = 0; s < a.length; s++) r += a[s].offsetWidth;
                let n = Math.min(r, i + 300);
                jQuery(this).hasClass("previous") && (n = Math.max(0, i - 300)), t.scrollTo({ top: 0, left: n, behavior: "smooth", "-webkit-overflow-scrolling": "touch" });
            });
        const r = () => {
            try {
                let i = document.getElementById("hslider"),
                    { children: a } = i;
                for (var e = 0, t = 0; t < a.length; t++) e += a[t].offsetWidth;
                window.innerWidth - 2 > e ? jQuery(".header-main__slider-arrow").addClass("hideIt") : jQuery(".header-main__slider-arrow").removeClass("hideIt");
            } catch (e) {}
        };
        r(),
            jQuery("body").on("click", ".gsc-modal-background-image, .gsc-results-close-btn", function (e) {
                jQuery("#header--search__input").val("");
            }),
            jQuery("#header--search__input").on("click", function () {
                jQuery("#header--search__input").focus();
            }),
            jQuery("#header--search__input").keyup(function () {
                var e = jQuery.Event("keyup");
                jQuery("#gsc-i-id1").val(jQuery(this).val()).focus().trigger(e);
            }),
            jQuery("body").keyup(function (e) {
                jQuery("#header--search__input").val(jQuery("#gsc-i-id1").val());
            }),
            jQuery(".gsc-search-button").keydown(function (e) {
                jQuery("#header--search__input").val(jQuery("#gsc-i-id1").val());
            }),
            jQuery(".header--search__trigger").click(function () {
                jQuery(".header--search").addClass("header--search__visible"), jQuery("#header--search__input").focus();
            });
			
			
        let s = { width: window.innerWidth };
        function n(e = { flex: 2 }) {
            let t = jQuery(".gfg--carousel_wrap-slide");
            jQuery(".gfg--carousel_wrap").attr("data-flex", e.flex),
                t.css({ flexBasis: 100 / e.flex + "%" }),
                t.each(function (t, i) {
                    jQuery(i).removeClass("initial active prev next"), t >= e.flex ? jQuery(i).addClass("next") : jQuery(i).addClass("initial");
                });
            let a = Math.ceil(t.length / e.flex),
                r = "",
                s = "";
            for (i = 0; i < a; i++) (r += `<div class="page p ${0 === i ? "active" : ""}" data-page="${i + 1}">${i + 1}</div>`), (s += `<div class="page p dots ${0 === i ? "active" : ""}" data-page="${i + 1}"></div>`);
            jQuery(".page-list .pages").html(r), jQuery(".carousel--dots").html(s);
        }
        function o() {
            if (window.innerWidth > 1024.1) {
                let e = jQuery(".gfg--carousel_wrap").attr("data-flex");
                (s.flex = e), n({ flex: e });
            }
            if ((window.innerWidth < 1024 && ((s.flex = 2), n({ flex: 2 })), window.innerWidth < 768)) {
                let e = jQuery(".gfg--carousel_wrap").attr("data-tb-flex");
                (s.flex = e || 1), n({ flex: e || 1 });
            }
            if (window.innerWidth < 400) {
                let e = jQuery(".gfg--carousel_wrap").attr("data-sm-flex");
                (s.flex = e || 1), n({ flex: e || 1 });
            }
            jQuery(".page.p").on("click", function () {
                let e = jQuery(this).attr("data-page"),
                    t = jQuery(`.page.p[data-page=${e}]`),
                    i = (e - 1) * s.flex,
                    a = e * s.flex;
                jQuery(".gfg--carousel_wrap-slide").each(function (e, t) {
                    e < i
                        ? jQuery(t).addClass("prev").removeClass("initial active next")
                        : e >= i && e < a
                        ? jQuery(t).addClass("active").removeClass("initial prev next")
                        : e >= a && jQuery(t).addClass("next").removeClass("initial active prev");
                }),
                    jQuery(".page.p").removeClass("active"),
                    jQuery(t).addClass("active");
            }),
                jQuery(".carousel__button--next").on("click", function () {
                    let e = ".gfg--carousel_wrap-slide",
                        t = jQuery(e),
                        i = jQuery(`${e}.initial`),
                        a = jQuery(`${e}.active`),
                        r = jQuery(`${e}.next`);
                    if (t.length > 1) {
                        i.length ? i.addClass("prev").removeClass("initial") : a.addClass("prev").removeClass("active"), r.addClass("active").removeClass("next");
                        let s = t.length - 1 > 1 * r.attr("data-slide") ? 1 * r.attr("data-slide") + 1 : 0;
                        jQuery(`${e}[data-slide=${s}]`).addClass("next").removeClass("prev");
                    }
                }),
                jQuery(".gfg--carousel-nav button").on("click", function () {
                    let e = jQuery(this).parent().parent().children(".gfg--carousel_wrap"),
                        t = Number(e.attr("data-flex")),
                        i = Math.ceil(e.children().length / t),
                        a = Number(e.attr("data-slide")),
                        r = jQuery(this).attr("data-action"),
                        { si: s, ei: n, d: o } = {};
                    "next" === r ? a + 1 <= i && ((s = a * t), (n = s + t), (o = !(n > i * Number(t)))) : a <= i && ((s = (a - 2) * t), (n = s + t), (o = s >= 0)),
                        o &&
                            (jQuery(this)
                                .parent()
                                .parent()
                                .children(".gfg--carousel_wrap")
                                .children()
                                .each((e, t) => {
                                    e < s
                                        ? jQuery(t).removeClass("active prev next initial").addClass("prev")
                                        : e >= s && e < n
                                        ? jQuery(t).removeClass("active prev next initial").addClass("active")
                                        : jQuery(t).removeClass("active prev next initial").addClass("next");
                                }),
                            e.attr("data-slide", a + ("next" === r ? 1 : -1))),
                        0 == s ? jQuery(".gfg--carousel-nav button[data-action='prev']").addClass("hideIt") : jQuery(".gfg--carousel-nav button[data-action='prev']").removeClass("hideIt"),
                        n >= i * Number(t) ? jQuery(".gfg--carousel-nav button[data-action='next']").addClass("hideIt") : jQuery(".gfg--carousel-nav button[data-action='next']").removeClass("hideIt");
                });
        }
        o(),
            (window.onresize = function (e) {
                s.width != window.innerWidth && ((s.width = window.innerWidth), o()), y();
            }),
            jQuery(document).on("click", ".vote-this, [data-gfg-action='like-article']", function (e) {
                if (loginData.isLoggedIn) {
                    jQuery("#vote-wrap-error").remove();
                    let e = jQuery(this),
                        t = 0,
                        i = { type: t, iconClass: ".favoriteIcon", iconTextClass: ".favoriteLike", buttonHTML: "Like", buttonActiveHTML: "Liked", icon: "", iconActive: "" };
                    if (
                        ("vote" == e.attr("data-type") &&
                            ((t = 1),
                            (i = { type: t, iconClass: ".voteIcon", iconTextClass: ".postVoting", buttonHTML: "Vote", buttonActiveHTML: "Voted", icon: "", iconActive: "", tooltipHTML: `Voted for ${jQuery(this).attr("data-tag")}` })),
                        e.children("i.gfg-icon.active").length >= 1 && 1 === t)
                    )
                        return;
                    e.css({ pointerEvents: "none" }),
                        jQuery.ajax({
                            url: utilUrl + "gfg/upvoteArticle.php",
                            method: "POST",
                            data: { post_id: post_id, time: loginData.time, csrf_token: loginData.csrf_token, action_type: t },
                            xhrFields: { withCredentials: !0 },
                            success: function (a) {
                                var r = jQuery(".favoriteText").html().trim();
                                "success" == a.trim() &&
                                    (jQuery(`${i.iconClass}`).hasClass("active") && 1 !== t
                                        ? (jQuery(".article--viewer_like .tooltiptext").html("Like Article"),
                                          jQuery("[data-gfg-action='like-article'] .gfg-icon").removeClass("active"),
                                          jQuery(`${i.iconClass}`).removeClass("active").html(i.icon),
                                          jQuery(`${i.iconTextClass}`).html(i.buttonHTML),
                                          0 !== i.type || isNaN(r) || jQuery(".favoriteText").html(parseInt(r) - 1))
                                        : (jQuery(`${i.iconClass}`).addClass("active").html(i.iconActive),
                                          jQuery(`${i.iconTextClass}`).html(i.buttonActiveHTML),
                                          1 === t
                                              ? e.children(".tooltiptext").html(i.tooltipHTML)
                                              : (jQuery(".article--viewer_like .tooltiptext").html("Liked Article"), jQuery("[data-gfg-action='like-article'] .gfg-icon").addClass("active")),
                                          0 !== i.type || isNaN(r) ? 0 === i.type && jQuery(".favoriteText").html(1) : jQuery(".favoriteText").html(parseInt(r) + 1)));
                            },
                            error: function (e, t) {
                                0 === i.type && (upvoted ? jQuery(`${i.iconClass}`).removeClass("active").html(i.icon) : jQuery(`${i.iconClass}`).addClass("active").html(i.iconActive));
                            },
                            complete: function () {
                                e.css({ pointerEvents: "unset" });
                            },
                        });
                } else $(".header-main__wrapper").find(".header-main__signup.login-modal-btn").length && $(".header-main__wrapper").find(".header-main__signup.login-modal-btn").click(), jQuery("#vote-wrap-error").remove(), jQuery(".vote-wrap").after('<div id="vote-wrap-error" class="non-logged-in-response">Please Login</div>');
            });
        const l = {
            BOOKMARK_ARTICLE: "bookmark-article",
            ARTICLE_DIFFICULTY: "article-difficulty",
            ARTICLE_SLIDER: "article-slider",
            NINEDOT_MENU: "nineDot-menu",
            GOOGLE_TRANSLATE_ELEMENT: "google_translate_element",
            GOOGLE_TRANSLATE_MOBILE: "google_translate_mobile",
            TOGGLE_GFG_THEME: "toggleGFGTheme",
            GSAP_ANIMATION_SCROLL: "gsapAnimationScroll",
            GOOGLE_SEARCH_ACTION: "gcseCustomSearchAction",
            LOGIN_MODAL: "login-modal",
            REGISTER_MODAL: "register-modal",
        };
        jQuery("body").on("click", "[data-gfg-action]", async function (e) {
            e.preventDefault();
            let t = jQuery(this).attr("data-gfg-action");
            if (t === l.ARTICLE_SLIDER) {
                let e = 1 * jQuery("[data-article-slider]").attr("data-article-slider") == 1 ? 0 : 1;
                jQuery("[data-article-slider]").attr("data-article-slider", e);
            } else if (t === l.BOOKMARK_ARTICLE) {
                let e = jQuery(this).attr("data-bookmark-value");
                jQuery(this).toggleClass("no-event");
                try {
                    const i = await c({ actionName: t, payload: { post_id: post_id, op: "todo", url: window.location.href, time: loginData.time, csrf_token: loginData.csrf_token, type: 1 }, responseType: "html" });
                    jQuery(this).toggleClass("no-event"),
                        i && !i.error
                            ? (jQuery('[data-gfg-action="bookmark-article"]').children(".gfg-icon").toggleClass("gfg-icon_bookmark gfg-icon_bookmark-filled"),
                              jQuery('[data-gfg-action="bookmark-article"]').attr("data-bookmark-value", 1 * e ? 0 : 1),
                              jQuery(".article--viewer_bookmark .tooltiptext").html(1 * e ? "Save Article" : "Saved Article"))
                            : i.error && alert(error.renderMessage || "Some error occured. Please try again later.");
                } catch (e) {
                    jQuery(this).toggleClass("no-event");
                }
            } else if (t === l.ARTICLE_DIFFICULTY) {
                let e = jQuery(this);
                jQuery("button[data-rating]").css({ pointerEvents: "none", opacity: 0.75 }), jQuery(".gfg-process").html("Saving...");
                try {
                    const i = await c({ actionName: t, payload: { post_id: post_id, rating: jQuery(this).attr("data-rating"), url: window.location.href, time: loginData.time, csrf_token: loginData.csrf_token }, responseType: "html" });
                    jQuery("button[data-rating]").css({ pointerEvents: "all", opacity: 1 }),
                        i && !i.error
                            ? (jQuery("button[data-rating]").removeClass("active"), e.addClass("active"), jQuery(".gfg-process").html("Your response has been recorded."))
                            : i.error && jQuery(".gfg-process").html(`${i.renderMessage}`);
                } catch (e) {
                    jQuery("button[data-rating]").css({ pointerEvents: "all", opacity: 1 }), jQuery(".gfg-process").html(e.renderMessage || "Some error occured. Please try again later.");
                }
            } else if (t === l.NINEDOT_MENU) {
                let e = jQuery(`.${t}`).attr("data-show");
                jQuery(this).toggleClass("active"), jQuery(`.${t}`).attr("data-show", "true" != e);
            } else if (t === l.GOOGLE_TRANSLATE_ELEMENT) {
                let e = jQuery(`#${t}`).attr("data-show");
                jQuery(`#${t}`).attr("data-show", "true" != e),
                    jQuery(".googleTranslateToggle").toggleClass("gfg-icon_translate gfg-icon_times"),
                    jQuery("#g_translater").attr("data-show", "true" != e),
                    populateGoogleTranslateData(jQuery(`#${t}`).attr("data-show")),
                    "false" == e && jQuery(".hide-search").click();
            } else if (t === l.GOOGLE_TRANSLATE_MOBILE) {
                let e = jQuery(`#${t}`).attr("data-show");
                jQuery(`#${t}`).attr("data-show", "true" != e),
                    jQuery("#google_translate_element").attr("data-show", "true" != e),
                    jQuery(".googleTranslateToggleMobile").toggleClass("gfg-icon_translate gfg-icon_times"),
                    populateGoogleTranslateData(jQuery(`#${t}`).attr("data-show"));
            } else if (t === l.GSAP_ANIMATION_SCROLL) {
                var i = document.getElementById("geeky-ambassador").getBoundingClientRect().top - 100;
                window.scrollTo({ top: i, behavior: "smooth" });
            } else if (t === l.TOGGLE_GFG_THEME) {
                setTheme(getThemeFromCookie() == gfgThemeList.DARK ? gfgThemeList.LIGHT : gfgThemeList.DARK);
            } else if (t === l.GOOGLE_SEARCH_ACTION) _({ page: jQuery(this).attr("data-page-id") });
            else if ([l.REGISTER_MODAL, l.LOGIN_MODAL].indexOf(t) > -1) {
                jQuery(".header-main__container").find(".login-modal-btn:eq(0)").trigger("click");
                let e = jQuery(".login-modal-div").is(":visible");
                setTimeout(
                    () => {
                        jQuery("#tab1").prop("checked", t !== l.REGISTER_MODAL), jQuery("#tab2").prop("checked", t === l.REGISTER_MODAL);
                    },
                    e ? 0 : 1001
                );
            }
        });
        const d = window.matchMedia("(prefers-color-scheme: Dark)");

        jQuery("body").on("change", "#gcse-sort-change", () => _()), jQuery("body").on("click", "button[data-modal='displayModal']", () => g());
        const p = (e, t, i = "") => {
            jQuery("#displayModal .modal-content").removeAttr("data-type"),
                jQuery("#displayModal .modal-overlay").attr("aria-hidden", !0),
                "feed" === t && (jQuery("#displayModal").show(), feedModal(i)),
                ["google-search", "paypal", "testimonial", "consent"].indexOf(t) > -1 && jQuery("#displayModal").show(),
                jQuery("#displayModalBackdrop").show();
        };
        jQuery("body").on("submit", "#search-form", function (e) {
            e.preventDefault(), _({}, !1);
        });
        const g = () => {
                h.setErrorMessage(""), h.setTitle(""), h.setBody(""), h.setFooter(""), jQuery("#displayModal").hide(), jQuery("#displayModalBackdrop").hide();
            },
            h = {
                setTitle: (e) => {
                    jQuery("#displayModal #dmTitle").html(e);
                },
                setBody: (e) => {
                    jQuery("#displayModal #modal-dm-content").html(e);
                },
                setFooter: (e) => {
                    jQuery("#displayModal .modal-footer").html(e);
                },
                setErrorMessage: (e) => {
                    jQuery("#displayModal .error-message").html(e);
                },
                customizeCloseButton: (e) => {
                    jQuery("#displayModal .modal-header button").css({ ...e });
                },
                customizeModalWidth: (e) => {
                    jQuery("#displayModal .modal-content").addClass(e);
                },
                customizeModal: (e) => {
                    jQuery("#displayModal").css({ ...e });
                },
            };
        function y() {
            (jQuery("body").hasClass("post") || jQuery("body").hasClass("page")) &&
                (window.innerWidth <= 991
                    ? (jQuery(".header-main__wrapper").addClass("not-fixed"),
                      jQuery(".header-main__slider:eq(0)").attr("style", "display:none!important"),
                      jQuery(".header-main__slider:eq(1)").attr("style", "display:flex!important"),
                      jQuery("#main").addClass("top-spacing"),
                      jQuery(jQuery("#inArticle-disqus .disqus--viewer").detach()).appendTo(".disqus-section .leftBar"))
                    : (jQuery(".header-main__wrapper").removeClass("not-fixed"),
                      jQuery(".header-main__slider:eq(0)").removeAttr("style"),
                      jQuery(".header-main__slider:eq(1)").attr("style", "display:none!important"),
                      jQuery("#main").removeClass("top-spacing"),
                      jQuery(jQuery(".disqus-section .leftBar .disqus--viewer").detach()).appendTo("#inArticle-disqus")));
        }
        y();
    });
