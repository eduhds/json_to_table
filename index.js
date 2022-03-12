(async () => {
	try {
		let html, data, json;

		data = await fetch('./data.json');
		json = await data.json();
		html = '<table>';

		let mapCols = obj => {
			// Keys
			html += `<tr>`;
			Object.keys(obj).forEach(key => {
				html += `<th>${key}</th>`;
			});
			html += `</tr>`;

			// Values
			html += `<tr>`;
			Object.values(obj).forEach(value => {
				if (typeof value === 'object') {
					html += '<td><table>';
					mapCols(value);
					html += '</table></td>';
				} else {
					html += `<td>${value}</td>`;
				}
			});
			html += `</tr>`;
		};

		mapCols(json);
		html += '</table>';

		document.querySelector('#content').innerHTML = html;
	} catch (error) {
		console.log(`Error ${error}`);
	}
})();
