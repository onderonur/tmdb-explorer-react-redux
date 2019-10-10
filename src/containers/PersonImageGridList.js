import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPersonImages } from "actions";
import {
  selectIsFetchingPersonImages,
  selectPersonImages,
  selectPerson
} from "reducers";
import ImageGridList from "components/ImageGridList";
import ImageGalleryModal from "components/ImageGalleryModal";

function PersonImageGridList({ personId }) {
  const dispatch = useDispatch();
  const person = useSelector(state => selectPerson(state, personId));
  const filePaths = useSelector(state => selectPersonImages(state, personId));
  const isFetching = useSelector(state =>
    selectIsFetchingPersonImages(state, personId)
  );

  useEffect(() => {
    dispatch(fetchPersonImages(personId));
  }, [dispatch, personId]);

  return (
    <>
      <ImageGridList filePaths={filePaths} isFetching={isFetching} />
      <ImageGalleryModal
        title={person ? person.name : ""}
        filePaths={filePaths}
      />
    </>
  );
}

export default PersonImageGridList;
