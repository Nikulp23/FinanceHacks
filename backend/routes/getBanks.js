import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
const router = express.Router();

// Get file route name (Same as file name)
const __filename = fileURLToPath(import.meta.url);
const parsed = path.parse(__filename);

const apiKey = "Ag46A1RC8faoCPh9La1fZF7uxL6IAmQETCrErkWSqvBNWyH_BUkZC2nI2F2JIKEW";

// Returns an array of size 2 with the latitute and longtitude of the given address
async function fetchCoordinates(address) {
  let response;

  // Try to make call to BingMaps API
  try {
    response = await fetch(`http://dev.virtualearth.net/REST/v1/Locations?addressLine=${address}&key=${apiKey}`);
  } catch(e) {
    console.error("Error: ", e);
  }

  if (!response.ok) {
    throw new Error(`Network response was not ok (${response.status})`);
  }

  const data = await response.json();
  return data.resourceSets[0].resources[0].point.coordinates;
}


//Uses BingMaps API to fetch the distance 
async function fetchDistance(startCoords, endCoords) {
  let response;

  // BingMaps API calculates the distance between the user location and the given store location
  try {
    response = await fetch(`https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${startCoords}&destinations=${endCoords}&travelMode=driving&key=${apiKey}&distanceUnit=mi`)
  } catch(e) {
    console.error('Error:', error);
  }

  if (!response.ok) {
    throw new Error(`Network response was not ok (${response.status})`);
  }

  const distance = await response.json();
  
  let dist = distance.resourceSets[0].resources[0].results[0].travelDistance;
  dist = Math.round(dist * 100) / 100
  const time = distance.resourceSets[0].resources[0].results[0].travelDuration;
  return [dist, time];
  
}


async function fetchNearbyBanks(userLocation) {
  let response;
  try {
    response = await fetch(`https://dev.virtualearth.net/REST/v1/LocalSearch/?query=banks&userLocation=${userLocation[0]}
    ,${userLocation[1]}&maxResults=10&key=Ag46A1RC8faoCPh9La1fZF7uxL6IAmQETCrErkWSqvBNWyH_BUkZC2nI2F2JIKEW`);
  } catch(e) {
    console.log("Error: ", e);
  }

  if (!response.ok) {
    throw new Error(`Network response was not ok (${response.status})`);
  }

  const data = await response.json();
  return data;
}

// Iterates and finds all approved stores in parallel
async function searchNearbyBanks(userLocation) {
   let bankObject = {
      banks: []
   };
   const result = await fetchNearbyBanks(userLocation);
   const foundBanks = result.resourceSets[0].resources;

   
   for (let i = 0; i < foundBanks.length; i++){
      const name = foundBanks[i].name || 'Unknown';
      const address = foundBanks[i].Address.formattedAddress;
      const coordinates = foundBanks[i].geocodePoints[0].coordinates;
      const distTime = await fetchDistance(userLocation, coordinates);
      bankObject.banks.push({
         name: name,
         address: address,
         distance: distTime[0]
      });
   }
   
  return bankObject;
}



router.post(`/${parsed.name}`, async (req, res) => {
  const location = req.body.USER_ADDRESS;
  if (location == undefined || location.length == 0) {
    return res.status(400).json({ error: 'Location is required' });
  }

  const coordinates = await fetchCoordinates(location);
  
  let bankObject= await searchNearbyBanks(coordinates);

  res.json(bankObject);
});

export default router;
