import React from "react";
import classNames from "classnames";
import 'components/InterviewerListItem.scss';

export default function InterviewerListItem(props) {
  const { name, avatar, setInterviewer, selected } = props;

  let intervewierClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  });


  return (
    <li
      className={intervewierClass}
      onClick={setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name} />
      {selected && name}
    </li>
  );
}