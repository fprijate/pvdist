import BaseComponent from 'primevue/basecomponent';
import { ObjectUtils } from 'primevue/utils';
import { openBlock, createElementBlock, mergeProps, Fragment, renderList, createElementVNode, renderSlot, createCommentVNode } from 'vue';

var script = {
    name: 'Timeline',
    extends: BaseComponent,
    props: {
        value: null,
        align: {
            mode: String,
            default: 'left'
        },
        layout: {
            mode: String,
            default: 'vertical'
        },
        dataKey: null
    },
    methods: {
        getKey(item, index) {
            return this.dataKey ? ObjectUtils.resolveFieldData(item, this.dataKey) : index;
        }
    },
    computed: {
        containerClass() {
            return ['p-timeline p-component', 'p-timeline-' + this.align, 'p-timeline-' + this.layout];
        }
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", mergeProps({ class: $options.containerClass }, _ctx.ptm('root')), [
    (openBlock(true), createElementBlock(Fragment, null, renderList($props.value, (item, index) => {
      return (openBlock(), createElementBlock("div", mergeProps({
        key: $options.getKey(item, index),
        class: "p-timeline-event"
      }, _ctx.ptm('event')), [
        createElementVNode("div", mergeProps({ class: "p-timeline-event-opposite" }, _ctx.ptm('opposite')), [
          renderSlot(_ctx.$slots, "opposite", {
            item: item,
            index: index
          })
        ], 16),
        createElementVNode("div", mergeProps({ class: "p-timeline-event-separator" }, _ctx.ptm('separator')), [
          renderSlot(_ctx.$slots, "marker", {
            item: item,
            index: index
          }, () => [
            createElementVNode("div", mergeProps({ class: "p-timeline-event-marker" }, _ctx.ptm('marker')), null, 16)
          ]),
          (index !== $props.value.length - 1)
            ? renderSlot(_ctx.$slots, "connector", {
                key: 0,
                item: item,
                index: index
              }, () => [
                createElementVNode("div", mergeProps({ class: "p-timeline-event-connector" }, _ctx.ptm('connector')), null, 16)
              ])
            : createCommentVNode("", true)
        ], 16),
        createElementVNode("div", mergeProps({ class: "p-timeline-event-content" }, _ctx.ptm('content')), [
          renderSlot(_ctx.$slots, "content", {
            item: item,
            index: index
          })
        ], 16)
      ], 16))
    }), 128))
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

var css_248z = "\n.p-timeline {\r\n    display: flex;\r\n    flex-grow: 1;\r\n    flex-direction: column;\n}\n.p-timeline-left .p-timeline-event-opposite {\r\n    text-align: right;\n}\n.p-timeline-left .p-timeline-event-content {\r\n    text-align: left;\n}\n.p-timeline-right .p-timeline-event {\r\n    flex-direction: row-reverse;\n}\n.p-timeline-right .p-timeline-event-opposite {\r\n    text-align: left;\n}\n.p-timeline-right .p-timeline-event-content {\r\n    text-align: right;\n}\n.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) {\r\n    flex-direction: row-reverse;\n}\n.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(odd) .p-timeline-event-opposite {\r\n    text-align: right;\n}\n.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(odd) .p-timeline-event-content {\r\n    text-align: left;\n}\n.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) .p-timeline-event-opposite {\r\n    text-align: left;\n}\n.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) .p-timeline-event-content {\r\n    text-align: right;\n}\n.p-timeline-event {\r\n    display: flex;\r\n    position: relative;\r\n    min-height: 70px;\n}\n.p-timeline-event:last-child {\r\n    min-height: 0;\n}\n.p-timeline-event-opposite {\r\n    flex: 1;\r\n    padding: 0 1rem;\n}\n.p-timeline-event-content {\r\n    flex: 1;\r\n    padding: 0 1rem;\n}\n.p-timeline-event-separator {\r\n    flex: 0;\r\n    display: flex;\r\n    align-items: center;\r\n    flex-direction: column;\n}\n.p-timeline-event-marker {\r\n    display: flex;\r\n    align-self: baseline;\n}\n.p-timeline-event-connector {\r\n    flex-grow: 1;\n}\n.p-timeline-horizontal {\r\n    flex-direction: row;\n}\n.p-timeline-horizontal .p-timeline-event {\r\n    flex-direction: column;\r\n    flex: 1;\n}\n.p-timeline-horizontal .p-timeline-event:last-child {\r\n    flex: 0;\n}\n.p-timeline-horizontal .p-timeline-event-separator {\r\n    flex-direction: row;\n}\n.p-timeline-horizontal .p-timeline-event-connector {\r\n    width: 100%;\n}\n.p-timeline-bottom .p-timeline-event {\r\n    flex-direction: column-reverse;\n}\n.p-timeline-horizontal.p-timeline-alternate .p-timeline-event:nth-child(even) {\r\n    flex-direction: column-reverse;\n}\r\n";
styleInject(css_248z);

script.render = render;

export { script as default };
