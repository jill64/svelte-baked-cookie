import { expect, test } from '@playwright/test'

test('smoke', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: 'svelte-baked-cookie' })
  ).toBeVisible()

  await page.getByPlaceholder('key1').fill('value1')

  await page.reload()

  await expect(page.getByPlaceholder('key1')).toHaveValue('value1')

  await expect(
    page.getByText('key3: ["value","set","by","server"]')
  ).toBeVisible()
})
