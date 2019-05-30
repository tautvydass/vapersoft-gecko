import { EventEmitter } from '@angular/core';

export interface ConfirmationModalViewModel {
    title: string;
    body: string;
    buttonName: string;
    onSubmit: EventEmitter<any>;
    useSecondaryButton: boolean;
    secondaryButtonName: string;
    onSecondary: EventEmitter<any>;
}