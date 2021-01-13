import React, { Fragment, useState } from 'react';

import clsx from 'clsx';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { Hidden, Drawer, Paper } from '@material-ui/core';

import { connect } from 'react-redux';

import SidebarHeader from '../../layout-components/SidebarHeader';
import SidebarMenu from '../../layout-components/SidebarMenu';

import { setSidebarToggleMobile } from '../../reducers/ThemeOptions';
import axios from 'axios';

const Sidebar = props => {
  let navItems = [
    {
      label: 'Menu',
      content: JSON.parse(
        `[
          {
            "label": "Home page",
            "to": "/HomePage"
          },
    {
      "label": "Elements",
      "icon": "SettingsIcon",
      "content": [
        {
          "label": "Buttons",
          "description": "Wide selection of buttons that feature different styles for backgrounds, borders and hover options!",
          "to": "/Buttons"
        },
        {
          "label": "Navigation menus",
          "description": "Navigation menus are one of the basic building blocks for any web or mobile app.",
          "to": "/NavigationMenus"
        },
        {
          "label": "Progress Bars",
          "description": "You can use the progress bars on their own or in combination with other widgets.",
          "to": "/ProgressBars"
        },
        {
          "label": "Pagination",
          "description": "Basic and dynamic pagination for use in your next awesome application.",
          "to": "/Pagination"
        },
        {
          "label": "Scrollable",
          "description": "Add scrolling areas to any elements with custom scrollbars or default browser ones.",
          "to": "/Scrollable"
        },
        {
          "label": "Badges",
          "description": "Badges and labels are used to offer extra small pieces of info for your content.",
          "to": "/Badges"
        },
        {
          "label": "Icons",
          "description": "Wide icons selection including from flag icons to FontAwesome and other icons libraries.",
          "to": "/Icons"
        },
        {
          "label": "Utilities & Helpers",
          "description": "These are helpers that speed up the dev time for various components and effects.",
          "to": "/UtilitiesHelpers"
        }
      ]
    },
    {
      "label": "Cards",
      "icon": "ViewModuleIcon",
      "content": [
        {
          "label": "Cards examples 3",
          "description": "Wide selection of cards with multiple styles, borders, actions and hover effects.",
          "to": "/Cards3"
        }
      ]
    },
    {
      "label": "Widgets",
      "icon": "ReceiptIcon",
      "content": [
        {
          "label": "Accordions",
          "description": "Accordions represent collapsable component with extended functionality.",
          "to": "/Accordions"
        },
        {
          "label": "Arousi",
          "description": "Wide selection of modal dialogs styles and animations available.",
          "to": "/Modals"
        },
        {
          "label": "Notifications",
          "description": "Show beautiful, animated growl like notifications or alerts on your pages screens.",
          "to": "/Notifications"
        },
        {
          "label": "Popovers",
          "description": "Add small overlay content, like those found in iOS, to any element for housing secondary information.",
          "to": "/Popovers"
        },
        {
          "label": "Tabs",
          "description": "Tabs are used to split content between multiple sections. Wide variety available.",
          "to": "/Tabs"
        }
      ]
    },
    {
      "label": "Regular Tables",
      "icon": "CodeIcon",
      "content": [
        {
          "label": "Tables examples 1",
          "description": "Tables are the backbone of almost all web applications.",
          "to": "/RegularTables1"
        },
        {
          "label": "Tables examples 4",
          "description": "Tables are the backbone of almost all web applications.",
          "to": "/RegularTables4"
        }
      ]
    },
    {
      "label": "Forms Elements",
      "icon": "BarChartIcon",
      "content": [
        {
          "label": "Controls",
          "description": "Wide selection of forms controls, using a standardised code base, specifically for React.",
          "to": "/FormsControls"
        }
      ]
    },
    {
      "label": "Others",
      "icon": "ChatIcon",
      "content": [
        {
          "label": "Apex Charts",
          "description": "Wonderful animated charts built with ApexCharts components.",
          "to": "/ApexCharts"
        },
        {
          "label": "Maps",
          "description": "Implement in your applications Google or vector maps.",
          "to": "/Maps"
        },
        {
          "label": "List Groups",
          "description": "These can be used with other components and elements to create stunning and unique new elements for your UIs.",
          "to": "/ListGroups"
        }
      ]
    },
    {
      "label": "Locations",
      "to": "/LocationsHR"
      
    },
    {
      "label": "Faculties",
      "to": "/FacultiesHR"
      
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
    },
    {
      "label": "Personal Schedule",
      "to": "/personalScheduleAC"
      
    },
    {
      "label": "My Requests",
      "to": "/myRequestsAC"    
    }
  ]`
      )
    }
  ];
  const [nav, setNav] = useState([]);
  React.useEffect(() => {
    async function FetchData() {
      const response = await axios
        .get('http://localhost:3001/staff/getUserData', {
          headers: {
            token: localStorage.getItem('UserToken')
          }
        })
        .then(function(response) {
          return response.data;
        })
        .catch(function(error) {
          console.log(error.response.data);
          return '';
        });
      if (response.role === 'instructor') {
        navItems[0].content.push({
          label: 'Dropdowns',
          description:
            'A drop-down list is a graphical control element, similar to a list box, that allows the user to choose one value from a list.',
          to: '/Dropdowns'
        });
        setNav(navItems);
      }
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
          className="app-sidebar-wrapper-lg">
          <SidebarHeader />
          <PerfectScrollbar>{sidebarMenuContent}</PerfectScrollbar>
        </Drawer>
      </Hidden>

      <Hidden mdDown>
        <Paper
          className={clsx('app-sidebar-wrapper', {
            'app-sidebar-wrapper-fixed': sidebarFixed
          })}
          square
          elevation={sidebarShadow ? 11 : 3}>
          <SidebarHeader />
          <div
            className={clsx({
              'app-sidebar-menu': sidebarFixed
            })}>
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
