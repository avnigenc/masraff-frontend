import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MetaDataService } from './services/meta-data.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthComponent } from './auth/auth.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DataListComponent } from './data-list/data-list.component';
import { EditButtonComponent } from './atomic/edit-button/edit-button.component';
import { CreateOrUpdateExpenseComponent } from './molecular/create-or-update-expense/create-or-update-expense.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CreateButtonComponent } from './atomic/create-button/create-button.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AuthComponent,
    DataListComponent,
    EditButtonComponent,
    CreateOrUpdateExpenseComponent,
    CreateButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    ScrollingModule,
    Ng2SmartTableModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule
  ],
  providers: [MetaDataService],
  bootstrap: [AppComponent],
  entryComponents: [CreateButtonComponent, EditButtonComponent, CreateOrUpdateExpenseComponent]
})
export class AppModule { }
