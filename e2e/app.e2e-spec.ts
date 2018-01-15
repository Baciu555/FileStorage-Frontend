import { TestujemyPage } from './app.po';

describe('testujemy App', function() {
  let page: TestujemyPage;

  beforeEach(() => {
    page = new TestujemyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
