import React from "react";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectPersonById } from "reducers/entities";
import InfoWithLabel from "./InfoWithLabel";

function PersonInfoSection({ personId }) {
  const person = useSelector(state => selectPersonById(state, personId));

  function getGender() {
    return person.gender === 1 ? "Female" : person.gender === 2 ? "Male" : "";
  }

  return (
    <>
      {person && (
        <>
          <InfoWithLabel label="Known For" text={person.known_for_department} />
          <InfoWithLabel label="Gender" text={getGender(person.gender)} />
          <InfoWithLabel label="Birthday" text={person.birthday} />
          <InfoWithLabel label="Place of Birth" text={person.place_of_birth} />
          {person.official_site && (
            <InfoWithLabel label="Official Site" text={person.official_site} />
          )}
          {person.also_known_as && person.also_known_as.length ? (
            <InfoWithLabel
              label="Also Known As"
              text={person.also_known_as.map(alias => (
                <Typography key={alias}>{alias}</Typography>
              ))}
            />
          ) : null}
        </>
      )}
    </>
  );
}

export default PersonInfoSection;
