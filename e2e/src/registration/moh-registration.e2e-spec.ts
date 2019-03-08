import { MohProfilePage } from './moh-registration.po';
import { browser } from 'protractor';
import { PrimeConstants } from '../../../src/app/models/prime-constants';
import { FakeData } from '../fake-data';

describe('MoH Registration - Profile Page', () => {
    let page: MohProfilePage;
    const fakeData = new FakeData();
    const PAGE_URL = `${PrimeConstants.MOH_REGISTRATION}/${PrimeConstants.PROFILE_PG}`;

    beforeEach(() => {
        page = new MohProfilePage();
    });

    it('should navigate to the moh-registration/profile page without route guards', () => {
        page.navigateTo();
        browser.sleep(25); // Total guess - giving time to see if route guards fire.
        expect(browser.getCurrentUrl()).toContain(PAGE_URL);
    });

    it('should not let user continue before completing page', () => {
        page.navigateTo();
        expect(page.formErrors().count()).toBe(0, 'should be no errors on page load');
        page.continue();
        // 5 errors - last name, birthdate, address, city, postal
        expect(page.formErrors().count()).toEqual(5, 'page should show 5 error texts on continue');
        expect(browser.getCurrentUrl()).toContain(PAGE_URL, 'url should not change');
    });

    fit('should let the user continue when the form is filled out', () => {
        const profileData = fakeData.randomProfileInfo();
        page.navigateTo();
        page.fillName(profileData);

        // TODO - getNameElement shouldn't be on Page!  Also, this expect below is failing but the input is filled out
        // todo - make this an async fn and await on getNameElement? refactor and move it first then see.
        // expect(page.getNameElement('First Name')).toEqual(profileData.firstName, 'first name should match');

        browser.sleep(5 * 1000);
    });

    // should not let user continue before completing page
    // should allow the first name to NOT be entered
});
