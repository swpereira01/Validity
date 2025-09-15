import { test } from '@playwright/test';
import { Homepage } from '../page-objects/Hompage';
import { Categories } from '../page-objects/Categories';

test.describe('User should be able to open the dropdown and select a category' , () => {
    let homepage;
    let categories;
    test.beforeEach(async ({ page }) => {
      homepage = new Homepage(page);
      categories = new Categories(page);
      homepage.goto();
    });
    test("User searches for a category, selects it and sees the correct input values on the page", () => {
        categories.openDropdown();
        categories.searchForCategory("Personal Info");
        categories.selectCategory("Personal Info");
        categories.confirmSelection();
        categories.closeDropdown();
        categories.verifyInputVisibility("Personal Info")
    })
    test("User selects mutliple categories and sees the correct input values on the page", () => {
        categories.openDropdown();
        categories.selectCategory("ID");
        categories.selectCategory("General Info");
        categories.confirmSelection();
        categories.closeDropdown();
        categories.verifyInputVisibility("ID")
        categories.verifyInputVisibility("General Info")
    })
    test("User selects multiple categories and verifies the badges and inline texts on the page", () => {
        categories.openDropdown();
        categories.selectCategory("Personal Info")
        categories.selectCategory("Contact Info")
        categories.confirmSelection();
        categories.closeDropdown();
        categories.verifyselectionBadge("Personal Info");
        categories.verifyInputVisibility("Contact Info");
    })
});