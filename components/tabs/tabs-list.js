import { useState, useEffect, useRef } from "react";
import DropDownList from "./drop-down-list";
import TabItem from "./tab-item";
import { useDrop } from "react-dnd";
import styles from "./tabs.module.css";
import { ItemTypes } from "@/util/item-types";

const TabsList = ({ tabs, onDelete }) => {
  const [visibleTabs, setVisibleTabs] = useState(tabs);
  
  const tabRefs = useRef([]);
  useEffect(() => {
    setVisibleTabs(tabs);
  }, [tabs]);
  const moveTab = (dragIndex, hoverIndex) => {
    console.log("previous array: ", visibleTabs);
    setVisibleTabs((prevTabs) => {
      const newTabs = [...prevTabs];
      const draggedTab = newTabs[dragIndex];

      newTabs.splice(dragIndex, 1);
      newTabs.splice(hoverIndex, 0, draggedTab);

      console.log("Updated Tabs:", newTabs);
      return [...newTabs];
    });
  };

  const findTab = (id) => {
    return visibleTabs.findIndex((tab) => tab.id === id);
  };

  const [, drop] = useDrop({
    accept: ItemTypes.TAB,
    hover: (item, monitor) => {
      const dragIndex = findTab(item.id);
      console.log("dragIndex1", dragIndex);
      const hoverIndex = visibleTabs.findIndex((tab, i) => {
        const ref = tabRefs.current[i];
        if (!ref) return false;

        const hoverBoundingRect = ref.getBoundingClientRect();
        const hoverMiddleX =
          (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientX = clientOffset.x - hoverBoundingRect.left;

        return hoverClientX < hoverMiddleX;
      });

      if (dragIndex !== hoverIndex && hoverIndex !== -1) {
        moveTab(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    },
  });
  const togglePin = (id) => {
    setVisibleTabs((prevTabs) => {
      const updatedTabs = [...prevTabs];
      const index = updatedTabs.findIndex((tab) => tab.id === id);
      if (index !== -1) {
        const tab = updatedTabs[index];
        const isPinned = tab.isPinned ?? false;
  
        updatedTabs[index] = { ...tab, isPinned: !isPinned };
  
        return updatedTabs.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
      }
      return prevTabs;
    });
  };
  
  const sortedTabs = [...visibleTabs].sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

  console.log("sorted", sortedTabs);

  return (
    <div ref={drop} className={styles["tabs-list"]}>
      {sortedTabs.map((tab, index) => (
        <TabItem
          key={tab.id}
          {...tab}
          onDelete={onDelete}
          index={index}
          icon={tab.icon}
          ref={(el) => (tabRefs.current[index] = el)}
          onPin={togglePin}
          isPinned={tab.isPinned}
        />
      ))}
    </div>
  );
};

export default TabsList;
