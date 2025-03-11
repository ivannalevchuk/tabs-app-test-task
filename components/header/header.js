"use client";
import { useState, useEffect } from "react";
import TabsList from "../tabs/tabs-list";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


const Header = () => {
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    let storedTabs = JSON.parse(localStorage.getItem("tabs"));
    if (!storedTabs) {
      storedTabs = [
        { id: "1", title: "Home", slug: "/home", icon: "/home.png", isPinned: false },
        { id: "2", title: "About", slug: "/about", icon: "/about.svg", isPinned: false },
        { id: "3", title: "Contact", slug: "/contact", icon: "/user.png", isPinned: false },
        { id: "4", title: "Blog", slug: "/blog", icon: "/blog.svg", isPinned: false },
        {
          id: "5",
          title: "Portfolio",
          slug: "/portfolio",
          icon: "/blog.svg",
        },
        {
          id: "6",
          title: "Calendar",
          slug: "/calendar",
          icon: "/calendar.png",
        },
        {
          id: "7",
          title: "Settings",
          slug: "/settings",
          icon: "/settings.png",
        },
        {
            id: "8",
            title: "Help",
            slug: "/help",
            icon: "/help.png",
        },
        {
            id: "9",
            title: "Bank",
            slug: "/bank",
            icon: "/bank.png",
        },
        {
            id: "10",
            title: "Shop",
            slug: "/shop",
            icon: "/shop.png",
        }

    
      ];
      localStorage.setItem("tabs", JSON.stringify(storedTabs));
    }
    setTabs(storedTabs);
  }, []);

  const handleDelete = (id) => {
    const newTabs = tabs.filter((tab) => tab.id !== id);
    console.log(id);
    setTabs(newTabs);
    localStorage.setItem("tabs", JSON.stringify(newTabs));
    
  };

  return (
    <header>
        <DndProvider backend={HTML5Backend}>
      <TabsList tabs={tabs} onDelete={handleDelete} />
        </DndProvider>
    </header>
  );
};

export default Header;
