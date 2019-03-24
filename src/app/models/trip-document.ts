export interface TripDocument {
    id: number;
    documentType: TripDocumentType;
    status: Status;
    json: string;
}