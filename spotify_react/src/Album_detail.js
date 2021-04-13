import { render } from "react-dom";
import React, { Component } from 'react';
import All_Albums from './All_albums';
import { useParams } from "react-router";
import { Link } from "react-router-dom";



function Album_detail() {
  const { id } = useParams();
  return <Album_detail_comp album={id} />;
}

class Album_detail_comp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch('http://localhost/dev_env/spotify_project/spotify_react/src/api.php')
      .then(res => res.json())
      .then(
        (result) => {
          //   console.log(result);
          let id_get = [this.props.album];
          let single_album = result.artist_id[this.props.album - 1];
          let all_tracks = result.tracks
          //   console.log(all_tracks);
          let lol = [];
          Object.keys(all_tracks).forEach(function (key) {
            lol.push(all_tracks[key]);
          });
          let lol1 = [];
          lol.map(key => {
            if (key['album_id'] == id_get) {
              lol1.push(key);
            }
          })
          // console.log(lol1);

          // if (key['album_id'] == id_get) {
          //     lol['name'] = key['name'],
          //     lol
          // }
          // )
          this.setState({
            isLoaded: true,
            items: single_album,
            tracks: lol1
          });
        },
        // Remarque : il est important de traiter les erreurs ici
        // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
        // des exceptions provenant de réels bugs du composant.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items, tracks } = this.state;
    console.log(items);
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      // tracks.forEach((element, index, array) => {
      //     console.log(element.mp3); // 100, 200, 300

      // });
      // console.log(tracks_render)
      let path = "/Artist_detail/";

      return (
        <div className="main-detail">
          <div className="main-cover">
            <img className="cover-img" src={items.cover}></img>
            <div className="main-name">
              <h2>{items.name}</h2>
              <Link to={path + items[0]}>

                <p>{items[1]}</p>
              </Link>
              <p>Popularity : {items.popularity}</p>
            </div>
            <div className="main-description">
              <p className="main-desc">{items.description}</p>
            </div>
          </div>
          <div className="audio-container">
            {tracks.map((key) => {
              return <figcaption><audio className="main-audio" controls src={key['mp3']}></audio>{key['name']}</figcaption>
            })}
          </div>
        </div>
      );
    }
  }
}

export default Album_detail;