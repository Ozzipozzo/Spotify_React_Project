import React from "react";
import Genres_detail_comp from "./Genres_detail.js";
import { Link } from "react-router-dom";

class Genres extends React.Component {
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
          // console.log(result);
          let test = result.genres;
          this.setState({
            isLoaded: true,
            items: test,
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
    const { error, isLoaded, items } = this.state;
    console.log(items);
    let test = [];
    Object.keys(items).forEach(function (key, value) {
      test.push(items[key]);
    });
    let path = "Genres_detail/";
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <div className="genre-container">
          <div className="genresList">
            {test.map((key, value) => (
              <Link key={key["name"]} className="genres" to={path + key["id"]}>
                {key["name"]}
              </Link>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default Genres;