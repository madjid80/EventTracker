import {
  UsersEventsRecordEventsRoute,
  UsersEventsQueryEventsRoute,
} from "./events/index.js";

const usersRoutes = {
  routes: [UsersEventsRecordEventsRoute, UsersEventsQueryEventsRoute],
};

export { usersRoutes };
