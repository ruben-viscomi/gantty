import { BoardColumnsConfiguration } from "../types";
import { asImmutable } from "../utils";

export const SECOND_IN_MS = 1000;
export const MINUTE_IN_MS = 60 * SECOND_IN_MS;
export const HOUR_IN_MS = 60 * MINUTE_IN_MS;
export const DAY_IN_MS = 24 * HOUR_IN_MS;
export const WORK_WEEK_IN_MS = 5 * DAY_IN_MS;
export const WEEK_IN_MS = 7 * DAY_IN_MS;

export const DEFAULT_BOARD_COLUMNS_CONFIG: BoardColumnsConfiguration = asImmutable({ unit: "month" });