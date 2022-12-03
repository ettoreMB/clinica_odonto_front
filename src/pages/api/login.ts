import type { NextApiRequest, NextApiResponse } from 'next'

export default function login(req:NextApiRequest, res:NextApiResponse) {

  if (req.method === 'POST') {
    res.status(200).json({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEyMzQ1Njc4OTAiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1MTYyMzkwMjJ9.tVzxZznMG3KKedJzdNakKZXD6qMsk_6nGY5il0q8o4Y'})
  } else {
    console.log('get')
  }
  
}