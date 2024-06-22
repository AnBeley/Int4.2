import { test, expect } from "@playwright/test";
import { email, password } from "../data/user";

const user = "playwright2/user.js";

test("Positive", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill(password);
  await page.getByTestId("login-submit-btn").click();
  await page.waitForURL("https://netology.ru/profile/8426115");
  await expect(page.getByRole("heading", { name: "Моё обучение" })).toBeVisible(
    { timeout: 300000 }
  );
  await expect(page.locator("h2")).toContainText("Моё обучение");
});
test("Negative", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill("Qwerty");
  await page.getByTestId("login-submit-btn").click();
  await expect(page.getByTestId("login-error-hint")).toBeVisible();
  await expect(page.getByTestId("login-error-hint")).toContainText(
    "Вы ввели неправильно логин или пароль"
  );
});
