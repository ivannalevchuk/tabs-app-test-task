import TabItem from "./tab-item";
import styles from "./dropdown.module.css";

const DropDownList = ({ tabs, onClick }) => {

    return (
        <div className={styles["dropdown-container"]}>
        <button onClick={onClick}>˅</button>
        <ul className={styles["dropdown-list"]}>
            {tabs.map((tab) => (
                <TabItem
                    key={tab.id}
                    {...tab}
                />
            ))}
        </ul>
        </div>
    )
};

export default DropDownList;