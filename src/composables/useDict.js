/**
 * @description:枚举 
 */

export const dicts = {
  // 性别
  sex: [
    { label: '男', value: '1' },
    { label: '女', value: '2' },
  ],
  // 状态
  status: [
    { label: '正常', value: '1' },
    { label: '禁用', value: '2' },
  ],
  // 是否显示
  isShow: [
    { label: '显示', value: '1' },
    { label: '隐藏', value: '2' },
  ],
  // 外送堂食
  isTakeout: [
    { label: '自取', value: '1' },
    { label: '外卖', value: '2' },
  ],
  // 是否
  is: [
    { label: '是', value: '1' },
    { label: '否', value: '2' },
  ],
  orderStatus:[
    { label: '待支付', value: '1' },
    { label: '备餐中', value: '2' },
    { label: '待取餐', value: '3' },
    { label: '已完成', value: '4' },
    { label: '待配送', value: '5' },
    { label: '已取消', value: '6' },
  ]
}

export function useDict(type) {

  const dictArray = dicts[type]
  

  // 数组转对象
  const dictVL = dictArray.reduce((acc, cur) => {
    acc[cur.value] = cur.label
    return acc
  }, {})

  const dictLV = dictArray.reduce((acc, cur) => {
    acc[cur.label] = cur.value
    return acc
  }, {})
  return {
    dictArray:readonly(ref(dictArray)) ,
    dictVL:readonly(ref(dictVL)),
    dictLV:readonly(ref(dictLV)),
  }
}

