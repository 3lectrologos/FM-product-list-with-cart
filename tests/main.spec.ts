import { test } from '@playwright/test'

test.describe('screenshot-desktop', () => {
  test.use({
    viewport: { width: 1440, height: 1024 },
  })

  test('screenshot-desktop', async ({ page, browserName }) => {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' })
    await page.waitForTimeout(1000)
    await page.screenshot({
      path: `./screenshots/empty-desktop-${browserName}.png`,
      fullPage: false,
    })

    const buttons = await page.getByText('Add to Cart').all()
    await buttons[1].click()
    await buttons[4].click()
    await page.waitForTimeout(1000)
    await page.screenshot({
      path: `./screenshots/order-desktop-${browserName}.png`,
      fullPage: false,
    })

    await page.getByText('Confirm Order').click()
    await page.waitForTimeout(1000)
    await page.screenshot({
      path: `./screenshots/confirm-desktop-${browserName}.png`,
      fullPage: false,
    })
  })
})

test.describe('screenshot-tablet', () => {
  test.use({
    viewport: { width: 768, height: 1280 },
  })

  test('screenshot-tablet', async ({ page, browserName }) => {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' })
    await page.waitForTimeout(1000)
    await page.screenshot({
      path: `./screenshots/empty-tablet-${browserName}.png`,
      fullPage: false,
    })

    const buttons = await page.getByText('Add to Cart').all()
    await buttons[1].click()
    await buttons[4].click()
    await page.waitForTimeout(1000)
    await page.screenshot({
      path: `./screenshots/order-tablet-${browserName}.png`,
      fullPage: false,
    })

    await page.getByText('Confirm Order').click()
    await page.waitForTimeout(1000)
    await page.screenshot({
      path: `./screenshots/confirm-tablet-${browserName}.png`,
      fullPage: false,
    })
  })
})

test.describe('screenshot-mobile', () => {
  test.use({
    viewport: { width: 375, height: 620 },
  })

  test('screenshot-mobile', async ({ page, browserName }) => {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' })
    await page.waitForTimeout(1000)
    await page.screenshot({
      path: `./screenshots/empty-mobile-${browserName}.png`,
      fullPage: false,
    })

    const buttons = await page.getByText('Add to Cart').all()
    await buttons[1].click()
    await buttons[4].click()
    await page.waitForTimeout(1000)
    await page.screenshot({
      path: `./screenshots/order-mobile-${browserName}.png`,
      fullPage: false,
    })

    await page.getByText('Confirm Order').click()
    await page.waitForTimeout(1000)
    await page.screenshot({
      path: `./screenshots/confirm-mobile-${browserName}.png`,
      fullPage: false,
    })
  })
})
