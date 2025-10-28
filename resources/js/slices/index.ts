import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

//Mailbox
import MailboxReducer from "./mailbox/reducer";

//TicketsList
import TicketsReducer from "./tickets/reducer";

// Tasks
import TasksReducer from "./tasks/reducer";

//  Dashboard Ecommerce
import DashboardEcommerceReducer from "./dashboardEcommerce/reducer";

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Mailbox: MailboxReducer,
  Tickets: TicketsReducer,
  Tasks: TasksReducer,
  DashboardEcommerce: DashboardEcommerceReducer,
});

export default rootReducer;
