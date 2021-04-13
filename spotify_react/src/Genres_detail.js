import { render } from "react-dom";
import React, { Component } from "react";
import All_Albums from "./All_albums";
import Genres from "./Genres.js";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function Genres_detail() {
  const { id } = useParams();
  return <Genres_detail_comp genre={id} />;
}

class Genres_detail_comp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost/dev_env/spotify_project/spotify_react/src/api.php")
      .then((res) => res.json())
      .then(
        (result) => {
          let tabAlbumByGenre = [];
          let tabAlbums = [];
          for (let i = 0; i < Object.keys(result.genres_albums).length; i++) {
            if (this.props.genre === result.genres_albums[i].genre_id) {
              tabAlbumByGenre.push(result.genres_albums[i].album_id);
            }
          }
          for (let i = 0; i < Object.keys(result.albums_full).length; i++) {
            for (let j = 0; j < tabAlbumByGenre.length; j++) {
              if (tabAlbumByGenre[j] === result.albums_full[i].id) {
                tabAlbums.push(result.albums_full[i]);
              }
            }
          }
          this.setState({
            isLoaded: true,
            items: tabAlbums,
          });
        },
        // Remarque : il est important de traiter les erreurs ici
        // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
        // des exceptions provenant de réels bugs du composant.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const items = this.state.items;
    // let test = [];
    let path = "/Album_detail/";
    return (
      <div className="album-container">
        {items.map((key) => (
          <div className="albumList">
            <Link className="album" to={path + key["id"]}>
              <img src={key["cover_small"]}></img>
              {key["name"]}
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default Genres_detail;