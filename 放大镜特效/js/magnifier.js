/**
 * 图片放大镜效果预览
 */
class Magnifier {
  /**
   * @param {HTMLDivElement} s_box 小图片包裹的盒子
   * @param {HTMLDivElement} b_box 预览图片的大盒子
   * @param {HTMLDivElement} mask 图片遮罩层
   * @param {HTMLImageElement} b_img 预览的大图片
   */
	constructor(s_box, b_box, mask, b_img) {
		this.s_box = s_box;
		this.b_box = b_box;
		this.mask = mask;
		this.b_img = b_img;
	}
	init() {
		this.mouseMove();
		this.mouseOut();
		this.mouseOver();
	}
	// mask最大移动距离
	get maskMax() {
		return this.s_box.offsetWidth - this.mask.offsetWidth;
	}
  // 大图最大移动距离
	get bigMax() {
		return this.b_img.offsetWidth - this.b_box.offsetWidth;
	}
	mouseOver() {
		let self = this;
		// 鼠标经过
		self.s_box.addEventListener("mouseover", function (e) {
			self.mask.style.display = "block";
			self.b_box.style.display = "block";
		});
	}
	mouseOut() {
		let self = this;
		// 鼠标离开  es6 =>
		self.s_box.addEventListener("mouseout", ()=> {
			this.mask.style.display = "none";
			this.b_box.style.display = "none";
		});
	}
  mouseMove() {
		let self = this;
		self.s_box.addEventListener("mousemove", function (e) {
			// 计算鼠标在盒子内的坐标
			let x = e.pageX - this.offsetLeft;
			let y = e.pageY - this.offsetTop;

			let { maskX, maskY } = self.maskXYCheck(x,y);

			self.mask.style.left = maskX + "px";
			self.mask.style.top = maskY + "px";

			self.bigImgMoveMax(maskX, maskY);
		});
	}
  /**
   * 
   * @param {number} maskX maskX坐标
   * @param {number} maskY maskY坐标
   * 通过mask的偏移量求出 大图片的偏移量
   */
	bigImgMoveMax(maskX, maskY) {
		// 大图片移动距离 / 大图最大移动距离 = mask移动距离 / mask最大移动距离
		// 大图最大移动距离   正方形宽高相同
		let bigX = (maskX * this.bigMax) / this.maskMax;
		let bigY = (maskY * this.bigMax) / this.maskMax;
		this.b_img.style.left = -bigX + "px";
		this.b_img.style.top = -bigY + "px";
	}
  /**
   * 
   * @param {number} x 鼠标在盒子中的相对坐标x轴
   * @param {number} y 鼠标在盒子中的相对坐标y轴
   * @returns mask在盒子中的坐标
   */
	maskXYCheck(x, y) {
		// 减去mask一半，使鼠标在mask正中间
		let maskX = x - this.mask.offsetWidth / 2;
		let maskY = y - this.mask.offsetHeight / 2;
    
    // 对边界进行限制
		if (maskX <= 0) maskX = 0;
		else if (maskX > this.maskMax) {
			maskX = this.maskMax;
		}
		if (maskY <= 0) maskY = 0;
		else if (maskY >= this.maskMax) {
			maskY = this.maskMax;
		}
		return { maskX, maskY };
	}
	
}
