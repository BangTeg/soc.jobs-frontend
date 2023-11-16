import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Login from './auth/Login';
import Register from './auth/Register';
import DashboardAdmin from './Routes/DashboardAdmin';
import AboutUs from './Routes/AboutUs';
import ContactUs from './Routes/ContactUs';
import DashboardUser from './users/DashboardUser';
import FullTime from "./users/FullTime";
import FreeLance from "./users/FreeLance";
import Internship from "./users/Internship";
import { Navigate } from "react-router-dom";
import LoadingScreen from './components/LoadingScreen';
import RegisterVerify from './auth/RegisterVerify';
import NotFound from "./auth/NotFound";
import ForgotPassword from './auth/ForgotPassword';
import Faq from "./Routes/Faq";
import UserProfile from './users/UserProfile';
import UserApplicant from './users/HistoryLamaran';
import ViewCv from "./users/ViewCv";

// Routes import FullTime jobs
import SocmedManagementFT from './users/FullTimeJobs/SocmedManagementFT';
import UIUXDesignFT from './users/FullTimeJobs/UIUXDesignFT';
import BrandingFT from './users/FullTimeJobs/BrandingFT';
import DigitalADSFT from './users/FullTimeJobs/DigitalADSFT';
import LiveStreamingEventFT from './users/FullTimeJobs/LiveStreamingEventFT';
import PhotoVidioFT from './users/FullTimeJobs/PhotoVidioFT';
import SEOSEMFT from './users/FullTimeJobs/SEOSEMFT';
import WebDevFT from './users/FullTimeJobs/WebDevFT';

// Routes import Freelance Jobs
import SocmedManagementFL from './users/FreeLanceJobs/SocmedManagementFL';
import UIUXDesignFL from './users/FreeLanceJobs/UIUXDesignFL';
import BrandingFL from './users/FreeLanceJobs/BrandingFL';
import DigitalADSFL from './users/FreeLanceJobs/DigitalADSFL';
import LiveStreamingEventFL from './users/FreeLanceJobs/LiveStreamingEventFL';
import PhotoVidioFL from './users/FreeLanceJobs/PhotoVidioFL';
import SEOSEMFL from './users/FreeLanceJobs/SEOSEMFL';
import WebDevFL from './users/FreeLanceJobs/WebDevFL';

// Routes import Internship Jobs
import SocmedManagementINT from './users/InternshipJobs/SocmedManagementINT';
import UIUXDesignINT from './users/InternshipJobs/UIUXDesignINT';
import BrandingINT from './users/InternshipJobs/BrandingINT';
import DigitalADSINT from './users/InternshipJobs/DigitalADSINT';
import LiveStreamingEventINT from './users/InternshipJobs/LiveStreamingEventINT';
import PhotoVidioINT from './users/InternshipJobs/PhotoVidioINT';
import SEOSEMINT from './users/InternshipJobs/SEOSEMINT';
import WebDevINT from './users/InternshipJobs/WebDevINT';

// backoffice
import BackofficeRootLayout from "./Routes/backoffice/components/layout/root-layout";
import BackofficeLogin from "./Routes/backoffice/pages/login";
import BackOfficeVacancy from "./Routes/backoffice/pages/vacancy";
import BackOfficeDashboard from "./Routes/backoffice/pages/dashboard";
import BackOfficeWaitingApproval from "./Routes/backoffice/pages/waiting-approval";
import BackOfficeApproved from "./Routes/backoffice/pages/approved";
import BackOfficeRejected from "./Routes/backoffice/pages/rejected";


