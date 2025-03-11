"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useDrag } from "react-dnd";
import styles from "./tabs.module.css";
import { ItemTypes } from "@/util/item-types";
import { forwardRef, useState } from "react";

const TabItem = forwardRef(function TabItem(
  {
    title,
    slug,
    onDelete,
    id,
    index,
    icon,
    onPin,
    isPinned,
  },
  ref
) {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TAB,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [hoveredTab, setHoveredTab] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const pathname = usePathname();
  const handleMouseEnter = (tab, event) => {
    if (tab.isPinned) {
      setHoveredTab(tab.title);
      setCursorPos({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseLeave = () => {
    setHoveredTab(null);
  };
  return (
    <li
      ref={(node) => {
        drag(node);
        if (ref) ref(node);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        onPin(id);
      }}
      onMouseEnter={(e) => handleMouseEnter({ title, isPinned }, e)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
      className={`${styles["tab-item"]} ${
        pathname.startsWith(slug) ? styles.active : ""
      } ${isDragging ? styles.dragging : ""}
      ${isPinned ? styles.pinned : ""}`}
      id={`tab-${id}`}
    >
      <Link href={slug}>
        <Image
          src={icon}
          alt={title}
          width={18}
          height={18}
          className={styles.img}
        />
        {!isPinned && <p>{title}</p>}
      </Link>
      {!isPinned && <button onClick={() => onDelete(id)}>×</button>}
      {hoveredTab && (
        <div
          className={styles.tooltip}
          style={{
            '--tooltip-x': `${cursorPos.x + 10}px`,
            '--tooltip-y': `${cursorPos.y + 10}px`,
          }}
        >
          {hoveredTab}
        </div>
      )}
    </li>
  );
});

export default TabItem;
