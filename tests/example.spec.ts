import { test, expect, Page } from '@playwright/test';

const targetMonth = 4;

test.afterEach(async ({ page }, testInfo) => {
  await page.screenshot({ path: `./screenshot/${new Date().getTime()}.png` });
});


const testCases = [
  {
    name: '藍鵲會館-四人房',
    text: /^藍鵲會館-四人房NT\$4,320 起\* 金額以付款頁面為準選擇選擇展開keyboard_arrow_down$/,
    dateAndPrice: '年4月27日 4,800',
    dateAndPrice2: '年4月27日 change_history 4,800'
  },
  {
    name: '檜意村小木屋-四人房',
    text: /^檜意村小木屋-四人房NT\$4,640 起\* 金額以付款頁面為準選擇選擇展開keyboard_arrow_down$/,
    dateAndPrice: '年4月27日 5,800',
    dateAndPrice2: '年4月27日 change_history 5,800'
  },
  {
    name: '移動城堡-露營車（2大2小）',
    text: /^移動城堡-露營車（2大2小）NT\$4,640 起\* 金額以付款頁面為準選擇選擇展開keyboard_arrow_down$/,
    dateAndPrice: '年4月27日 5,800',
    dateAndPrice2: '年4月27日 change_history 5,800'
  },
  {
    name: '合掌村 ',
    text: /^合掌村NT\$3,780 起\* 金額以付款頁面為準選擇選擇展開keyboard_arrow_down$/,
    dateAndPrice: '年4月27日 4,200',
    dateAndPrice2: '年4月27日 change_history 4,200'
  },
  {
    name: '星空城堡-露營車（四人房）',
    text: /^NT\$6,120 起\* 金額以付款頁面為準選擇$/,
    dateAndPrice: '年4月27日 6,800',
    dateAndPrice2: '年4月27日 change_history 6,800'
  },
  {
    name: '星光村',
    text: /^星光村NT\$4,320 起\* 金額以付款頁面為準選擇選擇展開keyboard_arrow_down$/,
    dateAndPrice: '年4月27日 4,800',
    dateAndPrice2: '年4月27日 change_history 4,800'
  },
];

for (const testCase of testCases) {
  test(testCase.name, async ({ page }) => {
    await page.goto('https://bluemagpieresort.rezio.shop/zh-TW/product/Bbookingroom');
    await page.getByRole('button', { name: '關閉' }).click();
    await page.locator('div').filter({ hasText: testCase.text }).getByRole('button').click();
    for (let i = new Date().getMonth() + 1; i < targetMonth; i++) {
      await page.locator('#modal-root').getByRole('button', { name: '›' }).click();
    }
    await expect(page.getByRole('button', { name: testCase.dateAndPrice })).toBeVisible().catch(async () => {
      await expect(page.getByRole('button', { name: testCase.dateAndPrice2 })).toBeVisible();
    });
  });
}
