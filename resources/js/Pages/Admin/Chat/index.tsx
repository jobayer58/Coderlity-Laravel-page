import { useEffect, useState, useRef, Fragment, useMemo } from "react";
import {
  Container,
  Button,
  Tooltip,
  Dropdown,
  Row,
  Col,
  Nav,
  Alert,
  OverlayTrigger,
  Tab,
  Form,
} from "react-bootstrap";
import SimpleBar from "simplebar-react";
import EmojiPicker from "emoji-picker-react";
import FeatherIcon from "feather-icons-react";
import avatar3 from "../../../../images/users/avatar-3.jpg";
import avatar8 from "../../../../images/users/avatar-8.jpg";
import avatar9 from "../../../../images/small/img-1.jpg";
import "react-perfect-scrollbar/dist/css/styles.css";
import Spinners from "../../../Components/Common/Spinner";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import Layout from "../../../Layouts";
import { useEchoPublic } from "@laravel/echo-react";
import { ChatUserProps, Conversation } from "../../../type/chatProps";
// import "./Chat.css";

function formatTo12Hour(datetime: string | number) {
  let date: Date;

  // Check if input is a timestamp (number or numeric string)
  if (!isNaN(Number(datetime)) && Number(datetime) > 1000000000000) {
    date = new Date(Number(datetime)); // convert timestamp to Date
  } else if (typeof datetime === "string") {
    // If it's a string like "2025-10-11 17:46:18"
    date = new Date(datetime.replace(" ", "T"));
  } else {
    throw new Error("Invalid datetime format");
  }

  // Format time to 12-hour with AM/PM
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

const Chat = ({ customers, allmessage }: ChatUserProps) => {
  const { processing, post } = useForm({
    search: "",
  });

  const { props } = usePage();
  const { admin } = (props as any).auth || {};

  // const [allcustomer, setAllcustomer] = useState(customers);
  const [allcustomer, setAllcustomer] = useState<any[]>([]);
  const [messageState, setMessageState] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const userChatShow: any = useRef(null);
  const [Chat_Box_Username, setChat_Box_Username] =
    useState<any>("Lisa Parker");

  const [isOnline, setIsOnline] = useState<Set<string>>(new Set());
  const [inputShow, setInputShow] = useState<boolean>(false);

  const [curMessage, setcurMessage] = useState<string>("");
  const [search_Menu, setsearch_Menu] = useState<boolean>(false);
  const [settings_Menu, setsettings_Menu] = useState<boolean>(false);
  const [reply, setreply] = useState<any>("");
  const [emojiPicker, setemojiPicker] = useState<boolean>(false);

  const [isLoading, setLoading] = useState(false);
  const customerIdRef = useRef<any>("");

  // Filter customers by search term
  const filteredCustomers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return allcustomer;

    return allcustomer.filter((c: any) =>
      String(c.customer_id.split("__#")[1]).includes(term)
    );
  }, [allcustomer, searchTerm]);

  //Toggle Chat Box Menus
  const toggleSearch = () => {
    setsearch_Menu(!search_Menu);
  };

  const toggleSettings = () => {
    setsettings_Menu(!settings_Menu);
  };

  //Use For Chat Box
  const userChatOpen = (chats: any) => {
    customerIdRef.current = chats.customer_id;

    setChat_Box_Username(chats.customer_id);
    setInputShow(true);

    if (window.innerWidth < 892) {
      userChatShow.current.classList.add("user-chat-show");
    }
    // remove unread msg on read in chat
    var unreadMessage: any = document.getElementById(
      "unread-msg-user" + chats.customer_id
    );
    var msgUser: any = document.getElementById("msgUser" + chats.customer_id);
    if (unreadMessage) {
      unreadMessage.style.display = "none";
    }
    if (msgUser) {
      msgUser.classList.remove("unread-msg-user");
    }

    post(route("admin.chat.message", { customer_id: chats.customer_id }), {
      preserveScroll: true,
    });
  };

  useEffect(() => {
    const stored = localStorage.getItem("allCustomerId");

    if (stored) {
      const parsed = JSON.parse(stored) as string[];
      const allIds = new Set(parsed);
      setIsOnline(allIds);
    }
  }, []);

  const backToUserChat = () => {
    userChatShow.current.classList.remove("user-chat-show");
  };

  useEffect(() => {
    if (allmessage.length > 0) {
      setMessageState(allmessage);
    }
  }, [allmessage]);

  useEffect(() => {
    if (customers.length > 0) {
      setAllcustomer(customers);
    }
  }, [customers]);

  const chatRef = useRef<any>(null);
  useEffect(() => {
    if (chatRef.current?.el) {
      chatRef.current.getScrollElement().scrollTop =
        chatRef.current.getScrollElement().scrollHeight;
    }
  }, [messageState]);

  //Search Message
  const searchMessages = () => {
    const searchInput = document.getElementById(
      "searchMessage"
    ) as HTMLInputElement;
    const searchFilter = searchInput.value.toUpperCase();
    const searchUL = document.getElementById(
      "users-conversation"
    ) as HTMLInputElement;
    const searchLI = searchUL.getElementsByTagName("li");

    Array.prototype.forEach.call(searchLI, (search: HTMLElement) => {
      const a = search.getElementsByTagName("p")[0] || "";
      const txtValue = a.textContent || a.innerText || "";

      if (txtValue.toUpperCase().indexOf(searchFilter) > -1) {
        search.style.display = "";
      } else {
        search.style.display = "none";
      }
    });
  };

  // Copy Message
  const handleClick = (ele: HTMLElement) => {
    const copy = ele
      .closest(".chat-list")
      ?.querySelector(".ctext-content")?.innerHTML;
    if (copy) {
      navigator.clipboard.writeText(copy);
    }

    const copyClipboardElement = document.getElementById("copyClipBoard");
    if (copyClipboardElement) {
      copyClipboardElement.style.display = "block";
      setTimeout(() => {
        copyClipboardElement.style.display = "none";
      }, 1000);
    }
  };

  // emoji
  const [emojiArray, setemojiArray] = useState<any>([]);
  const onEmojiClick = (event: any, emojiObject: any) => {
    setemojiArray([...emojiArray, event.emoji]);
    setcurMessage(curMessage + event.emoji);
  };

  // add message
  const addMessage: any = () => {
    if (curMessage !== "") {
          let oldDate = Date.now() - 86400000;

        // message_time: Date.now().toString(),

      
      let messageInfo = {
        message: curMessage,
        role_type: "adminUser",
        customer_id: Chat_Box_Username,
        message_seen: true,
        message_type: "text",
        message_time: oldDate,
        user_id: admin?.id,
        created_at: Date.now(),
      };

      post(
        route("admin.chat.send.message", {
          ...messageInfo,
          user_name: admin?.name,
          user_photo: admin?.photo,
        }),
        {
          preserveScroll: true,
          onSuccess: () => {
            setMessageState((prev: any) => [...prev, messageInfo]);
          },
        }
      );
    }

    setcurMessage("");
    setreply("");
  };

  const onKeyPress = (e: any) => {
    const { key, value } = e;
    if (key === "Enter") {
      e.preventDefault();
      setcurMessage(value);
      addMessage();
    }
  };

  // clear
  useEchoPublic("customer-message-list", "MessageListEvent", (wsStore: any) => {
    const { data } = wsStore;

    // remove unread msg on read in chat
    let unreadMessage = document.getElementById(
      "unread-msg-user" + data.customer_id
    );
    let msgUser = document.getElementById("msgUser" + data.customer_id);

    if (unreadMessage && unreadMessage.style.display !== "block") {
      unreadMessage.style.display = "block";
    }

    if (msgUser && !msgUser.classList.contains("unread-msg-user")) {
      msgUser.classList.add("unread-msg-user");
    }

    setAllcustomer((prev: any[]) => {
      const existing = prev.find(
        (c) => String(c.customer_id) === String(data.customer_id)
      );

      let updatedList;

      if (existing) {
        // Update message count for existing customer
        updatedList = prev.map((c) =>
          String(c.customer_id) === String(data.customer_id)
            ? {
                ...c,
                message_time: data.message_time,
                message_count:
                  data.message_seen == false
                    ? c.message_count + 1
                    : c.message_count,
              }
            : c
        );
      } else {
        // Add new customer with message_count = 1
        updatedList = [
          ...prev,
          {
            ...data,
            message_count: 1,
          },
        ];
      }

      // Always sort by message_time or created_at descending
      return updatedList.sort((a, b) => {
        if (Number(a.message_time) < Number(b.message_time)) return 1;
        if (Number(a.message_time) > Number(b.message_time)) return -1;
        return 0;
      });
    });

    setIsOnline((prev) => {
      if (prev.has(data.customer_id)) return prev;
      const next = new Set(prev);
      next.add(data.customer_id);

      localStorage.setItem("allCustomerId", JSON.stringify(Array.from(next)));

      return next;
    });
  });
  
  // clear
  useEchoPublic("browser-closed", "BrowserCloseEvent", (wsStore: any) => {
    const { data } = wsStore;

    setIsOnline((prev) => {
      if (prev.has(data.customer_id)) {
        const next = new Set(prev);
        next.delete(data.customer_id);

        localStorage.setItem("allCustomerId", JSON.stringify(Array.from(next)));
        return next;
      }
      return prev;
    });
  });

  // clear
  useEchoPublic(
    `customerSendMessageEvent`,
    "CustomerSendMessageEvent",
    (wsStore: any) => {
      const { data } = wsStore;

      if (data.role_type == "customer" && data.user_id == admin?.id) {
        let messageInfo = {
          message: data.message,
          role_type: "customer",
          customer_id: data.customer_id,
          message_seen: true,
          message_type: data.message_type,
          message_time: data.message_time,
          user_id: admin?.id,
          created_at: data.created_at,
        };

        setMessageState((prev: any) => [...prev, messageInfo]);

        if (data.customer_id != customerIdRef.current) {
          // remove unread msg on read in chat
          let unreadMessage = document.getElementById(
            "unread-msg-user" + data.customer_id
          );
          let msgUser = document.getElementById("msgUser" + data.customer_id);

          if (unreadMessage && unreadMessage.style.display !== "block") {
            unreadMessage.style.display = "block";
          }

          if (msgUser && !msgUser.classList.contains("unread-msg-user")) {
            msgUser.classList.add("unread-msg-user");
          }

          setAllcustomer((prev: any[]) => {
            const existing = prev.find(
              (c) => String(c.customer_id) === String(data.customer_id)
            );

            let updatedList;

            if (existing) {
              // Update message count for existing customer
              updatedList = prev.map((c) =>
                String(c.customer_id) === String(data.customer_id)
                  ? {
                      ...c,
                      message_time: data.message_time,
                      message_count:
                        data.message_seen == false
                          ? c.message_count + 1
                          : c.message_count,
                    }
                  : c
              );
            } else {
              // Add new customer with message_count = 1
              updatedList = [
                ...prev,
                {
                  ...data,
                  message_count: 1,
                },
              ];
            }

            // Always sort by message_time or created_at descending
            return updatedList.sort((a, b) => {
              if (Number(a.message_time) < Number(b.message_time)) return 1;
              if (Number(a.message_time) > Number(b.message_time)) return -1;
              return 0;
            });
          });

          let storeMsg = {
            message: data.message,
            role_type: "customer",
            customer_id: data.customer_id,
            message_seen: false,
            message_type: data.message_type,
            message_time: data.message_time,
            user_id: admin?.id,
            created_at: data.created_at,
          };

          post(route("admin.chat.message.store", storeMsg), {
            preserveScroll: true,
          });
        } else {
          let oldDate = Date.now() - 86400000;

          let storeMsgC = {
            message: data.message,
            role_type: "customer",
            customer_id: data.customer_id,
            message_seen: true,
            message_type: data.message_type,
            message_time: oldDate.toString(),
            user_id: admin?.id,
            created_at: data.created_at,
          };

          post(route("admin.chat.message.store", storeMsgC), {
            preserveScroll: true,
          });
        }

        setIsOnline((prev) => {
          if (prev.has(data.customer_id)) return prev;
          const next = new Set(prev);
          next.add(data.customer_id);

          localStorage.setItem(
            "allCustomerId",
            JSON.stringify(Array.from(next))
          );

          return next;
        });
      }
    }
  );

  // console.log("allcustomer", allcustomer);
  
  // console.log("allmessage", allmessage);
  // console.log("messageState", messageState);
  // console.log("allcustomer", allcustomer);
  // console.log("isOnline", isOnline);

  return (
    <Fragment>
      <Head title="Chat | Velzon - React Admin & Dashboard Template" />
      <div className="page-content">
        <Container fluid>
          <div className="gap-1 p-1 chat-wrapper d-lg-flex mx-n4 mt-n4">
            <div className="chat-leftsidebar">
              <div className="px-4 pt-4 mb-3">
                <div className="d-flex align-items-start">
                  <div className="flex-grow-1">
                    <h5 className="mb-4">Chats</h5>
                  </div>
                  <div className="flex-shrink-0">
                    <OverlayTrigger
                      placement="bottom"
                      overlay={<Tooltip id="tooltip">User Contact</Tooltip>}
                    >
                      <Button
                        id="addcontact"
                        variant="success"
                        size="sm"
                        className="shadow-none btn-soft-success"
                      >
                        <i className="align-bottom ri-add-line"></i>
                      </Button>
                    </OverlayTrigger>
                  </div>
                </div>
                <div className="search-box">
                  <input
                    // onKeyUp={searchUsers}
                    id="search-user"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control bg-light border-light"
                    placeholder="Search here..."
                  />
                  <i className="ri-search-2-line search-icon"></i>
                </div>
              </div>

              <Tab.Container defaultActiveKey="1">
                <Nav className="mb-3 nav nav-tabs nav-tabs-custom nav-success nav-justified">
                  <Nav.Item>
                    <Nav.Link eventKey="1">Chats</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="2">Contact</Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content className="text-muted">
                  <Tab.Pane eventKey="1" id="chats">
                    {isLoading ? (
                      <Spinners setLoading={setLoading} />
                    ) : (
                      <SimpleBar
                        className="pt-3 chat-room-list"
                        style={{
                          margin: "-16px 0px 0px",
                        }}
                      >
                        <div className="px-4 mb-2 d-flex align-items-center">
                          <div className="flex-grow-1">
                            <h4 className="mb-0 fs-11 text-muted text-uppercase">
                              Direct Messages
                            </h4>
                          </div>
                          <div className="flex-shrink-0">
                            <OverlayTrigger
                              placement="bottom"
                              overlay={
                                <Tooltip id="tooltip">New Message</Tooltip>
                              }
                              rootClose={true}
                            >
                              <Button
                                id="addnewmsg"
                                variant="success"
                                size="sm"
                                className="btn-soft-success"
                              >
                                <i className="align-bottom ri-add-line"></i>
                              </Button>
                            </OverlayTrigger>
                          </div>
                        </div>

                        <div className="chat-message-list">
                          <ul
                            className="list-unstyled chat-list chat-user-list users-list"
                            id="userList"
                          >
                            {filteredCustomers.length > 0 ? (
                              filteredCustomers.map((customer: any) => (
                                <li
                                  key={customer.customer_id}
                                  className={
                                    Chat_Box_Username == customer.customer_id
                                      ? "active"
                                      : ""
                                  }
                                >
                                  <Link
                                    href="#!"
                                    onClick={(event) => {
                                      event.preventDefault();
                                      userChatOpen(customer);
                                    }}
                                    className={
                                      customer.message_count != 0
                                        ? "unread-msg-user"
                                        : ""
                                    }
                                    id={"msgUser" + customer.customer_id}
                                  >
                                    <div className="d-flex align-items-center">
                                      <div
                                        className={`flex-shrink-0 chat-user-img ${
                                          isOnline.has(customer.customer_id)
                                            ? "online"
                                            : "away"
                                        } align-self-center me-2 ms-0`}
                                      >
                                        <div className="avatar-xxs">
                                          <img
                                            src={avatar3}
                                            className="rounded-circle img-fluid userprofile"
                                            alt="User Photo"
                                          />
                                        </div>

                                        {isOnline.has(customer.customer_id) ? (
                                          <span className="user-status"></span>
                                        ) : (
                                          ""
                                        )}
                                      </div>

                                      <div className="overflow-hidden flex-grow-1">
                                        <p className="mb-0 text-truncate">
                                          {customer.customer_id.split("__#")[1]}
                                        </p>
                                      </div>

                                      {customer.message_count != 0 && (
                                        <div
                                          className="flex-shrink-0"
                                          id={
                                            "unread-msg-user" +
                                            customer.customer_id
                                          }
                                        >
                                          <span className="p-1 rounded badge bg-dark-subtle text-body">
                                            {customer.message_count}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  </Link>
                                </li>
                              ))
                            ) : (
                              <li className="p-3 text-center text-muted">
                                No results found
                              </li>
                            )}
                          </ul>
                        </div>
                      </SimpleBar>
                    )}
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>

            <div className="overflow-hidden user-chat w-100" ref={userChatShow}>
              <div className="chat-content d-lg-flex">
                <div className="overflow-hidden w-100 position-relative">
                  <div className="position-relative">
                    <div className="p-3 user-chat-topbar">
                      <Row className="align-items-center">
                        <Col sm={4} xs={8}>
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 d-block d-lg-none me-3">
                              <Link
                                href="#"
                                onClick={backToUserChat}
                                className="p-1 user-chat-remove fs-18"
                              >
                                <i className="align-bottom ri-arrow-left-s-line"></i>
                              </Link>
                            </div>
                            <div className="overflow-hidden flex-grow-1">
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 chat-user-img online user-own-img align-self-center me-3 ms-0">
                                  <img
                                    src={avatar8}
                                    className="rounded-circle avatar-xs"
                                    alt="Customer Photo"
                                  />
                                  {isOnline.has(Chat_Box_Username) && (
                                    <span className="user-status"></span>
                                  )}
                                </div>
                                <div className="overflow-hidden flex-grow-1">
                                  <h5 className="mb-0 text-truncate fs-16">
                                    <a
                                      className="text-reset username"
                                      data-bs-toggle="offcanvas"
                                      href="#userProfileCanvasExample"
                                      aria-controls="userProfileCanvasExample"
                                    >
                                      {Chat_Box_Username.split("__#")[1]
                                        ? Chat_Box_Username.split("__#")[1]
                                        : Chat_Box_Username}
                                    </a>
                                  </h5>

                                  <p className="mb-0 text-truncate text-muted fs-14 userStatus">
                                    <small>
                                      {isOnline.has(Chat_Box_Username)
                                        ? "online"
                                        : "offline"}
                                    </small>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col sm={8} xs={4}>
                          <ul className="mb-0 list-inline user-chat-nav text-end">
                            <li className="m-0 list-inline-item">
                              <Dropdown
                                show={search_Menu}
                                onToggle={toggleSearch}
                              >
                                <Dropdown.Toggle
                                  className="btn btn-ghost-secondary btn-icon arrow-none"
                                  as="button"
                                >
                                  <FeatherIcon
                                    icon="search"
                                    className="icon-sm"
                                  />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="p-0 dropdown-menu-end dropdown-menu-lg">
                                  <div className="p-2">
                                    <div className="search-box">
                                      <Form.Control
                                        onKeyUp={searchMessages}
                                        type="text"
                                        className="form-control bg-light border-light"
                                        placeholder="Search here..."
                                        id="searchMessage"
                                      />
                                      <i className="ri-search-2-line search-icon"></i>
                                    </div>
                                  </div>
                                </Dropdown.Menu>
                              </Dropdown>
                            </li>

                            <li className="m-0 list-inline-item">
                              <Dropdown
                                show={settings_Menu}
                                onClick={toggleSettings}
                              >
                                <Dropdown.Toggle
                                  className="btn btn-ghost-secondary btn-icon arrow-none"
                                  as="button"
                                >
                                  <FeatherIcon
                                    icon="more-vertical"
                                    className="icon-sm"
                                  />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item href="#">
                                    <i className="align-bottom ri-mic-off-line text-muted me-2"></i>
                                    Muted
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#">
                                    <i className="align-bottom ri-delete-bin-5-line text-muted me-2"></i>
                                    Delete
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </li>
                          </ul>
                        </Col>
                      </Row>
                    </div>

                    <div className="position-relative" id="users-chat">
                      <div
                        className="p-3 chat-conversation p-lg-4 simplebar-scrollable-y"
                        id="chat-conversation"
                      >
                        {isLoading ? (
                          <Spinners setLoading={setLoading} />
                        ) : (
                          <SimpleBar
                            ref={chatRef}
                            style={{
                              height: "100%",
                            }}
                          >
                            <ul
                              className="list-unstyled chat-conversation-list"
                              id="users-conversation"
                            >
                              {messageState.length != 0 &&
                                messageState.map((message: any, index) =>
                                  message.role_type == "customer" &&
                                  message.customer_id == Chat_Box_Username &&
                                  message.user_id == admin?.id ? (
                                    <li
                                      className="chat-list left"
                                      key={index + 1}
                                    >
                                      <div className="conversation-list">
                                        <div className="chat-avatar">
                                          <img
                                            src={avatar8}
                                            alt="Customer Photo"
                                          />
                                        </div>

                                        <div className="user-chat-content">
                                          <div className="ctext-wrap">
                                            {message.message_type == "text" ? (
                                              <>
                                                <div className="ctext-wrap-content">
                                                  <p className="mb-0 ctext-content">
                                                    {message.message}
                                                  </p>
                                                </div>
                                                <Dropdown className="align-self-start message-box-drop">
                                                  <Dropdown.Toggle
                                                    href="#"
                                                    className="btn nav-btn arrow-none"
                                                    as="a"
                                                  >
                                                    <i className="ri-more-2-fill"></i>
                                                  </Dropdown.Toggle>
                                                  <Dropdown.Menu>
                                                    <Dropdown.Item href="#">
                                                      <i className="align-bottom ri-file-copy-line me-2 text-muted"></i>
                                                      Copy
                                                    </Dropdown.Item>

                                                    <Dropdown.Item href="#">
                                                      <i className="align-bottom ri-delete-bin-5-line me-2 text-muted"></i>
                                                      Delete
                                                    </Dropdown.Item>
                                                  </Dropdown.Menu>
                                                </Dropdown>
                                              </>
                                            ) : (
                                              <div className="mb-0 message-img">
                                                <div className="message-img-list">
                                                  <div>
                                                    <a
                                                      className="popup-img d-inline-block"
                                                      href={avatar9}
                                                    >
                                                      <img
                                                        src={avatar9}
                                                        alt="photo"
                                                        className="border rounded"
                                                      />
                                                    </a>
                                                  </div>
                                                  <div className="message-img-link">
                                                    <ul className="mb-0 list-inline">
                                                      <Dropdown
                                                        as="li"
                                                        className="list-inline-item"
                                                      >
                                                        <Dropdown.Toggle
                                                          href="#"
                                                          as="a"
                                                          className="arrow-none"
                                                        >
                                                          <i className="ri-more-fill"></i>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                          <Dropdown.Item href="#">
                                                            <i className="align-bottom ri-file-copy-line me-2 text-muted"></i>
                                                            Copy
                                                          </Dropdown.Item>

                                                          <Dropdown.Item href="#">
                                                            <i className="align-bottom ri-delete-bin-5-line me-2 text-muted"></i>
                                                            Delete
                                                          </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                      </Dropdown>
                                                    </ul>
                                                  </div>
                                                </div>
                                              </div>
                                            )}
                                          </div>

                                          <div className="conversation-name">
                                            <small className="text-muted time">
                                              {formatTo12Hour(
                                                message.created_at
                                              ).toLowerCase()}
                                            </small>
                                            <span className="text-success check-message-icon">
                                              <i className="align-bottom ri-check-double-line"></i>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  ) : message.role_type == "adminUser" &&
                                    message.customer_id == Chat_Box_Username &&
                                    message.user_id == admin?.id ? (
                                    <li
                                      className="chat-list right"
                                      key={index + 1}
                                    >
                                      <div className="conversation-list">
                                        <div className="user-chat-content">
                                          <div className="ctext-wrap">
                                            {message.message_type == "text" ? (
                                              <>
                                                <div className="ctext-wrap-content">
                                                  <p className="mb-0 ctext-content">
                                                    {message.message}
                                                  </p>
                                                </div>
                                                <Dropdown className="align-self-start message-box-drop">
                                                  <Dropdown.Toggle
                                                    href="#"
                                                    className="btn nav-btn arrow-none"
                                                    as="a"
                                                  >
                                                    <i className="ri-more-2-fill"></i>
                                                  </Dropdown.Toggle>
                                                  <Dropdown.Menu>
                                                    <Dropdown.Item href="#">
                                                      <i className="align-bottom ri-file-copy-line me-2 text-muted"></i>
                                                      Copy
                                                    </Dropdown.Item>

                                                    <Dropdown.Item href="#">
                                                      <i className="align-bottom ri-delete-bin-5-line me-2 text-muted"></i>
                                                      Delete
                                                    </Dropdown.Item>
                                                  </Dropdown.Menu>
                                                </Dropdown>
                                              </>
                                            ) : (
                                              <div className="mb-0 message-img">
                                                <div className="message-img-list">
                                                  <div>
                                                    <a
                                                      className="popup-img d-inline-block"
                                                      href={avatar9}
                                                    >
                                                      <img
                                                        src={avatar9}
                                                        alt="photo"
                                                        className="border rounded"
                                                      />
                                                    </a>
                                                  </div>
                                                  <div className="message-img-link">
                                                    <ul className="mb-0 list-inline">
                                                      <Dropdown
                                                        as="li"
                                                        className="list-inline-item"
                                                      >
                                                        <Dropdown.Toggle
                                                          href="#"
                                                          as="a"
                                                          className="arrow-none"
                                                        >
                                                          <i className="ri-more-fill"></i>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                          <Dropdown.Item href="#">
                                                            <i className="align-bottom ri-file-copy-line me-2 text-muted"></i>
                                                            Copy
                                                          </Dropdown.Item>

                                                          <Dropdown.Item href="#">
                                                            <i className="align-bottom ri-delete-bin-5-line me-2 text-muted"></i>
                                                            Delete
                                                          </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                      </Dropdown>
                                                    </ul>
                                                  </div>
                                                </div>
                                              </div>
                                            )}
                                          </div>

                                          <div className="conversation-name">
                                            <small className="text-muted time">
                                              {formatTo12Hour(
                                                message.created_at
                                              ).toLowerCase()}
                                            </small>
                                            <span className="text-success check-message-icon">
                                              <i className="align-bottom ri-check-double-line"></i>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  ) : (
                                    ""
                                  )
                                )}
                            </ul>
                          </SimpleBar>
                        )}
                      </div>
                      {/* copy msg */}
                      <Alert
                        variant="warning"
                        className="px-4 copyclipboard-alert fade"
                        id="copyClipBoard"
                        role="alert"
                      >
                        Message copied
                      </Alert>
                      {/* emoji picker */}
                      {emojiPicker && (
                        <EmojiPicker
                          onEmojiClick={onEmojiClick}
                          width={250}
                          height={382}
                        />
                      )}
                    </div>

                    <div className="p-3 chat-input-section p-lg-4">
                      <form id="chatinput-form">
                        <Row className="g-0 align-items-center">
                          <div className="col-auto">
                            <div className="chat-input-links me-2">
                              <div className="links-list-item">
                                <button
                                  type="button"
                                  className="btn btn-link text-decoration-none emoji-btn"
                                  id="emoji-btn"
                                  onClick={() => setemojiPicker(!emojiPicker)}
                                >
                                  <i className="align-middle bx bx-smile"></i>
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="col">
                            <div className="chat-input-feedback">
                              Please Enter a Message
                            </div>

                            {inputShow ? (
                              <input
                                type="text"
                                value={curMessage}
                                onKeyDown={onKeyPress}
                                onChange={(e) => setcurMessage(e.target.value)}
                                className="form-control chat-input bg-light border-light"
                                id="chat-input"
                                placeholder="Type your message..."
                              />
                            ) : (
                              <input
                                type="text"
                                value=""
                                disabled={true}
                                className="form-control chat-input bg-light border-light"
                                id="chat-input"
                                placeholder="Type your message..."
                              />
                            )}
                          </div>
                          <div className="col-auto">
                            <div className="chat-input-links ms-2">
                              <div className="links-list-item">
                                {inputShow ? (
                                  <button
                                    type="button"
                                    disabled={curMessage === ""}
                                    onClick={() => {
                                      addMessage();
                                      setemojiPicker(false);
                                      setemojiArray("");
                                    }}
                                    className="btn btn-success chat-send waves-effect waves-light disable"
                                  >
                                    <i className="align-bottom ri-send-plane-2-fill"></i>
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    disabled={true}
                                    className="btn btn-success chat-send waves-effect waves-light disable"
                                  >
                                    <i className="align-bottom ri-send-plane-2-fill"></i>
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </Row>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Fragment>
  );
};
Chat.layout = (page: any) => <Layout children={page} />;
export default Chat;
