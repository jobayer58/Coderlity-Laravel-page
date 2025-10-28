import { useState, Fragment } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, usePage, router } from "@inertiajs/react";
//import images
import avatar1 from "../../../images/users/avatar-1.jpg";
import { photoUrl } from "../../type/globalData";

const ProfileDropdown = () => {
  const { props } = usePage();
  const { admin, user } = (props as any).auth || {};

  // console.log("my custom info => ", admin, user);

  //Dropdown Toggle
  const [isProfileDropdown, setIsProfileDropdown] = useState<boolean>(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };

  const handleEditRoute = () => {
    admin == null
      ? router.visit(route("user.dashboard.profile"))
      : router.visit(route("admin.user.profile"));
  };

  return (
    <Fragment>
      <Dropdown
        show={isProfileDropdown}
        onClick={toggleProfileDropdown}
        className="ms-sm-3 header-item topbar-user"
      >
        <Dropdown.Toggle as="button" type="button" className="arrow-none btn">
          <span className="d-flex align-items-center">
            {/* this data will be change */}

            <img
              className="rounded-circle header-profile-user"
              src={
                admin == null
                  ? user.photo == "avatar.png"
                    ? avatar1
                    : `${photoUrl}/customer/user/${user.photo}`
                  : admin.photo == "avatar.png"
                  ? avatar1
                  : `${photoUrl}/admin/user/${admin.photo}`
              }
              alt="Header Avatar"
            />
            <span className="text-start ms-xl-2">
              <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                {admin == null ? user?.name : admin?.name}
              </span>
              <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">
                Founder
              </span>
            </span>
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu-end">
          <h6 className="dropdown-header">
            Welcome {admin == null ? user?.name : admin?.name}!
          </h6>

          {/* this data will be change */}

          {/* <Dropdown.Item
            href={
              admin == null
                ? route("admin.user.profile")
                : route("admin.user.profile")
            }
            className="dropdown-item"
          >
            <i className="align-middle mdi mdi-account-circle text-muted fs-16 me-1"></i>
            <span className="align-middle">Edit Profile</span>
          </Dropdown.Item> */}

          <Dropdown.Item onClick={handleEditRoute} className="dropdown-item">
            <i className="align-middle mdi mdi-account-circle text-muted fs-16 me-1"></i>
            <span className="align-middle">Edit Profile</span>
          </Dropdown.Item>

          <Dropdown.Item href="/apps-chat" className="dropdown-item">
            <i className="align-middle mdi mdi-message-text-outline text-muted fs-16 me-1"></i>{" "}
            <span className="align-middle">Messages</span>
          </Dropdown.Item>
          {/* <Dropdown.Item href={"#"} className="dropdown-item">
                        <i className="align-middle mdi mdi-calendar-check-outline text-muted fs-16 me-1"></i> <span
                            className="align-middle">Taskboard</span>
                    </Dropdown.Item> */}

          {/* <Dropdown.Item href="/pages-faqs" className="dropdown-item">
                        <i
                            className="align-middle mdi mdi-lifebuoy text-muted fs-16 me-1"></i> <span
                                className="align-middle">Help</span>
                    </Dropdown.Item> */}

          <div className="dropdown-divider"></div>

          <Dropdown.Item href="/pages-profile" className="dropdown-item">
            <i className="align-middle mdi mdi-wallet text-muted fs-16 me-1"></i>{" "}
            <span className="align-middle">
              Balance : <b>$5971.67</b>
            </span>
          </Dropdown.Item>

          {/* <Dropdown.Item href="/pages-profile-settings" className="dropdown-item">
                        <span
                            className="mt-1 badge bg-success-subtle text-success float-end">New</span><i
                                className="align-middle mdi mdi-cog-outline text-muted fs-16 me-1"></i> <span
                                    className="align-middle">Settings</span>
                    </Dropdown.Item> */}
          {/* 
          <Dropdown.Item
            href="/auth-lockscreen-basic"
            className="dropdown-item"
          >
            <i className="align-middle mdi mdi-lock text-muted fs-16 me-1"></i>{" "}
            <span className="align-middle">Lock screen</span>
          </Dropdown.Item> */}

          <Link
            className="dropdown-item"
            as="button"
            method="post"
            href={admin == null ? route("logout") : route("admin.logout")}
          >
            <i className="align-middle mdi mdi-logout text-muted fs-16 me-1"></i>{" "}
            <span className="align-middle" data-key="t-logout">
              Logout
            </span>
          </Link>
        </Dropdown.Menu>
      </Dropdown>
    </Fragment>
  );
};

export default ProfileDropdown;
