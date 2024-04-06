<!-- TODO: -->

1. 测试

2. 统一 schema 或者 dependency 中所有允许函数回调的属性的 props（SchemaFunctionTypePropertyBasicParams）
   TODO:

   ```typescript
   interface CallbackCommonParams {
     //...
   }
   ```

3. 列表 行内字段根据当前行数据的状态进行判断。
   目前 Schema 中的一些能够接收函数的属性，例如：required/show/disabled/ifShow, 函数的参数有：
   field(当前表单项字段 field)、
   model(当前表单项字段的值)、
   schema(当前表单项的 schema)、
   formModel(整个表单的 model)、
   setValueByPath(根据路径更新表单项的值)、
   getValueByPath(根据路径获取表单项的值)。
   TODO: modelPath(当前表单项的路径)
   对于列表的下的 schema，额外提供下列属性：
   TODO:rowData(用于提供当前行的表单值)
   TODO:rowIndex(用于提供当前行的索引)

4. 方法开发：getSchemaByPath, setSchemaByPath, resetForm

5. 字段依赖开发

   ```typescript
   // TODO:
   interface WatchList {
     target: string | string[]
     when: () => boolean
     callback: () => any
     debounce?: boolean
     threshold?: number
   }
   ```

6. Card 组件添加参数 是否可折叠
   TODO: Card componentProps 中添加 expandCollapseEnabled 属性（类型为 boolean，默认值为 false）来表示是否运输折叠

7. 字段前插槽、后插槽结构确定和开发
   TODO:

   ```typescript
   interface PrependContentOptions {
     render?: () => VNode | VNode[]
     slot?: string
     //on...事件相关的决定不做处理，因为本身就可以在写插槽或者渲染函数时写好
     //onClick(){
     //  console.log("onClick")
     //}
     colProps: Partial<ColProps>
   }
   ```

- TODO: 更多的容器开发、更多的组件支持：Select

- 容器组件开发示例、字段组件开发示例

- 文档编写

- 类型提示完善：开发 schema 时根据 type 的类型来提示

<!-- DONE: -->

- 字段组件事件开发
  componentProps 中可以添加组件支持的事件，例如：
  针对于 ElInput 组件，可以在 componentProps 中添加官方支持的事件列表（https://element-plus.gitee.io/zh-CN/component/input.html#events），如 blur、focus、change、input、clear

  ```typescript
  {
    //...other properties
    componentProps: {
      onBlur: (event: FocusEvent) => console.log('blur', event)
    }
  }
  ```
