import { ReactNode } from "react";
import css from "./LayoutNotes.module.css";
interface Props {
  children: ReactNode;
}

export default function LayoutNotes({ children }: Props) {
  return (
    <div className={css.container}>
      <main className={css.notesWrapper}>{children}</main>
    </div>
  );
}
