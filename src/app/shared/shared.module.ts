import { NgModule } from '@angular/core';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DropdownDirective, LoadingSpinnerComponent],
  imports: [CommonModule],
  exports: [CommonModule, DropdownDirective, LoadingSpinnerComponent],
})
export class SharedModule {}
