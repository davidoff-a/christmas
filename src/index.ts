import './sass/index.scss';

import { appModule } from './app/appModule';
import { wfm } from './app/utils/utils';

wfm.delay(2000).then(()=>{appModule.start()});
