import { OKRDocument, IOwnerIdentity } from "../Data/OKRDocument";

export class Area extends OKRDocument implements IOwnerIdentity{
    AreaId: string;
    Name: string;
    Version: number;
    Description: string;
    OwnerId: string;
    OwnerName: string;
}