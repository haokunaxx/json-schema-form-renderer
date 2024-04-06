<script lang="tsx">
import { ElDivider, ElFormItem, ElCol, type FormItemRule } from 'element-plus'
import LabelHelpMessage from './LabelHelpMessage.vue'
import { Slots } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import { FormMethodsInjectKey, getPathObj } from './utils'
import {
  componentsMap,
  isFn,
  isNullOrUnDef,
  isBoolean,
  isArray,
  isString,
  Fields
} from '@/utils'

import {
  FormItemType,
  FieldSchema,
  SchemaFunctionTypePropertyBasicParams
} from '@/types'

import type {
  FormItemSchemaForRender,
  FieldSchemaForRender,
  BoxSchemaForRender,
  ListSchemaForRender
} from './types'
import { PropType } from 'vue'

export default defineComponent({
  name: 'FormItem',
  props: {
    schema: {
      type: Object as PropType<FormItemSchemaForRender>,
      required: true
    },
    model: {
      type: Object as PropType<Recordable>,
      required: true
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    parentPaths: {
      type: Array as PropType<string[]>,
      default: () => []
    }
  },
  setup(props, { slots, attrs }) {
    const formMethods = inject(FormMethodsInjectKey)
    const { schema, parentPaths } = props
    const { modelPath } = getPathObj([...parentPaths, schema.field])
    // --------------------------------------------------------------- Component status below
    const getValues = computed<SchemaFunctionTypePropertyBasicParams>(() => {
      const { field } = props.schema
      return {
        field: field as string,
        model: formMethods?.getValueByPath(modelPath),
        schema: readonly(props.schema),
        formModel: readonly(props.model),

        // formSchema 暂不提供
        setValueByPath: formMethods!.setValueByPath,
        getValueByPath: formMethods!.getValueByPath
      }
    })
    // disabled
    const getDisabled = computed(() => {
      const { disabled: propsDisabled } = props
      const { disabled: schemaDisabled } = props.schema
      let isDisabled = isFn(schemaDisabled)
        ? schemaDisabled(unref(getValues))
        : !!schemaDisabled
      return propsDisabled || isDisabled
    })
    // show
    const getShow = computed(() => {
      const { show = true, ifShow = true } = props.schema
      let isShow, isIfShow
      if (isBoolean(show)) {
        isShow = show
      }
      if (isFn(show)) {
        isShow = show(unref(getValues))
      }
      if (isBoolean(ifShow)) {
        isIfShow = ifShow
      }
      if (isFn(ifShow)) {
        isIfShow = ifShow(unref(getValues))
      }
      return {
        isShow,
        isIfShow
      }
    })
    // loading
    const getLoading = computed(() => {
      const { loading } = props.schema
      let isLoading = false
      if (isBoolean(loading)) {
        isLoading = loading
        if (isLoading) {
          console.warn('constant loading may cause some problems')
        }
      }
      if (isFn(loading)) {
        isLoading = loading(unref(getValues))
      }
      return isLoading
    })

    const getComponentProps = computed(() => {
      const { schema, model, parentPaths } = props
      const { component, componentProps } = schema
      let retProps: Recordable = {
        schema,
        model,
        ...componentProps
      }
      if (component === Fields.Divider) {
        retProps = {
          direction: 'horizontal',
          'border-style': 'solid',
          'content-position': 'center',
          ...retProps
        }
      }
      return {
        ...retProps,
        parentPaths:
          schema.type === FormItemType.LIST
            ? [...parentPaths, schema.field]
            : [...parentPaths],
        disabled: unref(getDisabled)
      }
    })

    /**
     * 处理规则（字段是否必填通过规则中的required定义，而并非schema中的required字段控制）
     * 1. 必填规则处理
     * 2. 长度规则处理
     *  必填规则处理
     *    1.计算当前字段是否是必填的。（不是则不需要处理）
     *    2.是则进一步判断schema的rules中是否存在required的rule（存在则跳过）
     *    3.不存在则添加内置validator方法进行校验
     *    4.正确处理type类型
     *  长度规则处理步骤
     *    1.判断schema的rules中存在了长度校验，同时长度校验rule中是否写了validator（写了则不需要处理）
     *    2.存在长度校验rule同时没有写validator的话，则往rule中添加长度校验信息
     *  */
    const handleRule = (): FormItemRule[] => {
      const {
        required = false,
        rules: defRules = [],
        dynamicRules
      } = props.schema as FieldSchema

      if (isFn(dynamicRules)) {
        return dynamicRules(unref(getValues)) as FormItemRule[]
      }

      const rules = cloneDeep(defRules) as FormItemRule[]
      const isRequired = isFn(required) ? required(unref(getValues)) : required
      const defaultMessage = '该字段为必填字段'

      // 必填校验器
      const requiredValidator: FormItemRule['validator'] = (
        rule,
        value,
        callback
      ) => {
        const msg = (rule.message || defaultMessage) as string
        if (isNullOrUnDef(value)) {
          return callback(new Error(msg))
        } else if (isArray(value) && value.length === 0) {
          return callback(new Error(msg))
        } else if (isString(value) && value.trim() === '') {
          return callback(new Error(msg))
        }
        callback()
      }

      // 必填字段
      if (isRequired) {
        if (rules.length === 0) {
          rules.push({
            required: true,
            validator: requiredValidator
          })
        } else {
          const requiredRuleIdx = rules.findIndex((rule) =>
            Reflect.has(rule, 'required')
          )

          if (requiredRuleIdx === -1) {
            rules.push({
              required: true,
              validator: requiredValidator
            })
          }
        }
      }

      const requiredRuleIdx = rules.findIndex((rule) =>
        Reflect.has(rule, 'required')
      )

      // 不显示时取消字段必填
      if (requiredRuleIdx !== -1) {
        const { isShow } = unref(getShow)
        if (!isShow) {
          rules[requiredRuleIdx].required = false
        }
      }

      return rules
    }

    // --------------------------------------------------------------- Render Functions below
    const renderLabelAndHelpMessage = computed(() => {
      const { label, helpMessage, subLabel, noLabel } =
        props.schema as FieldSchema
      return <LabelHelpMessage {...{ label, helpMessage, subLabel, noLabel }} />
    })

    const renderFieldInner = computed(() => {
      const { component, placeholder } = props.schema as FieldSchemaForRender

      const modelValueUpdateProps = {
        modelValue: formMethods?.getValueByPath(modelPath),
        'onUpdate:modelValue': function (val) {
          formMethods?.setValueByPath(modelPath, val)
        }
      }
      const propsData = {
        ...unref(getComponentProps),
        placeholder: !isNullOrUnDef(placeholder) ? placeholder : ''
      }
      const on = {}

      const compProps = {
        ...attrs,
        ...modelValueUpdateProps,
        ...propsData,
        ...on
      }
      const Comp = componentsMap[component!]
      return <Comp {...compProps} />
    })

    const renderField = () => {
      return {
        // label: () => renderLabelAndHelpMessage(),
        // default: () => renderFieldInner（）
        //优化
        label: () => renderLabelAndHelpMessage.value,
        default: () => renderFieldInner.value
      }
    }

    //处理El-Form Attribute的绑定、path路径的绑定、rule的绑定。
    const renderFormItem = (schema: FieldSchemaForRender) => {
      const { elFormItemProps = {} } = schema
      return (
        <ElFormItem prop={modelPath} {...elFormItemProps} rules={handleRule()}>
          {renderField()}
        </ElFormItem>
      )
    }

    const renderBoxOrList = (
      schema: BoxSchemaForRender | ListSchemaForRender
    ) => {
      const { component } = schema
      const Comp = componentsMap[component]
      return <Comp {...unref(getComponentProps)} />
    }

    const getRenderComponent = (schema: FormItemSchemaForRender) => {
      const { component, type } = schema
      if (!component) return null
      // 分隔线组件
      if (component === Fields.Divider) {
        return <ElDivider />
      }
      // 表单字段组件
      if (type === FormItemType.FIELD) {
        return renderFormItem(schema as FieldSchemaForRender)
      }
      // Box/List组件
      return renderBoxOrList(schema as BoxSchemaForRender | ListSchemaForRender)
    }

    const getSlot = (slots: Slots, slot: string, data?: any) => {
      if (!slots || !Reflect.get(slots, slot)) {
        return null
      }
      if (!isFn(slots[slot])) {
        console.error(`${slot}插槽不是一个函数`)
        return null
      }
      const renderSlot = slots[slot]
      if (!renderSlot) return null
      return renderSlot(data)
    }

    const getContent = () => {
      if (!props.schema) return null
      const { render, slot } = props.schema as FieldSchemaForRender
      return slot
        ? getSlot(slots, slot, unref(getValues))
        : render
        ? render()
        : getRenderComponent(props.schema)
    }

    const showWatcherStop = watch(
      () => getShow.value,
      ({ isIfShow }) => {
        const { type } = props.schema
        if (type !== FormItemType.FIELD) {
          // FIXME: Box和List的ifShow逻辑缺失。
          // Box和List的ifShow为false并且clearInputWhenIfShowFalse为true的时候，需要清空下面所有的值,
          // 目前的思路是用一个map保存所有字段、部分的默认值，最后用这个来恢复
          return showWatcherStop()
        }
        const { clearInputWhenIfShowFalse = true } =
          props.schema as FieldSchemaForRender
        if (!isIfShow && clearInputWhenIfShowFalse) {
          formMethods?.setValueByPath(modelPath, undefined)
        }
      }
    )

    return () => {
      const { isShow, isIfShow } = unref(getShow)
      const { colProps } = props.schema

      return isIfShow ? (
        <ElCol {...colProps}>
          <div v-show={isShow} v-loading={unref(getLoading)}>
            {getContent()}
          </div>
        </ElCol>
      ) : null
    }
  }
})
</script>
