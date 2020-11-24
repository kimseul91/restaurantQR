import { Form, Col, Card, Accordion, Button } from "react-bootstrap";
import axios from "axios";
import React, { useState, useEffect } from "react";

function Employees(props) {
  const [employees, setEmployees] = useState(null);
  const [counter, setCounter] = useState(0);

  /**
   * this useEffect uses axios to make a GET request with the restaurant name to the following url: 
   * https://us-central1-restaurantqr-73126.cloudfunctions.net/api/:restaurantName/staff/liverequest
   * 
   * The request is "await"ed and once the response is available, the JavaScript Object is parsed and 
   * gets stored into the function state. 
   * 
   * this gets called at the beginning of page load and every time the counter changes. 
   */
  useEffect(() => {
    const fetchData = async () => {
      const axiosCall = await axios.get(
        `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${props.name}/staff/liverequest`
      );
      const employeeList = axiosCall.data.employees;
      setEmployees(employeeList);
    };
    fetchData();
  }, [props, counter]);

  /**
   * this function retrieves input data from the form then formats to fit the data structure in firebase. 
   * this function uses axios to make a PUT request with the restaurant name to the following url: 
   * https://us-central1-restaurantqr-73126.cloudfunctions.net/api/:restaurantName/staff/edit/addemployee
   * 
   * The request is "await"ed and once the response is available, it increments counter by 1
   */
  const handleSubmit = async () => {
    let fName = document.getElementById("firstName").value;
    let lName = document.getElementById("lastName").value;
    let dOE = document.getElementById("dateOfEmployment").value;
    let eid = document.getElementById("eid").value;

    //do await call to axios
    //create an endpoint
    employees[fName + " " + lName] = {
      "First Name": fName,
      "Last Name": lName,
      Employment: Math.floor(new Date(dOE) / 1000),
      "Clock In": null,
      eid: eid,
    };

    const objectsToAxios = {
      employees: employees,
    };

    await axios.put(
      `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${props.name}/staff/edit/addemployee`,
      objectsToAxios
    );
    setCounter(counter + 1);
  };

  /**
   * this function uses the accordion with input forms to create a form for a manager/employer to create a new employee. 
   * returns html elements. 
   * @param {Object} empLists 
   */
  const newEmployee = () => {
    return (
      <Card key="add-new-employee">
        <Accordion.Toggle
          as={Button}
          eventKey={"add-new-employee"}
          className="center"
        >
          New Employee
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={"add-new-employee"}>
          <Card.Body>
            <Form.Row>
              <Col>
                <Form.Control id="firstName" placeholder="First name" />
              </Col>
              <Col>
                <Form.Control id="lastName" placeholder="Last name" />
              </Col>
            </Form.Row>
            <br />
            <Form.Row>
              <Col>
                <Form.Control
                  id="dateOfEmployment"
                  placeholder="Date of Employment"
                />
              </Col>
              <Col>
                <Form.Control id="eid" placeholder="Employee ID" />
              </Col>
            </Form.Row>
            <br />
            <Button onClick={handleSubmit}>Submit</Button>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  };

  /**
   * this function handles the "delete" feature on employees. 
   * it finds the employee id who needs to get removed
   * 
   * this function uses axios to make a PUT request with the restaurant name and employee id to the following url: 
   * https://us-central1-restaurantqr-73126.cloudfunctions.net/api/:restaurant/staff/remove/:eid
   * 
   * the parameter of the axios call is the object of employees 
   * 
   * then it increments counter by 1. 
   * @param {Object} event 
   */
  const removeEmployee = async (event) => {
    const eid = event.target.getAttribute("eid");
    const objectsToAxios = {
      employees: employees,
    };
    await axios
      .put(
        `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${props.name}/staff/remove/${eid}`,
        objectsToAxios
      )
      .then(() => setCounter(counter + 1));
  };

  /**
   * this function handles the "clock out" feature. 
   * it finds the employee id who wishes to clock out.
   * 
   * this function uses axios to make a PUT request with the restaurant name and employee id to the following url: 
   * https://us-central1-restaurantqr-73126.cloudfunctions.net/api/:restaurantName/staff/out/:eid
   * 
   * the parameter of the axios call is the object of employees 
   * 
   * then it increments counter by 1. 
   * @param {Object} event 
   */
  const handleClockOut = async (event) => {
    const eid = event.target.getAttribute("eid");

    Object.keys(employees).map((employee) => {
      if (employees[employee].eid === eid)
        employees[employee]["Clock In"] = null;
      return 0;
    });

    const objectsToAxios = {
      employees: employees,
    };
    await axios
      .put(
        `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${props.name}/staff/out/${eid}`,
        objectsToAxios
      )
      .then(() => setCounter(counter + 1));
  };

  /**
   * this function handles the "clock in" feature. 
   * it finds the employee id who wishes to clock in. 
   * 
   * this function uses axios to make a PUT request with the restaurant name and employee id to the following url: 
   * https://us-central1-restaurantqr-73126.cloudfunctions.net/api/:restaurantName/staff/in/:eid
   * 
   * the parameter of the axios call is the object of employees 
   * 
   * then it increments counter by 1. 
   * @param {Object} event 
   */
  const handleClockIn = async (event) => {
    const eid = event.target.getAttribute("eid");
    Object.keys(employees).map((employee) => {
      if (employees[employee].eid === eid)
        employees[employee]["Clock In"] = Math.floor(Date.now() / 1000);
      return 0;
    });

    const objectsToAxios = {
      employees: employees,
    };
    await axios.put(
      `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${props.name}/staff/in/${eid}`,
      objectsToAxios
    );
    setCounter(counter + 1);
  };

  /**
   * this function uses the empLists object to populate the accordion for the main restaurant page. 
   * returns html elements. 
   * @param {Object} empLists 
   */
  const populateEmployeesList = (empLists) => {
    if (empLists != null) {
      const arrTables = Object.keys(empLists)
        .map((key, val) => {
          return [key, empLists[key]];
        })
        .sort();
      return (
        arrTables.map((employee, indx) => {
          return (
            <Card key={employee[0] + indx}>
              <Accordion.Toggle
                as={Button}
                eventKey={employee[0]}
                className="center"
              >
                {employee[0]}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={employee[0]}>
                <Card.Body className="media-body">
                  <Card.Subtitle>Employee ID</Card.Subtitle>
                  <Card.Text>{empLists[employee[0]].eid}</Card.Text>
                  <Card.Subtitle>Clock In</Card.Subtitle>
                  <Card.Text>
                    {empLists[employee[0]]["Clock In"] ? (
                      <span>
                        {new Date(empLists[employee[0]]["Clock In"] * 1000)
                          .toLocaleDateString("en-US")
                          .toString()}
                        <br />
                        {new Date(empLists[employee[0]]["Clock In"] * 1000)
                          .toLocaleTimeString("en-US")
                          .toString()}
                        <br />
                        <Button
                          eid={empLists[employee[0]].eid}
                          onClick={handleClockOut}
                        >
                          {" "}
                          Clock Out
                        </Button>
                      </span>
                    ) : (
                        <Button
                          eid={empLists[employee[0]].eid}
                          onClick={handleClockIn}
                        >
                          Clock In
                        </Button>
                      )}
                  </Card.Text>
                  <Card.Subtitle>Date of Employment</Card.Subtitle>
                  <Card.Text>
                    {new Date(empLists[employee[0]]["Employment"] * 1000)
                      .toLocaleDateString("en-US")
                      .toString()}
                  </Card.Text>
                  <Button
                    eid={empLists[employee[0]].eid}
                    onClick={removeEmployee}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          );
        })
      );
    }
    return <h2>loading...</h2>;
  };
  return (
    <div className="staff-table-bg-color">
      <Accordion defaultActiveKey="0">
        <h2 className="h2-padding">Employees</h2>
        {newEmployee(employees, props.name)}
        {populateEmployeesList(employees)}
      </Accordion>
    </div>
  );
}
export default Employees;
