import { OKRDocument } from "../Data/OKRDocument";
import { TimeFrame } from "../TimeFrame/TimeFrame";

export class Objective extends OKRDocument {
    public Name: string;
    public Owner: string[];
    public AreaId: string;
    public KRs: KR[];
    public Comments: string[];
    public TimeFrame: TimeFrame;
    public Progress: number;
}

export class KR {
    public Id: string;
    public Content: string;
    public Status: KRStatus;
    public Comment: string;
    public Score: string;
}

export declare type KRStatus = "NotStarted" | "OnTrack" | "AtRisk" | "Completed" | "Incomplete" | "Canceled";
