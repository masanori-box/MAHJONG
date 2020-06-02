import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button'; //ボタン
import { MatTabsModule } from '@angular/material/tabs'; //タブ
import { MatTableModule } from '@angular/material/table'; //テーブル
import { MatPaginatorModule } from '@angular/material/paginator'; //ページネーション
import { MatFormFieldModule } from '@angular/material/form-field'; //フォームフィールド
import { MatSortModule } from '@angular/material/sort'; //ソート
import { MatInputModule } from '@angular/material/input'; //入力エリア
import { MatIconModule } from '@angular/material/icon'; //アイコン
import { MatRadioModule } from '@angular/material/radio'; //ラジオボタン
import { RecordComponent } from './record/record.component';
import { RegisterComponent } from './register/register.component';

const appRoutes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'record', component: RecordComponent },
];

@NgModule({
  declarations: [AppComponent, RecordComponent, RegisterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    MatRadioModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
