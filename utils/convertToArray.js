export function convertToArray(nodes) {
	var array = null;
	try {
		// array = Array.prototype.slice.call(nodes);
    array = Array.from(nodes)
	} catch (e) {
		array = new Array();
		for (var i = 0, len = nodes.length; i < len; i++) {
			array.push(nodes[i]);
		}
	}
}
