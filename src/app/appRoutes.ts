import { appHomePage } from "./pages/appHomePage";
import { appNotFound } from "./pages/appNotFound";
import { appToysPage } from "./pages/appToysPage";
import { appTreesPage } from "./pages/appTreesPage";

const appRoutes = [
  { path: "", component: appHomePage },
  { path: "toys", component: appToysPage },
  { path: "trees", component: appTreesPage },
  { path: "**", component: appNotFound },
  
]

export { appRoutes };