
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Device from "views/examples/Device.js";

import DataSensor from "views/examples/DataSensor.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/data-sensor",
    name: "Data Sensor",
    icon: "ni ni-bullet-list-67 text-red",
    component: <DataSensor />,
    layout: "/admin",
  },
  {
    path: "/device",
    name: "Device",
    icon: "fa-solid fa-hard-drive text-orange",
    component: <Device />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  
 
];
export default routes;
