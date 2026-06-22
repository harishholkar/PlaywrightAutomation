//Excel-Download, Edit, Upload and Assert

import { test, expect } from '@playwright/test';

const ExcelJS = require('exceljs') // import package

const workbook = new ExcelJS.Workbook(); //creating object

async function writeExcel(filePath, SheetNo, searchValue, replacevalue, replaceCellNo) {
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(SheetNo);
    let valueStore = await readExcel(worksheet, searchValue);

    const Cell = worksheet.getCell(valueStore.rowNo, valueStore.colNo + replaceCellNo.cell);
    Cell.value = replacevalue;
    await workbook.xlsx.writeFile(filePath);

};

async function readExcel(worksheet, searchValue) {

    let valueStore = {};
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {

            if (cell.value === searchValue) {
                console.log(rowNumber, colNumber);
                valueStore.rowNo = rowNumber;
                valueStore.colNo = colNumber;
            }
        })
    });
    return valueStore;
};

test('@web Upload-Download Excel Data', async ({ page }) => {

    const searchValue = 'Papaya';
    const reaplaceValue = '1111';
    await page.goto('https://rahulshettyacademy.com/upload-download-test/');
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const download = await downloadPromise;
    const filePath = await download.path();
    await writeExcel(filePath, "Sheet1", searchValue, reaplaceValue, { row: 0, cell: 2 });
    await page.locator("#fileinput").setInputFiles(filePath); //this method is workaround from PW for upload of file manually
    //const cellValue = await page.locator('#row-0').locator('#cell-4-undefined').textContent();
    const cellValue = await page.locator('.sc-jsEeTM').filter({ hasText: searchValue }).locator('#cell-4-undefined').textContent();
    console.log(cellValue);
    await expect(cellValue).toBe(reaplaceValue);
});


//Diffrent approches to handle waitForEvent() and click()
test('@web Approch 1', async ({ page }) => {
    const searchValue = 'Apple';
    const reaplaceValue = '4567';
    await page.goto('https://rahulshettyacademy.com/upload-download-test/');
    const downloadPromise = page.waitForEvent('download');
    await page.locator('#downloadButton').click();
    const download = await downloadPromise;
    const filePath = await download.path();
    await writeExcel(filePath, "Sheet1", searchValue, reaplaceValue, { row: 0, cell: 2 });
    await page.locator('#fileinput').setInputFiles(filePath);
    const cellValue = await page.locator('.sc-jsEeTM').filter({hasText: searchValue}).locator('#cell-4-undefined').textContent();
    await expect(cellValue).toBe(reaplaceValue);
});


test('@web Approch 2',async({page})=>{
    const searchValue='Mango';
    const reaplaceValue='4589'; 
    await page.goto('https://rahulshettyacademy.com/upload-download-test/');

    const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('#downloadButton').click()
    ]);
    const filepath = await download.path();

    await writeExcel(filepath, "Sheet1", searchValue, reaplaceValue, { row: 0, cell: 2 });
    await page.locator('#fileinput').setInputFiles(filepath);
    const cellValue = await page.locator('.sc-jsEeTM').filter({hasText: searchValue}).locator('#cell-4-undefined').textContent();
    await expect(cellValue).toBe(reaplaceValue);    
});