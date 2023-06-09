'use strict';

var BaseComponent = require('primevue/basecomponent');
var ChevronUpIcon = require('primevue/icons/chevronup');
var utils = require('primevue/utils');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var ChevronUpIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronUpIcon);

var script = {
    name: 'ScrollTop',
    extends: BaseComponent__default["default"],
    scrollListener: null,
    container: null,
    props: {
        target: {
            type: String,
            default: 'window'
        },
        threshold: {
            type: Number,
            default: 400
        },
        icon: {
            type: String,
            default: undefined
        },
        behavior: {
            type: String,
            default: 'smooth'
        }
    },
    data() {
        return {
            visible: false
        };
    },
    mounted() {
        if (this.target === 'window') this.bindDocumentScrollListener();
        else if (this.target === 'parent') this.bindParentScrollListener();
    },
    beforeUnmount() {
        if (this.target === 'window') this.unbindDocumentScrollListener();
        else if (this.target === 'parent') this.unbindParentScrollListener();

        if (this.container) {
            utils.ZIndexUtils.clear(this.container);
            this.overlay = null;
        }
    },
    methods: {
        onClick() {
            let scrollElement = this.target === 'window' ? window : this.$el.parentElement;

            scrollElement.scroll({
                top: 0,
                behavior: this.behavior
            });
        },
        checkVisibility(scrollY) {
            if (scrollY > this.threshold) this.visible = true;
            else this.visible = false;
        },
        bindParentScrollListener() {
            this.scrollListener = () => {
                this.checkVisibility(this.$el.parentElement.scrollTop);
            };

            this.$el.parentElement.addEventListener('scroll', this.scrollListener);
        },
        bindDocumentScrollListener() {
            this.scrollListener = () => {
                this.checkVisibility(utils.DomHandler.getWindowScrollTop());
            };

            window.addEventListener('scroll', this.scrollListener);
        },
        unbindParentScrollListener() {
            if (this.scrollListener) {
                this.$el.parentElement.removeEventListener('scroll', this.scrollListener);
                this.scrollListener = null;
            }
        },
        unbindDocumentScrollListener() {
            if (this.scrollListener) {
                window.removeEventListener('scroll', this.scrollListener);
                this.scrollListener = null;
            }
        },
        onEnter(el) {
            utils.ZIndexUtils.set('overlay', el, this.$primevue.config.zIndex.overlay);
        },
        onAfterLeave(el) {
            utils.ZIndexUtils.clear(el);
        },
        containerRef(el) {
            this.container = el;
        }
    },
    computed: {
        containerClass() {
            return ['p-scrolltop p-link p-component', { 'p-scrolltop-sticky': this.target !== 'window' }];
        },
        scrollTopAriaLabel() {
            return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.scrollTop : undefined;
        }
    },
    components: {
        ChevronUpIcon: ChevronUpIcon__default["default"]
    }
};

const _hoisted_1 = ["aria-label"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock(vue.Transition, {
    name: "p-scrolltop",
    appear: "",
    onEnter: $options.onEnter,
    onAfterLeave: $options.onAfterLeave
  }, {
    default: vue.withCtx(() => [
      ($data.visible)
        ? (vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
            key: 0,
            ref: $options.containerRef,
            class: $options.containerClass,
            onClick: _cache[0] || (_cache[0] = (...args) => ($options.onClick && $options.onClick(...args))),
            type: "button",
            "aria-label": $options.scrollTopAriaLabel
          }, _ctx.ptm('root')), [
            vue.renderSlot(_ctx.$slots, "icon", {}, () => [
              (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.icon ? 'span' : 'ChevronUpIcon'), vue.mergeProps({
                class: ['p-scrolltop-icon', $props.icon]
              }, _ctx.ptm('icon')), null, 16, ["class"]))
            ])
          ], 16, _hoisted_1))
        : vue.createCommentVNode("", true)
    ]),
    _: 3
  }, 8, ["onEnter", "onAfterLeave"]))
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

var css_248z = "\n.p-scrolltop {\r\n    position: fixed;\r\n    bottom: 20px;\r\n    right: 20px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\n}\n.p-scrolltop-sticky {\r\n    position: sticky;\n}\n.p-scrolltop-sticky.p-link {\r\n    margin-left: auto;\n}\n.p-scrolltop-enter-from {\r\n    opacity: 0;\n}\n.p-scrolltop-enter-active {\r\n    transition: opacity 0.15s;\n}\n.p-scrolltop.p-scrolltop-leave-to {\r\n    opacity: 0;\n}\n.p-scrolltop-leave-active {\r\n    transition: opacity 0.15s;\n}\r\n";
styleInject(css_248z);

script.render = render;

module.exports = script;
