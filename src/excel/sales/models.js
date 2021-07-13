export default {
  main: [
    {path: 'date', title: ['开票日期'], type: 'd', format: 'YYYY-MM-DD'},
    {path: 'billNo', title: ['单据号', '序号']},
    {path: 'invoice.code', title: ['发票代码']},
    {path: 'invoice.no', title: ['发票号码']},
    {path: 'invoice.status', title: ['发票状态']},

    {path: 'buyer.title', title: ['购方企业名称', '购买方名称', '购方名称']},
    {path: 'buyer.taxId', title: ['购方税号', '购买方税号', '购方纳税人识别号']},
    {path: 'buyer.bankAccount', title: ['银行账号', '银行帐号', '银行账户', '购买方银行账号']},
    {path: 'buyer.addrPhone', title: ['地址电话', '购买方地址电话']},

    {path: 'seller.title', title: ['卖方企业名称', '销方名称']},
    {path: 'seller.taxId', title: ['卖方税号', '销方纳税人识别号']},
    {path: 'seller.bankAccount', title: ['卖方银行账号']},
    {path: 'seller.addrPhone', title: ['卖方地址电话']},

    // 明细
    {path: 'details.title', title: ['商品名称', '货物名称']},
    {path: 'details.model', title: ['规格', '规格型号']},
    {path: 'details.unit', title: ['单位']},
    {path: 'details.qty', title: ['数量'], type: 'n'},
    {path: 'details.price', title: ['单价', '单价（不含税）'], type: 'n'},
    {path: 'details.amount', title: ['金额', '金额（不含税）', '货物金额'], type: 'n'},
    {path: 'details.taxRate', title: ['税率'], type: 'n'},
    {path: 'details.tax', title: ['税额'], type: 'n'},
    {path: 'details.remark', title: ['税收分类编码', '备注']},

    // {path: 'invoice.type', title: ['发票类型'], expr: '=header.type', optional: true}, // 不同的excel模板不一样
    {path: 'source', title: ['来源']},
    {path: 'description', title: ['描述']},
    {path: 'other.checkCode', title: ['校验码']}
  ]
}
