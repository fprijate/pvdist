import BaseComponent from 'primevue/basecomponent';
import { openBlock, createElementBlock, mergeProps } from 'vue';

var script = {
    name: 'Skeleton',
    extends: BaseComponent,
    props: {
        shape: {
            type: String,
            default: 'rectangle'
        },
        size: {
            type: String,
            default: null
        },
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '1rem'
        },
        borderRadius: {
            type: String,
            default: null
        },
        animation: {
            type: String,
            default: 'wave'
        }
    },
    computed: {
        containerClass() {
            return [
                'p-skeleton p-component',
                {
                    'p-skeleton-circle': this.shape === 'circle',
                    'p-skeleton-none': this.animation === 'none'
                }
            ];
        },
        containerStyle() {
            if (this.size) return { width: this.size, height: this.size, borderRadius: this.borderRadius };
            else return { width: this.width, height: this.height, borderRadius: this.borderRadius };
        }
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", mergeProps({
    style: $options.containerStyle,
    class: $options.containerClass,
    "aria-hidden": "true"
  }, _ctx.ptm('root')), null, 16))
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

var css_248z = "\n.p-skeleton {\r\n    position: relative;\r\n    overflow: hidden;\n}\n.p-skeleton::after {\r\n    content: '';\r\n    animation: p-skeleton-animation 1.2s infinite;\r\n    height: 100%;\r\n    left: 0;\r\n    position: absolute;\r\n    right: 0;\r\n    top: 0;\r\n    transform: translateX(-100%);\r\n    z-index: 1;\n}\n.p-skeleton.p-skeleton-circle {\r\n    border-radius: 50%;\n}\n.p-skeleton-none::after {\r\n    animation: none;\n}\n@keyframes p-skeleton-animation {\nfrom {\r\n        transform: translateX(-100%);\n}\nto {\r\n        transform: translateX(100%);\n}\n}\r\n";
styleInject(css_248z);

script.render = render;

export { script as default };
