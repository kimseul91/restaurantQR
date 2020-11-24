import { Card, Accordion, Button } from "react-bootstrap";
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
    await axios.put(
      `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${props.name}/staff/out/${eid}`,
      objectsToAxios
    );
    setCounter(counter + 1);
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
  const populateEmployees = (empLists) => {
    if (empLists != null) {
      const arrTables = Object.keys(empLists)
        .map((key, val) => {
          return [key, empLists[key]];
        })
        .sort();
      return arrTables.map((employee, indx) => {
        return (
          <Card key={employee + indx} className="accordion-card">
            <Accordion.Toggle
              as={Button}
              eventKey={employee[0]}
              className="accordion-collapse"
            >
              {employee[0]}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={employee[0]}>
              <Card.Body>
                <Card.Subtitle>Clock In</Card.Subtitle>
                <Card.Text>
                  {empLists[employee[0]]["Clock In"] ? (
                    <span>
                      {new Date(empLists[employee[0]]["Clock In"] * 1000)
                        .toLocaleDateString("en-US")
                        .toString()}
                      {"  @  "}
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
                {props.from == "fromhome" ? (
                  <dixv>
                    <Card.Subtitle>Date of Employment</Card.Subtitle>
                    <Card.Text>
                      {new Date(empLists[employee[0]]["Employment"] * 1000)
                        .toLocaleDateString("en-US")
                        .toString()}
                    </Card.Text>
                  </dixv>
                ) : (
                    <div></div>
                  )}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        );
      });
    }
    return <h2>loading...</h2>;
  };
  return (
    <div className="staff-table-bg-color">
      <Accordion defaultActiveKey="0" className="accordion tables-accordion">
        <h2 className="h2-padding center">Employees</h2>
        {populateEmployees(employees)}
      </Accordion>
    </div>
  );
}
export default Employees;
