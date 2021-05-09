window.addEventListener("DOMContentLoaded", function () {
	var swiper = document.querySelector(".swiper");
	var swiperWrap = document.querySelector(".swiper-wrap");
	var swiperItem = document.querySelector(".swiper-item");
	var dot = document.querySelector(".dot");
	var arrowL = document.querySelector(".arrow-l");
	var arrowR = document.querySelector(".arrow-r");

	var swiperItemWidth = swiperItem.offsetWidth;

	swiper.style.width = (swiper.children.length+2) * swiperItemWidth + "px";
	// 当前选择索引
	var currentIndex = 0;

	// 创建圆点
	var dotLi = document.createDocumentFragment();
	for (let index = 0; index < swiper.children.length; index++) {
		var li = document.createElement("li");
		li.setAttribute("index", index);
		dotLi.appendChild(li);
	}
  // 初始高亮
  dotLi.children[0].className = 'current'
  var dotChildren = dot.children
	dot.appendChild(dotLi);

  // 克隆第一张和最后一张
  var first = swiper.children[0].cloneNode(true)
  swiper.appendChild(first)

  // 圆点事件监听
	dot.addEventListener("click", function (e) {
    if(e.target.tagName !== 'LI') return;
		var index = e.target.getAttribute("index");
		currentIndex = index;
		animate(swiper, -swiperItemWidth * currentIndex);
    highlightIndex(dotChildren,currentIndex)
	});

	// 左右按钮点击事件
	arrowL.addEventListener("click", function () {
    if(currentIndex === 0){
      currentIndex = swiper.children.length - 1
      swiper.style.left = -currentIndex * swiperItemWidth + 'px'
    }
    currentIndex--;
		animate(swiper, -swiperItemWidth * currentIndex);
    highlightIndex(dotChildren,currentIndex)
	});
	arrowR.addEventListener("click", function () {
    if(currentIndex === swiper.children.length - 1){
      currentIndex = 0
      swiper.style.left = 0
    }
		currentIndex++;
		animate(swiper, -swiperItemWidth * currentIndex);
    highlightIndex(dotChildren,currentIndex)
	});
});


function highlightIndex(els,index){
  [...els].forEach(item => {
    item.getAttribute('index') == (index%els.length) ? item.className = "current" : item.className = "" 
  })
}

function animate(el, target, cb) {
	if (el.timer) clearInterval(el.timer);
	el.timer = setInterval(() => {
		var step = (target - el.offsetLeft) / 10;
		step = step > 0 ? Math.ceil(step) : Math.floor(step);
		if (el.offsetLeft == target) {
			clearInterval(el.timer);
			cb && cb();
		}
		el.style.left = el.offsetLeft + step + "px";
	}, 15);
}
