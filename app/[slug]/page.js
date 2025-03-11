import { redirect } from "next/navigation";
import styles from "./page.module.css";

const TabContent = ({ params }) => {
  const { slug } = params;
  if (!slug) {
    return redirect("/");
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.content}>{slug}</h1>
    </div>
  );
};

export default TabContent;
