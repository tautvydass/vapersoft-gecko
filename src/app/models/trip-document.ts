import { Status } from './enums/status';
import { TripDocumentType } from './enums/trip-document-type';

export interface TripDocument {
    id: number;
    documentType: TripDocumentType;
    status: Status;
    json: string;
}