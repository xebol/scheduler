import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  console.log('PROPS', props);

  const interviewerSelection = props.interviewers.map((interviewer) => {
    console.log('Interviewer', interviewer);

    return (
      <InterviewerListItem
        key={interviewer.id}
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={props.setInterviewer}
      />
    );
  });

  // const selectedInterviewer = classNames("interviewers__list", {
  //   "interviewers__list--selected": props.selected
  // });


  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">
        Interviewer
      </h4>
      <ul className="interviewers__list">
        {interviewerSelection}
      </ul>
    </section>
  );
}