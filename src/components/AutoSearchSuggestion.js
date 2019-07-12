import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

function AutoSearchSuggestion({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem,
  renderSuggestion
}) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = selectedItem ? selectedItem === suggestion.title : false;

  return (
    <MenuItem
      {...itemProps}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 600 : 400
      }}
    >
      {renderSuggestion(suggestion)}
    </MenuItem>
  );
}

export default AutoSearchSuggestion;
