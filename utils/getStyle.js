function getStyle(obj, name) {
  // 不加window是一个变量，变量未定义报错，加上window表示window上的一个属性，属性找不到是undefined
	/* if (window.getComputedStyle) {
		return getComputedStyle(obj, null)[name];
	} else {
		return obj.currentStyle[name];
	} */
  return window.getComputedStyle ? getComputedStyle(obj, null)[name] :obj.currentStyle[name];
}
