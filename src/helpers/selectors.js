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

  //accessing for the interviewer ID
  const interviewer = state.interviewers[interview.interviewer];

  const interviewObj = { ...interview, interviewer }

  if (interviewer) {
    return interviewObj;
  }

  return null;
}


export function getInterviewersForDay(state, day) {
  const selectedInterviewer = state.days.find(apptBooked => apptBooked.name === day);
  if (!selectedInterviewer) {
    return [];
  }

  const appointments = selectedInterviewer.interviewers.map(id => state.interviewers[id]);
  return appointments;
}