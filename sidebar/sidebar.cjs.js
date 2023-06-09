'use strict';

var BaseComponent = require('primevue/basecomponent');
var FocusTrap = require('primevue/focustrap');
var TimesIcon = require('primevue/icons/times');
var Portal = require('primevue/portal');
var Ripple = require('primevue/ripple');
var utils = require('primevue/utils');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var FocusTrap__default = /*#__PURE__*/_interopDefaultLegacy(FocusTrap);
var TimesIcon__default = /*#__PURE__*/_interopDefaultLegacy(TimesIcon);
var Portal__default = /*#__PURE__*/_interopDefaultLegacy(Portal);
var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);

var script = {
    name: 'Sidebar',
    extends: BaseComponent__default["default"],
    inheritAttrs: false,
    emits: ['update:visible', 'show', 'hide', 'after-hide'],
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        position: {
            type: String,
            default: 'left'
        },
        baseZIndex: {
            type: Number,
            default: 0
        },
        autoZIndex: {
            type: Boolean,
            default: true
        },
        dismissable: {
            type: Boolean,
            default: true
        },
        showCloseIcon: {
            type: Boolean,
            default: true
        },
        closeIcon: {
            type: String,
            default: undefined
        },
        modal: {
            type: Boolean,
            default: true
        },
        blockScroll: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            containerVisible: this.visible
        };
    },
    container: null,
    mask: null,
    content: null,
    headerContainer: null,
    closeButton: null,
    outsideClickListener: null,
    updated() {
        if (this.visible) {
            this.containerVisible = this.visible;
        }
    },
    beforeUnmount() {
        this.disableDocumentSettings();

        if (this.mask && this.autoZIndex) {
            utils.ZIndexUtils.clear(this.mask);
        }

        this.container = null;
        this.mask = null;
    },
    methods: {
        hide() {
            this.$emit('update:visible', false);
        },
        onEnter() {
            this.$emit('show');
            this.focus();

            if (this.autoZIndex) {
                utils.ZIndexUtils.set('modal', this.mask, this.baseZIndex || this.$primevue.config.zIndex.modal);
            }
        },
        onAfterEnter() {
            this.enableDocumentSettings();
        },
        onBeforeLeave() {
            if (this.modal) {
                utils.DomHandler.addClass(this.mask, 'p-component-overlay-leave');
            }
        },
        onLeave() {
            this.$emit('hide');
        },
        onAfterLeave() {
            if (this.autoZIndex) {
                utils.ZIndexUtils.clear(this.mask);
            }

            this.containerVisible = false;
            this.disableDocumentSettings();
            this.$emit('after-hide');
        },
        onMaskClick(event) {
            if (this.dismissable && this.modal && this.mask === event.target) {
                this.hide();
            }
        },
        focus() {
            const findFocusableElement = (container) => {
                return container.querySelector('[autofocus]');
            };

            let focusTarget = this.$slots.default && findFocusableElement(this.content);

            if (!focusTarget) {
                focusTarget = this.$slots.header && findFocusableElement(this.headerContainer);

                if (!focusTarget) {
                    focusTarget = findFocusableElement(this.container);
                }
            }

            focusTarget && focusTarget.focus();
        },
        enableDocumentSettings() {
            if (this.dismissable && !this.modal) {
                this.bindOutsideClickListener();
            }

            if (this.blockScroll) {
                utils.DomHandler.addClass(document.body, 'p-overflow-hidden');
            }
        },
        disableDocumentSettings() {
            this.unbindOutsideClickListener();

            if (this.blockScroll) {
                utils.DomHandler.removeClass(document.body, 'p-overflow-hidden');
            }
        },
        onKeydown(event) {
            if (event.code === 'Escape') {
                this.hide();
            }
        },
        containerRef(el) {
            this.container = el;
        },
        maskRef(el) {
            this.mask = el;
        },
        contentRef(el) {
            this.content = el;
        },
        headerContainerRef(el) {
            this.headerContainer = el;
        },
        closeButtonRef(el) {
            this.closeButton = el;
        },
        getPositionClass() {
            const positions = ['left', 'right', 'top', 'bottom'];
            const pos = positions.find((item) => item === this.position);

            return pos ? `p-sidebar-${pos}` : '';
        },
        bindOutsideClickListener() {
            if (!this.outsideClickListener) {
                this.outsideClickListener = (event) => {
                    if (this.isOutsideClicked(event)) {
                        this.hide();
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
        isOutsideClicked(event) {
            return this.container && !this.container.contains(event.target);
        }
    },
    computed: {
        containerClass() {
            return [
                'p-sidebar p-component',
                {
                    'p-input-filled': this.$primevue.config.inputStyle === 'filled',
                    'p-ripple-disabled': this.$primevue.config.ripple === false,
                    'p-sidebar-full': this.fullScreen
                }
            ];
        },
        fullScreen() {
            return this.position === 'full';
        },
        closeAriaLabel() {
            return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : undefined;
        },
        maskClass() {
            return [
                'p-sidebar-mask',
                this.getPositionClass(),
                {
                    'p-component-overlay p-component-overlay-enter': this.modal,
                    'p-sidebar-mask-scrollblocker': this.blockScroll,
                    'p-sidebar-visible': this.containerVisible,
                    'p-sidebar-full': this.fullScreen
                }
            ];
        }
    },
    directives: {
        focustrap: FocusTrap__default["default"],
        ripple: Ripple__default["default"]
    },
    components: {
        Portal: Portal__default["default"],
        TimesIcon: TimesIcon__default["default"]
    }
};

const _hoisted_1 = ["aria-modal"];
const _hoisted_2 = ["aria-label"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Portal = vue.resolveComponent("Portal");
  const _directive_ripple = vue.resolveDirective("ripple");
  const _directive_focustrap = vue.resolveDirective("focustrap");

  return (vue.openBlock(), vue.createBlock(_component_Portal, null, {
    default: vue.withCtx(() => [
      ($data.containerVisible)
        ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: 0,
            ref: $options.maskRef,
            class: $options.maskClass,
            onMousedown: _cache[2] || (_cache[2] = (...args) => ($options.onMaskClick && $options.onMaskClick(...args)))
          }, _ctx.ptm('mask')), [
            vue.createVNode(vue.Transition, {
              name: "p-sidebar",
              onEnter: $options.onEnter,
              onAfterEnter: $options.onAfterEnter,
              onBeforeLeave: $options.onBeforeLeave,
              onLeave: $options.onLeave,
              onAfterLeave: $options.onAfterLeave,
              appear: ""
            }, {
              default: vue.withCtx(() => [
                ($props.visible)
                  ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                      key: 0,
                      ref: $options.containerRef,
                      class: $options.containerClass,
                      role: "complementary",
                      "aria-modal": $props.modal,
                      onKeydown: _cache[1] || (_cache[1] = (...args) => ($options.onKeydown && $options.onKeydown(...args)))
                    }, { ..._ctx.$attrs, ..._ctx.ptm('root') }), [
                      vue.createElementVNode("div", vue.mergeProps({
                        ref: $options.headerContainerRef,
                        class: "p-sidebar-header"
                      }, _ctx.ptm('header')), [
                        (_ctx.$slots.header)
                          ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                              key: 0,
                              class: "p-sidebar-header-content"
                            }, _ctx.ptm('headerContent')), [
                              vue.renderSlot(_ctx.$slots, "header")
                            ], 16))
                          : vue.createCommentVNode("", true),
                        ($props.showCloseIcon)
                          ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
                              key: 1,
                              ref: $options.closeButtonRef,
                              autofocus: "",
                              type: "button",
                              class: "p-sidebar-close p-sidebar-icon p-link",
                              "aria-label": $options.closeAriaLabel,
                              onClick: _cache[0] || (_cache[0] = (...args) => ($options.hide && $options.hide(...args)))
                            }, _ctx.ptm('closeButton')), [
                              vue.renderSlot(_ctx.$slots, "closeicon", {}, () => [
                                (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.closeIcon ? 'span' : 'TimesIcon'), vue.mergeProps({
                                  class: ['p-sidebar-close-icon ', $props.closeIcon]
                                }, _ctx.ptm('closeIcon')), null, 16, ["class"]))
                              ])
                            ], 16, _hoisted_2)), [
                              [_directive_ripple]
                            ])
                          : vue.createCommentVNode("", true)
                      ], 16),
                      vue.createElementVNode("div", vue.mergeProps({
                        ref: $options.contentRef,
                        class: "p-sidebar-content"
                      }, _ctx.ptm('content')), [
                        vue.renderSlot(_ctx.$slots, "default")
                      ], 16)
                    ], 16, _hoisted_1)), [
                      [_directive_focustrap]
                    ])
                  : vue.createCommentVNode("", true)
              ]),
              _: 3
            }, 8, ["onEnter", "onAfterEnter", "onBeforeLeave", "onLeave", "onAfterLeave"])
          ], 16))
        : vue.createCommentVNode("", true)
    ]),
    _: 3
  }))
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

