export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find(dayBooked => dayBooked.name === day);
  if (!selectedDay) {
    return [];
  }


  const appointments = selectedDay.appointments.map(id => state.appointments[id]);
  return appointments;
}


export function getInterview(state, interview) {
  //check if either is null or undefined
  if (!interview || !interview.interviewer) {
    return null;
  }

  const interviewer = state.interviewers[interview.interviewer];

  if (interviewer) {
    return { ...interview, interviewer };
  }

  return null;
}