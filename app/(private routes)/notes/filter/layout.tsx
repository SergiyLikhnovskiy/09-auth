import { ReactNode } from "react";
import css from "../LayoutNotes.module.css";
type Props = {
  sidebar: ReactNode;
  children: ReactNode;
};

export default function FilterLayout({ children, sidebar }: Props) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      {children}
    </div>
  );
}