var css_248z = "\n.p-sidebar-mask {\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    display: none;\r\n    justify-content: center;\r\n    align-items: center;\r\n    pointer-events: none;\r\n    background-color: transparent;\r\n    transition-property: background-color;\n}\n.p-sidebar-mask.p-component-overlay {\r\n    pointer-events: auto;\n}\n.p-sidebar-visible {\r\n    display: flex;\n}\n.p-sidebar {\r\n    display: flex;\r\n    flex-direction: column;\r\n    pointer-events: auto;\r\n    transform: translate3d(0px, 0px, 0px);\r\n    position: relative;\r\n    transition: transform 0.3s;\n}\n.p-sidebar-content {\r\n    overflow-y: auto;\r\n    flex-grow: 1;\n}\n.p-sidebar-header {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: flex-end;\r\n    flex-shrink: 0;\n}\n.p-sidebar-icon {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    overflow: hidden;\r\n    position: relative;\n}\n.p-sidebar-full .p-sidebar {\r\n    transition: none;\r\n    transform: none;\r\n    width: 100vw !important;\r\n    height: 100vh !important;\r\n    max-height: 100%;\r\n    top: 0px !important;\r\n    left: 0px !important;\n}\r\n\r\n/* Animation */\r\n/* Center */\n.p-sidebar-left .p-sidebar-enter-from,\r\n.p-sidebar-left .p-sidebar-leave-to {\r\n    transform: translateX(-100%);\n}\n.p-sidebar-right .p-sidebar-enter-from,\r\n.p-sidebar-right .p-sidebar-leave-to {\r\n    transform: translateX(100%);\n}\n.p-sidebar-top .p-sidebar-enter-from,\r\n.p-sidebar-top .p-sidebar-leave-to {\r\n    transform: translateY(-100%);\n}\n.p-sidebar-bottom .p-sidebar-enter-from,\r\n.p-sidebar-bottom .p-sidebar-leave-to {\r\n    transform: translateY(100%);\n}\n.p-sidebar-full .p-sidebar-enter-from,\r\n.p-sidebar-full .p-sidebar-leave-to {\r\n    opacity: 0;\n}\n.p-sidebar-full .p-sidebar-enter-active,\r\n.p-sidebar-full .p-sidebar-leave-active {\r\n    transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);\n}\r\n\r\n/* Position */\n.p-sidebar-left {\r\n    justify-content: flex-start;\n}\n.p-sidebar-right {\r\n    justify-content: flex-end;\n}\n.p-sidebar-top {\r\n    align-items: flex-start;\n}\n.p-sidebar-bottom {\r\n    align-items: flex-end;\n}\r\n\r\n/* Size */\n.p-sidebar-left .p-sidebar {\r\n    width: 20rem;\r\n    height: 100%;\n}\n.p-sidebar-right .p-sidebar {\r\n    width: 20rem;\r\n    height: 100%;\n}\n.p-sidebar-top .p-sidebar {\r\n    height: 10rem;\r\n    width: 100%;\n}\n.p-sidebar-bottom .p-sidebar {\r\n    height: 10rem;\r\n    width: 100%;\n}\n.p-sidebar-left .p-sidebar-sm,\r\n.p-sidebar-right .p-sidebar-sm {\r\n    width: 20rem;\n}\n.p-sidebar-left .p-sidebar-md,\r\n.p-sidebar-right .p-sidebar-md {\r\n    width: 40rem;\n}\n.p-sidebar-left .p-sidebar-lg,\r\n.p-sidebar-right .p-sidebar-lg {\r\n    width: 60rem;\n}\n.p-sidebar-top .p-sidebar-sm,\r\n.p-sidebar-bottom .p-sidebar-sm {\r\n    height: 10rem;\n}\n.p-sidebar-top .p-sidebar-md,\r\n.p-sidebar-bottom .p-sidebar-md {\r\n    height: 20rem;\n}\n.p-sidebar-top .p-sidebar-lg,\r\n.p-sidebar-bottom .p-sidebar-lg {\r\n    height: 30rem;\n}\n.p-sidebar-left .p-sidebar-content,\r\n.p-sidebar-right .p-sidebar-content,\r\n.p-sidebar-top .p-sidebar-content,\r\n.p-sidebar-bottom .p-sidebar-content {\r\n    width: 100%;\r\n    height: 100%;\n}\n@media screen and (max-width: 64em) {\n.p-sidebar-left .p-sidebar-lg,\r\n    .p-sidebar-left .p-sidebar-md,\r\n    .p-sidebar-right .p-sidebar-lg,\r\n    .p-sidebar-right .p-sidebar-md {\r\n        width: 20rem;\n}\n}\r\n";
styleInject(css_248z);

script.render = render;

module.exports = script;
