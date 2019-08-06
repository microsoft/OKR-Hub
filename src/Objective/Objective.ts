import { OKRDocument, IOwnerIdentity } from "../Data/OKRDocument";

export class Objective extends OKRDocument {
    public Name: string;
    public Owner: string[];
    public AreaId: string;
    public KRs: KR[];
    public Comments: string[];
    public TimeFrame: string;
    public Progress: number;
}

export class KR implements IOwnerIdentity {
    public Id: string;
    public Content: string;
    public Status: KRStatus;
    public Comment: string;
    public Score: string;
    public OwnerId: string;
    public OwnerName: string;
}

export declare type KRStatus = "NotStarted" | "OnTrack" | "AtRisk" | "Completed" | "Incomplete" | "Canceled";
