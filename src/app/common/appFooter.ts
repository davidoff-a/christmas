import { Component } from '../core/component';

class AppFooter extends Component {
  constructor(config: { selector: string; template: string }) {
    super(config);
  }
}

export const appFooter = new AppFooter({
  selector: '.footer',
  template: `
    <div class="container">
      <div class="footer__wrapper">
        <a href="https://github.com/davidoff-a/" class="footer__link"><div class="author">Davidoff-A</div></a>
        <div class="rs-logo">
        <a href="https://rs.school/" class="footer__link"><img src="./assets/rss.svg" alt="rsschool logo"
            class="rss-logo" /></a>
        </div>
        </div>
    </div>
    `,
});
