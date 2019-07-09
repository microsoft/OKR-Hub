import { StatusType } from "azure-devops-ui/Status";
export class Objective {
    public Id: string;
    public Name: string;
    public Version: Date;
    public Owner: string[];
    public Area: string[];
    public Target: Date;
    public Progress: number;
    public KRs: KR[];
    public WIT: string[];
    public Status: StatusType;
    public Comments: string[];
    public TimeFrame: string;
}

export class KR {
    public Id: string;
    public Content: string;
    public Status: StatusType;
    public Comment: string;
    public Progress: number; 
}