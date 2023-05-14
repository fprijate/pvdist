'use strict';

var BaseComponent = require('primevue/basecomponent');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

var script = {
    name: 'Divider',
    extends: BaseComponent__default["default"],
    props: {
        align: {
            type: String,
            default: null
        },
        layout: {
            type: String,
            default: 'horizontal'
        },
        type: {
            type: String,
            default: 'solid'
        }
    },
    computed: {
        containerClass() {
            return [
                'p-divider p-component',
                'p-divider-' + this.layout,
                'p-divider-' + this.type,
                { 'p-divider-left': this.layout === 'horizontal' && (!this.align || this.align === 'left') },
                { 'p-divider-center': this.layout === 'horizontal' && this.align === 'center' },
                { 'p-divider-right': this.layout === 'horizontal' && this.align === 'right' },
                { 'p-divider-top': this.layout === 'vertical' && this.align === 'top' },
                { 'p-divider-center': this.layout === 'vertical' && (!this.align || this.align === 'center') },
                { 'p-divider-bottom': this.layout === 'vertical' && this.align === 'bottom' }
            ];
        }
    }
};

const _hoisted_1 = ["aria-orientation"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    class: $options.containerClass,
    role: "separator",
    "aria-orientation": $props.layout
  }, _ctx.ptm('root')), [
    (_ctx.$slots.default)
      ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
          key: 0,
          class: "p-divider-content"
        }, _ctx.ptm('content')), [
          vue.renderSlot(_ctx.$slots, "default")
        ], 16))
      : vue.createCommentVNode("", true)
  ], 16, _hoisted_1))
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

var css_248z = "\n.p-divider-horizontal {\r\n    display: flex;\r\n    width: 100%;\r\n    position: relative;\r\n    align-items: center;\n}\n.p-divider-horizontal:before {\r\n    position: absolute;\r\n    display: block;\r\n    top: 50%;\r\n    left: 0;\r\n    width: 100%;\r\n    content: '';\n}\n.p-divider-horizontal.p-divider-left {\r\n    justify-content: flex-start;\n}\n.p-divider-horizontal.p-divider-right {\r\n    justify-content: flex-end;\n}\n.p-divider-horizontal.p-divider-center {\r\n    justify-content: center;\n}\n.p-divider-content {\r\n    z-index: 1;\n}\n.p-divider-vertical {\r\n    min-height: 100%;\r\n    margin: 0 1rem;\r\n    display: flex;\r\n    position: relative;\r\n    justify-content: center;\n}\n.p-divider-vertical:before {\r\n    position: absolute;\r\n    display: block;\r\n    top: 0;\r\n    left: 50%;\r\n    height: 100%;\r\n    content: '';\n}\n.p-divider-vertical.p-divider-top {\r\n    align-items: flex-start;\n}\n.p-divider-vertical.p-divider-center {\r\n    align-items: center;\n}\n.p-divider-vertical.p-divider-bottom {\r\n    align-items: flex-end;\n}\n.p-divider-solid.p-divider-horizontal:before {\r\n    border-top-style: solid;\n}\n.p-divider-solid.p-divider-vertical:before {\r\n    border-left-style: solid;\n}\n.p-divider-dashed.p-divider-horizontal:before {\r\n    border-top-style: dashed;\n}\n.p-divider-dashed.p-divider-vertical:before {\r\n    border-left-style: dashed;\n}\n.p-divider-dotted.p-divider-horizontal:before {\r\n    border-top-style: dotted;\n}\n.p-divider-dotted.p-divider-vertical:before {\r\n    border-left-style: dotted;\n}\r\n";
styleInject(css_248z);

script.render = render;

module.exports = script;
