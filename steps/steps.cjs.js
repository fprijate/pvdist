'use strict';

var BaseComponent = require('primevue/basecomponent');
var utils = require('primevue/utils');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

var script = {
    name: 'Steps',
    extends: BaseComponent__default["default"],
    props: {
        id: {
            type: String,
            default: utils.UniqueComponentId()
        },
        model: {
            type: Array,
            default: null
        },
        readonly: {
            type: Boolean,
            default: true
        },
        exact: {
            type: Boolean,
            default: true
        }
    },
    mounted() {
        const firstItem = this.findFirstItem();

        firstItem.tabIndex = '0';
    },
    methods: {
        onItemClick(event, item, navigate) {
            if (this.disabled(item) || this.readonly) {
                event.preventDefault();

                return;
            }

            if (item.command) {
                item.command({
                    originalEvent: event,
                    item: item
                });
            }

            if (item.to && navigate) {
                navigate(event);
            }
        },
        onItemKeydown(event, item, navigate) {
            switch (event.code) {
                case 'ArrowRight': {
                    this.navigateToNextItem(event.target);
                    event.preventDefault();
                    break;
                }

                case 'ArrowLeft': {
                    this.navigateToPrevItem(event.target);
                    event.preventDefault();
                    break;
                }

                case 'Home': {
                    this.navigateToFirstItem(event.target);
                    event.preventDefault();
                    break;
                }

                case 'End': {
                    this.navigateToLastItem(event.target);
                    event.preventDefault();
                    break;
                }

                case 'Tab':
                    //no op
                    break;

                case 'Enter':

                case 'Space': {
                    this.onItemClick(event, item, navigate);
                    event.preventDefault();
                    break;
                }
            }
        },
        navigateToNextItem(target) {
            const nextItem = this.findNextItem(target);

            nextItem && this.setFocusToMenuitem(target, nextItem);
        },
        navigateToPrevItem(target) {
            const prevItem = this.findPrevItem(target);

            prevItem && this.setFocusToMenuitem(target, prevItem);
        },
        navigateToFirstItem(target) {
            const firstItem = this.findFirstItem(target);

            firstItem && this.setFocusToMenuitem(target, firstItem);
        },
        navigateToLastItem(target) {
            const lastItem = this.findLastItem(target);

            lastItem && this.setFocusToMenuitem(target, lastItem);
        },
        findNextItem(item) {
            const nextItem = item.parentElement.nextElementSibling;

            return nextItem ? nextItem.children[0] : null;
        },
        findPrevItem(item) {
            const prevItem = item.parentElement.previousElementSibling;

            return prevItem ? prevItem.children[0] : null;
        },
        findFirstItem() {
            const firstSibling = utils.DomHandler.findSingle(this.$refs.list, '.p-steps-item');

            return firstSibling ? firstSibling.children[0] : null;
        },
        findLastItem() {
            const siblings = utils.DomHandler.find(this.$refs.list, '.p-steps-item');

            return siblings ? siblings[siblings.length - 1].children[0] : null;
        },
        setFocusToMenuitem(target, focusableItem) {
            target.tabIndex = '-1';
            focusableItem.tabIndex = '0';
            focusableItem.focus();
        },
        isActive(item) {
            return item.to ? this.$router.resolve(item.to).path === this.$route.path : false;
        },
        getItemClass(item) {
            return [
                'p-steps-item',
                item.class,
                {
                    'p-highlight p-steps-current': this.isActive(item),
                    'p-disabled': this.isItemDisabled(item)
                }
            ];
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
        isItemDisabled(item) {
            return this.disabled(item) || (this.readonly && !this.isActive(item));
        },
        visible(item) {
            return typeof item.visible === 'function' ? item.visible() : item.visible !== false;
        },
        disabled(item) {
            return typeof item.disabled === 'function' ? item.disabled() : item.disabled;
        },
        label(item) {
            return typeof item.label === 'function' ? item.label() : item.label;
        }
    },
    computed: {
        containerClass() {
            return ['p-steps p-component', { 'p-readonly': this.readonly }];
        }
    }
};

const _hoisted_1 = ["id"];
const _hoisted_2 = ["href", "aria-current", "onClick", "onKeydown"];
const _hoisted_3 = ["onKeydown"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = vue.resolveComponent("router-link");

  return (vue.openBlock(), vue.createElementBlock("nav", vue.mergeProps({
    id: $props.id,
    class: $options.containerClass
  }, _ctx.ptm('root')), [
    vue.createElementVNode("ol", vue.mergeProps({
      ref: "list",
      class: "p-steps-list"
    }, _ctx.ptm('menu')), [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.model, (item, index) => {
        return (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
          key: item.to
        }, [
          ($options.visible(item))
            ? (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
                key: 0,
                class: $options.getItemClass(item),
                style: item.style
              }, _ctx.ptm('menuitem')), [
                (!_ctx.$slots.item)
                  ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                      (!$options.isItemDisabled(item))
                        ? (vue.openBlock(), vue.createBlock(_component_router_link, {
                            key: 0,
                            to: item.to,
                            custom: ""
                          }, {
                            default: vue.withCtx(({ navigate, href, isActive, isExactActive }) => [
                              vue.createElementVNode("a", vue.mergeProps({
                                href: href,
                                class: $options.linkClass({ isActive, isExactActive }),
                                tabindex: -1,
                                "aria-current": isExactActive ? 'step' : undefined,
                                onClick: $event => ($options.onItemClick($event, item, navigate)),
                                onKeydown: $event => ($options.onItemKeydown($event, item, navigate))
                              }, _ctx.ptm('action')), [
                                vue.createElementVNode("span", vue.mergeProps({ class: "p-steps-number" }, _ctx.ptm('step')), vue.toDisplayString(index + 1), 17),
                                vue.createElementVNode("span", vue.mergeProps({ class: "p-steps-title" }, _ctx.ptm('label')), vue.toDisplayString($options.label(item)), 17)
                              ], 16, _hoisted_2)
                            ]),
                            _: 2
                          }, 1032, ["to"]))
                        : (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
                            key: 1,
                            class: $options.linkClass(),
                            onKeydown: $event => ($options.onItemKeydown($event, item))
                          }, _ctx.ptm('action')), [
                            vue.createElementVNode("span", vue.mergeProps({ class: "p-steps-number" }, _ctx.ptm('step')), vue.toDisplayString(index + 1), 17),
                            vue.createElementVNode("span", vue.mergeProps({ class: "p-steps-title" }, _ctx.ptm('label')), vue.toDisplayString($options.label(item)), 17)
                          ], 16, _hoisted_3))
                    ], 64))
                  : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$slots.item), {
                      key: 1,
                      item: item
                    }, null, 8, ["item"]))
              ], 16))
            : vue.createCommentVNode("", true)
        ], 64))
      }), 128))
    ], 16)
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

var css_248z = "\n.p-steps {\r\n    position: relative;\n}\n.p-steps .p-steps-list {\r\n    padding: 0;\r\n    margin: 0;\r\n    list-style-type: none;\r\n    display: flex;\n}\n.p-steps-item {\r\n    position: relative;\r\n    display: flex;\r\n    justify-content: center;\r\n    flex: 1 1 auto;\n}\n.p-steps-item .p-menuitem-link {\r\n    display: inline-flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    overflow: hidden;\r\n    text-decoration: none;\n}\n.p-steps.p-steps-readonly .p-steps-item {\r\n    cursor: auto;\n}\n.p-steps-item.p-steps-current .p-menuitem-link {\r\n    cursor: default;\n}\n.p-steps-title {\r\n    white-space: nowrap;\n}\n.p-steps-number {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\n}\n.p-steps-title {\r\n    display: block;\n}\r\n";
styleInject(css_248z);

script.render = render;

module.exports = script;
