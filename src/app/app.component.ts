import { OverlayContainer } from "@angular/cdk/overlay";
import { Component, HostBinding } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent {
	title = "angular-material-firebase";

  // initialise form-control instance
	toggleControl = new FormControl(false);

	// set the class dynamically
	@HostBinding("class") className = "";

	constructor(private overlay: OverlayContainer) {}

	ngOnInit(): void {
		// dark-mode toggle - adds darkmode class when darkmode boolean true
		this.toggleControl.valueChanges.subscribe(darkMode => {
			const darkClassName = "darkMode";
			this.className = darkMode ? darkClassName : "";
			if (darkMode) {
				this.overlay.getContainerElement().classList.add(darkClassName);
			} else {
				this.overlay.getContainerElement().classList.remove(darkClassName);
			}
		});
	}
}
