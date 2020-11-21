import { Table, Row, Form, Col, Card, Accordion, Button } from 'react-bootstrap';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Employees(props) {

    const [employees, setEmployees] = useState(null);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        // console.log("NAME IS " + props.name)
        const fetchData = async () => {
            const axiosCall = await axios.get(
                `http://localhost:5001/restaurantqr-73126/us-central1/api/${props.name}/staff/employees`
            )
            // console.log(axiosCall);
            const employeeList = axiosCall.data.employees;
            setEmployees(employeeList);
        }
        fetchData();
    }, [counter]);

    const handleClockOut = async (event) => {
        const eid = (event.target.getAttribute("eid"))

        Object.keys(employees).map(employee => {
            // console.log(employees[employee].eid);
            if (employees[employee].eid == eid) employees[employee]["Clock In"] = null;
        })

        const objectsToAxios = {
            employees: employees,
        }
        await axios.put(
            // `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${name}/deleterequest/${table}`,
            `http://localhost:5001/restaurantqr-73126/us-central1/api/${props.name}/staff/out/${eid}`,
            objectsToAxios
        );
        setCounter(counter + 1);
    }
    const handleClockIn = async (event) => {

        const eid = (event.target.getAttribute("eid"))
        Object.keys(employees).map(employee => {
            if (employees[employee].eid == eid) employees[employee]["Clock In"] = Math.floor(Date.now() / 1000);
        })

        const objectsToAxios = {
            employees: employees,
        }
        // console.log(props.name);
        await axios.put(
            // `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${name}/deleterequest/${table}`,
            `http://localhost:5001/restaurantqr-73126/us-central1/api/${props.name}/staff/in/${eid}`,
            objectsToAxios
        );
        setCounter(counter + 1);

    }
    const populateEmployees = (tableLists) => {
        if (tableLists != null) {
            const arrTables = Object.keys(tableLists).map((key, val) => {
                return [key, tableLists[key]]
            })
            return (
                Object.keys(tableLists).map((employee, indx) => {
                    return (
                        <Card key={employee + indx} className="accordion-card">
                            <Accordion.Toggle as={Button} eventKey={employee} className="accordion-collapse">
                                {employee}
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={employee} >
                                <Card.Body>
                                    <Card.Subtitle>
                                        Clock In
                                </Card.Subtitle>
                                    <Card.Text>
                                        {
                                            (tableLists[employee]["Clock In"]) ?
                                                <span>
                                                    {(new Date(tableLists[employee]["Clock In"] * 1000).toLocaleDateString("en-US").toString())}
                                                    {"  @  "}
                                                    {(new Date(tableLists[employee]["Clock In"] * 1000).toLocaleTimeString("en-US").toString())}
                                                    <br />
                                                    <Button eid={tableLists[employee].eid} onClick={handleClockOut}> Clock Out</Button>
                                                </span>
                                                :
                                                <Button eid={tableLists[employee].eid} onClick={handleClockIn}>Clock In</Button>
                                        }
                                    </Card.Text>
                                    {props.from == "fromhome" ?
                                        <dixv>
                                            <Card.Subtitle>
                                                Date of Employment
                                            </Card.Subtitle>
                                            <Card.Text>
                                                {(new Date(tableLists[employee]["Employment"] * 1000).toLocaleDateString("en-US").toString())}
                                            </Card.Text>
                                        </dixv>
                                        :
                                        <div></div>
                                    }
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
            <Accordion defaultActiveKey="0" className="accordion">
                <h2 className="h2-padding center">Employees</h2>
                {populateEmployees(employees)}
            </Accordion>
        </div>
    );
}
export default Employees;