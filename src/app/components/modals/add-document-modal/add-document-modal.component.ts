import { Component, Input, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { DocumentViewModel } from 'src/app/view-models/document-view-model';
import { Subject, Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

export interface DocumentType {
  display: string;
  value: string;
}

@Component({
  selector: 'add-document-modal',
  templateUrl: './add-document-modal.component.html',
  styleUrls: ['./add-document-modal.component.css']
})
export class AddDocumentModalComponent {

  types: DocumentType[] = [
    {
      display: "Hotel Reservation",
      value: "hotelReservation"
    },
    {
      display: "Transportation Ticket",
      value: "transportationTicket"
    },
    {
      display: "Event Ticket",
      value: "eventTicket"
    }
  ];

  @Input()
  viewModel: DocumentViewModel;

  documentTypeModel: DocumentType;
  selectedDocumentType: string;

  @ViewChild('documentTypeInstance') documentTypeInstance: NgbTypeahead;
  documentTypeFocus$ = new Subject<string>();
  documentTypeClick$ = new Subject<string>();

  showErrorAlert: boolean = false;
  errorMessage: string = null;

  constructor(public activeModal: NgbActiveModal) { }

  save(): void {
    if (true) {
      this.showErrorAlert = true;
      this.errorMessage = "Something wrong happened...";
    } else {
      this.activeModal.close('Close click')
    }
  }

  closeErrorAlert(): void {
    this.showErrorAlert = false;
  }

  // Document Type selection

  documentTypeSearch = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.documentTypeClick$.pipe(filter(() => !this.documentTypeInstance.isPopupOpen()));
    const inputFocus$ = this.documentTypeFocus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.types : this.types
      .filter(documentType => documentType.value.toLowerCase().indexOf(term.toLowerCase()) > -1 || documentType.display.toLowerCase().indexOf(term.toLowerCase())))
      .slice(0, 10))
    );
  }

  documentTypeSelect(selected: any): void {
    this.selectedDocumentType = selected.item.value;
  }

  documentTypeFormatter = (documentType: DocumentType) => documentType.display;

  onDocumentTypeBlur(): void {
    if ((typeof this.documentTypeModel) === "string") {
      this.documentTypeModel = null;
      this.selectedDocumentType = null;
    }
  }

}
