import { AppComponent, appComponent } from './appComponent';
import { appFooter } from './common/appFooter';
import { appHeader } from './common/appHeader';
// import { appHomePage } from "./pages/appHomePage";
import { Module } from './core/module';
import { appRoutes } from './appRoutes';

export class AppModule extends Module {
  constructor(config: {
    components: AppComponent[];
    bootstrap: AppComponent;
    routes: { path: string; component: AppComponent }[];
  }) {
    super(config);
  }
}

export const appModule = new AppModule({
  components: [appHeader, appFooter],
  bootstrap: appComponent,
  routes: appRoutes,
});
