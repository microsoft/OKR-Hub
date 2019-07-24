import { StatusType } from "azure-devops-ui/Status";
import { OKRDocument } from "../Data/OKRDocument";
import { Guid } from "guid-typescript";

export class Objective extends OKRDocument {
    public Name: string;
    public Owner: string[];
    public AreaId: string;
    public KRs: KR[];
    public Comments: string[];
    public TimeFrame: string;
    public Progress: number;
}

export class KR {
    public Id: string;
    public Content: string;
    public Status: StatusType;
    public Comment: string;
}