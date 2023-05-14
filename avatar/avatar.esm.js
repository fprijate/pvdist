import BaseComponent from 'primevue/basecomponent';
import { openBlock, createElementBlock, mergeProps, renderSlot, toDisplayString, createBlock, resolveDynamicComponent, createCommentVNode } from 'vue';

var script = {
    name: 'Avatar',
    extends: BaseComponent,
    emits: ['error'],
    props: {
        label: {
            type: String,
            default: null
        },
        icon: {
            type: String,
            default: null
        },
        image: {
            type: String,
            default: null
        },
        size: {
            type: String,
            default: 'normal'
        },
        shape: {
            type: String,
            default: 'square'
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
    methods: {
        onError() {
            this.$emit('error');
        }
    },
    computed: {
        containerClass() {
            return [
                'p-avatar p-component',
                {
                    'p-avatar-image': this.image != null,
                    'p-avatar-circle': this.shape === 'circle',
                    'p-avatar-lg': this.size === 'large',
                    'p-avatar-xl': this.size === 'xlarge'
                }
            ];
        }
    }
};

const _hoisted_1 = ["aria-labelledby", "aria-label"];
const _hoisted_2 = ["src", "alt"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", mergeProps({
    class: $options.containerClass,
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-label": _ctx.ariaLabel
  }, _ctx.ptm('root')), [
    renderSlot(_ctx.$slots, "default", {}, () => [
      ($props.label)
        ? (openBlock(), createElementBlock("span", mergeProps({
            key: 0,
            class: "p-avatar-text"
          }, _ctx.ptm('label')), toDisplayString($props.label), 17))
        : (_ctx.$slots.icon)
          ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.icon), mergeProps({
              key: 1,
              class: "p-avatar-icon"
            }, _ctx.ptm('icon')), null, 16))
          : ($props.icon)
            ? (openBlock(), createElementBlock("span", mergeProps({
                key: 2,
                class: ['p-avatar-icon', $props.icon]
              }, _ctx.ptm('icon')), null, 16))
            : ($props.image)
              ? (openBlock(), createElementBlock("img", mergeProps({
                  key: 3,
                  src: $props.image,
                  alt: _ctx.ariaLabel,
                  onError: _cache[0] || (_cache[0] = (...args) => ($options.onError && $options.onError(...args)))
                }, _ctx.ptm('image')), null, 16, _hoisted_2))
              : createCommentVNode("", true)
    ])
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

var css_248z = "\n.p-avatar {\r\n    display: inline-flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    width: 2rem;\r\n    height: 2rem;\r\n    font-size: 1rem;\n}\n.p-avatar.p-avatar-image {\r\n    background-color: transparent;\n}\n.p-avatar.p-avatar-circle {\r\n    border-radius: 50%;\n}\n.p-avatar-circle img {\r\n    border-radius: 50%;\n}\n.p-avatar .p-avatar-icon {\r\n    font-size: 1rem;\n}\n.p-avatar img {\r\n    width: 100%;\r\n    height: 100%;\n}\r\n";
styleInject(css_248z);

script.render = render;

export { script as default };
