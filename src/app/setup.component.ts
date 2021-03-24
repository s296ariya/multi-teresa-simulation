import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Teresa } from "./teresa.model";

@Component({
  selector: "setup",
  templateUrl: "./setup.component.html"
})
export class SetupComponent {
  readonly numTeresaOptions = [1, 2, 3, 4, 5, 6];
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      numTeresas: [2],
      teresas: this.formBuilder.array(
        Array.from({ length: 2 }, () => this.newFormGroup())
      ),
      numRuns: [100000]
    });
  }

  get teresas() {
    return this.form.get("teresas") as FormArray;
  }

  newFormGroup() {
    return this.formBuilder.group(new Teresa());
  }

  numTeresaChange(event) {
    while (this.teresas.length != this.form.value.numTeresas) {
      if (this.teresas.length > this.form.value.numTeresas) {
        this.teresas.removeAt(this.teresas.length - 1);
      } else if (this.teresas.length < this.form.value.numTeresas) {
        this.teresas.push(this.newFormGroup());
      }
    }
  }
}
