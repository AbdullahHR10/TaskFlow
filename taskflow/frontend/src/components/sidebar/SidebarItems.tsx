import { MdOutlineDashboard } from "react-icons/md";
import { LuListTodo } from "react-icons/lu";
import { FaRepeat, FaRegMoneyBill1 } from "react-icons/fa6";
import { FaNoteSticky } from "react-icons/fa6";
import { FaTerminal, FaRegCalendarAlt } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

export const mainNav = [
  { label: "Dashboard", icon: <MdOutlineDashboard />, href: "/app/dashboard" },
  { label: "Tasks List", icon: <LuListTodo />, href: "/app/tasks" },
  { label: "Habit Tracker", icon: <FaRepeat />, href: "/app/habits" },
  { label: "Budget Manager", icon: <FaRegMoneyBill1 />, href: "/app/budget" },
  { label: "Notes", icon: <FaNoteSticky />, href: "/app/notes" },
];

export const utilityNav = [
  { label: "Console", icon: <FaTerminal />, href: "/app/console" },
  { label: "Calendar", icon: <FaRegCalendarAlt />, href: "/app/calendar" },
  { label: "Settings", icon: <IoSettingsOutline />, href: "/app/settings" },
];
