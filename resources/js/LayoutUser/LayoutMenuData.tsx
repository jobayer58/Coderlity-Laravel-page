import { useEffect, Fragment, useState } from "react";

const Navdata = () => {
  //state data
  const [isDashboard, setIsDashboard] = useState<boolean>(false);

  // Pages
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
  }, [history, iscurrentState, isDashboard]);

  const menuItems: any = [
    {
      label: "Menu",
      isHeader: true,
    },

    {
      id: "dashboard",
      label: "Dashboard",
      icon: "ri-dashboard-2-line",
      link: "/user/dashboard",
    },

    {
      label: "pages",
      isHeader: true,
    },
  ];
  return <Fragment>{menuItems}</Fragment>;
};
export default Navdata;
