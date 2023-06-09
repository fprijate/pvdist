import BaseComponent from 'primevue/basecomponent';
import { openBlock, createElementBlock, mergeProps } from 'vue';

var script = {
    name: 'InputText',
    extends: BaseComponent,
    emits: ['update:modelValue'],
    props: {
        modelValue: null
    },
    methods: {
        onInput(event) {
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
  return (openBlock(), createElementBlock("input", mergeProps({
    class: ['p-inputtext p-component', { 'p-filled': $options.filled }],
    value: $props.modelValue,
    onInput: _cache[0] || (_cache[0] = (...args) => ($options.onInput && $options.onInput(...args)))
  }, _ctx.ptm('root')), null, 16, _hoisted_1))
}

script.render = render;

export { script as default };
