import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import Confirm from "./Confirm";


export default function Appointment(props) {
  console.log('Interviewer', props.interview )

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //creating new appointments
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
      //when bookInterview promise resolves transition to SHOW mode
      .then(() => {
        transition(SHOW);
      });
  };

  //deleting apppointments
  const remove = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(CONFIRM, true);
    transition(DELETING, true);

    props.cancelInterview(props.id, interview)
      .then(() => {
        transition(EMPTY);
      });
  };

  // const edit = (name, interview) => {

  // }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CONFIRM && <Confirm message="Confirm?"
        onConfirm={remove}
        onCancel={() => back(SHOW)} />}

      {mode === SHOW && <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
      />
      }
      {mode === DELETING && <Status message="Deleting" />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === CREATE && <Form
        interviewers={props.interviewers}
        onCancel={() => back(EMPTY)}
        onSave={save}
      />}
      {mode === EDIT && <Form
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onCancel={() => back(SHOW)}
        onSave={save}
      />}
    </article>
  );
}