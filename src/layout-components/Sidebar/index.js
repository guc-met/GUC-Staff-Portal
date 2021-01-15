import React, { Fragment, useState } from "react";

import clsx from "clsx";

import PerfectScrollbar from "react-perfect-scrollbar";
import { Hidden, Drawer, Paper } from "@material-ui/core";

import { connect } from "react-redux";

//import navItems from "./navItems";
import SidebarHeader from "../../layout-components/SidebarHeader";
import SidebarMenu from "../../layout-components/SidebarMenu";

import { setSidebarToggleMobile } from "../../reducers/ThemeOptions";
import axios from "axios";

const Sidebar = props => {
  let navItemss = [
    {
      label: "Menu",
      content: JSON.parse(
        `[
          {
            "label": "Home page",
            "to": "/HomePage"
          },
    {
      "label": "Departments",
      "to": "/DepartmentsHR"
      
    },
    {
      "label": "Courses",
      "to": "/CoursesHR"
      
    },
    {
      "label": "Course Schedule",
      "to": "/CourseSchedule"
    }
    
  ]`
      )
    }
  ];
  const [nav, setNav] = useState([]);
  React.useEffect(() => {
    async function FetchData() {
      const response = await axios
        .get("http://localhost:3001/staff/getUserData", {
          headers: {
            token: localStorage.getItem("UserToken")
          }
        })
        .then(function(response) {
          return response.data;
        })
        .catch(function(error) {
          console.log(error.response.data);
          return "";
        });
      if (response.role === "HR") {
        navItemss[0].content.push(
          {
            label: "Locations",
            to: "/LocationsHR"
          },
          {
            label: "Faculties",
            to: "/FacultiesHR"
          },
          {
            label: "Departments",
            to: "/DepartmentsHR"
          },
          {
            label: "Staff",
            to: "/StaffHR"
          }
        );
      } else {
        navItemss[0].content.push(
          {
            label: "Personal Schedule",
            to: "/personalScheduleAC"
          },
          {
            label: "My Requests",
            to: "/myRequestsAC"
          }
        );
      }
      if (response.role === "instructor" || response.role === "HOD") {
        navItemss[0].content.push(
          {
            label: "DayOff For Staff",
            to: "/staffDayOffHOD"
          },
          {
            label: "Staff In Department",
            to: "/StaffInDepHOD"
          }
        );
      }
      if (response.role === "HOD") {
        navItemss[0].content.push(
          {
            label: "Instructors",
            to: "/InstructorsHOD"
          },
          {
            label: "Teaching Assignments",
            to: "/TeachingAssignmentsHOD"
          }
        );
      }
      setNav(navItemss);
    }
    FetchData();
  }, []);
  const {
    setSidebarToggleMobile,
    sidebarToggleMobile,
    sidebarFixed,

    sidebarShadow
  } = props;

  const closeDrawer = () => setSidebarToggleMobile(!sidebarToggleMobile);

  const sidebarMenuContent = (
    <div>
      {nav.map(list => (
        <SidebarMenu
          component="div"
          key={list.label}
          pages={list.content}
          title={list.label}
        />
      ))}
    </div>
  );

  return (
    <Fragment>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          open={sidebarToggleMobile}
          onClose={closeDrawer}
          variant="temporary"
          elevation={4}
          className="app-sidebar-wrapper-lg"
        >
          <SidebarHeader />
          <PerfectScrollbar>{sidebarMenuContent}</PerfectScrollbar>
        </Drawer>
      </Hidden>

      <Hidden mdDown>
        <Paper
          className={clsx("app-sidebar-wrapper", {
            "app-sidebar-wrapper-fixed": sidebarFixed
          })}
          square
          elevation={sidebarShadow ? 11 : 3}
        >
          <SidebarHeader />
          <div
            className={clsx({
              "app-sidebar-menu": sidebarFixed
            })}
          >
            <PerfectScrollbar options={{ wheelPropagation: false }}>
              {sidebarMenuContent}
            </PerfectScrollbar>
          </div>
        </Paper>
      </Hidden>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  sidebarFixed: state.ThemeOptions.sidebarFixed,
  headerFixed: state.ThemeOptions.headerFixed,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile
});

const mapDispatchToProps = dispatch => ({
  setSidebarToggleMobile: enable => dispatch(setSidebarToggleMobile(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
