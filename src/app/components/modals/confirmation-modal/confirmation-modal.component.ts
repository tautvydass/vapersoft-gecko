import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalViewModel } from 'src/app/view-models/confirmation-modal-view-model';

@Component({
  selector: 'confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {

  @Input()
  viewModel: ConfirmationModalViewModel;

  constructor(public activeModal: NgbActiveModal) { }

  cancel(): void {
    this.activeModal.close('Close click')
  }

  primaryButtonClick(): void {
    this.viewModel.onSubmit.emit();
    this.activeModal.close('Close click');
  }

  secondaryButtonClick(): void {
    this.viewModel.onSecondary.emit();
    this.activeModal.close('Close click');
  }

}
