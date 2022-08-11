import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { InfoAlertComponent } from "./info-alert/info-alert.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { WarningAlertComponent } from "./warning-alert/warning-alert.component";

@NgModule({
    declarations: [
        AlertComponent,
        WarningAlertComponent,
        InfoAlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective
    ],
    imports: [
        CommonModule  
    ],
    exports: [
        AlertComponent,
        WarningAlertComponent,
        InfoAlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective,
        CommonModule
    ]
})
export class SharedModule {}