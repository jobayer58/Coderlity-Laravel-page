import { useEffect, Fragment, useState } from "react";

const Navdata = () => {
  //state data
  const [isDashboard, setIsDashboard] = useState<boolean>(false);

  // Pages
  const [isAdminUser, setIsAdminUser] = useState<boolean>(false);
  const [isAdminCustomer, setIsAdminCustomer] = useState<boolean>(false);
  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e: any) {
    if (e && e.target && e.target.getAttribute("sub-items")) {
      const ul: any = document.getElementById("two-column-menu");
      const iconItems: any = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("sub-items");
        const getID: any = document.getElementById(id) as HTMLElement;
        if (getID) getID?.parentElement.classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }

    if (iscurrentState !== "admin.customer") {
      setIsAdminCustomer(false);
    }

    if (iscurrentState !== "admin.user") {
      setIsAdminUser(false);
    }
  }, [history, isAdminCustomer, isAdminUser, iscurrentState, isDashboard]);

  const menuItems: any = [
    {
      label: "Menu",
      isHeader: true,
    },

    {
      id: "dashboard",
      label: "Dashboard",
      icon: "ri-dashboard-2-line",
      link: "/auth/console",
      role: ["Admin", "Moderator", "Editor", "User"],
    },

    {
      label: "pages",
      isHeader: true,
    },

    {
      id: "admin.user",
      label: "Users",
      icon: "ri-honour-line",
      link: "/#",
      role: ["Admin", "Moderator", "Editor", "User"],

      stateVariables: isAdminUser,
      click: function (e: any) {
        e.preventDefault();
        setIsAdminUser(!isAdminUser);
        setIscurrentState("admin.user");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "onePage",
          label: "All User",
          link: "/auth/console/user",
          parentId: "admin.user",
          role: ["Admin", "Moderator", "Editor", "User"],
        },
        {
          id: "twoPage",
          label: "Add User",
          link: "/auth/console/user/create",
          parentId: "admin.user",
          role: ["Admin", "Moderator", "Editor", "User"],
        },
      ],
    },

    {
      id: "admin.customer",
      label: "Customers",
      icon: "ri-honour-line",
      link: "/#",
      role: ["Admin", "Moderator", "Editor", "User"],
      stateVariables: isAdminCustomer,
      click: function (e: any) {
        e.preventDefault();
        setIsAdminCustomer(!isAdminCustomer);
        setIscurrentState("admin.customer");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "onePage",
          label: "All Customer",
          link: "/auth/console/customer",
          parentId: "admin.customer",
          role: ["Admin", "Moderator", "Editor", "User"],
        },
        {
          id: "twoPage",
          label: "Add Customer",
          link: "/auth/console",
          parentId: "admin.customer",
          role: ["Admin", "Moderator", "Editor", "User"],
        },
      ],
    },

    {
      id: "contact",
      label: "Contact",
      icon: "ri-honour-line",
      link: "/auth/console/contact",
      role: ["Admin"],
    },
    {
      id: "chat",
      label: "Chat",
      icon: "ri-message-2-line",
      link: "/auth/console/chat",
      role: ["Admin"],
    },
  ];
  return <Fragment>{menuItems}</Fragment>;
};
export default Navdata;
