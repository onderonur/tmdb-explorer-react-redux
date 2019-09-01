import React from "react";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectPerson } from "reducers";
import TextWithLabel from "components/TextWithLabel";

function PersonInfo({ personId }) {
  const person = useSelector(state => selectPerson(state, personId));

  function getGender() {
    return person.gender === 1 ? "Female" : person.gender === 2 ? "Male" : "";
  }

  return person ? (
    <>
      <TextWithLabel label="Known For" text={person.known_for_department} />
      <TextWithLabel label="Gender" text={getGender(person.gender)} />
      <TextWithLabel label="Birthday" text={person.birthday} />
      <TextWithLabel label="Place of Birth" text={person.place_of_birth} />
      {person.official_site && (
        <TextWithLabel label="Official Site" text={person.official_site} />
      )}
      {person.also_known_as && person.also_known_as.length ? (
        <TextWithLabel
          label="Also Known As"
          text={person.also_known_as.map(alias => (
            <Typography key={alias}>{alias}</Typography>
          ))}
        />
      ) : null}
    </>
  ) : null;
}

export default PersonInfo;
