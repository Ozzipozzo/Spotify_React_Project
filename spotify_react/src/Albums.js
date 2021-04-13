import React from 'react';
import './Albums.css';
import {Link} from "react-router-dom";


class Albums extends React.Component {
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
          let test = [];
          for (let i = 0; i < 14; i++) {
            let randomNbr = Math.floor(
              Math.random() * Object.keys(result.albums_full).length
            );
            test.push(result.albums_full[randomNbr]);
          }
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
    // console.log(items)
    let test = [];
    Object.keys(items).forEach(function (key, value) {
      test.push(items[key]);
    });
    let path = "Album_detail/";

    // console.log(test)
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <div className="album-container">
          {test.map((key) => (
            <div className="albumList">
              <Link className="album" to={path + key['id']}>
                <img src={key["cover_small"]}></img>
                {key["name"]}
              </Link>
            </div>
          ))}
        </div>
      );
    }
  }
}

export default Albums;