import { persisted } from "svelte-persisted-store";
import type { CardInventory } from "./types";

export const cardInventoryStore = persisted("cardPosData", {} as CardInventory);
export const itemInventoryStore = persisted("itemPosData", {});
