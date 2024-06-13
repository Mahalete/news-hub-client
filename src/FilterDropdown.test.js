import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import FilterDropdown from './FilterDropdown';

test('clicking on filter icon toggles the sidebar', async () => {
  // Render the FilterDropdown component
  const { getByTestId, queryAllByRole } = render(<FilterDropdown />);
  
  // Check that initially the sidebar is not rendered
  expect(queryAllByRole('listitem')).toHaveLength(0);

  // Click on the filter icon using data-testid attribute
  fireEvent.click(getByTestId('filter-icon'));

  // Wait for the sidebar to be rendered
  await waitFor(() => {
    expect(queryAllByRole('listitem')).toHaveLength(4); 
  });

  // Click on the filter icon again to close the sidebar
  fireEvent.click(getByTestId('filter-icon'));

  // Wait for the sidebar to be closed
  await waitFor(() => {
    expect(queryAllByRole('listitem')).toHaveLength(0);
  });
});
