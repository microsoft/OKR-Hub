import { OKRDocument } from "../Data/OKRDocument";

export class TimeFrame {
    public id: string; 
    public name: string; 
    public order: number;    
}

export class TimeFrameSet extends OKRDocument {
    public timeFrames: TimeFrame[]; 
    public currentTimeFrameId: string;
}