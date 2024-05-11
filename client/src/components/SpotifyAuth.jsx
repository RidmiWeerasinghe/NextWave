import React from "react"

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=72cdd5687f2146adaf6d90d7d3f95270&response_type=code&redirect_uri=http://localhost:5173/callback&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function spotifyAuth() {
  return (
    <button
      className=" text-white"
      style={{ minHeight: "100vh" }}
    >
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login With Spotify
      </a>
    </button>
  )
}
