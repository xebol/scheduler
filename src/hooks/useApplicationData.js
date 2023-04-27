import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get("api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers")
    ])
      .then((all) => {
        setState(prev => ({
          ...prev, days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }));

      });
  }, []);

  const setDay = day => setState({ ...state, day });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`api/appointments/${id}`, {
      interview
    })
      .then(() => {
        setState({ ...state, appointments: appointments, days: updateSpots(state, id, appointments) });
      });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments: appointments, days: updateSpots(state, id, appointments) });
      });
  };

  const updateSpots = (state, id, appointments) => {
    //day initial value
    let bookedDay = state.day;

    //loop through the days to get the day with appointment matching the given id
    for (let day of state.days) {
      if (day.appointments.includes(id)) {
        bookedDay = day;
      }
    }

    //get the actual appointments array
    let appointmentsArray = bookedDay.appointments.map(id => appointments[id]);

    //get the num of spots remaining by filtering the appoinmentsts with null interview
    const numOfSpots = appointmentsArray.filter((appointment) => appointment.interview === null).length;

    //copied the days array into a new variable without changing the state
    const days = [...state.days];

    //looped through the days and updated the number of spots 
    for (let d of days) {
      if (d.name === bookedDay.name) {
        d.spots = numOfSpots;
      }
    }

    //return the updated spots for the specific day
    return days;
  };


  return { state, setDay, bookInterview, cancelInterview, updateSpots };
};
