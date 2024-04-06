module.exports = {
  // 可选类型
  types: [
    {
      value: 'fix',
      name: 'fix: 修复'
    },
    {
      value: 'feat',
      name: 'feat: 新功能'
    },
    {
      value: 'docs',
      name: 'docs: 文档变更'
    },
    {
      value: 'refactor',
      name: 'refactor: 重构'
    },
    {
      value: 'perf',
      name: 'perf: 性能优化'
    },
    {
      value: 'optimization',
      name: 'optimization: 其他优化'
    },
    {
      value: 'test',
      name: 'test: 增加测试'
    },
    {
      value: 'build',
      name: 'build: 打包'
    }
  ],
  // 范围
  scopes: [
    { name: 'Box' },
    { name: 'List' },
    { name: 'Form' },
    { name: 'Utils' },
    { name: 'Types' },
    { name: 'Other' }
  ],
  // 步骤

  messages: {
    type: '请选择提交的类型',
    scope: '请选择修改的范围',
    // customScope: '情输入修改的范围(可选)',
    subject: '请简要描述提交(必填)',
    body: '请输入详细描述(可选)',
    footer: '请输入要关闭的issus(可选)',
    confirmCommit: '确认要使用以上信息提交？(y/n)'
  },
  // allowCustomScopes: true,
  // 默认长度72
  subjectLimit: 72
}
