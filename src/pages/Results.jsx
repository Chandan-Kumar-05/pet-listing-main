/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import Pet from "../components/Pet";

const Results = ({ pets }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 4; // You can adjust this number as needed

  // Calculate the pets to display on the current page
  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = pets.slice(indexOfFirstPet, indexOfLastPet);

  // Calculate total number of pages
  const totalPages = Math.ceil(pets.length / petsPerPage);

  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="search">
      {!pets.length ? (
        <h1>No pets found</h1>
      ) : (
        <>
          {currentPets.map((pet) => (
            <Pet
              key={pet.id}
              id={pet.id}
              animal={pet.animal}
              name={pet.name}
              breed={pet.breed}
              images={pet.images}
              location={`${pet.city}, ${pet.state}`}
            />
          ))}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={currentPage === number ? "active" : ""}
                >
                  {number}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Results;
