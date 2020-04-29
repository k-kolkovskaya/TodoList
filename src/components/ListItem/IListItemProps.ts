import { IItem } from "../../entities/Item";

export interface IListItemProps {
    item: IItem;
    deleteItem: (id: string) => void;
    editModeOn: (id: string) => void;
    editModeOff: (id: string, text: string) => void;
}