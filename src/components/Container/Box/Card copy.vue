<template>
  <div :class="['basic-container', disabled && 'disabled']">
    <!-- Header -->
    <div class="header">
      <p
        v-if="expandCollapseEnabled"
        :class="['header-fold-icon', isCollapse && 'rotate']"
        @click="toggleExpandCollapseStatus"
      >
        <ElIcon>
          <ArrowDownBold />
        </ElIcon>
      </p>
      <!-- HeaderTitle slot -->
      <LabelHelpMessage
        v-bind="schema"
        :label="schema.label"
        :sub-label="schema.subLabel"
      />
      <!-- <template v-if="schema.slots && schema.slots['headerTitle']">
        <slot
          :name="schema.slots['headerTitle']"
          v-bind="getButtonAreaSlotBindValue"
        ></slot>
      </template>
      <div v-else class="header-title">
       
      </div> 
      <div
        class="header-title-after"
        v-if="schema.slots && schema.slots['headerTitleAfter']"
      >
        <slot
          :name="schema.slots['headerTitleAfter']"
          v-bind="getButtonAreaSlotBindValue"
        ></slot>
      </div>-->
    </div>
    <!-- Separator And Content  -->
    <ExpandCollapseTransition>
      <div v-show="!isCollapse" class="expand-collapse-toggle">
        <!-- Separator -->
        <!-- <template v-if="schema.slots && schema.slots['headerContentSeparator']">
          <slot
            :name="schema.slots['headerContentSeparator']"
            v-bind="getButtonAreaSlotBindValue"
          ></slot>
        </template> -->
        <!-- Content -->
        <div class="content">
          <ElRow v-bind="getRowBindValue">
            <RenderItem v-for="item in getSchema" v-bind="item" :key="item.key">
              <!-- //RenderItem的slots -->
              <template
                #[slotName]="data"
                v-for="slotName in Object.keys(slots)"
              >
                <!-- //给slots用的 -->
                <slot :name="slotName" v-bind="data"></slot>
              </template>
            </RenderItem>
          </ElRow>
        </div>
      </div>
    </ExpandCollapseTransition>
  </div>
</template>

<script lang="ts">
/*
基础的容器组件：包含折叠、容器头部区域、同期头部和内容区之间的区域、内容区渲染
Layout: 
  Header: HeaderTitle - HeaderTitleAfter
  Separator
  Content
*/
import {
  PropType,
  defineAsyncComponent,
  defineComponent,
  inject,
  computed
} from 'vue'
import { ArrowDownBold } from '@element-plus/icons'

import { LabelHelpMessage, FormMethodsInjectKey } from '../../Form'
import ExpandCollapseTransition from '../../ExpandCollapseTransition.vue'

import { useSwitch } from '@/hooks/useSwitch'
// Fixed: 引入动态组件ts类型校验报错
const RenderItem = defineAsyncComponent(
  () => import('../../Form/src/FormItem.vue')
)
// import type {
//   Schema,
//   ContainerSchema,
//   Recordable
//   // FormActionType
// } from '#/index'

import { BoxSchemaForRender } from '../../Form/src/types'

interface ContainerRenderData {
  key: string
  schema: BoxSchemaForRender
  model: Recordable
  parentPaths: string[]
  disabled: boolean
}
export default defineComponent({
  name: 'Card',
  props: {
    schema: {
      type: Object as PropType<BoxSchemaForRender>,
      required: true
    },
    model: {
      type: Object as PropType<Recordable>,
      required: true
    },
    disabled: {
      type: Boolean as PropType<Boolean>,
      default: false
    },
    parentPaths: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    expandCollapseEnabled: {
      type: Boolean as PropType<Boolean>,
      default: true
    }
  },
  components: {
    RenderItem,
    LabelHelpMessage,
    ArrowDownBold,
    ExpandCollapseTransition
  },
  setup(props, { slots, attrs }) {
    const formActions = inject(FormMethodsInjectKey)

    const [isCollapse, toggleExpandCollapseStatus] = useSwitch()

    // for SlotScope
    const getButtonAreaSlotBindValue = computed(() => {
      const { schema, model, disabled } = props
      return {
        ...formActions,
        schema,
        model,
        disabled
      }
    })

    const getSchema = computed<ContainerRenderData[]>(() => {
      const { schema, model, disabled, parentPaths } = props,
        { items = [] } = schema
      return Object.keys(items).reduce(
        (prev: ContainerRenderData[], key: string) => {
          prev.push({
            key,
            schema: items[key] as any,
            disabled: !!disabled,
            model,
            parentPaths,
            ...attrs
          })
          return prev
        },
        []
      )
    })

    //ElRow Props
    const getRowBindValue = computed<Recordable>(() => {
      const { rowProps = {} } = props.schema
      return {
        gutter: 0,
        justify: 'start',
        align: 'top',
        tag: 'div',
        ...rowProps
      }
    })

    return {
      isCollapse,
      toggleExpandCollapseStatus,
      slots,
      getSchema,
      getRowBindValue,
      getButtonAreaSlotBindValue
    }
  }
})
</script>

<style lang="scss" scoped>
.basic-container {
  padding: 12px;

  &.disabled {
    background-color: #efefef;
  }

  .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 12px;

    &-fold-icon {
      margin-right: 6px;
      transition: all 0.4s ease;

      &.rotate {
        transform: rotate(-180deg);
      }
    }

    &-title {
      font-size: 24px;
      color: #000;
      font-weight: bold;
    }

    &-title-after {
      display: flex;
      flex: 1;
      justify-content: flex-end;
    }
  }
}
</style>
