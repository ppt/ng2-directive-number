import { Ng2DirectiveNumberPage } from './app.po';

describe('ng2-directive-number App', () => {
  let page: Ng2DirectiveNumberPage;

  beforeEach(() => {
    page = new Ng2DirectiveNumberPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
