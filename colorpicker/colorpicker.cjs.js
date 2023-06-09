'use strict';

var BaseComponent = require('primevue/basecomponent');
var OverlayEventBus = require('primevue/overlayeventbus');
var Portal = require('primevue/portal');
var utils = require('primevue/utils');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var OverlayEventBus__default = /*#__PURE__*/_interopDefaultLegacy(OverlayEventBus);
var Portal__default = /*#__PURE__*/_interopDefaultLegacy(Portal);

var script = {
    name: 'ColorPicker',
    extends: BaseComponent__default["default"],
    emits: ['update:modelValue', 'change', 'show', 'hide'],
    props: {
        modelValue: {
            type: null,
            default: null
        },
        defaultColor: {
            type: null,
            default: 'ff0000'
        },
        inline: {
            type: Boolean,
            default: false
        },
        format: {
            type: String,
            default: 'hex'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        tabindex: {
            type: String,
            default: null
        },
        autoZIndex: {
            type: Boolean,
            default: true
        },
        baseZIndex: {
            type: Number,
            default: 0
        },
        appendTo: {
            type: String,
            default: 'body'
        },
        panelClass: null
    },
    data() {
        return {
            overlayVisible: false
        };
    },
    hsbValue: null,
    outsideClickListener: null,
    documentMouseMoveListener: null,
    documentMouseUpListener: null,
    scrollHandler: null,
    resizeListener: null,
    hueDragging: null,
    colorDragging: null,
    selfUpdate: null,
    picker: null,
    colorSelector: null,
    colorHandle: null,
    hueView: null,
    hueHandle: null,
    watch: {
        modelValue: {
            immediate: true,
            handler(newValue) {
                this.hsbValue = this.toHSB(newValue);

                if (this.selfUpdate) this.selfUpdate = false;
                else this.updateUI();
            }
        }
    },
    beforeUnmount() {
        this.unbindOutsideClickListener();
        this.unbindDragListeners();
        this.unbindResizeListener();

        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }

        if (this.picker && this.autoZIndex) {
            utils.ZIndexUtils.clear(this.picker);
        }

        this.clearRefs();
    },
    mounted() {
        this.updateUI();
    },
    methods: {
        pickColor(event) {
            let rect = this.colorSelector.getBoundingClientRect();
            let top = rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
            let left = rect.left + document.body.scrollLeft;
            let saturation = Math.floor((100 * Math.max(0, Math.min(150, (event.pageX || event.changedTouches[0].pageX) - left))) / 150);
            let brightness = Math.floor((100 * (150 - Math.max(0, Math.min(150, (event.pageY || event.changedTouches[0].pageY) - top)))) / 150);

            this.hsbValue = this.validateHSB({
                h: this.hsbValue.h,
                s: saturation,
                b: brightness
            });

            this.selfUpdate = true;
            this.updateColorHandle();
            this.updateInput();
            this.updateModel();
            this.$emit('change', { event: event, value: this.modelValue });
        },
        pickHue(event) {
            let top = this.hueView.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);

            this.hsbValue = this.validateHSB({
                h: Math.floor((360 * (150 - Math.max(0, Math.min(150, (event.pageY || event.changedTouches[0].pageY) - top)))) / 150),
                s: 100,
                b: 100
            });

            this.selfUpdate = true;
            this.updateColorSelector();
            this.updateHue();
            this.updateModel();
            this.updateInput();
            this.$emit('change', { event: event, value: this.modelValue });
        },
        updateModel() {
            switch (this.format) {
                case 'hex':
                    this.$emit('update:modelValue', this.HSBtoHEX(this.hsbValue));
                    break;

                case 'rgb':
                    this.$emit('update:modelValue', this.HSBtoRGB(this.hsbValue));
                    break;

                case 'hsb':
                    this.$emit('update:modelValue', this.hsbValue);
                    break;
            }
        },
        updateColorSelector() {
            if (this.colorSelector) {
                let hsbValue = this.validateHSB({
                    h: this.hsbValue.h,
                    s: 100,
                    b: 100
                });

                this.colorSelector.style.backgroundColor = '#' + this.HSBtoHEX(hsbValue);
            }
        },
        updateColorHandle() {
            if (this.colorHandle) {
                this.colorHandle.style.left = Math.floor((150 * this.hsbValue.s) / 100) + 'px';
                this.colorHandle.style.top = Math.floor((150 * (100 - this.hsbValue.b)) / 100) + 'px';
            }
        },
        updateHue() {
            if (this.hueHandle) {
                this.hueHandle.style.top = Math.floor(150 - (150 * this.hsbValue.h) / 360) + 'px';
            }
        },
        updateInput() {
            if (this.$refs.input) {
                this.$refs.input.style.backgroundColor = '#' + this.HSBtoHEX(this.hsbValue);
            }
        },
        updateUI() {
            this.updateHue();
            this.updateColorHandle();
            this.updateInput();
            this.updateColorSelector();
        },
        validateHSB(hsb) {
            return {
                h: Math.min(360, Math.max(0, hsb.h)),
                s: Math.min(100, Math.max(0, hsb.s)),
                b: Math.min(100, Math.max(0, hsb.b))
            };
        },
        validateRGB(rgb) {
            return {
                r: Math.min(255, Math.max(0, rgb.r)),
                g: Math.min(255, Math.max(0, rgb.g)),
                b: Math.min(255, Math.max(0, rgb.b))
            };
        },
        validateHEX(hex) {
            var len = 6 - hex.length;

            if (len > 0) {
                var o = [];

                for (var i = 0; i < len; i++) {
                    o.push('0');
                }

                o.push(hex);
                hex = o.join('');
            }

            return hex;
        },
        HEXtoRGB(hex) {
            let hexValue = parseInt(hex.indexOf('#') > -1 ? hex.substring(1) : hex, 16);

            return { r: hexValue >> 16, g: (hexValue & 0x00ff00) >> 8, b: hexValue & 0x0000ff };
        },
        HEXtoHSB(hex) {
            return this.RGBtoHSB(this.HEXtoRGB(hex));
        },
        RGBtoHSB(rgb) {
            var hsb = {
                h: 0,
                s: 0,
                b: 0
            };
            var min = Math.min(rgb.r, rgb.g, rgb.b);
            var max = Math.max(rgb.r, rgb.g, rgb.b);
            var delta = max - min;

            hsb.b = max;
            hsb.s = max !== 0 ? (255 * delta) / max : 0;

            if (hsb.s !== 0) {
                if (rgb.r === max) {
                    hsb.h = (rgb.g - rgb.b) / delta;
                } else if (rgb.g === max) {
                    hsb.h = 2 + (rgb.b - rgb.r) / delta;
                } else {
                    hsb.h = 4 + (rgb.r - rgb.g) / delta;
                }
            } else {
                hsb.h = -1;
            }

            hsb.h *= 60;

            if (hsb.h < 0) {
                hsb.h += 360;
            }

            hsb.s *= 100 / 255;
            hsb.b *= 100 / 255;

            return hsb;
        },
        HSBtoRGB(hsb) {
            var rgb = {
                r: null,
                g: null,
                b: null
            };
            var h = Math.round(hsb.h);
            var s = Math.round((hsb.s * 255) / 100);
            var v = Math.round((hsb.b * 255) / 100);

            if (s === 0) {
                rgb = {
                    r: v,
                    g: v,
                    b: v
                };
            } else {
                var t1 = v;
                var t2 = ((255 - s) * v) / 255;
                var t3 = ((t1 - t2) * (h % 60)) / 60;

                if (h === 360) h = 0;

                if (h < 60) {
                    rgb.r = t1;
                    rgb.b = t2;
                    rgb.g = t2 + t3;
                } else if (h < 120) {
                    rgb.g = t1;
                    rgb.b = t2;
                    rgb.r = t1 - t3;
                } else if (h < 180) {
                    rgb.g = t1;
                    rgb.r = t2;
                    rgb.b = t2 + t3;
                } else if (h < 240) {
                    rgb.b = t1;
                    rgb.r = t2;
                    rgb.g = t1 - t3;
                } else if (h < 300) {
                    rgb.b = t1;
                    rgb.g = t2;
                    rgb.r = t2 + t3;
                } else if (h < 360) {
                    rgb.r = t1;
                    rgb.g = t2;
                    rgb.b = t1 - t3;
                } else {
                    rgb.r = 0;
                    rgb.g = 0;
                    rgb.b = 0;
                }
            }

            return { r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b) };
        },
        RGBtoHEX(rgb) {
            var hex = [rgb.r.toString(16), rgb.g.toString(16), rgb.b.toString(16)];

            for (var key in hex) {
                if (hex[key].length === 1) {
                    hex[key] = '0' + hex[key];
                }
            }

            return hex.join('');
        },
        HSBtoHEX(hsb) {
            return this.RGBtoHEX(this.HSBtoRGB(hsb));
        },
        toHSB(value) {
            let hsb;

            if (value) {
                switch (this.format) {
                    case 'hex':
                        hsb = this.HEXtoHSB(value);
                        break;

                    case 'rgb':
                        hsb = this.RGBtoHSB(value);
                        break;

                    case 'hsb':
                        hsb = value;
                        break;
                }
            } else {
                hsb = this.HEXtoHSB(this.defaultColor);
            }

            return hsb;
        },
        onOverlayEnter(el) {
            this.updateUI();
            this.alignOverlay();
            this.bindOutsideClickListener();
            this.bindScrollListener();
            this.bindResizeListener();

            if (this.autoZIndex) {
                utils.ZIndexUtils.set('overlay', el, this.$primevue.config.zIndex.overlay);
            }

            this.$emit('show');
        },
        onOverlayLeave() {
            this.unbindOutsideClickListener();
            this.unbindScrollListener();
            this.unbindResizeListener();
            this.clearRefs();
            this.$emit('hide');
        },
        onOverlayAfterLeave(el) {
            if (this.autoZIndex) {
                utils.ZIndexUtils.clear(el);
            }
        },
        alignOverlay() {
            if (this.appendTo === 'self') utils.DomHandler.relativePosition(this.picker, this.$refs.input);
            else utils.DomHandler.absolutePosition(this.picker, this.$refs.input);
        },
        onInputClick() {
            if (this.disabled) {
                return;
            }

            this.overlayVisible = !this.overlayVisible;
        },
        onInputKeydown(event) {
            switch (event.code) {
                case 'Space':
                    this.overlayVisible = !this.overlayVisible;
                    event.preventDefault();
                    break;

                case 'Escape':
                case 'Tab':
                    this.overlayVisible = false;
                    break;
            }
        },
        onColorMousedown(event) {
            if (this.disabled) {
                return;
            }

            this.bindDragListeners();
            this.onColorDragStart(event);
        },
        onColorDragStart(event) {
            if (this.disabled) {
                return;
            }

            this.colorDragging = true;
            this.pickColor(event);
            utils.DomHandler.addClass(this.$el, 'p-colorpicker-dragging');
            event.preventDefault();
        },
        onDrag(event) {
            if (this.colorDragging) {
                this.pickColor(event);
                event.preventDefault();
            }

            if (this.hueDragging) {
                this.pickHue(event);
                event.preventDefault();
            }
        },
        onDragEnd() {
            this.colorDragging = false;
            this.hueDragging = false;
            utils.DomHandler.removeClass(this.$el, 'p-colorpicker-dragging');
            this.unbindDragListeners();
        },
        onHueMousedown(event) {
            if (this.disabled) {
                return;
            }

            this.bindDragListeners();
            this.onHueDragStart(event);
        },
        onHueDragStart(event) {
            if (this.disabled) {
                return;
            }

            this.hueDragging = true;
            this.pickHue(event);
            utils.DomHandler.addClass(this.$el, 'p-colorpicker-dragging');
        },
        isInputClicked(event) {
            return this.$refs.input && this.$refs.input.isSameNode(event.target);
        },
        bindDragListeners() {
            this.bindDocumentMouseMoveListener();
            this.bindDocumentMouseUpListener();
        },
        unbindDragListeners() {
            this.unbindDocumentMouseMoveListener();
            this.unbindDocumentMouseUpListener();
        },
        bindOutsideClickListener() {
            if (!this.outsideClickListener) {
                this.outsideClickListener = (event) => {
                    if (this.overlayVisible && this.picker && !this.picker.contains(event.target) && !this.isInputClicked(event)) {
                        this.overlayVisible = false;
                    }
                };

                document.addEventListener('click', this.outsideClickListener);
            }
        },
        unbindOutsideClickListener() {
            if (this.outsideClickListener) {
                document.removeEventListener('click', this.outsideClickListener);
                this.outsideClickListener = null;
            }
        },
        bindScrollListener() {
            if (!this.scrollHandler) {
                this.scrollHandler = new utils.ConnectedOverlayScrollHandler(this.$refs.container, () => {
                    if (this.overlayVisible) {
                        this.overlayVisible = false;
                    }
                });
            }

            this.scrollHandler.bindScrollListener();
        },
        unbindScrollListener() {
            if (this.scrollHandler) {
                this.scrollHandler.unbindScrollListener();
            }
        },
        bindResizeListener() {
            if (!this.resizeListener) {
                this.resizeListener = () => {
                    if (this.overlayVisible && !utils.DomHandler.isTouchDevice()) {
                        this.overlayVisible = false;
                    }
                };

                window.addEventListener('resize', this.resizeListener);
            }
        },
        unbindResizeListener() {
            if (this.resizeListener) {
                window.removeEventListener('resize', this.resizeListener);
                this.resizeListener = null;
            }
        },
        bindDocumentMouseMoveListener() {
            if (!this.documentMouseMoveListener) {
                this.documentMouseMoveListener = this.onDrag.bind(this);
                document.addEventListener('mousemove', this.documentMouseMoveListener);
            }
        },
        unbindDocumentMouseMoveListener() {
            if (this.documentMouseMoveListener) {
                document.removeEventListener('mousemove', this.documentMouseMoveListener);
                this.documentMouseMoveListener = null;
            }
        },
        bindDocumentMouseUpListener() {
            if (!this.documentMouseUpListener) {
                this.documentMouseUpListener = this.onDragEnd.bind(this);
                document.addEventListener('mouseup', this.documentMouseUpListener);
            }
        },
        unbindDocumentMouseUpListener() {
            if (this.documentMouseUpListener) {
                document.removeEventListener('mouseup', this.documentMouseUpListener);
                this.documentMouseUpListener = null;
            }
        },
        pickerRef(el) {
            this.picker = el;
        },
        colorSelectorRef(el) {
            this.colorSelector = el;
        },
        colorHandleRef(el) {
            this.colorHandle = el;
        },
        hueViewRef(el) {
            this.hueView = el;
        },
        hueHandleRef(el) {
            this.hueHandle = el;
        },
        clearRefs() {
            this.picker = null;
            this.colorSelector = null;
            this.colorHandle = null;
            this.hueView = null;
            this.hueHandle = null;
        },
        onOverlayClick(event) {
            OverlayEventBus__default["default"].emit('overlay-click', {
                originalEvent: event,
                target: this.$el
            });
        }
    },
    computed: {
        containerClass() {
            return ['p-colorpicker p-component', { 'p-colorpicker-overlay': !this.inline }];
        },
        inputClass() {
            return ['p-colorpicker-preview p-inputtext', { 'p-disabled': this.disabled }];
        },
        pickerClass() {
            return [
                'p-colorpicker-panel',
                this.panelClass,
                {
                    'p-colorpicker-overlay-panel': !this.inline,
                    'p-disabled': this.disabled,
                    'p-input-filled': this.$primevue.config.inputStyle === 'filled',
                    'p-ripple-disabled': this.$primevue.config.ripple === false
                }
            ];
        }
    },
    components: {
        Portal: Portal__default["default"]
    }
};

