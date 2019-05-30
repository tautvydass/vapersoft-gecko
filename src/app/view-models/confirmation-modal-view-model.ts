import { EventEmitter } from '@angular/core';

export interface ConfirmationModalViewModel {
    title: string;
    body: string;
    buttonName: string;
    onSubmit: EventEmitter<any>;
}