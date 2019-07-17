import { OKRDocument } from "../Data/OKRDocument";

export class Area extends OKRDocument {
    AreaId: string;
    Name: string;
    Version: number;
    Description: string;
    OwnerId: string;
}