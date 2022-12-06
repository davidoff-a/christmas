import { AppComponent } from '../appComponent';
import { router } from '../utils/router';
import { wfm } from '../utils/utils';

export class Module {
  components: AppComponent[];

  bootstrapComponent: AppComponent;

  routes: { path: string; component: AppComponent }[];

  constructor(config: {
    components: AppComponent[];
    bootstrap: AppComponent;
    routes: { path: string; component: AppComponent }[];
  }) {
    this.components = config.components;
    this.bootstrapComponent = config.bootstrap;
    this.routes = config.routes;
  }

  start() {
    this.initComponents();

    if (this.routes) {
      this.initRoutes();
    }
  }

  initComponents() {
    this.bootstrapComponent.render();
    this.components.forEach(this.renderComponent.bind(this));
  }

  initRoutes() {
    window.addEventListener('hashchange', this.renderRoute.bind(this));
    this.renderRoute();
  }

  renderRoute() {
    const url = router.getUrl();
    let route = this.routes.find((r) => r.path === url);

    if (wfm.isUndefined(route)) {
      route = this.routes.find((r) => r.path === '**');
    }

    const $selector = document.querySelector('.content');
    if ($selector && route) {
      $selector.innerHTML = `<${route.component.selector}></${route.component.selector}>`;
      this.renderComponent(route.component);
      const $choosenMenuItem = document.querySelector(`[data-active = "${route.path}"]`);
      if ($choosenMenuItem) {
        this.breadCrumps();
        $choosenMenuItem.classList.add('active');
      }
    }
  }

  breadCrumps() {
    const $menuItems = document.querySelectorAll('.nav__item');
    if ($menuItems instanceof NodeList) {
      $menuItems.forEach((item) => (item.classList.contains('active') ? item.classList.remove('active') : item));
    }
  }

  renderComponent(c: AppComponent): void {
    c.render();
  }
}
