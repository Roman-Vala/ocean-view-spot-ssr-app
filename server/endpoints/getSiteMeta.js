export default async function getSiteMeta(req, res) { 

  const response = await fetch(`https://connect.squareup.com/v2/locations/${process.env.SQUARE_LOCATION_ID}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    
  });
  
  const data = await response.json();
  // console.log(data);
  res.json(data);
}