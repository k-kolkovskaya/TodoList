import { IItem } from "../../entities/Item";

export interface IListItemProps {
    item: IItem;
    deleteItem: (id: string) => void;
}