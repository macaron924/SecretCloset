import { persisted } from "svelte-persisted-store";
import type { CardInventory, ItemInventory, RankList } from "./types";

export const cardInventoryStore = persisted("cardPosData", {} as CardInventory);
export const itemInventoryStore = persisted("itemPosData", {} as ItemInventory);
export const rankListStore = persisted("itemPosData", {} as RankList);
