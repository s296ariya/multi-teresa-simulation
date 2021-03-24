import { Component, VERSION, ViewChild } from "@angular/core";
import { Result } from "./result.model";
import { SetupComponent } from "./setup.component";
import { runSimulation } from "./simulation";

@Component({
  selector: "multi-teresa-simulation",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular " + VERSION.major;
  result: Result = new Result();

  @ViewChild(SetupComponent)
  private setupComponent: SetupComponent;

  runSimulation(): void {
    this.result = runSimulation(this.setupComponent.form.value);
  }

  padLeft(num:number, size:number): string {
    size = Math.floor(Math.log10(size));
    return (String(' ').repeat(size) + String(num)).substr( (size * -1), size) ;
  }
}