const _hoisted_1 = ["tabindex", "disabled"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Portal = vue.resolveComponent("Portal");

  return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    ref: "container",
    class: $options.containerClass
  }, _ctx.ptm('root')), [
    (!$props.inline)
      ? (vue.openBlock(), vue.createElementBlock("input", vue.mergeProps({
          key: 0,
          ref: "input",
          type: "text",
          class: $options.inputClass,
          readonly: "readonly",
          tabindex: $props.tabindex,
          disabled: $props.disabled,
          onClick: _cache[0] || (_cache[0] = (...args) => ($options.onInputClick && $options.onInputClick(...args))),
          onKeydown: _cache[1] || (_cache[1] = (...args) => ($options.onInputKeydown && $options.onInputKeydown(...args)))
        }, _ctx.ptm('input')), null, 16, _hoisted_1))
      : vue.createCommentVNode("", true),
    vue.createVNode(_component_Portal, {
      appendTo: $props.appendTo,
      disabled: $props.inline
    }, {
      default: vue.withCtx(() => [
        vue.createVNode(vue.Transition, {
          name: "p-connected-overlay",
          onEnter: $options.onOverlayEnter,
          onLeave: $options.onOverlayLeave,
          onAfterLeave: $options.onOverlayAfterLeave
        }, {
          default: vue.withCtx(() => [
            ($props.inline ? true : $data.overlayVisible)
              ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                  key: 0,
                  ref: $options.pickerRef,
                  class: $options.pickerClass,
                  onClick: _cache[10] || (_cache[10] = (...args) => ($options.onOverlayClick && $options.onOverlayClick(...args)))
                }, _ctx.ptm('panel')), [
                  vue.createElementVNode("div", vue.mergeProps({ class: "p-colorpicker-content" }, _ctx.ptm('content')), [
                    vue.createElementVNode("div", vue.mergeProps({
                      ref: $options.colorSelectorRef,
                      class: "p-colorpicker-color-selector",
                      onMousedown: _cache[2] || (_cache[2] = $event => ($options.onColorMousedown($event))),
                      onTouchstart: _cache[3] || (_cache[3] = $event => ($options.onColorDragStart($event))),
                      onTouchmove: _cache[4] || (_cache[4] = $event => ($options.onDrag($event))),
                      onTouchend: _cache[5] || (_cache[5] = $event => ($options.onDragEnd()))
                    }, _ctx.ptm('selector')), [
                      vue.createElementVNode("div", vue.mergeProps({ class: "p-colorpicker-color" }, _ctx.ptm('color')), [
                        vue.createElementVNode("div", vue.mergeProps({
                          ref: $options.colorHandleRef,
                          class: "p-colorpicker-color-handle"
                        }, _ctx.ptm('colorHandler')), null, 16)
                      ], 16)
                    ], 16),
                    vue.createElementVNode("div", vue.mergeProps({
                      ref: $options.hueViewRef,
                      class: "p-colorpicker-hue",
                      onMousedown: _cache[6] || (_cache[6] = $event => ($options.onHueMousedown($event))),
                      onTouchstart: _cache[7] || (_cache[7] = $event => ($options.onHueDragStart($event))),
                      onTouchmove: _cache[8] || (_cache[8] = $event => ($options.onDrag($event))),
                      onTouchend: _cache[9] || (_cache[9] = $event => ($options.onDragEnd()))
                    }, _ctx.ptm('hue')), [
                      vue.createElementVNode("div", vue.mergeProps({
                        ref: $options.hueHandleRef,
                        class: "p-colorpicker-hue-handle"
                      }, _ctx.ptm('hueHandler')), null, 16)
                    ], 16)
                  ], 16)
                ], 16))
              : vue.createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["onEnter", "onLeave", "onAfterLeave"])
      ]),
      _: 1
    }, 8, ["appendTo", "disabled"])
  ], 16))
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "\n.p-colorpicker {\r\n    display: inline-block;\n}\n.p-colorpicker-dragging {\r\n    cursor: pointer;\n}\n.p-colorpicker-overlay {\r\n    position: relative;\n}\n.p-colorpicker-panel {\r\n    position: relative;\r\n    width: 193px;\r\n    height: 166px;\n}\n.p-colorpicker-overlay-panel {\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\n}\n.p-colorpicker-preview {\r\n    cursor: pointer;\n}\n.p-colorpicker-panel .p-colorpicker-content {\r\n    position: relative;\n}\n.p-colorpicker-panel .p-colorpicker-color-selector {\r\n    width: 150px;\r\n    height: 150px;\r\n    top: 8px;\r\n    left: 8px;\r\n    position: absolute;\n}\n.p-colorpicker-panel .p-colorpicker-color {\r\n    width: 150px;\r\n    height: 150px;\n}\n.p-colorpicker-panel .p-colorpicker-color-handle {\r\n    position: absolute;\r\n    top: 0px;\r\n    left: 150px;\r\n    border-radius: 100%;\r\n    width: 10px;\r\n    height: 10px;\r\n    border-width: 1px;\r\n    border-style: solid;\r\n    margin: -5px 0 0 -5px;\r\n    cursor: pointer;\r\n    opacity: 0.85;\n}\n.p-colorpicker-panel .p-colorpicker-hue {\r\n    width: 17px;\r\n    height: 150px;\r\n    top: 8px;\r\n    left: 167px;\r\n    position: absolute;\r\n    opacity: 0.85;\n}\n.p-colorpicker-panel .p-colorpicker-hue-handle {\r\n    position: absolute;\r\n    top: 150px;\r\n    left: 0px;\r\n    width: 21px;\r\n    margin-left: -2px;\r\n    margin-top: -5px;\r\n    height: 10px;\r\n    border-width: 2px;\r\n    border-style: solid;\r\n    opacity: 0.85;\r\n    cursor: pointer;\n}\r\n";
styleInject(css_248z);

script.render = render;

module.exports = script;
