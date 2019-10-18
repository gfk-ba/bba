import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getFooterText() {
    return element(by.css('dcs-root footer div')).getText();
  }
}
