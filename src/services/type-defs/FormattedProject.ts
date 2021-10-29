import { Project } from "./Project";

export type FormattedProject = Project & {
  ownerName: string;
  beginsAtFullDate: string;
  finishesAtFullDate: string;
};