const ProtectedRoute = ({children}) => {
  
  //Acces get token 
  if (!localStorage.getItem("access_token")) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {

  //state loading page
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //simulasi loading berlangsung 3 detik
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  
  // Configurasi routing 

  const routeConfig = [
    {path: "/userHome", component: DashboardUser},
    {path: "/userHome/FullTime", component: FullTime},
    {path: "/userHome/Internship", component: Internship},
    {path: "/userHome/FreeLance", component: FreeLance},
    {path: "/userHome/Profile", component: UserProfile},
    {path: "/userHome/HistoryApplicant", component: UserApplicant},
    {path: "/userHome/aboutus", component: AboutUs},
    {path: "/userHome/contactus", component: ContactUs},
    {path: "/userHome/faq", component: Faq},
    {path: "/userHome/Profile/viewcv", component: ViewCv},

    // FullTime Routes
    {path: "/FullTime/SocmedManagement", component: SocmedManagementFT},
    {path: "/FullTime/UIUXDesign", component: UIUXDesignFT},
    {path: "/FullTime/Branding", component: BrandingFT},
    {path: "/FullTime/DigitalADS", component: DigitalADSFT},
    {path: "/FullTime/LiveStreamingEvent", component: LiveStreamingEventFT},
    {path: "/FullTime/Photo&Vidio", component: PhotoVidioFT},
    {path: "/FullTime/SEO&SEM", component: SEOSEMFT},
    {path: "/FullTime/WebDevelopment", component: WebDevFT},

    // FreeLance Routes
    {path: "/FreeLance/SocmedManagement", component: SocmedManagementFL},
    {path: "/FreeLance/UIUXDesign", component: UIUXDesignFL},
    {path: "/FreeLance/Branding", component: BrandingFL},
    {path: "/FreeLance/DigitalADS", component: DigitalADSFL},
    {path: "/FreeLance/LiveStreamingEvent", component: LiveStreamingEventFL},
    {path: "/FreeLance/Photo&Vidio", component: PhotoVidioFL},
    {path: "/FreeLance/SEO&SEM", component: SEOSEMFL},
    {path: "/FreeLance/WebDevelopment", component: WebDevFL},

    // Internship Routes
    {path: "/Intenship/SocmedManagement", component: SocmedManagementINT},
    {path: "/Intenship/UIUXDesign", component: UIUXDesignINT},
    {path: "/Intenship/Branding", component: BrandingINT},
    {path: "/Intenship/DigitalADS", component: DigitalADSINT},
    {path: "/Intenship/LiveStreamingEvent", component: LiveStreamingEventINT},
    {path: "/Intenship/Photo&Vidio", component: PhotoVidioINT},
    {path: "/Intenship/SEO&SEM", component: SEOSEMINT},
    {path: "/Intenship/WebDevelopment", component: WebDevINT},
  ];

  //backoffice routes
  const backofficeRoutes = [
		// backoffice
		{ path: "/backoffice/login", component: BackofficeLogin },
		{ path: "/backoffice/vacancy", component: BackOfficeVacancy },
		{ path: "/backoffice/dashboard", component: BackOfficeDashboard },
		{
			path: "/backoffice/waiting-approval",
			component: BackOfficeWaitingApproval,
		},
		{
			path: "/backoffice/approved",
			component: BackOfficeApproved,
		},
		{
			path: "/backoffice/rejected",
			component: BackOfficeRejected,
		},
	];

  //backoffice list routes
  const backOfficeListRoute = backofficeRoutes.map((route, index) => {
		return (
			<Route
				key={index}
				path={route.path}
				element={
					// <ProtectedRoute>
            <BackofficeRootLayout>
              <route.component />
            </BackofficeRootLayout>
					// </ProtectedRoute>
				}
			/>
		);
	});

  const protectedRoutes = routeConfig.map((route, index) => (
    <Route key={index} path={route.path} element={<ProtectedRoute><route.component/></ProtectedRoute>}></Route>
  ));

  // Mapping routing

  return (
    <>
    {loading ? (
      <LoadingScreen/>
    ) : (
      <Routes>
        {/* Routes All Users */}
      <Route path="/" element={<Home />} /> 
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/auth/verify/:token" element={<RegisterVerify />}></Route> 
      <Route path="/auth/reset/:token" element={<ForgotPassword />}></Route>
      <Route path="/auth/verify/notfound" element={<NotFound />} />
      <Route path="/adminDashboard" element={<DashboardAdmin />}></Route>  
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/faq" element={<Faq/>} />

      {/* Routes All Page After User Login  */}
      {protectedRoutes}

      {/* backoffice routes */}
      {backOfficeListRoute}
    </Routes>
    )}
    </>
  );
};

export default App;
