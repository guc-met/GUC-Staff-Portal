import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { ThemeProvider } from '@material-ui/styles';

import MuiTheme from './theme';

// Layout Blueprints

import { LeftSidebar } from './layout-blueprints';

// Example Pages

import Buttons from './example-pages/Buttons';
import Dropdowns from './example-pages/Dropdowns';
import NavigationMenus from './example-pages/NavigationMenus';
import ProgressBars from './example-pages/ProgressBars';
import Pagination from './example-pages/Pagination';
import Scrollable from './example-pages/Scrollable';
import Badges from './example-pages/Badges';
import Icons from './example-pages/Icons';
import UtilitiesHelpers from './example-pages/UtilitiesHelpers';
import RegularTables1 from './example-pages/personalSchedule';
import RegularTables4 from './example-pages/RegularTables4';
import FormsControls from './example-pages/FormsControls';

const HomePage = lazy(() => import('./example-pages/HomePage'));
const AttendanceLogs = lazy(() => import('./example-pages/AttendanceLogs'));
const Cards3 = lazy(() => import('./example-pages/Cards3'));
const Accordions = lazy(() => import('./example-pages/Accordions'));
const Modals = lazy(() => import('./example-pages/Modals'));
const Notifications = lazy(() => import('./example-pages/Notifications'));
const Popovers = lazy(() => import('./example-pages/Popovers'));
const Tabs = lazy(() => import('./example-pages/Tabs'));
const ApexCharts = lazy(() => import('./example-pages/ApexCharts'));
const Maps = lazy(() => import('./example-pages/Maps'));
const ListGroups = lazy(() => import('./example-pages/ListGroups'));

const Login = lazy(() => import('./example-pages/login'));

const FacultiesHR = lazy(() => import('./example-pages/FacultiesHR'));
const DepartmentsHR = lazy(() => import('./example-pages/DepartmentsHR'));
const CoursesHR = lazy(() => import('./example-pages/CoursesHR'));
const LocationsHR = lazy(() => import('./example-pages/LocationsHR'));
const CourseSchedule = lazy(() => import('./example-pages/CourseSchedule'));
const personalScheduleAC = lazy(() =>
  import('./example-pages/personalSchedule')
);
const myRequestsAC = lazy(() => import('./example-pages/MyRequests'));
const Routes = () => {
  const location = useLocation();
  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.99
    },
    in: {
      opacity: 1,
      scale: 1
    },
    out: {
      opacity: 0,
      scale: 1.01
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  };

  return (
    <ThemeProvider theme={MuiTheme}>
      <AnimatePresence>
        <Suspense
          fallback={
            <div className="d-flex align-items-center vh-100 justify-content-center text-center font-weight-bold font-size-lg py-3">
              <div className="w-50 mx-auto">
                Please wait while we load the live preview examples
              </div>
            </div>
          }>
          <Switch>
            <Redirect exact from="/" to="/Login" />
            <Route path="/Login" component={Login} />
            <Route
              path={[
                '/AttendanceLogs',
                '/HomePage',
                '/Buttons',
                '/Dropdowns',
                '/NavigationMenus',
                '/ProgressBars',
                '/Pagination',
                '/Scrollable',
                '/Badges',
                '/Icons',
                '/UtilitiesHelpers',
                '/Cards3',
                '/Accordions',
                '/Modals',
                '/Notifications',
                '/Popovers',
                '/Tabs',
                '/RegularTables1',
                '/RegularTables4',
                '/FormsControls',
                '/ApexCharts',
                '/Maps',
                '/ListGroups',
                '/LocationsHR',
                '/FacultiesHR',
                '/DepartmentsHR',
                '/CoursesHR',
                '/CourseSchedule',
                '/personalScheduleAC',
                '/myRequestsAC'
              ]}>
              <LeftSidebar>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route path="/HomePage" component={HomePage} />
                    <Route path="/AttendanceLogs" component={AttendanceLogs} />
                    <Route path="/Buttons" component={Buttons} />
                    <Route path="/Dropdowns" component={Dropdowns} />
                    <Route
                      path="/NavigationMenus"
                      component={NavigationMenus}
                    />
                    <Route path="/ProgressBars" component={ProgressBars} />
                    <Route path="/Pagination" component={Pagination} />
                    <Route path="/Scrollable" component={Scrollable} />
                    <Route path="/Badges" component={Badges} />
                    <Route path="/Icons" component={Icons} />
                    <Route
                      path="/UtilitiesHelpers"
                      component={UtilitiesHelpers}
                    />
                    <Route path="/Cards3" component={Cards3} />
                    <Route path="/Accordions" component={Accordions} />
                    <Route path="/Modals" component={Modals} />
                    <Route path="/Notifications" component={Notifications} />
                    <Route path="/Popovers" component={Popovers} />
                    <Route path="/Tabs" component={Tabs} />
                    <Route path="/RegularTables1" component={RegularTables1} />
                    <Route path="/RegularTables4" component={RegularTables4} />
                    <Route path="/FormsControls" component={FormsControls} />
                    <Route path="/ApexCharts" component={ApexCharts} />
                    <Route path="/Maps" component={Maps} />
                    <Route path="/ListGroups" component={ListGroups} />
                    <Route path="/LocationsHR" component={LocationsHR} />
                    <Route path="/FacultiesHR" component={FacultiesHR} />
                    <Route path="/DepartmentsHR" component={DepartmentsHR} />
                    <Route path="/CoursesHR" component={CoursesHR} />
                    <Route path="/CourseSchedule" component={CourseSchedule} />
                    <Route
                      path="/personalScheduleAC"
                      component={personalScheduleAC}
                    />
                    <Route path="/myRequestsAC" component={myRequestsAC} />
                  </motion.div>
                </Switch>
              </LeftSidebar>
            </Route>
          </Switch>
        </Suspense>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Routes;
