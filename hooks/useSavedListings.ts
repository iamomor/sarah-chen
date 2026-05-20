import { useState, useEffect } from 'react';

export const useSavedListings = () => {
  const [saved, setSaved] = useState([]);
  // TODO: Implement localStorage saved listings
  return { saved };
};
