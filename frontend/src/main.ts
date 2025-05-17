import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Inicia la aplicacion Ionic Angular
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));


