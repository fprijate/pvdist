'use strict';

var BaseComponent = require('primevue/basecomponent');
var EyeIcon = require('primevue/icons/eye');
var EyeSlashIcon = require('primevue/icons/eyeslash');
var InputText = require('primevue/inputtext');
var OverlayEventBus = require('primevue/overlayeventbus');
var Portal = require('primevue/portal');
var utils = require('primevue/utils');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var EyeIcon__default = /*#__PURE__*/_interopDefaultLegacy(EyeIcon);
var EyeSlashIcon__default = /*#__PURE__*/_interopDefaultLegacy(EyeSlashIcon);
var InputText__default = /*#__PURE__*/_interopDefaultLegacy(InputText);
var OverlayEventBus__default = /*#__PURE__*/_interopDefaultLegacy(OverlayEventBus);
var Portal__default = /*#__PURE__*/_interopDefaultLegacy(Portal);

var script = {
    name: 'Password',
    extends: BaseComponent__default["default"],
    emits: ['update:modelValue', 'change', 'focus', 'blur', 'invalid'],
    props: {
        modelValue: String,
        promptLabel: {
            type: String,
            default: null
        },
        mediumRegex: {
            type: String,
            default: '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})' // eslint-disable-line
        },
        strongRegex: {
            type: String,
            default: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})' // eslint-disable-line
        },
        weakLabel: {
            type: String,
            default: null
        },
        mediumLabel: {
            type: String,
            default: null
        },
        strongLabel: {
            type: String,
            default: null
        },
        feedback: {
            type: Boolean,
            default: true
        },
        appendTo: {
            type: String,
            default: 'body'
        },
        toggleMask: {
            type: Boolean,
            default: false
        },
        hideIcon: {
            type: String,
            default: undefined
        },
        showIcon: {
            type: String,
            default: undefined
        },
        disabled: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: null
        },
        required: {
            type: Boolean,
            default: false
        },
        inputId: {
            type: String,
            default: null
        },
        inputClass: {
            type: [String, Object],
            default: null
        },
        inputStyle: {
            type: Object,
            default: null
        },
        inputProps: {
            type: null,
            default: null
        },
        panelId: {
            type: String,
            default: null
        },
        panelClass: {
            type: [String, Object],
            default: null
        },
        panelStyle: {
            type: Object,
            default: null
        },
        panelProps: {
            type: null,
            default: null
        },
        'aria-labelledby': {
            type: String,
            default: null
        },
        'aria-label': {
            type: String,
            default: null
        }
    },
    data() {
        return {
            overlayVisible: false,
            meter: null,
            infoText: null,
            focused: false,
            unmasked: false
        };
    },
    mediumCheckRegExp: null,
    strongCheckRegExp: null,
    resizeListener: null,
    scrollHandler: null,
    overlay: null,
    mounted() {
        this.infoText = this.promptText;
        this.mediumCheckRegExp = new RegExp(this.mediumRegex);
        this.strongCheckRegExp = new RegExp(this.strongRegex);
    },
    beforeUnmount() {
        this.unbindResizeListener();

        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }

        if (this.overlay) {
            utils.ZIndexUtils.clear(this.overlay);
            this.overlay = null;
        }
    },
    methods: {
        onOverlayEnter(el) {
            utils.ZIndexUtils.set('overlay', el, this.$primevue.config.zIndex.overlay);
            this.alignOverlay();
            this.bindScrollListener();
            this.bindResizeListener();
        },
        onOverlayLeave() {
            this.unbindScrollListener();
            this.unbindResizeListener();
            this.overlay = null;
        },
        onOverlayAfterLeave(el) {
            utils.ZIndexUtils.clear(el);
        },
        alignOverlay() {
            if (this.appendTo === 'self') {
                utils.DomHandler.relativePosition(this.overlay, this.$refs.input.$el);
            } else {
                this.overlay.style.minWidth = utils.DomHandler.getOuterWidth(this.$refs.input.$el) + 'px';
                utils.DomHandler.absolutePosition(this.overlay, this.$refs.input.$el);
            }
        },
        testStrength(str) {
            let level = 0;

            if (this.strongCheckRegExp.test(str)) level = 3;
            else if (this.mediumCheckRegExp.test(str)) level = 2;
            else if (str.length) level = 1;

            return level;
        },
        onInput(event) {
            this.$emit('update:modelValue', event.target.value);
        },
        onFocus(event) {
            this.focused = true;

            if (this.feedback) {
                this.setPasswordMeter(this.modelValue);
                this.overlayVisible = true;
            }

            this.$emit('focus', event);
        },
        onBlur(event) {
            this.focused = false;

            if (this.feedback) {
                this.overlayVisible = false;
            }

            this.$emit('blur', event);
        },
        onKeyUp(event) {
            if (this.feedback) {
                const value = event.target.value;
                const { meter, label } = this.checkPasswordStrength(value);

                this.meter = meter;
                this.infoText = label;

                if (event.code === 'Escape') {
                    this.overlayVisible && (this.overlayVisible = false);

                    return;
                }

                if (!this.overlayVisible) {
                    this.overlayVisible = true;
                }
            }
        },
        setPasswordMeter() {
            if (!this.modelValue) return;

            const { meter, label } = this.checkPasswordStrength(this.modelValue);

            this.meter = meter;
            this.infoText = label;

            if (!this.overlayVisible) {
                this.overlayVisible = true;
            }
        },
        checkPasswordStrength(value) {
            let label = null;
            let meter = null;

            switch (this.testStrength(value)) {
                case 1:
                    label = this.weakText;
                    meter = {
                        strength: 'weak',
                        width: '33.33%'
                    };
                    break;

                case 2:
                    label = this.mediumText;
                    meter = {
                        strength: 'medium',
                        width: '66.66%'
                    };
                    break;

                case 3:
                    label = this.strongText;
                    meter = {
                        strength: 'strong',
                        width: '100%'
                    };
                    break;

                default:
                    label = this.promptText;
                    meter = null;
                    break;
            }

            return { label, meter };
        },
        onInvalid(event) {
            this.$emit('invalid', event);
        },
        bindScrollListener() {
            if (!this.scrollHandler) {
                this.scrollHandler = new utils.ConnectedOverlayScrollHandler(this.$refs.input.$el, () => {
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
        overlayRef(el) {
            this.overlay = el;
        },
        onMaskToggle() {
            this.unmasked = !this.unmasked;
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
            return [
                'p-password p-component p-inputwrapper',
                {
                    'p-inputwrapper-filled': this.filled,
                    'p-inputwrapper-focus': this.focused,
                    'p-input-icon-right': this.toggleMask
                }
            ];
        },
        inputFieldClass() {
            return [
                'p-password-input',
                this.inputClass,
                {
                    'p-disabled': this.disabled
                }
            ];
        },
        panelStyleClass() {
            return [
                'p-password-panel p-component',
                this.panelClass,
                {
                    'p-input-filled': this.$primevue.config.inputStyle === 'filled',
                    'p-ripple-disabled': this.$primevue.config.ripple === false
                }
            ];
        },
        strengthClass() {
            return `p-password-strength ${this.meter ? this.meter.strength : ''}`;
        },
        inputType() {
            return this.unmasked ? 'text' : 'password';
        },
        filled() {
            return this.modelValue != null && this.modelValue.toString().length > 0;
        },
        weakText() {
            return this.weakLabel || this.$primevue.config.locale.weak;
        },
        mediumText() {
            return this.mediumLabel || this.$primevue.config.locale.medium;
        },
        strongText() {
            return this.strongLabel || this.$primevue.config.locale.strong;
        },
        promptText() {
            return this.promptLabel || this.$primevue.config.locale.passwordPrompt;
        },
        panelUniqueId() {
            return utils.UniqueComponentId() + '_panel';
        }
    },
    components: {
        PInputText: InputText__default["default"],
        Portal: Portal__default["default"],
        EyeSlashIcon: EyeSlashIcon__default["default"],
        EyeIcon: EyeIcon__default["default"]
    }
};

const _hoisted_1 = ["id"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_PInputText = vue.resolveComponent("PInputText");
  const _component_Portal = vue.resolveComponent("Portal");

  return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({ class: $options.containerClass }, _ctx.ptm('root')), [
    vue.createVNode(_component_PInputText, vue.mergeProps({
      ref: "input",
      id: $props.inputId,
      type: $options.inputType,
      class: $options.inputFieldClass,
      style: $props.inputStyle,
      value: $props.modelValue,
      "aria-labelledby": _ctx.ariaLabelledby,
      "aria-label": _ctx.ariaLabel,
      "aria-controls": ($props.panelProps && $props.panelProps.id) || $props.panelId || $options.panelUniqueId,
      "aria-expanded": $data.overlayVisible,
      "aria-haspopup": true,
      placeholder: $props.placeholder,
      required: $props.required,
      onInput: $options.onInput,
      onFocus: $options.onFocus,
      onBlur: $options.onBlur,
      onKeyup: $options.onKeyUp,
      onInvalid: $options.onInvalid
    }, { ...$props.inputProps, ..._ctx.ptm('input') }), null, 16, ["id", "type", "class", "style", "value", "aria-labelledby", "aria-label", "aria-controls", "aria-expanded", "placeholder", "required", "onInput", "onFocus", "onBlur", "onKeyup", "onInvalid"]),
    ($props.toggleMask && $data.unmasked)
      ? vue.renderSlot(_ctx.$slots, "hideicon", {
          key: 0,
          onClick: $options.onMaskToggle
        }, () => [
          (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.hideIcon ? 'i' : 'EyeSlashIcon'), vue.mergeProps({
            class: $props.hideIcon,
            onClick: $options.onMaskToggle
          }, _ctx.ptm('hideIcon')), null, 16, ["class", "onClick"]))
        ])
      : vue.createCommentVNode("", true),
    ($props.toggleMask && !$data.unmasked)
      ? vue.renderSlot(_ctx.$slots, "showicon", {
          key: 1,
          onClick: $options.onMaskToggle
        }, () => [
          (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.showIcon ? 'i' : 'EyeIcon'), vue.mergeProps({
            class: $props.showIcon,
            onClick: $options.onMaskToggle
          }, _ctx.ptm('showIcon')), null, 16, ["class", "onClick"]))
        ])
      : vue.createCommentVNode("", true),
    vue.createElementVNode("span", vue.mergeProps({
      class: "p-hidden-accessible",
      "aria-live": "polite"
    }, _ctx.ptm('hiddenAccesible')), vue.toDisplayString($data.infoText), 17),
    vue.createVNode(_component_Portal, { appendTo: $props.appendTo }, {
      default: vue.withCtx(() => [
        vue.createVNode(vue.Transition, {
          name: "p-connected-overlay",
          onEnter: $options.onOverlayEnter,
          onLeave: $options.onOverlayLeave,
          onAfterLeave: $options.onOverlayAfterLeave
        }, {
          default: vue.withCtx(() => [
            ($data.overlayVisible)
              ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                  key: 0,
                  ref: $options.overlayRef,
                  id: $props.panelId || $options.panelUniqueId,
                  class: $options.panelStyleClass,
                  style: $props.panelStyle,
                  onClick: _cache[0] || (_cache[0] = (...args) => ($options.onOverlayClick && $options.onOverlayClick(...args)))
                }, { ...$props.panelProps, ..._ctx.ptm('panel') }), [
                  vue.renderSlot(_ctx.$slots, "header"),
                  vue.renderSlot(_ctx.$slots, "content", {}, () => [
                    vue.createElementVNode("div", vue.mergeProps({ class: "p-password-meter" }, _ctx.ptm('meter')), [
                      vue.createElementVNode("div", vue.mergeProps({
                        class: $options.strengthClass,
                        style: { width: $data.meter ? $data.meter.width : '' }
                      }, _ctx.ptm('meterLabel')), null, 16)
                    ], 16),
                    vue.createElementVNode("div", vue.mergeProps({ class: "p-password-info" }, _ctx.ptm('info')), vue.toDisplayString($data.infoText), 17)
                  ]),
                  vue.renderSlot(_ctx.$slots, "footer")
                ], 16, _hoisted_1))
              : vue.createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["onEnter", "onLeave", "onAfterLeave"])
      ]),
      _: 3
    }, 8, ["appendTo"])
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

var css_248z = "\n.p-password {\r\n    position: relative;\r\n    display: inline-flex;\n}\n.p-password-panel {\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\n}\n.p-password .p-password-panel {\r\n    min-width: 100%;\n}\n.p-password-meter {\r\n    height: 10px;\n}\n.p-password-strength {\r\n    height: 100%;\r\n    width: 0;\r\n    transition: width 1s ease-in-out;\n}\n.p-fluid .p-password {\r\n    display: flex;\n}\n.p-password-input::-ms-reveal,\r\n.p-password-input::-ms-clear {\r\n    display: none;\n}\r\n";
styleInject(css_248z);

script.render = render;

module.exports = script;
