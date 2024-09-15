/* eslint-disable react/react-in-jsx-scope */
import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "../services/fetchPet";
import AdoptedPetContext from "./AdoptedPetContext";
import Carousel from "../components/Carousel";
import ErrorBoundary from "../components/ErrorBoundary";
import Modal from "../components/Modal";
import { cardio } from "ldrs";
import LoadingAnimation from "../components/LoadingAnimation";

cardio.register();

const Details = () => {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [_, setShowAdoptedPet] = useContext(AdoptedPetContext);

  const { id } = useParams();

  const results = useQuery(["details", id], fetchPet);

  if (results.isError) {
    return <h2>ohhhonoo!</h2>;
  }

  if (results.isLoading) {
    return (
      <div className="lo">
        <LoadingAnimation></LoadingAnimation>
        {/* <h2 className="loader">Loading...</h2> */}
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
          {/* <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button> */}
          <p>{pet.description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt{pet.name}?</h1>
                <div className="buttons">
                  <button
                    onClick={() => {
                      setShowAdoptedPet(pet);
                      navigate("/");
                    }}
                  >
                    Yes
                  </button>
                  <button onClick={() => setShowModal(false)}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </h2>
      </div>
    </div>
  );
};

function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
