const ruleList = {
  CertNumber:
    /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, // 身份证
  Hkmakao: /^([A-Z]\d{6,10}(\(\w{1}\))?)$/, // 港澳通行证（来往内地通行证）H123456
  Taiwan: /(^\d{8}$)|(^[a-zA-Z0-9]{10}$)|(^\d{18}$)/, // 台湾通行证（来往大陆通行证） 12345678
  Passport: /^([a-zA-z]|[0-9]){5,17}$/, // 护照
  BankNumber: /^\d{16}|\d{19}$/, // 银行账号

  PhoneNumber: /^1[1234567890]\d{9}$/, // 手机号码
  TelePhoneNumber: /^\d{4}|\d{8}$/, // 固话号码
  Email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, // 邮箱
  MacaoRegex: /^6\d{7}$/, //澳門手機號碼
  TotalPhoneNumber: /^((1[3456789]\d{9})|(6\d{7})|(([5|6|8|9])\d{7}))$/, // 内地、澳门或者香港的手机号码

  Digit: /^\d+$/, // 纯数字
  NumbersLetters: /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]+$/, // 数字和字母
  Date: /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/,
}

export const checkValueOfEmpty = (value) => {
  if (value !== '' && value !== undefined && value !== null) {
    return false
  }
  return true
}

export const getPageData = () => {
  return {
    pageSize: 10,
    pageNum: 1,
    common: {
      head: [],
      product: [
        {
          imaPath: 'product_view1.jpg',
          path: '/',
          title: 'Color film',
          color: 'white',
        },
        {
          imaPath: 'product_view2.jpg',
          path: '/',
          title: 'TPU invisible car clothes',
          color: 'white',
        },
        {
          imaPath: 'product_view3.jpg',
          path: '/',
          title: 'Window film',
          color: 'black',
        },
        {
          imaPath: 'product_view4.jpg',
          path: '/',
          title: 'Black film of window frame',
          color: 'black',
        },
      ],
    },
  }
}
