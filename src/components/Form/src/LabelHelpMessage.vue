<script lang="tsx">
import { defineComponent } from 'vue'
import { ElTooltip, ElIcon } from 'element-plus'
import 'element-plus/theme-chalk/el-popper.css'
import { QuestionFilled } from '@element-plus/icons'
export default defineComponent({
  name: 'LabelHelpMessage',
  props: {
    label: {
      type: String,
      default: ''
    },
    subLabel: {
      type: String,
      default: ''
    },
    helpMessage: {
      type: String,
      default: ''
    },
    noLabel: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const renderLabel = () => {
      const { label, subLabel } = props
      return (
        <p class={'label-wrap'}>
          <span class={'main-label'}>{label}</span>
          {subLabel ? <span class="sub-label">{subLabel}</span> : ''}
        </p>
      )
    }
    return () => {
      const { helpMessage, noLabel } = props
      return !noLabel ? (
        <div class={'label-help-message-wrapper'}>
          <div class="inner-layout-wrap">
            {renderLabel()}
            {helpMessage && (
              <ElTooltip effect="dark" content={helpMessage} placement="top">
                <ElIcon>
                  <QuestionFilled />
                </ElIcon>
              </ElTooltip>
            )}
          </div>
        </div>
      ) : (
        ''
      )
    }
  }
})
</script>

<style lang="scss" scoped>
.label-help-message-wrapper {
  display: inline-block;

  .inner-layout-wrap {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .label-wrap {
    margin: 0 6px 0 0;

    .main-label {
      margin-right: 6px;
    }

    .sub-label {
      color: #aaa;
    }
  }
}
</style>
