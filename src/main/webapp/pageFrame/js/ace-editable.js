/**
 Image editable input.
 **/
!function (a) {
    "use strict";
    var b = function (a) {
        this.init("image", a, b.defaults), "on_error" in a.image && (this.on_error = a.image.on_error, delete a.image.on_error), "on_success" in a.image && (this.on_success = a.image.on_success, delete a.image.on_success), "max_size" in a.image && (this.max_size = a.image.max_size, delete a.image.max_size), this.initImage(a, b.defaults)
    };
    a.fn.editableutils.inherit(b, a.fn.editabletypes.abstractinput), a.extend(b.prototype, {
        initImage: function (b, c) {
            this.options.image = a.extend({}, c.image, b.image), this.name = this.options.image.name || "editable-image-input"
        }, render: function () {
            var a = this;
            this.$input = this.$tpl.find("input[type=hidden]:eq(0)"), this.$file = this.$tpl.find("input[type=file]:eq(0)"), this.$file.attr({name: this.name}), this.$input.attr({name: this.name + "-hidden"}), this.options.image.allowExt = this.options.image.allowExt || ["jpg", "jpeg", "png", "gif"], this.options.image.allowMime = this.options.image.allowMime || ["image/jpg", "image/jpeg", "image/png", "image/gif"], this.options.image.maxSize = a.max_size || this.options.image.maxSize || !1, this.options.image.before_remove = this.options.image.before_remove || function () {
                    return a.$input.val(null), !0
                }, this.$file.ace_file_input(this.options.image).on("change", function () {
                var b = a.$file.val() || a.$file.data("ace_input_files") ? Math.random() + "" + (new Date).getTime() : null;
                a.$input.val(b)
            }).closest(".ace-file-input").css({width: "150px"}).closest(".editable-input").addClass("editable-image"), this.$file.off("file.error.ace").on("file.error.ace", function (b, c) {
                a.on_error && (c.error_count.ext > 0 || c.error_count.mime > 0 ? a.on_error(1) : c.error_count.size > 0 && a.on_error(2))
            })
        }
    }), b.defaults = a.extend({}, a.fn.editabletypes.abstractinput.defaults, {
        tpl: '<span><input type="hidden" /></span><span><input type="file" /></span>',
        inputclass: "",
        image: {
            style: "well",
            btn_choose: "Change Image",
            btn_change: null,
            no_icon: "fa fa-picture-o",
            thumbnail: "large"
        }
    }), a.fn.editabletypes.image = b
}(window.jQuery), function (a) {
    "use strict";
    var b = function (c) {
        this.init("wysiwyg", c, b.defaults), this.options.wysiwyg = a.extend({}, b.defaults.wysiwyg, c.wysiwyg)
    };
    a.fn.editableutils.inherit(b, a.fn.editabletypes.abstractinput), a.extend(b.prototype, {
        render: function () {
            this.$editor = this.$input.nextAll(".wysiwyg-editor:eq(0)"), this.$tpl.parent().find(".wysiwyg-editor").show().ace_wysiwyg(this.options.wysiwyg).prev().addClass("wysiwyg-style2").closest(".editable-input").addClass("editable-wysiwyg").closest(".editable-container").css({display: "block"}), this.options.wysiwyg && this.options.wysiwyg.css && this.$tpl.closest(".editable-wysiwyg").css(this.options.wysiwyg.css)
        }, value2html: function (b, c) {
            return a(c).html(b), !1
        }, html2value: function (a) {
            return a
        }, value2input: function (a) {
            this.$editor.html(a)
        }, input2value: function () {
            return this.$editor.html()
        }, activate: function () {
        }, isEmpty: function (b) {
            return "" === a.trim(b.html()) ? !0 : "" !== a.trim(b.text()) ? !1 : !b.height() || !b.width()
        }
    }), b.defaults = a.extend({}, a.fn.editabletypes.abstractinput.defaults, {
        tpl: '<input type="hidden" /><div class="wysiwyg-editor"></div>',
        inputclass: "editable-wysiwyg",
        wysiwyg: {toolbar: ["bold", "italic", "strikethrough", "underline", null, "foreColor", null, "insertImage"]}
    }), a.fn.editabletypes.wysiwyg = b
}(window.jQuery), function (a) {
    "use strict";
    var b = function (a) {
        this.init("spinner", a, b.defaults), this.initSpinner(a, b.defaults), this.nativeUI = !1;
        try {
            var c = document.createElement("INPUT");
            c.type = "number", this.nativeUI = "number" === c.type && this.options.spinner.nativeUI === !0
        } catch (d) {
        }
    };
    a.fn.editableutils.inherit(b, a.fn.editabletypes.abstractinput), a.extend(b.prototype, {
        initSpinner: function (b, c) {
            this.options.spinner = a.extend({}, c.spinner, b.spinner)
        }, render: function () {
        }, activate: function () {
            if (this.$input.is(":visible"))if (this.$input.focus(), a.fn.editableutils.setCursorPosition(this.$input.get(0), this.$input.val().length), this.nativeUI) {
                this.$input.get(0).type = "number";
                for (var b = ["min", "max", "step"], c = 0; c < b.length; c++)b[c] in this.options.spinner && this.$input.attr(b[c], this.options.spinner[b[c]])
            } else {
                var d = parseInt(this.$input.val()), b = a.extend({value: d}, this.options.spinner);
                this.$input.ace_spinner(b)
            }
        }, autosubmit: function () {
            this.$input.keydown(function (b) {
                13 === b.which && a(this).closest("form").submit()
            })
        }
    }), b.defaults = a.extend({}, a.fn.editabletypes.abstractinput.defaults, {
        tpl: '<input type="text" />',
        inputclass: "",
        spinner: {
            min: 0,
            max: 100,
            step: 1,
            icon_up: "fa fa-plus",
            icon_down: "fa fa-minus",
            btn_up_class: "btn-success",
            btn_down_class: "btn-danger"
        }
    }), a.fn.editabletypes.spinner = b
}(window.jQuery), function (a) {
    "use strict";
    var b = function (a) {
        this.init("slider", a, b.defaults), this.initSlider(a, b.defaults), this.nativeUI = !1;
        try {
            var c = document.createElement("INPUT");
            c.type = "range", this.nativeUI = "range" === c.type && this.options.slider.nativeUI === !0
        } catch (d) {
        }
    };
    a.fn.editableutils.inherit(b, a.fn.editabletypes.abstractinput), a.extend(b.prototype, {
        initSlider: function (b, c) {
            this.options.slider = a.extend({}, c.slider, b.slider)
        }, render: function () {
        }, activate: function () {
            if (this.$input.is(":visible"))if (this.$input.focus(), a.fn.editableutils.setCursorPosition(this.$input.get(0), this.$input.val().length), this.nativeUI) {
                this.$input.get(0).type = "range";
                for (var b = ["min", "max", "step"], c = 0; c < b.length; c++)b[c] in this.options.slider && (this.$input[0][b[c]] = this.options.slider[b[c]]);
                var d = this.options.slider.width || 200;
                this.$input.parent().addClass("editable-slider").css("width", d + "px")
            } else {
                var e = this, f = parseInt(this.$input.val()), d = this.options.slider.width || 200, b = a.extend(this.options.slider, {
                    value: f,
                    slide: function (b, c) {
                        var d = parseInt(c.value);
                        e.$input.val(d), null == c.handle.firstChild && a(c.handle).prepend("<div class='tooltip top in' style='display:none; top:-38px; left:-5px;'><div class='tooltip-arrow'></div><div class='tooltip-inner'></div></div>"), a(c.handle.firstChild).show().children().eq(1).text(d)
                    }
                });
                this.$input.parent().addClass("editable-slider").css("width", d + "px").slider(b)
            }
        }, value2html: function (a, b) {
        }, autosubmit: function () {
            this.$input.keydown(function (b) {
                13 === b.which && a(this).closest("form").submit()
            })
        }
    }), b.defaults = a.extend({}, a.fn.editabletypes.abstractinput.defaults, {
        tpl: '<input type="text" /><span class="inline ui-slider-green"><span class="slider-display"></span></span>',
        inputclass: "",
        slider: {min: 1, max: 100, step: 1, range: "min"}
    }), a.fn.editabletypes.slider = b
}(window.jQuery), function (a) {
    "use strict";
    var b = function (a) {
        this.init("adate", a, b.defaults), this.initDate(a, b.defaults), this.nativeUI = !1;
        try {
            var c = document.createElement("INPUT");
            c.type = "date", this.nativeUI = "date" === c.type && this.options.date.nativeUI === !0
        } catch (d) {
        }
    };
    a.fn.editableutils.inherit(b, a.fn.editabletypes.abstractinput), a.extend(b.prototype, {
        initDate: function (b, c) {
            this.options.date = a.extend({}, c.date, b.date)
        }, render: function () {
            this.$input = this.$tpl.find("input.date")
        }, activate: function () {
            if (this.$input.is(":visible") && this.$input.focus(), this.nativeUI)this.$input.get(0).type = "date"; else {
                var a = this.$input;
                this.$input.datepicker(this.options.date);
                var b = a.data("datepicker");
                b && a.on("click", function () {
                    b.show()
                }).siblings(".input-group-addon").on("click", function () {
                    b.show()
                })
            }
        }, autosubmit: function () {
            this.$input.keydown(function (b) {
                13 === b.which && a(this).closest("form").submit()
            })
        }
    }), b.defaults = a.extend({}, a.fn.editabletypes.abstractinput.defaults, {
        tpl: '<div class="input-group input-group-compact"><input type="text" class="input-medium date" /><span class="input-group-addon"><i class="fa fa-calendar"></i></span></div>',
        date: {weekStart: 0, startView: 0, minViewMode: 0}
    }), a.fn.editabletypes.adate = b
}(window.jQuery);