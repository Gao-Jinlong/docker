const { Workbook } = require('exceljs');

main();

async function main() {
  await readExcel();

  console.log('-------------------');

  await writeExcel();
}

async function readExcel() {
  const workbook = new Workbook();

  const workbook2 = await workbook.xlsx.readFile('test.xlsx');

  workbook2.eachSheet((sheet, index1) => {
    console.log('Sheet Name: ', sheet.name);

    sheet.eachRow((row, index2) => {
      const rowData = [];

      row.eachCell((cell, index3) => {
        rowData.push(cell.value);
      });

      console.log(`Row ${index1}: `, rowData);
    });
  });

  workbook2.eachSheet((sheet, index1) => {
    const value = sheet.getSheetValues();

    console.log('Sheet Name: ', sheet.name);
    console.log('Sheet Values: ', value);
  });
}

async function writeExcel() {
  const workbook = new Workbook();

  const sheet = workbook.addWorksheet('Sheet1');

  sheet.columns = [
    { header: 'Id', key: 'id', width: 10 },
    { header: 'Name', key: 'name', width: 32 },
    { header: 'D.O.B.', key: 'dob', width: 15 },
  ];

  const data = [
    { id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) },
    { id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7) },
    { id: 3, name: 'Tom Doe', dob: new Date(1975, 1, 9) },
  ];

  sheet.addRows(data);

  sheet.eachRow((row, rowIndex) => {
    row.eachCell((cell) => {
      if (rowIndex === 1) {
        cell.style = {
          font: {
            size: 10,
            bold: true,
            color: { argb: 'FF0000' },
          },
          alignment: { vertical: 'middle', horizontal: 'center' },
          fill: {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '00FF00' },
          },
          border: {
            top: { style: 'thin', color: { argb: 'FF0000' } },
            left: { style: 'thin', color: { argb: 'FF0000' } },
            bottom: { style: 'thin', color: { argb: 'FF0000' } },
            right: { style: 'thin', color: { argb: 'FF0000' } },
          },
        };
      } else {
        cell.style = {
          font: {
            size: 10,
            bold: true,
          },
          alignment: { vertical: 'middle', horizontal: 'left' },
          border: {
            top: { style: 'dashed', color: { argb: '0000ff' } },
            left: { style: 'dashed', color: { argb: '0000ff' } },
            bottom: { style: 'dashed', color: { argb: '0000ff' } },
            right: { style: 'dashed', color: { argb: '0000ff' } },
          },
        };
      }
    });
  });

  await workbook.xlsx.writeFile('test2.xlsx');
}
