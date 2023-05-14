import BaseComponent from 'primevue/basecomponent';
import ChevronRightIcon from 'primevue/icons/chevronright';
import { resolveComponent, openBlock, createElementBlock, mergeProps, Fragment, createBlock, withCtx, createElementVNode, resolveDynamicComponent, createCommentVNode, toDisplayString, renderList, renderSlot, createVNode } from 'vue';

var script$1 = {
    name: 'BreadcrumbItem',
    extends: BaseComponent,
    props: {
        item: null,
        templates: null,
        exact: null,
        index: null
    },
    methods: {
        onClick(event, navigate) {
            if (this.item.command) {
                this.item.command({
                    originalEvent: event,
                    item: this.item
                });
            }

            if (this.item.to && navigate) {
                navigate(event);
            }
        },
        containerClass() {
            return ['p-menuitem', { 'p-disabled': this.disabled() }, this.item.class];
        },
        linkClass(routerProps) {
            return [
                'p-menuitem-link',
                {
                    'router-link-active': routerProps && routerProps.isActive,
                    'router-link-active-exact': this.exact && routerProps && routerProps.isExactActive
                }
            ];
        },
        visible() {
            return typeof this.item.visible === 'function' ? this.item.visible() : this.item.visible !== false;
        },
        disabled() {
            return typeof this.item.disabled === 'function' ? this.item.disabled() : this.item.disabled;
        },
        label() {
            return typeof this.item.label === 'function' ? this.item.label() : this.item.label;
        },
        isCurrentUrl() {
            const { to, url } = this.item;
            let lastPath = this.$router ? this.$router.currentRoute.path : '';

            return to === lastPath || url === lastPath ? 'page' : undefined;
        }
    }
};

const _hoisted_1 = ["href", "aria-current", "onClick"];
const _hoisted_2 = ["href", "target", "aria-current"];

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");

  return ($options.visible())
    ? (openBlock(), createElementBlock("li", mergeProps({
        key: 0,
        class: $options.containerClass()
      }, _ctx.ptm('menuitem')), [
        (!$props.templates || !$props.templates.item)
          ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              ($props.item.to)
                ? (openBlock(), createBlock(_component_router_link, {
                    key: 0,
                    to: $props.item.to,
                    custom: ""
                  }, {
                    default: withCtx(({ navigate, href, isActive, isExactActive }) => [
                      createElementVNode("a", mergeProps({
                        href: href,
                        class: $options.linkClass({ isActive, isExactActive }),
                        "aria-current": $options.isCurrentUrl(),
                        onClick: $event => ($options.onClick($event, navigate))
                      }, _ctx.ptm('action')), [
                        ($props.templates.itemicon)
                          ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.itemicon), {
                              key: 0,
                              item: $props.item,
                              class: "p-menuitem-icon"
                            }, null, 8, ["item"]))
                          : ($props.item.icon)
                            ? (openBlock(), createElementBlock("span", mergeProps({
                                key: 1,
                                class: ['p-menuitem-icon', $props.item.icon]
                              }, _ctx.ptm('icon')), null, 16))
                            : createCommentVNode("", true),
                        ($props.item.label)
                          ? (openBlock(), createElementBlock("span", mergeProps({
                              key: 2,
                              class: "p-menuitem-text"
                            }, _ctx.ptm('label')), toDisplayString($options.label()), 17))
                          : createCommentVNode("", true)
                      ], 16, _hoisted_1)
                    ]),
                    _: 1
                  }, 8, ["to"]))
                : (openBlock(), createElementBlock("a", mergeProps({
                    key: 1,
                    href: $props.item.url || '#',
                    class: $options.linkClass(),
                    target: $props.item.target,
                    "aria-current": $options.isCurrentUrl(),
                    onClick: _cache[0] || (_cache[0] = (...args) => ($options.onClick && $options.onClick(...args)))
                  }, _ctx.ptm('action')), [
                    ($props.templates && $props.templates.itemicon)
                      ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.itemicon), {
                          key: 0,
                          item: $props.item,
                          class: "p-menuitem-icon"
                        }, null, 8, ["item"]))
                      : ($props.item.icon)
                        ? (openBlock(), createElementBlock("span", mergeProps({
                            key: 1,
                            class: ['p-menuitem-icon', $props.item.icon]
                          }, _ctx.ptm('icon')), null, 16))
                        : createCommentVNode("", true),
                    ($props.item.label)
                      ? (openBlock(), createElementBlock("span", mergeProps({
                          key: 2,
                          class: "p-menuitem-text"
                        }, _ctx.ptm('label')), toDisplayString($options.label()), 17))
                      : createCommentVNode("", true)
                  ], 16, _hoisted_2))
            ], 64))
          : (openBlock(), createBlock(resolveDynamicComponent($props.templates.item), {
              key: 1,
              item: $props.item
            }, null, 8, ["item"]))
      ], 16))
    : createCommentVNode("", true)
}

