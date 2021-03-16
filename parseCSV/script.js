function Upload() {
	let fileUpload = document.getElementById(`fileUpload`);
	if (typeof (FileReader) != "undefined") {
		let reader = new FileReader();
		reader.onload = function (e) {
			let table = document.createElement("table");
			let rows = e.target.result.split("\n");
			for (let i = 0; i < rows.length; i++) {
				let cells = rows[i].split(",");
				if (cells.length > 1) {
					let row = table.insertRow(-1);
					for (let j = 0; j < cells.length; j++) {
						let cell = row.insertCell(-1);
						cell.innerHTML = cells[j];
					}
				}
			}
			let dvCSV = document.getElementById("dvCSV");
			dvCSV.innerHTML = "";
			dvCSV.appendChild(table);
		}
		reader.readAsText(fileUpload.files[0]);
	}
}



function Convert() {
	let reader = new FileReader();

	reader.onload = function (e) {
		let allTextLines = e.target.result.split('\n');
		let data = allTextLines.map(x => x.split(','));
		let dates = [];
		let employees = [];
		let rows, columns;

		let lines = [[`Name / Data`]];

		for (let i = 1; i < allTextLines.length; i++) {
			if (!dates.includes(data[i][1])) {
				dates.push(data[i][1]);
			}

			if (!employees.includes(data[i][0])) {
				employees.push(data[i][0]);
			}
		}

		employees.sort();
		lines = lines.concat(employees.map(x => [x]));
		lines[0] = lines[0].concat(dates);

		////////////////////////////////////////////////

		for (let i = 1; i < data.length; i++) {
			rows = lines[0].indexOf(data[i][1]);
			columns = employees.indexOf(data[i][0]);

			lines[columns+1][rows] = data[i][2];
		}

		for (let i = 1; i < lines.length; i++) {
			lines[i].length = lines[0].length;
			for (let j = 1; j < lines[i].length; j++) {
				if (lines[i][j] === undefined) {
					lines[i][j] = 0;
				} else continue;
			}
		}

		////////////////////////////////////////////////

		let table = document.createElement('table');

		for (let i = 0; i<lines.length; i++) {
				let row = table.insertRow(-1);
				for (let j = 0; j < lines[i].length; j++) {
					let cell = row.insertCell(-1);
					cell.innerHTML = lines[i][j];
				}
		}

		let dvCSV = document.getElementById("dvCSV");
		dvCSV.innerHTML = "";
		dvCSV.appendChild(table);
	}

	reader.readAsText(fileUpload.files[0]);

	return reader.result;
}



function Download() {
	let reader = new FileReader();

	reader.onload = function (e) {
		let allTextLines = e.target.result.split('\n');
		let data = allTextLines.map(x => x.split(','));
		let dates = [];
		let employees = [];
		let rows, columns;

		let lines = [[`Name / Data`]];

		for (let i = 1; i < allTextLines.length; i++) {
			if (!dates.includes(data[i][1])) {
				dates.push(data[i][1]);
			}

			if (!employees.includes(data[i][0])) {
				employees.push(data[i][0]);
			}
		}

		employees.sort();
		lines = lines.concat(employees.map(x => [x]));
		lines[0] = lines[0].concat(dates);

		////////////////////////////////////////////////

		for (let i = 1; i < data.length; i++) {
			rows = lines[0].indexOf(data[i][1]);
			columns = employees.indexOf(data[i][0]);

			lines[columns + 1][rows] = data[i][2];
		}

		for (let i = 1; i < lines.length; i++) {
			lines[i].length = lines[0].length;
			for (let j = 1; j < lines[i].length; j++) {
				if (lines[i][j] === undefined) {
					lines[i][j] = "0";
				} else continue;
			}
		}

		let csvContent = "data:text/csv;charset=utf-8,";

		lines.forEach(function(rowArray) {
			let row = rowArray.map(x => x.trim()).join(",");
			csvContent += row + "\r\n";
		});

		let encodedUri = encodeURI(csvContent);
		let link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "formed_hours.csv");
		document.body.appendChild(link);

		link.click();
	}
	reader.readAsText(fileUpload.files[0]);
}





// let hours = ``;
// let mas;
// let array = hours.split('\n').map(x=>x.split(`,`));
//
// let csv = `Name / Date, `
// function formTable (arr) {
// 	for (let i=1; i<arr.length; i++) {
// 		masDate += arr[i][2]
// 	}
// }