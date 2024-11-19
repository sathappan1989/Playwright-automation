const {test,expect} = require('@playwright/test');
const { clear } = require('console');

test('Client test cases ', async ({browser})=>
{
    const context=await browser.newContext(); 
    const page=await context.newPage();
    
    await page.goto('https://rahulshettyacademy.com/client', { waitUntil: 'load' });
  
    const products=page.locator(".card-body");
    const eMail = page.locator("#userEmail");
    const Password = page.locator("#userPassword");
    const Login = page.locator("#login");
    await eMail.fill("sathappan.a.s@gmail.com");
    await Password.fill("Chennai2024*");
    await Login.click();
    //await page.waitForLoadState('networkidle');
    await page.locator(".card-body").first().waitFor();
    const titles = page.locator(".card-body").allTextContents();
    console.log(titles);


    const ProductName = 'ZARA COAT 3';
    const count = await products.count();

    for(let i=0;i<count;++i){
        if (await products.nth(i).locator("b").textContent()===ProductName)
            {
                await products.nth(i).locator("text = Add To Cart").click();
                break;
            }
    }
    await page.locator(".btn.btn-custom[routerlink='/dashboard/cart']").click(); 


    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    await page.pause();


    //ZARA COAT 3
    //ADIDAS ORIGINAL
});