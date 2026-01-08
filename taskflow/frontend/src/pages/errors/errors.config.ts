import { LuServerCrash, LuLock, LuShieldOff, LuFileQuestion } from "react-icons/lu";


export const ERRORS = {
  401: {
    pageTitle: "401 - Unauthorized - TaskFlow",
    title: "Unauthorized Access",
    message:
      "Sorry, you don't have permission to access this page. Please log in or contact an administrator for assistance.",
    icon: LuLock,
  },
  403: {
    pageTitle: "403 - Forbidden - TaskFlow",
    title: "Access Forbidden",
    message:
      "Sorry, you don't have sufficient permissions to access this page. Please contact an administrator if you believe this is an error.",
    icon: LuShieldOff,
  },
  404: {
    pageTitle: "404 - Page Not Found - TaskFlow",
    title: "Page not found",
    message:
      "Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.",
    icon: LuFileQuestion,
  },
  500: {
    pageTitle: "500 - Server Error - TaskFlow",
    title: "Server Error",
    message:
      "Sorry, something went wrong on our server. Our team has been notified and is working to fix the issue. Please try again later.",
    icon: LuServerCrash,
  },
} as const;
