export interface UsageStat {
    application: 'POETRY-DB';
    action: string;
    user?: string;
    tymestampIso: string;
    other?: any;
}
