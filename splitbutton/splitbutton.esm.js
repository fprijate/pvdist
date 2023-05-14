import BaseComponent from 'primevue/basecomponent';
import Button from 'primevue/button';
import ChevronDownIcon from 'primevue/icons/chevrondown';
import TieredMenu from 'primevue/tieredmenu';
import { UniqueComponentId } from 'primevue/utils';
import { resolveComponent, openBlock, createElementBlock, mergeProps, renderSlot, createVNode, withCtx, createElementVNode, createBlock, resolveDynamicComponent } from 'vue';

var script = {
    name: 'SplitButton',
    extends: BaseComponent,
    emits: ['click'],
    props: {
        label: {
            type: String,
            default: null
        },
        icon: {
            type: String,
            default: null
        },
        model: {
            type: Array,
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
        disabled: {
            type: Boolean,
            default: false
        },
        class: {
            type: null,
            default: null
        },
        style: {
            type: null,
            default: null
        },
        buttonProps: {
            type: null,
            default: null
        },
        menuButtonProps: {
            type: null,
            default: null
        },
        menuButtonIcon: {
            type: String,
            default: undefined
        },
        severity: {
            type: String,
            default: null
        },
        raised: {
            type: Boolean,
            default: false
        },
        rounded: {
            type: Boolean,
            default: false
        },
        text: {
            type: Boolean,
            default: false
        },
        outlined: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: null
        },
        plain: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isExpanded: false
        };
    },
    methods: {
        onDropdownButtonClick() {
            this.$refs.menu.toggle({ currentTarget: this.$el, relatedTarget: this.$refs.button.$el });
            this.isExpanded = !this.$refs.menu.visible;
        },
        onDropdownKeydown(event) {
            if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
                this.onDropdownButtonClick();
                event.preventDefault();
            }
        },
        onDefaultButtonClick(event) {
            if (this.isExpanded) {
                this.$refs.menu.hide(event);
            }

            this.$emit('click', event);
        }
    },
    computed: {
        ariaId() {
            return UniqueComponentId();
        },
        containerClass() {
            return [
                'p-splitbutton p-component',
                this.class,
                {
                    [`p-button-${this.severity}`]: this.severity,
                    'p-button-raised': this.raised,
                    'p-button-rounded': this.rounded,
                    'p-button-text': this.text,
                    'p-button-outlined': this.outlined,
                    'p-button-sm': this.size === 'small',
                    'p-button-lg': this.size === 'large'
                }
            ];
        }
    },
    components: {
        PVSButton: Button,
        PVSMenu: TieredMenu,
        ChevronDownIcon: ChevronDownIcon
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_PVSButton = resolveComponent("PVSButton");
  const _component_PVSMenu = resolveComponent("PVSMenu");

  return (openBlock(), createElementBlock("div", mergeProps({
    class: $options.containerClass,
    style: $props.style
  }, _ctx.ptm('root')), [
    renderSlot(_ctx.$slots, "default", {}, () => [
      createVNode(_component_PVSButton, mergeProps({
        type: "button",
        class: "p-splitbutton-defaultbutton",
        label: $props.label,
        disabled: $props.disabled,
        "aria-label": $props.label,
        onClick: $options.onDefaultButtonClick,
        pt: _ctx.ptm('button')
      }, $props.buttonProps), {
        icon: withCtx((slotProps) => [
          renderSlot(_ctx.$slots, "icon", {}, () => [
            createElementVNode("span", mergeProps({
              class: [$props.icon, slotProps.class]
            }, _ctx.ptm('button')['icon']), null, 16)
          ])
        ]),
        _: 3
      }, 16, ["label", "disabled", "aria-label", "onClick", "pt"])
    ]),
    createVNode(_component_PVSButton, mergeProps({
      ref: "button",
      type: "button",
      class: "p-splitbutton-menubutton",
      disabled: $props.disabled,
      "aria-haspopup": "true",
      "aria-expanded": $data.isExpanded,
      "aria-controls": $options.ariaId + '_overlay',
      onClick: $options.onDropdownButtonClick,
      onKeydown: $options.onDropdownKeydown,
      pt: _ctx.ptm('menuButton')
    }, $props.menuButtonProps), {
      icon: withCtx((slotProps) => [
        renderSlot(_ctx.$slots, "menubuttonicon", {}, () => [
          (openBlock(), createBlock(resolveDynamicComponent($props.menuButtonIcon ? 'span' : 'ChevronDownIcon'), mergeProps({
            class: [$props.menuButtonIcon, slotProps.class]
          }, _ctx.ptm('menuButton')['icon']), null, 16, ["class"]))
        ])
      ]),
      _: 3
    }, 16, ["disabled", "aria-expanded", "aria-controls", "onClick", "onKeydown", "pt"]),
    createVNode(_component_PVSMenu, {
      ref: "menu",
      id: $options.ariaId + '_overlay',
      model: $props.model,
      popup: true,
      autoZIndex: $props.autoZIndex,
      baseZIndex: $props.baseZIndex,
      appendTo: $props.appendTo,
      pt: _ctx.ptm('menu')
    }, null, 8, ["id", "model", "autoZIndex", "baseZIndex", "appendTo", "pt"])
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

var css_248z = "\n.p-splitbutton[data-v-2f543b21] {\r\n    display: inline-flex;\r\n    position: relative;\n}\n.p-splitbutton .p-splitbutton-defaultbutton[data-v-2f543b21],\r\n.p-splitbutton.p-button-rounded > .p-splitbutton-defaultbutton.p-button[data-v-2f543b21],\r\n.p-splitbutton.p-button-outlined > .p-splitbutton-defaultbutton.p-button[data-v-2f543b21] {\r\n    flex: 1 1 auto;\r\n    border-top-right-radius: 0;\r\n    border-bottom-right-radius: 0;\r\n    border-right: 0 none;\n}\n.p-splitbutton-menubutton[data-v-2f543b21],\r\n.p-splitbutton.p-button-rounded > .p-splitbutton-menubutton.p-button[data-v-2f543b21],\r\n.p-splitbutton.p-button-outlined > .p-splitbutton-menubutton.p-button[data-v-2f543b21] {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    border-top-left-radius: 0;\r\n    border-bottom-left-radius: 0;\n}\n.p-splitbutton .p-menu[data-v-2f543b21] {\r\n    min-width: 100%;\n}\n.p-fluid .p-splitbutton[data-v-2f543b21] {\r\n    display: flex;\n}\r\n";
styleInject(css_248z);

script.render = render;
script.__scopeId = "data-v-2f543b21";

export { script as default };
