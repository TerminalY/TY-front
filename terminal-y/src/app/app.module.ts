import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material-module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { ClothesComponent } from './views/clothes/clothes.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './views/main-page/main-page.component';
import { ViewCardComponent } from './dialogs/view-card/view-card.component';
import { CartItemsComponent } from './components/cart-items/cart-items.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };


const appRoutes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }

  
];

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ClothesComponent,
    LoginComponent,
    RegisterComponent,
    MainPageComponent,
    ViewCardComponent,
    CartItemsComponent
  ],
  exports: [RouterModule],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
      // { enableTracing: true } // <-- debugging purposes only
    ),
    SocketIoModule.forRoot(config)

  ],
  entryComponents: [ViewCardComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
