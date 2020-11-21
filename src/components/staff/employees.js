import { Form, Col, Card, Accordion, Button } from 'react-bootstrap';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Employees(props) {

    const [employees, setEmployees] = useState(null);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const axiosCall = await axios.get(
                `http://localhost:5001/restaurantqr-73126/us-central1/api/${props.name}/staff/employees`
            )
            // console.log(axiosCall);
            const employeeList = axiosCall.data.employees;
            setEmployees(employeeList);
        }
        fetchData();
    }, [props, counter]);

    const handleSubmit = async () => {
        let fName = (document.getElementById("firstName").value);
        let lName = (document.getElementById("lastName").value);
        let dOE = (document.getElementById("dateOfEmployment").value);
        let eid = (document.getElementById("eid").value);


        //do await call to axios 
        //create an endpoint
        employees[fName + " " + lName] = {
            "First Name": fName,
            "Last Name": lName,
            "Employment": Math.floor(new Date(dOE) / 1000),
            "Clock In": null,
            eid: eid
        }

        const objectsToAxios = {
            employees: employees,
        }

        await axios.put(
            // `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${name}/deleterequest/${table}`,
            `http://localhost:5001/restaurantqr-73126/us-central1/api/${props.name}/staff/edit/addemployee`,
            // `http://localhost:5001/restaurantqr-73126/us-central1/api/test_add_employee/staff/edit/addemployee`,
            objectsToAxios
        );
        setCounter(counter + 1);
    }

    const newEmployee = () => {
        return (
            <Card key="add-new-employee">
                <Accordion.Toggle as={Button} eventKey={"add-new-employee"} className="center">
                    New Employee
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={"add-new-employee"} >
                    <Card.Body >
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
                                <Form.Control id="dateOfEmployment" placeholder="Date of Employment" />
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
    }

    const removeEmployee = async (event) => {
        const eid = (event.target.getAttribute("eid"))
        const objectsToAxios = {
            employees: employees,
        }
        await axios.put(
            // `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${name}/deleterequest/${table}`,
            `http://localhost:5001/restaurantqr-73126/us-central1/api/${props.name}/staff/remove/${eid}`,
            objectsToAxios
        ).then(() =>
            setCounter(counter + 1)
        );
    }

    const handleClockOut = async (event) => {
        const eid = (event.target.getAttribute("eid"))

        Object.keys(employees).map(employee => {
            if (employees[employee].eid === eid) employees[employee]["Clock In"] = null;
            return 0;
        })

        const objectsToAxios = {
            employees: employees,
        }
        await axios.put(
            // `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${name}/deleterequest/${table}`,
            `http://localhost:5001/restaurantqr-73126/us-central1/api/${props.name}/staff/out/${eid}`,
            objectsToAxios
        ).then(() =>
            setCounter(counter + 1)
        );
    }
    const handleClockIn = async (event) => {

        const eid = (event.target.getAttribute("eid"))
        Object.keys(employees).map(employee => {
            if (employees[employee].eid === eid) employees[employee]["Clock In"] = Math.floor(Date.now() / 1000);
            return 0;
        })

        const objectsToAxios = {
            employees: employees,
        }
        await axios.put(
            // `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${name}/deleterequest/${table}`,
            `http://localhost:5001/restaurantqr-73126/us-central1/api/${props.name}/staff/in/${eid}`,
            objectsToAxios
        );
        setCounter(counter + 1);

    }
    const populateEmployeesList = (tableLists) => {
        if (tableLists != null) {
            const arrTables = Object.keys(tableLists).map((key, val) => {
                return [key, tableLists[key]]
            }).sort();
            return (
                // Object.keys(tableLists).map((employee, indx) => {
                arrTables.map((employee, indx) => {
                    return (
                        <Card key={employee[0] + indx}>
                            <Accordion.Toggle as={Button} eventKey={employee[0]} className="center">
                                {employee[0]}
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={employee[0]}>
                                <Card.Body className="media-body">
                                    <Card.Subtitle>
                                        Employee ID
                                </Card.Subtitle>
                                    <Card.Text>
                                        {tableLists[employee[0]].eid}
                                    </Card.Text>
                                    <Card.Subtitle>
                                        Clock In
                                </Card.Subtitle>
                                    <Card.Text>
                                        {
                                            (tableLists[employee[0]]["Clock In"]) ?
                                                <span>
                                                    {(new Date(tableLists[employee[0]]["Clock In"] * 1000).toLocaleDateString("en-US").toString())}
                                                    <br />
                                                    {(new Date(tableLists[employee[0]]["Clock In"] * 1000).toLocaleTimeString("en-US").toString())}
                                                    <br />
                                                    <Button eid={tableLists[employee[0]].eid} onClick={handleClockOut}> Clock Out</Button>
                                                </span>
                                                :
                                                <Button eid={tableLists[employee[0]].eid} onClick={handleClockIn}>Clock In</Button>
                                        }
                                    </Card.Text>
                                    <Card.Subtitle>
                                        Date of Employment
                                </Card.Subtitle>
                                    <Card.Text>
                                        {(new Date(tableLists[employee[0]]["Employment"] * 1000).toLocaleDateString("en-US").toString())}
                                    </Card.Text>
                                    <Button eid={tableLists[employee[0]].eid} onClick={removeEmployee}>Delete</Button>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card >
                    )
                })
            )
        }
        return <h2>loading...</h2>
    }
    return (
        <div className="staff-table-bg-color">
            <Accordion defaultActiveKey="0">
                <h2 className="h2-padding">
                    Employees
                    </h2>
                {newEmployee(employees, props.name)}
                {populateEmployeesList(employees)}
            </Accordion>
        </div>
    );
}
export default Employees;