'use strict';

var BaseComponent = require('primevue/basecomponent');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

var script = {
    name: 'ProgressSpinner',
    extends: BaseComponent__default["default"],
    props: {
        strokeWidth: {
            type: String,
            default: '2'
        },
        fill: {
            type: String,
            default: 'none'
        },
        animationDuration: {
            type: String,
            default: '2s'
        }
    },
    computed: {
        svgStyle() {
            return {
                'animation-duration': this.animationDuration
            };
        }
    }
};

const _hoisted_1 = ["fill", "stroke-width"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    class: "p-progress-spinner",
    role: "progressbar"
  }, _ctx.ptm('root')), [
    (vue.openBlock(), vue.createElementBlock("svg", vue.mergeProps({
      class: "p-progress-spinner-svg",
      viewBox: "25 25 50 50",
      style: $options.svgStyle
    }, _ctx.ptm('spinner')), [
      vue.createElementVNode("circle", vue.mergeProps({
        class: "p-progress-spinner-circle",
        cx: "50",
        cy: "50",
        r: "20",
        fill: $props.fill,
        "stroke-width": $props.strokeWidth,
        strokeMiterlimit: "10"
      }, _ctx.ptm('circle')), null, 16, _hoisted_1)
    ], 16))
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

var css_248z = "\n.p-progress-spinner {\r\n    position: relative;\r\n    margin: 0 auto;\r\n    width: 100px;\r\n    height: 100px;\r\n    display: inline-block;\n}\n.p-progress-spinner::before {\r\n    content: '';\r\n    display: block;\r\n    padding-top: 100%;\n}\n.p-progress-spinner-svg {\r\n    height: 100%;\r\n    transform-origin: center center;\r\n    width: 100%;\r\n    position: absolute;\r\n    top: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    right: 0;\r\n    margin: auto;\n}\r\n";
styleInject(css_248z);

script.render = render;

module.exports = script;
