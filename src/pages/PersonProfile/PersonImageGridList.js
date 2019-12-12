import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPersonImages } from "actions";
import { selectors } from "reducers";
import ImageGridList from "components/ImageGridList";
import ImageGalleryModal from "components/ImageGalleryModal";

function PersonImageGridList({ personId }) {
  const dispatch = useDispatch();
  const person = useSelector(state => selectors.selectPerson(state, personId));
  const filePaths = useSelector(state =>
    selectors.selectPersonImages(state, personId)
  );
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingPersonImages(state, personId)
  );

  useEffect(() => {
    dispatch(fetchPersonImages(personId));
  }, [dispatch, personId]);

  return (
    <>
      <ImageGridList
        filePaths={filePaths}
        isFetching={isFetching}
        imageAspectRatio="2:3"
        minItemWidth={80}
      />
      <ImageGalleryModal title={person?.name} filePaths={filePaths} />
    </>
  );
}

export default PersonImageGridList;
