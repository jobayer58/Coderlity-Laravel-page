import React, { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";

//redux
import {
  changeLayout,
  changeSidebarTheme,
  changeLayoutTheme,
} from "../../slices/thunk";

import { useSelector, useDispatch } from "react-redux";

//import Constant
import { LAYOUT_TYPES, LAYOUT_THEME } from "../constants/layout";

//SimpleBar
import SimpleBar from "simplebar-react";
//import Images
import { createSelector } from "reselect";

const RightSidebar = (props: any) => {
  const dispatch: any = useDispatch();

  const [show, setShow] = useState<boolean>(false);

  function tog_show() {
    setShow(!show);
    dispatch(changeSidebarTheme("gradient"));
  }

  useEffect(() => {
    const sidebarColorDark = document.getElementById(
      "sidebar-color-dark"
    ) as HTMLInputElement;
    const sidebarColorLight = document.getElementById(
      "sidebar-color-light"
    ) as HTMLInputElement;

    if (show && sidebarColorDark && sidebarColorLight) {
      sidebarColorDark.checked = false;
      sidebarColorLight.checked = false;
    }
  }, [show]);

  const selectRightsidebarState = (state: any) => state.Layout;
  const selectRightsidebarProperties = createSelector(
    selectRightsidebarState,
    (layout: any) => ({
      layoutType: layout.layoutType,
      layoutThemeType: layout.layoutThemeType,
      layoutThemeColorType: layout.layoutThemeColorType,
      leftSidebarType: layout.leftSidebarType,
      layoutModeType: layout.layoutModeType,
      layoutWidthType: layout.layoutWidthType,
      layoutPositionType: layout.layoutPositionType,
      topbarThemeType: layout.topbarThemeType,
      leftsidbarSizeType: layout.leftsidbarSizeType,
      leftSidebarViewType: layout.leftSidebarViewType,
      leftSidebarImageType: layout.leftSidebarImageType,
      preloader: layout.preloader,
      sidebarVisibilitytype: layout.sidebarVisibilitytype,
    })
  );
  // Inside your component
  const {
    layoutType,
    layoutThemeType,

    preloader,
  } = useSelector((state: any) => selectRightsidebarProperties(state));

  // open offcanvas
  const [open, setOpen] = useState<boolean>(false);
  const toggleLeftCanvas = () => {
    setOpen(!open);
  };

  window.onscroll = function () {
    scrollFunction();
  };

  const scrollFunction = () => {
    const element = document.getElementById("back-to-top");
    if (element) {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    }
  };

  const toTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const pathName = window.location.pathname;

  useEffect(() => {
    const preloader = document.getElementById("preloader") as HTMLElement;

    if (preloader) {
      preloader.style.opacity = "1";
      preloader.style.visibility = "visible";

      setTimeout(function () {
        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";
      }, 1000);
    }
  }, [pathName]);

  //Sidebar User Profile Avatar
  const [sidebarAvatar, setSidebarAvatar] = useState<boolean>(false);

  useEffect(() => {
    handleChangeSidebarAvatar(sidebarAvatar);
  }, [sidebarAvatar]);

  const handleChangeSidebarAvatar = (value: boolean) => {
    setSidebarAvatar(value);

    if (value) {
      document.documentElement.setAttribute("data-sidebar-user-show", "");
    } else {
      document.documentElement.removeAttribute("data-sidebar-user-show");
    }
  };
  return (
    <React.Fragment>
      <button
        onClick={() => toTop()}
        className="btn btn-danger btn-icon"
        id="back-to-top"
      >
        <i className="ri-arrow-up-line"></i>
      </button>

      {preloader === "enable" && (
        <div id="preloader">
          <div id="status">
            <div
              className="spinner-border text-primary avatar-sm"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      )}

      <div>
        <div className="customizer-setting d-none d-md-block">
          <div
            onClick={toggleLeftCanvas}
            className="p-2 shadow-lg btn-info rounded-pill btn btn-icon btn-lg"
          >
            <i className="mdi mdi-spin mdi-cog-outline fs-22"></i>
          </div>
        </div>
        <Offcanvas
          show={open}
          onHide={toggleLeftCanvas}
          placement="end"
          className="border-0 offcanvas-end"
        >
          <Offcanvas.Header
            className="p-3 d-flex align-items-center bg-primary bg-gradient offcanvas-header-dark"
            closeButton
          >
            <span className="m-0 text-white me-2">Theme Customizer</span>
          </Offcanvas.Header>
          <Offcanvas.Body className="p-0">
            <SimpleBar className="h-100">
              <div className="p-4">
                <h6 className="mb-0 fw-semibold text-uppercase">Layout</h6>
                <p className="text-muted">Choose your layout</p>

                <div className="row gy-3">
                  <div className="col-4">
                    <div className="form-check card-radio">
                      <input
                        id="customizer-layout01"
                        name="data-layout"
                        type="radio"
                        value={LAYOUT_TYPES.VERTICAL}
                        checked={layoutType === LAYOUT_TYPES.VERTICAL}
                        onChange={(e) => {
                          if (e.target.checked) {
                            dispatch(changeLayout(e.target.value));
                          }
                        }}
                        className="form-check-input"
                      />
                      <label
                        className="p-0 form-check-label avatar-md w-100"
                        htmlFor="customizer-layout01"
                      >
                        <span className="gap-1 d-flex h-100">
                          <span className="flex-shrink-0">
                            <span className="gap-1 p-1 bg-light d-flex h-100 flex-column">
                              <span className="p-1 px-2 mb-2 rounded d-block bg-primary-subtle"></span>
                              <span className="p-1 px-2 pb-0 d-block bg-primary-subtle"></span>
                              <span className="p-1 px-2 pb-0 d-block bg-primary-subtle"></span>
                              <span className="p-1 px-2 pb-0 d-block bg-primary-subtle"></span>
                            </span>
                          </span>
                          <span className="flex-grow-1">
                            <span className="d-flex h-100 flex-column">
                              <span className="p-1 bg-light d-block"></span>
                              <span className="p-1 mt-auto bg-light d-block"></span>
                            </span>
                          </span>
                        </span>
                      </label>
                    </div>
                    <h5 className="mt-2 text-center fs-13">Vertical</h5>
                  </div>
                  <div className="col-4">
                    <div className="form-check card-radio">
                      <input
                        id="customizer-layout02"
                        name="data-layout"
                        type="radio"
                        value={LAYOUT_TYPES.HORIZONTAL}
                        checked={layoutType === LAYOUT_TYPES.HORIZONTAL}
                        onChange={(e) => {
                          if (e.target.checked) {
                            dispatch(changeLayout(e.target.value));
                          }
                        }}
                        className="form-check-input"
                      />
                      <label
                        className="p-0 form-check-label avatar-md w-100"
                        htmlFor="customizer-layout02"
                      >
                        <span className="gap-1 d-flex h-100 flex-column">
                          <span className="gap-1 p-1 bg-light d-flex align-items-center">
                            <span className="p-1 rounded d-block bg-primary-subtle me-1"></span>
                            <span className="p-1 px-2 pb-0 d-block bg-primary-subtle ms-auto"></span>
                            <span className="p-1 px-2 pb-0 d-block bg-primary-subtle"></span>
                          </span>
                          <span className="p-1 bg-light d-block"></span>
                          <span className="p-1 mt-auto bg-light d-block"></span>
                        </span>
                      </label>
                    </div>
                    <h5 className="mt-2 text-center fs-13">Horizontal</h5>
                  </div>
                </div>

                {layoutType !== "horizontal" && layoutType !== "twocolumn" && (
                  <div className="mt-4 mb-3 form-check form-switch form-switch-md">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="sidebarUserProfile"
                      checked={sidebarAvatar}
                      onChange={(e) =>
                        handleChangeSidebarAvatar(e.target.checked)
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor="sidebarUserProfile"
                    >
                      Sidebar User Profile Avatar
                    </label>
                  </div>
                )}

                <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Theme</h6>
                <p className="text-muted">Choose your suitable Theme.</p>

                <div className="row">
                  <div className="col-6">
                    <div className="form-check card-radio">
                      <input
                        id="customizer-theme01"
                        name="data-theme"
                        type="radio"
                        className="form-check-input"
                        value={LAYOUT_THEME.DEFAULT}
                        checked={layoutThemeType === LAYOUT_THEME.DEFAULT}
                        onChange={(e) => {
                          if (e.target.checked) {
                            dispatch(changeLayoutTheme(e.target.value));
                          }
                        }}
                      />
                      <label
                        className="p-0 form-check-label"
                        htmlFor="customizer-theme01"
                      >
                        <img
                          src="https://themesbrand.com/velzon/assets/images/demo/default.png"
                          alt=""
                          className="img-fluid"
                        />
                      </label>
                    </div>
                    <h5 className="mt-2 text-center fs-13 fw-medium">
                      Default
                    </h5>
                  </div>

                  <div className="col-6">
                    <div className="form-check card-radio">
                      <input
                        id="customizer-theme04"
                        name="data-theme"
                        type="radio"
                        className="form-check-input"
                        value={LAYOUT_THEME.GALAXY}
                        checked={layoutThemeType === LAYOUT_THEME.GALAXY}
                        onChange={(e) => {
                          if (e.target.checked) {
                            dispatch(changeLayoutTheme(e.target.value));
                          }
                        }}
                      />
                      <label
                        className="p-0 form-check-label"
                        htmlFor="customizer-theme04"
                      >
                        <img
                          src="https://themesbrand.com/velzon/assets/images/demo//galaxy.png"
                          alt=""
                          className="img-fluid"
                        />
                      </label>
                    </div>
                    <h5 className="mt-2 text-center fs-13 fw-medium">Galaxy</h5>
                  </div>

                  <div className="col-6">
                    <div className="form-check card-radio">
                      <input
                        id="customizer-theme05"
                        name="data-theme"
                        type="radio"
                        className="form-check-input"
                        value={LAYOUT_THEME.MATERIAL}
                        checked={layoutThemeType === LAYOUT_THEME.MATERIAL}
                        onChange={(e) => {
                          if (e.target.checked) {
                            dispatch(changeLayoutTheme(e.target.value));
                          }
                        }}
                      />
                      <label
                        className="p-0 form-check-label"
                        htmlFor="customizer-theme05"
                      >
                        <img
                          src="https://themesbrand.com/velzon/assets/images/demo//material.png"
                          alt=""
                          className="img-fluid"
                        />
                      </label>
                    </div>
                    <h5 className="mt-2 text-center fs-13 fw-medium">
                      Material
                    </h5>
                  </div>

                  <div className="col-6">
                    <div className="form-check card-radio">
                      <input
                        id="customizer-theme07"
                        name="data-theme"
                        type="radio"
                        className="form-check-input"
                        value={LAYOUT_THEME.MINIMAL}
                        checked={layoutThemeType === LAYOUT_THEME.MINIMAL}
                        onChange={(e) => {
                          if (e.target.checked) {
                            dispatch(changeLayoutTheme(e.target.value));
                          }
                        }}
                      />
                      <label
                        className="p-0 form-check-label"
                        htmlFor="customizer-theme07"
                      >
                        <img
                          src="https://themesbrand.com/velzon/assets/images/demo/minimal.png"
                          alt=""
                          className="img-fluid"
                        />
                      </label>
                    </div>
                    <h5 className="mt-2 text-center fs-13 fw-medium">
                      Minimal
                    </h5>
                  </div>
                  <div className="col-6">
                    <div className="form-check card-radio">
                      <input
                        id="customizer-theme08"
                        name="data-theme"
                        type="radio"
                        className="form-check-input"
                        value={LAYOUT_THEME.MODERN}
                        checked={layoutThemeType === LAYOUT_THEME.MODERN}
                        onChange={(e) => {
                          if (e.target.checked) {
                            dispatch(changeLayoutTheme(e.target.value));
                          }
                        }}
                      />
                      <label
                        className="p-0 form-check-label"
                        htmlFor="customizer-theme08"
                      >
                        <img
                          src="https://themesbrand.com/velzon/assets/images/demo/modern.png"
                          alt=""
                          className="img-fluid"
                        />
                      </label>
                    </div>
                    <h5 className="mt-2 text-center fs-13 fw-medium">Modern</h5>
                  </div>

                  <div className="col-6">
                    <div className="form-check card-radio">
                      <input
                        id="customizer-theme10"
                        name="data-theme"
                        type="radio"
                        className="form-check-input"
                        value={LAYOUT_THEME.CLASSIC}
                        checked={layoutThemeType === LAYOUT_THEME.CLASSIC}
                        onChange={(e) => {
                          if (e.target.checked) {
                            dispatch(changeLayoutTheme(e.target.value));
                          }
                        }}
                      />
                      <label
                        className="p-0 form-check-label"
                        htmlFor="customizer-theme10"
                      >
                        <img
                          src="https://themesbrand.com/velzon/assets/images/demo/classic.png"
                          alt=""
                          className="img-fluid"
                        />
                      </label>
                    </div>
                    <h5 className="mt-2 text-center fs-13 fw-medium">
                      Classic
                    </h5>
                  </div>
                </div>
              </div>
            </SimpleBar>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </React.Fragment>
  );
};

export default RightSidebar;
