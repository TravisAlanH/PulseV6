// function createTable(data, tableId) {
//   var table = document.getElementById(tableId);

//   var headerRow = document.createElement("tr");
//   for (var key in data[0]) {
//     var headerCell = document.createElement("th");
//     headerCell.textContent = key;
//     headerRow.appendChild(headerCell);
//   }
//   table.appendChild(headerRow);

//   data.forEach(function (rowObj) {
//     var row = document.createElement("tr");
//     for (var key in rowObj) {
//       var cell = document.createElement("td");
//       cell.textContent = rowObj[key];
//       row.appendChild(cell);
//     }
//     table.appendChild(row);
//   });
// }

function createTable(data, tableId) {
  var table = document.getElementById(tableId);

  var headerRow = document.createElement("tr");
  for (var key in data[0]) {
    var headerCell = document.createElement("th");
    headerCell.textContent = key;
    headerRow.appendChild(headerCell);
  }
  table.appendChild(headerRow);

  data.forEach(function (rowObj) {
    var row = document.createElement("tr");

    for (var key in rowObj) {
      var cell = document.createElement("td");
      cell.textContent = rowObj[key];
      row.appendChild(cell);
    }
    table.appendChild(row);
  });
}

export default createTable;
