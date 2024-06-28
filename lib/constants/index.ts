import { BoardColumnsConfiguration } from "../types";
import { asImmutable } from "../core/memory";

export const DEFAULT_BOARD_COLUMNS_CONFIG: BoardColumnsConfiguration = asImmutable({ unit: "week" });