import BaseComponent from 'primevue/basecomponent';
import { openBlock, createElementBlock, mergeProps, renderSlot } from 'vue';

var script = {
    name: 'AvatarGroup',
    extends: BaseComponent
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", mergeProps({ class: "p-avatar-group p-component" }, _ctx.ptm('root')), [
    renderSlot(_ctx.$slots, "default")
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

var css_248z = "\n.p-avatar-group .p-avatar + .p-avatar {\r\n    margin-left: -1rem;\n}\n.p-avatar-group {\r\n    display: flex;\r\n    align-items: center;\n}\r\n";
styleInject(css_248z);

script.render = render;

export { script as default };
