import { test, expect } from '@playwright/test';

const UI_URL = "localhost:5173/";

test('nên cho phép người dùng đăng nhập', async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", {name: "Đăng nhập" }).click();

  await expect(page.getByRole("heading", { name: "Đăng nhập" })).toBeVisible();

  await page.locator("[name=email]").fill("bodoi15122003@gmail.com");
  await page.locator("[name=password]").fill("huongtra1711");

  await page.getByRole("button", { name: "Đăng nhập" }).click();

  await expect(page.getByText("Đăng nhập thành công")).toBeVisible();

  await expect(page.getByRole("link", { name: "Khách sạn của tôi" } )).toBeVisible();
  await expect(page.getByRole("link", { name: "Lịch đặt của tôi" } )).toBeVisible();
  await expect(page.getByRole("button", { name: "Đăng xuất" } )).toBeVisible();
});

test('nên cho phép người dùng đăng ký', async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", {name: "Đăng ký" }).click();
  await expect(page.getByRole("heading", {name: "Hãy điền form để tạo tài khoản" })).toBeVisible();

  await page.locator("[name=firstname]").fill("test_1");
  await page.locator("[name=lastName]").fill("test_1");
  await page.locator("[name=email]").fill("test@gmail.com");
  await page.locator("[name=password]").fill("123456");
  await page.locator("[name=confirmPassword]").fill("123456");

  await page.getByRole("button", { name: "Đăng ký" }).click();

  await expect(page.getByText("bạn đã đăng ký thành công")).toBeVisible();

  await expect(page.getByRole("link", { name: "Khách sạn của tôi" } )).toBeVisible();
  await expect(page.getByRole("link", { name: "Lịch đặt của tôi" } )).toBeVisible();
  await expect(page.getByRole("button", { name: "Đăng xuất" } )).toBeVisible();

})

