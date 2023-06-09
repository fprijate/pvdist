import BaseComponent from 'primevue/basecomponent';
import MinusIcon from 'primevue/icons/minus';
import PlusIcon from 'primevue/icons/plus';
import Ripple from 'primevue/ripple';
import { UniqueComponentId } from 'primevue/utils';
import { resolveDirective, openBlock, createElementBlock, mergeProps, createElementVNode, renderSlot, toDisplayString, createCommentVNode, withDirectives, createBlock, resolveDynamicComponent, normalizeProps, guardReactiveProps, createVNode, Transition, withCtx, vShow } from 'vue';

var script = {
    name: 'Panel',
    extends: BaseComponent,
    emits: ['update:collapsed', 'toggle'],
    props: {
        header: String,
        toggleable: Boolean,
        collapsed: Boolean,
        toggleButtonProps: {
            type: null,
            default: null
        }
    },
    data() {
        return {
            d_collapsed: this.collapsed
        };
    },
    watch: {
        collapsed(newValue) {
            this.d_collapsed = newValue;
        }
    },
    methods: {
        toggle(event) {
            this.d_collapsed = !this.d_collapsed;
            this.$emit('update:collapsed', this.d_collapsed);
            this.$emit('toggle', {
                originalEvent: event,
                value: this.d_collapsed
            });
        },
        onKeyDown(event) {
            if (event.code === 'Enter' || event.code === 'Space') {
                this.toggle(event);
                event.preventDefault();
            }
        }
    },
    computed: {
        ariaId() {
            return UniqueComponentId();
        },
        containerClass() {
            return ['p-panel p-component', { 'p-panel-toggleable': this.toggleable }];
        },
        buttonAriaLabel() {
            return this.toggleButtonProps && this.toggleButtonProps['aria-label'] ? this.toggleButtonProps['aria-label'] : this.header;
        }
    },
    components: {
        PlusIcon,
        MinusIcon
    },
    directives: {
        ripple: Ripple
    }
};

const _hoisted_1 = ["id"];
const _hoisted_2 = ["id", "aria-label", "aria-controls", "aria-expanded"];
const _hoisted_3 = ["id", "aria-labelledby"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_ripple = resolveDirective("ripple");

  return (openBlock(), createElementBlock("div", mergeProps({ class: $options.containerClass }, _ctx.ptm('root')), [
    createElementVNode("div", mergeProps({ class: "p-panel-header" }, _ctx.ptm('header')), [
      renderSlot(_ctx.$slots, "header", {
        id: $options.ariaId + '_header',
        class: "p-panel-title"
      }, () => [
        ($props.header)
          ? (openBlock(), createElementBlock("span", mergeProps({
              key: 0,
              id: $options.ariaId + '_header',
              class: "p-panel-title"
            }, _ctx.ptm('title')), toDisplayString($props.header), 17, _hoisted_1))
          : createCommentVNode("", true)
      ]),
      createElementVNode("div", mergeProps({ class: "p-panel-icons" }, _ctx.ptm('icons')), [
        renderSlot(_ctx.$slots, "icons"),
        ($props.toggleable)
          ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
              key: 0,
              id: $options.ariaId + '_header',
              type: "button",
              role: "button",
              class: "p-panel-header-icon p-panel-toggler p-link",
              "aria-label": $options.buttonAriaLabel,
              "aria-controls": $options.ariaId + '_content',
              "aria-expanded": !$data.d_collapsed,
              onClick: _cache[0] || (_cache[0] = (...args) => ($options.toggle && $options.toggle(...args))),
              onKeydown: _cache[1] || (_cache[1] = (...args) => ($options.onKeyDown && $options.onKeyDown(...args)))
            }, { ...$props.toggleButtonProps, ..._ctx.ptm('toggler') }), [
              renderSlot(_ctx.$slots, "togglericon", { collapsed: $data.d_collapsed }, () => [
                (openBlock(), createBlock(resolveDynamicComponent($data.d_collapsed ? 'PlusIcon' : 'MinusIcon'), normalizeProps(guardReactiveProps(_ctx.ptm('togglericon'))), null, 16))
              ])
            ], 16, _hoisted_2)), [
              [_directive_ripple]
            ])
          : createCommentVNode("", true)
      ], 16)
    ], 16),
    createVNode(Transition, { name: "p-toggleable-content" }, {
      default: withCtx(() => [
        withDirectives(createElementVNode("div", mergeProps({
          id: $options.ariaId + '_content',
          class: "p-toggleable-content",
          role: "region",
          "aria-labelledby": $options.ariaId + '_header'
        }, _ctx.ptm('toggleablecontent')), [
          createElementVNode("div", mergeProps({ class: "p-panel-content" }, _ctx.ptm('content')), [
            renderSlot(_ctx.$slots, "default")
          ], 16),
          (_ctx.$slots.footer)
            ? (openBlock(), createElementBlock("div", mergeProps({
                key: 0,
                class: "p-panel-footer"
              }, _ctx.ptm('footer')), [
                renderSlot(_ctx.$slots, "footer")
              ], 16))
            : createCommentVNode("", true)
        ], 16, _hoisted_3), [
          [vShow, !$data.d_collapsed]
        ])
      ]),
      _: 3
    })
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

var css_248z = "\n.p-panel-header {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\n}\n.p-panel-title {\r\n    line-height: 1;\n}\n.p-panel-header-icon {\r\n    display: inline-flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    cursor: pointer;\r\n    text-decoration: none;\r\n    overflow: hidden;\r\n    position: relative;\n}\r\n";
styleInject(css_248z);

script.render = render;

export { script as default };
