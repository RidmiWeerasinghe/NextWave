import React, { useEffect } from "react"

export default function spotifyAuth() {

  const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=07b23dc23a5a48638c4601ebf6e5436f&response_type=code&redirect_uri=http://localhost:5173/callback&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"


  useEffect(() => {
    window.location.href = AUTH_URL;
  }, [])
  return null
}
