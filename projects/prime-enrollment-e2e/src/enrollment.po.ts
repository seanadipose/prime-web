import { browser, by, element, WebElement, protractor } from 'protractor';
import { ProfilePageTest, ContactPageTest } from './enrollment.data';
import { PrimeTestPage } from '../../../e2e/src/app.po';
import { NgSelectOption } from '@angular/forms';

export class BaseEnrollmentTestPage extends PrimeTestPage {

    constructor() {
        super();
    }

    navigateTo() {
        return browser.get('/enrolment/profile');
    }

    clickOption(label: string, value: string) {
        element(by.css(`enroll-radio-button[ng-reflect-name="${label}"] label[for^="${value}"]`)).click();
    }
}

export class ProfilePage extends BaseEnrollmentTestPage {

    protected streetField: WebElement;
    constructor() {
        super();
        this.streetField = element(by.css('lib-prime-address [id^="street"]'));
    }

    async fillPreferredName(data: ProfilePageTest) {
        (await this.getNameComponent('Preferred First Name')).sendKeys(data.preferredFirstName);
        if (data.preferredMiddleName) {
          (await this.getNameComponent('Preferred Middle Name')).sendKeys(data.preferredMiddleName);
        }
        (await this.getNameComponent('Preferred Last Name')).sendKeys(data.preferredLastName);
      }

    fillMailingAddress(data: ProfilePageTest) {
      element(by.css('lib-prime-address:nth-child(1) [id^="street"]')).sendKeys(data.address);
      element(by.css('lib-prime-address:nth-child(1) [id^="city"]')).sendKeys(data.city);
      element(by.css('lib-prime-address:nth-child(1) [id^="postal"]')).sendKeys(data.postal);
    }

    checkEnabled() {
        return this.streetField.isEnabled();
    }
}

export class ContactPage extends BaseEnrollmentTestPage {

    private contactMethod: string[] = ['email', 'phone', 'both'];
    private num: number = Math.floor(Math.random() * Math.floor(this.contactMethod.length));

    constructor() {
      super();
    }

    navigateTo() {
        return browser.get('/enrolment/contact');
    }

    clickContactMethod() {
        element(by.css(`div label[for^="${this.contactMethod[this.num]}"]`)).click();
    }

    fillContactInfo(data: ContactPageTest) {
        this.clickContactMethod();
        element(by.css('div input[ng-reflect-name^="email"]')).sendKeys(data.email);
        element(by.css('div input[ng-reflect-name^="phone"]')).sendKeys(data.mobile);
        element(by.css('input[ng-reflect-name^="voicePhone"]')).sendKeys(data.mobile);
        element(by.css('div input[ng-reflect-name^="ext"]')).sendKeys(data.extension);
    }

    fillRequiredFields(data: ContactPageTest) {
        this.clickContactMethod();
        element(by.css('div input[ng-reflect-name^="email"]')).sendKeys(data.email);
        element(by.css('div input[ng-reflect-name^="phone"]')).sendKeys(data.mobile);
        element(by.css('div input[ng-reflect-name^="ext"]')).sendKeys(data.extension);
    }

    getErrorTextVal(label: string) {
        return element(by.css(`enroll-error[label="${label}"] span`)).getText();
    }

    getInputTextVal(label: string) {
        return element(by.css(`input[ng-reflect-name^="${label}"]`)).getAttribute('value');
    }
}

export class ProfessionalPage extends BaseEnrollmentTestPage {

    constructor() {
      super();
    }

    navigateTo() {
        return browser.get('/enrolment/professional');
    }

    checkDeviceProvider(inputVal: string) {
        return element(by.css(`label[for="${inputVal}"]`)).isSelected();
    }

    clickYesForDeviceProvider() {
        element(by.css('enroll-radio-button[name="dp"] label[for="dptrue"]')).click();
    }

    typeDeviceProviderNum(dpNum: string) {
        element(by.css('input[id="device"]')).sendKeys(dpNum);
    }
}

export class SelfDeclarationPage extends BaseEnrollmentTestPage {

    constructor() {
      super();
    }

    navigateTo() {
        return browser.get('/enrolment/self-declaration');
    }

    clickOptions(label: string, answer: string) {
        element(by.css(`enroll-yes-no[ng-reflect-label="${label}"] label[for^="${answer}"]`)).click();
    }

    checkTips() {
        element(by.css('aside[_ngcontent-c10]')).isDisplayed();
    }

    typeDescription(label: string, text: string) {
        element(by.css(`textarea[ng-reflect-name="${label}"]`)).sendKeys(text);
    }

    uploadFile() {
        element(by.css('label[for^="fileUploadBrowse"]')).click();

        const path = require('path');

        it('should upload a file', function() {
        const fileToUpload = '../Desktop/sample.txt';
        const absolutePath = path.resolve(__dirname, fileToUpload);

        // ((JavascriptExecutor)driver).executeScript("arguments[0].style.visibility = 'visible'; arguments[0].style.height = '1px'; arguments[0].style.width = '1px'; arguments[0].style.opacity = 1", fileUploadElement);
        element(by.css('input[type="file"]')).sendKeys(absolutePath);
        element(by.id('uploadButton')).click();
        });

        /*
       const path = require('path');
       const fileToUpload = '../Desktop/sample.txt';
       const absolutePath = path.resolve(__dirname, fileToUpload);

        browser.executeAsyncScript(function(callback) {
            // You can use any other selector
            document.querySelectorAll('#input-file-element')[0].style.display = 'inline';
            callback();
        });

          // Now you can upload.
          $('input[type="file"]').sendKeys(absolutePath);
          $('#uploadButton').click();
        */
    }

    getErrorTextVal(label: string){
        return element(by.css(`enroll-error[ng-reflect-label="${label}"] span`)).getText();
    }

    getInputTextVal() {
        // return element(by.css('form span[class="col"]')).getAttribute('value');
    }
}

export class PharmanetAccessPage extends BaseEnrollmentTestPage {

    constructor() {
        super();
    }

    navigateTo() {
        return browser.get('/enrolment/pharmanet-access');
    }

    selectTypeOfOrg(option: string) {
        this.selectOption('type', option);
    }

    typeValue(label: string, value: string) {
        element(by.css(`input[id="${label}"]`)).sendKeys(value);
    }

    clickCheckBox(value: string) {
        element(by.cssContainingText('span', value)).click();
    }

    selectDate() {
        element(by.css('common-datepicker[ng-reflect-name="endDate"] button[class="btn btn-default"]')).click();
        element(by.cssContainingText('div[class="datevalue currmonth"] span', '30')).click();
        /*
        const EC = protractor.ExpectedConditions;
        browser.wait(EC.presenceOf(element(by.css('btn btn-default'))), 5000).then(() => {
            element(by.css('btn btn-default')).click(); // This will click calendar icon
            const d = new Date().getDate() + 1; // This will get you next day value
        });
        // Write your code to find next day element and click it using click() function
        // Hint: Each day is a "div" with class "btn-light" and day as content of that div element  
        */
    }

}

export class ReviewPage extends BaseEnrollmentTestPage {

    constructor() {
      super();
    }

    navigateTo() {
        return browser.get('/enrolment/review');
    }

    clickSubmit() {
        element(by.css('button[class^="btn btn-lg"]')).click();
    }

}
