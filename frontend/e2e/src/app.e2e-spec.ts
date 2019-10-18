import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display the footer', () => {
    page.navigateTo();
    expect(page.getFooterText()).toContain('2018');
  });
});
