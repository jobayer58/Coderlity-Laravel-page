import { useEffect } from "react";
import SimpleBar from "simplebar-react";
// import logoSm from "../../images/logo-sm.png";
// import logoDark from "../../images/logo-dark.png";
// import logoLight from "../../images/logo-light.png";
import logoLight from "../../images/coderlity.png";
import avatar1 from "../../images/users/avatar-1.jpg";

//Import Components
import VerticalLayout from "./VerticalLayouts";
import { Container, Dropdown } from "react-bootstrap";
import { Link, usePage } from "@inertiajs/react";
import HorizontalLayout from "./HorizontalLayout";
import { photoUrl } from "../type/globalData";

const Sidebar = ({ layoutType }: any) => {
  const { props } = usePage();
  const { user } = (props as any).auth || {};

  useEffect(() => {
    var verticalOverlay = document.getElementsByClassName("vertical-overlay");
    if (verticalOverlay) {
      verticalOverlay[0].addEventListener("click", function () {
        document.body.classList.remove("vertical-sidebar-enable");
      });
    }
  });

  const addEventListenerOnSmHoverMenu = () => {
    // add listener Sidebar Hover icon on change layout from setting
    if (
      document.documentElement.getAttribute("data-sidebar-size") === "sm-hover"
    ) {
      document.documentElement.setAttribute(
        "data-sidebar-size",
        "sm-hover-active"
      );
    } else if (
      document.documentElement.getAttribute("data-sidebar-size") ===
      "sm-hover-active"
    ) {
      document.documentElement.setAttribute("data-sidebar-size", "sm-hover");
    } else {
      document.documentElement.setAttribute("data-sidebar-size", "sm-hover");
    }
  };

  return (
    <>
      <div className="app-menu navbar-menu">
        <div className="navbar-brand-box">
          <Link href="/user/dashboard" className="logo logo-dark">
            <span className="logo-sm">
              <img src={logoLight} alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src={logoLight} alt="" height="17" />
            </span>
          </Link>

          <Link href="/user/dashboard" className="logo logo-light">
            <span className="logo-sm">
              <img src={logoLight} alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src={logoLight} alt="" height="17" />
            </span>
          </Link>
          <button
            onClick={addEventListenerOnSmHoverMenu}
            type="button"
            className="p-0 btn btn-sm fs-20 header-item float-end btn-vertical-sm-hover"
            id="vertical-hover"
          >
            <i className="ri-record-circle-line"></i>
          </button>
        </div>

        <Dropdown className="m-1 rounded sidebar-user">
          <Dropdown.Toggle
            type="button"
            className="btn material-shadow-none arrow-none"
            id="page-header-user-dropdown"
            style={{ backgroundColor: "transparent", border: "none" }}
          >
            <span className="gap-2 d-flex align-items-center">
              <img
                className="rounded header-profile-user"
                src={
                  user.photo == "avatar.png"
                    ? avatar1
                    : `${photoUrl}/customer/user/${user.photo}`
                }
                alt="Header Avatar"
              />
              <span className="text-start">
                <span className="d-block fw-medium sidebar-user-name-text">
                  {user.name}
                </span>
                <span className="d-block fs-14 sidebar-user-name-sub-text">
                  <i className="align-baseline ri ri-circle-fill fs-10 text-success"></i>{" "}
                  <span className="align-middle">Online</span>
                </span>
              </span>
            </span>
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdown-menu-end">
            <h6 className="dropdown-header">Welcome {user.name}</h6>

            <Link
              className="dropdown-item"
              href={route("user.dashboard.profile")}
            >
              <i className="align-middle mdi mdi-account-circle text-muted fs-16 me-1"></i>{" "}
              <span className="align-middle">Edit Profile</span>
            </Link>

            <a className="dropdown-item" href="/apps-chat">
              <i className="align-middle mdi mdi-message-text-outline text-muted fs-16 me-1"></i>{" "}
              <span className="align-middle">Messages</span>
            </a>

            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="/pages-profile">
              <i className="align-middle mdi mdi-wallet text-muted fs-16 me-1"></i>{" "}
              <span className="align-middle">
                Balance : <b>$5971.10M</b>
              </span>
            </a>
            <Link
              className="dropdown-item"
              as="button"
              method="post"
              href={route("logout")}
            >
              <i className="align-middle mdi mdi-logout text-muted fs-16 me-1"></i>{" "}
              <span className="align-middle" data-key="t-logout">
                Logout
              </span>
            </Link>
          </Dropdown.Menu>
        </Dropdown>

        {layoutType === "horizontal" ? (
          <div id="scrollbar">
            <Container fluid>
              <div id="two-column-menu"></div>
              <ul className="navbar-nav" id="navbar-nav">
                <HorizontalLayout />
              </ul>
            </Container>
          </div>
        ) : layoutType === "twocolumn" ? (
          ""
        ) : (
          <>
            <SimpleBar id="scrollbar" className="h-100">
              <Container fluid>
                <div id="two-column-menu"></div>
                <ul className="navbar-nav" id="navbar-nav">
                  <VerticalLayout layoutType={layoutType} />
                </ul>
              </Container>
            </SimpleBar>
            <div className="sidebar-background"></div>
          </>
        )}
      </div>
      <div className="vertical-overlay"></div>
    </>
  );
};

export default Sidebar;
