const ExcelJs = require("exceljs");
const { test, expect } = require('@playwright/test');

const workbook = new ExcelJs.Workbook();  //object of workbook

async function writeExcel(searchValue, replaceValue, Sheet, filePath, change) {

    await workbook.xlsx.readFile(filePath);
    const worksheet = await workbook.getWorksheet(Sheet);

    let details = await readExcel(worksheet, searchValue);

    const cell = worksheet.getCell(details.rowNumber, details.colNumber + change.col);
    cell.value = replaceValue;
    await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, searchValue) {
    let details = {};
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {

            if (cell.value === searchValue) {
                console.log(rowNumber, colNumber);
                details.rowNumber = rowNumber;
                details.colNumber = colNumber;
            }
        })
    })
    return details;

}

test('Practice', async ({ page }) => {
    const searchValue = "Apple";
    const replaceValue = "Golf";
    await page.goto("https://rahulshettyacademy.com/upload-download-test/");
    const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator("#downloadButton").click()
    ])
    const filePath = await download.path();
    await writeExcel(searchValue, replaceValue, "Sheet1", filePath, { row: 0, col: 2 });
    await page.locator("#fileinput").setInputFiles(filePath);
    expect(await page.locator(".rdt_TableRow").filter({hasText:searchValue}).locator("#cell-4-undefined").textContent()).toBe(replaceValue);
})

test('"+asdfsfsdf+"',async({page})=>{

    await page.locator("`'$(dfdfdfgdgdfg)'`");
})
