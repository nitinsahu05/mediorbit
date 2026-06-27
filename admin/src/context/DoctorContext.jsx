import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") || ""
  );
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfileData] = useState(false);

  const getAuthHeader = () => ({
    headers: {
      Authorization: `Bearer ${dToken}`,
    },
  });

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/appointments",
        getAuthHeader()
      );

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-appointment",
        { appointmentId },
        getAuthHeader()
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
        getDashData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-appointment",
        { appointmentId },
        getAuthHeader()
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
        getDashData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const clearDoctorSession = () => {
    localStorage.removeItem("dToken")
    setDToken("")
    setDashData(false)
    setProfileData(false)
    setAppointments([])
  }

  const getDashData = async () => {
    try {
      console.log('getDashData called with token:', dToken)
      const { data } = await axios.get(
        backendUrl + "/api/doctor/dashboard",
        getAuthHeader()
      );

      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      } else {
        const message = data.message || '';
        console.error('Dashboard API error:', message)
        if (message.toLowerCase().includes("token") || message.toLowerCase().includes("unauthorized")) {
          clearDoctorSession()
        }
        toast.error(message || 'Failed to load dashboard data');
      }
    } catch (error) {
      console.error('Dashboard fetch error:', error);
      const errorMessage = error.response?.data?.message || error.message || '';
      console.error('Full error details:', error.response?.data)
      if (error.response?.status === 401 || errorMessage.toLowerCase().includes("token") || errorMessage.toLowerCase().includes("unauthorized")) {
        clearDoctorSession()
      }
      toast.error(errorMessage || 'Failed to load dashboard data');
    }
  };

  const getProfileData = async () => {
    try {
      console.log('getProfileData called with token:', dToken)
      const { data } = await axios.get(
        backendUrl + "/api/doctor/profile",
        getAuthHeader()
      );

      if (data.success) {
        setProfileData(data.profileData);
        console.log('Profile data loaded:', data.profileData);
      } else {
        console.error('Profile API error:', data.message)
        toast.error(data.message || 'Failed to load profile data');
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
      const errorMessage = error.response?.data?.message || error.message || '';
      console.error('Full profile error details:', error.response?.data)
      toast.error(errorMessage || 'Failed to load profile data');
    }
  };

  const value = {
    dToken,
    setDToken,
    backendUrl,
    getAppointments,
    appointments,
    setAppointments,
    completeAppointment,
    cancelAppointment,
    getDashData,
    dashData,
    setDashData,
    getProfileData,
    setProfileData,
    profileData,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
