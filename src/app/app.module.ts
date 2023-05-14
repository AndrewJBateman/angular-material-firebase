import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire/compat';
import { IConfig, NgxMaskDirective, provideEnvironmentNgxMask, NgxMaskPipe } from 'ngx-mask';

import { AppComponent } from './app.component';
import { ListProjectsComponent } from './projects/components/list-projects/list-projects.component';
import { MaterialModule } from './shared/material.module';
import { environment } from 'src/environments/environment';
import { DeleteComponent } from './projects/dialogs/delete/delete.component';
import { CreateditComponent } from './projects/dialogs/createdit/createdit.component';

import { SvgSunComponent } from './shared/components/svg-sun/svg-sun.component';
import { SvgMoonComponent } from './shared/components/svg-moon/svg-moon.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    CreateditComponent,
    DeleteComponent,
    ListProjectsComponent, SvgSunComponent, SvgMoonComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    NgxMaskDirective, NgxMaskPipe,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [provideEnvironmentNgxMask()],
  bootstrap: [AppComponent],
})
export class AppModule {}
