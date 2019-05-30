import { EventEmitter } from '@angular/core';

export interface DocumentViewModel {
    onDocumentAdded: EventEmitter<Document>;
    onDocumentRemoved: EventEmitter<Document>;
}