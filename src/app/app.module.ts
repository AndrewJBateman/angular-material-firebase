import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire/compat';

import { AppComponent } from './app.component';
import { ListProjectsComponent } from './projects/components/list-projects/list-projects.component';
import { MaterialModule } from './shared/material.module';
import { environment } from 'src/environments/environment';
import { DeleteComponent } from './projects/dialogs/delete/delete.component';
import { CreateditComponent } from './projects/components/createdit/createdit.component';

@NgModule({
  declarations: [
    AppComponent,
    ListProjectsComponent,
    DeleteComponent,
    CreateditComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
