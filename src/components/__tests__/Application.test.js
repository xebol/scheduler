import React from "react";

import { render, cleanup, waitForElement, fireEvent, prettyDOM, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, getByTestId, queryByAltText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    //Render the Application
    const { container } = render(<Application />);

    //  Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    // Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, "Add"));

    // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    // Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));


    // Check that the DayListItem with the text "Monday" also has the text "no spots remaining"
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Delete"));

    
    //Check that the confirmation message is shown.
    expect(getByText(appointment, "Confirm Delete?")).toBeInTheDocument();

    //Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));

    //Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    //Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    //Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });









});






