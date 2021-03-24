import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { SetupComponent } from "./setup.component";

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule],
  declarations: [AppComponent, SetupComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