script$1.render = render$1;

var script = {
    name: 'Breadcrumb',
    extends: BaseComponent,
    props: {
        model: {
            type: Array,
            default: null
        },
        home: {
            type: null,
            default: null
        },
        exact: {
            type: Boolean,
            default: true
        }
    },
    components: {
        BreadcrumbItem: script$1,
        ChevronRightIcon: ChevronRightIcon
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_BreadcrumbItem = resolveComponent("BreadcrumbItem");
  const _component_ChevronRightIcon = resolveComponent("ChevronRightIcon");

  return (openBlock(), createElementBlock("nav", mergeProps({ class: "p-breadcrumb p-component" }, _ctx.ptm('root')), [
    createElementVNode("ol", mergeProps({ class: "p-breadcrumb-list" }, _ctx.ptm('menu')), [
      ($props.home)
        ? (openBlock(), createBlock(_component_BreadcrumbItem, {
            key: 0,
            item: $props.home,
            class: "p-breadcrumb-home",
            templates: _ctx.$slots,
            exact: $props.exact,
            pt: _ctx.pt
          }, null, 8, ["item", "templates", "exact", "pt"]))
        : createCommentVNode("", true),
      (openBlock(true), createElementBlock(Fragment, null, renderList($props.model, (item, i) => {
        return (openBlock(), createElementBlock(Fragment, {
          key: item.label
        }, [
          ($props.home || i !== 0)
            ? (openBlock(), createElementBlock("li", mergeProps({
                key: 0,
                class: "p-menuitem-separator"
              }, _ctx.ptm('separator')), [
                renderSlot(_ctx.$slots, "separator", {}, () => [
                  createVNode(_component_ChevronRightIcon, mergeProps({ "aria-hidden": "true" }, _ctx.ptm('separatorIcon')), null, 16)
                ])
              ], 16))
            : createCommentVNode("", true),
          createVNode(_component_BreadcrumbItem, {
            item: item,
            index: i,
            templates: _ctx.$slots,
            exact: $props.exact,
            pt: _ctx.pt
          }, null, 8, ["item", "index", "templates", "exact", "pt"])
        ], 64))
      }), 128))
    ], 16)
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

var css_248z = "\n.p-breadcrumb {\r\n    overflow-x: auto;\n}\n.p-breadcrumb .p-breadcrumb-list {\r\n    margin: 0;\r\n    padding: 0;\r\n    list-style-type: none;\r\n    display: flex;\r\n    align-items: center;\r\n    flex-wrap: nowrap;\n}\n.p-breadcrumb .p-menuitem-text {\r\n    line-height: 1;\n}\n.p-breadcrumb .p-menuitem-link {\r\n    text-decoration: none;\r\n    display: flex;\r\n    align-items: center;\n}\n.p-breadcrumb .p-menuitem-separator {\r\n    display: flex;\r\n    align-items: center;\n}\n.p-breadcrumb::-webkit-scrollbar {\r\n    display: none;\n}\r\n";
styleInject(css_248z);

script.render = render;

export { script as default };
