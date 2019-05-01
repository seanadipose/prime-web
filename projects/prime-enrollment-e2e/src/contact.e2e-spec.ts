import { browser } from 'protractor';
import { PrimeTestPage } from '../../../e2e/src/app.po';
import { ContactPage } from './enrollment.po';
import { FakeDataEnrollment } from './enrollment.data';

fdescribe('BCSC Enrollment- Contact Page', () => {
    let page: ContactPage;
    const data = new FakeDataEnrollment();
    let contactData;
    const CONTACT_PAGE_URL = `enrolment/contact`;
    const PROFESSIONAL_PAGE_URL = `enrolment/professional`;

    beforeEach(() => {
        page = new ContactPage();
        contactData = data.contactInfo();
        data.setSeed(123);
    });

    it('01. should load the page without issue', () => {
        page.navigateTo();
        expect(browser.getCurrentUrl()).toContain(CONTACT_PAGE_URL);
        expect(page.formErrors().count()).toBe(0, 'should be no errors on page load');
    });

    it('02. should NOT let the user to continue when the required fields are not filled out', () => {
        page.navigateTo();
        page.continue();
        expect(browser.getCurrentUrl()).toContain(CONTACT_PAGE_URL);
        // expect(page.getContinueButton()).toBe(false);
    });

    fit('03. should let user to continue when all the fields are filled out', () => {
        page.navigateTo();
        page.clickOption('preferredContact', 'email');
        page.fillContactInfo(contactData);
        browser.sleep(1000 * 5);
        page.continue();
        expect(browser.getCurrentUrl()).toContain(PROFESSIONAL_PAGE_URL);
    });

    fit('04. should let user to continue even if extension number is not filled out (because it is optional)', () => {
        contactData['extension'] = '';
        page.navigateTo();
        page.clickOption('preferredContact', 'email');
        page.fillContactInfo(contactData);
        browser.sleep(1000 * 5);
        page.continue();
        expect(browser.getCurrentUrl()).toContain(PROFESSIONAL_PAGE_URL);
    });

    /* FOR FUTURE TESTS */
    // should make sure email address is unique

});
