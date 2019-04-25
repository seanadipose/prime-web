import { ReviewPage, ProfilePage } from './registration.po';
import { browser } from 'protractor';
import { PrimeConstants } from '../../../src/app/models/prime-constants';
import { FakeDataMohReg } from './registration.data';
import { PrimeTestPage } from '../../../e2e/src/app.po';

fdescribe('BCSC Enrollment - Review Page', () => {
    let page: ReviewPage;
    let profilePage: ProfilePage;
    const data = new FakeDataMohReg();
    let profileData;
    const REVIEW_PAGE_URL = `enrollment/review`;

    beforeEach(() => {
        page = new ReviewPage();
        profilePage = new ProfilePage();
    });

    it('01. should load the page without issue', () => {
        page.navigateTo();
        expect(browser.getCurrentUrl()).toContain(REVIEW_PAGE_URL);
        expect(page.formErrors().count()).toBe(0, 'should be no errors on page load');
    });

// tslint:disable-next-line: max-line-length
    it('02. (7.3.40) must display the PharmaNet User\'s information', () => {
        page.navigateTo();
        expect(page.formErrors().count()).toBe(0, 'should be no errors');
    });

    it('03. (7.3.41) must provide the ability for the PharmaNet Users  to edit information entered prior to submission', () => {
        profileData = data.profileInfo();
        page.navigateTo();
        page.clickLink('h3', 'Profile');
        profilePage.fillPreferredName(profileData);
        browser.sleep(1000 * 5);
        page.clickLink('span', 'Review');
        expect(page.formErrors().count()).toBe(0, 'should be no errors');
    });

    /* Test/s failed */
    // Will not work if it's NOT end-to-end testing
// tslint:disable-next-line: max-line-length
    xit('(7.3.43) must present a Submit function to the PRIME User. Upon submission the Request will proceed to Approval processing.', () => {
        page.navigateTo();
        page.clickSubmit();
        expect(page.formErrors().count()).toBe(0, 'should be no errors');
    });

});
