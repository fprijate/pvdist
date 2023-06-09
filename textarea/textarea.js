this.primevue = this.primevue || {};
this.primevue.textarea = (function (BaseComponent, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

    var script = {
        name: 'Textarea',
        extends: BaseComponent__default["default"],
        emits: ['update:modelValue'],
        props: {
            modelValue: null,
            autoResize: Boolean
        },
        mounted() {
            if (this.$el.offsetParent && this.autoResize) {
                this.resize();
            }
        },
        updated() {
            if (this.$el.offsetParent && this.autoResize) {
                this.resize();
            }
        },
        methods: {
            resize() {
                const style = window.getComputedStyle(this.$el);

                this.$el.style.height = 'auto';
                this.$el.style.height = `calc(${style.borderTopWidth} + ${style.borderBottomWidth} + ${this.$el.scrollHeight}px)`;

                if (parseFloat(this.$el.style.height) >= parseFloat(this.$el.style.maxHeight)) {
                    this.$el.style.overflowY = 'scroll';
                    this.$el.style.height = this.$el.style.maxHeight;
                } else {
                    this.$el.style.overflow = 'hidden';
                }
            },
            onInput(event) {
                if (this.autoResize) {
                    this.resize();
                }

                this.$emit('update:modelValue', event.target.value);
            }
        },
        computed: {
            filled() {
                return this.modelValue != null && this.modelValue.toString().length > 0;
            }
        }
    };

    const _hoisted_1 = ["value"];

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return (vue.openBlock(), vue.createElementBlock("textarea", vue.mergeProps({
        class: ['p-inputtextarea p-inputtext p-component', { 'p-filled': $options.filled, 'p-inputtextarea-resizable ': $props.autoResize }],
        value: $props.modelValue,
        onInput: _cache[0] || (_cache[0] = (...args) => ($options.onInput && $options.onInput(...args)))
      }, _ctx.ptm('root')), null, 16, _hoisted_1))
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

    var css_248z = "\n.p-inputtextarea-resizable {\r\n    overflow: hidden;\r\n    resize: none;\n}\n.p-fluid .p-inputtextarea {\r\n    width: 100%;\n}\r\n";
    styleInject(css_248z);

    script.render = render;

    return script;

})(primevue.basecomponent, Vue);
