window.onload = function () {
	let preview_img = document.querySelector(".preview_img");
	let mask = document.querySelector(".preview_img>.mask");
	let big_pre = document.querySelector(".preview_img > .big");
	let big_img = document.querySelector(".preview_img > .big>img");

	new Magnifier(preview_img, big_pre, mask, big_img).init();
};
