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
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //creating new appointments
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING, true);

    props.bookInterview(props.id, interview)
      //when bookInterview promise resolves transition to SHOW mode
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => transition(ERROR_SAVE, true));
  };

  // deleting apppointments
  const remove = (event) => {
    // const interview = {
    //   student: name,
    //   interviewer
    // };

    transition(CONFIRM, true);
    transition(DELETING, true);

    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => transition(ERROR_DELETE, true));
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === SAVING && <Status message="Saving" />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === DELETING && <Status message="Deleting" />}
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

      {mode === ERROR_DELETE && <Status message="Error Deleting"
        onDelete={() => transition(ERROR_DELETE)} />}

      {mode === ERROR_SAVE && <Status message="Error Saving"
        onSave={save} />}
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