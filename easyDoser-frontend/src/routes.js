/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import Collection from "views/Collection/Collections.js";
import EndorsementPolicies from "views/EndorsementPolicies/EndorsementPolicies.js"
import EditCollection from "views/EditCollection/Collections.js"
import CommitCollection from "views/CommitCollection/Commit"

const dashboardRoutes = [
  {
    path: "/channels",
    name: "Channels",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/collections",
    name: "Collections",
    rtlName: "قائمة الجدول",
    icon: "P",
    component: Collection,
    layout: "/admin"
  },
  {
    path: "/endorsement_policies",
    name: "Endorsement Policies",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: EndorsementPolicies,
    layout: "/admin"
  },
  {
    path: "/updateCollection",
    name: "Approve",
    rtlName: "قائمة الجدول",
    icon: "LibraryAdd",
    component: EditCollection,
    layout: "/admin"
  },
  {
    path: "/commitchannel",
    name: "Commit Policy",
    rtlName: "قائمة الجدول",
    icon: "check",
    component: CommitCollection,
    layout: "/admin"
  },
];

export default dashboardRoutes;
