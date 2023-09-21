import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import { useEffect } from "react";

const Problem2 = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [countries, setCountries] = useState([]);
  const [checkBox, setCheckBox] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://contact.mediusware.com/api/contacts/"
      );
      const data = await response.json();
      setCountries(data.results);
    };
    fetchData();
  }, []);

  /* handleClick */

  const handleClick = (value) => {
    setValue(value);
  };

  let unitedStates = countries.filter(
    (country) => country.country.name === "United States"
  );

  return (
    <>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

          <div className="d-flex justify-content-center gap-3">
            <div onClick={() => handleClick("allContacts")}>
              <button
                className="btn btn-lg btn-outline-primary"
                type="button"
                onClick={handleShow}
              >
                All Contacts
              </button>
            </div>
            <div onClick={() => handleClick("usContacts")}>
              <button
                className="btn btn-lg btn-outline-warning"
                type="button"
                onClick={handleShow}
              >
                US Contacts
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Country Name
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {value === "allContacts" &&
            (checkBox === true
              ? countries
                  .filter((country) => country.id % 2 === 0)
                  .map((country) => (
                    <div key={country.id}>
                      <p>{country?.country.name}</p>
                    </div>
                  ))
              : countries.map((country) => (
                  <div key={country.id}>
                    <p>{country?.country.name}</p>
                  </div>
                )))}

          {value === "usContacts" &&
            unitedStates?.map((country) => (
              <div key={country.id}>
                <p>{country?.country?.name}</p>
              </div>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <div>
            <InputGroup onClick={() => setCheckBox(!checkBox)}>
              <InputGroup.Checkbox aria-label="Checkbox for following text input" />
            </InputGroup>
          </div>
          <Button variant="primary" onClick={handleClose}>
            All Contacts
          </Button>
          <Button variant="primary" onClick={handleClose}>
            US Contacts
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Problem2;
