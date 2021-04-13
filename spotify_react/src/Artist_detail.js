import React, { Component } from 'react';
import { useParams } from "react-router";
import {Link} from "react-router-dom";



function Artist_detail() {
    const { id } = useParams();
    return <Artist_detail_comp album={id} />;
}

class Artist_detail_comp extends Component {
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
                    // console.log(result);
                    let artist = result.artist_id[this.props.album - 1]
                    let album = result.artist_id

                    console.log(result)
                    let array = []
                    let test = []
                    let naruto = []
                    let i = 0;
                    let sasuke = 0;

                    Object.keys(album).forEach(key => {
                        array.push(album[key]);
                    })
                    // array.map(key => {
                    //     if (array[i][0] == artist.artist_id) {
                    //         test.push(key['name'])
                    //     }
                    //     i++;
                    // })

                    array.map(key => {
                        if (array[sasuke][0] == artist.artist_id) {
                            naruto.push(key)
                        }
                        sasuke++;
                    })

                    this.setState({
                        isLoaded: true,
                        items: artist,
                        // album: test,
                        kakashi: naruto
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
        const { items, kakashi, isLoaded, error } = this.state;
        // console.log(items)
        let path = "/Album_detail/";
        console.log(kakashi)
        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Chargement…</div>;
        } else {
            return (
                <div className="main-detail">
                    <div className="main-cover">
                        <img src={items[4]}></img>
                    </div>
                    <div className="main-name">
                        <h2>{items[1]}</h2>
                    </div>
                    <div>
                        <h2 className="test">Albums :</h2>
                        <div className="artist_album">
                            {kakashi.map((key) => {
                                return <div className="artistDetailAlbum">
                                    <Link to={path + key['id']}>
                                    <img src={key["cover_small"]}></img>
                                    </Link>
                                    <p>{key["name"]}</p>
                                    <span>Popularité : {key["popularity"]}</span>
                                </div>
                            })}
                        </div>
                        <div className="moreAbout">
                            <h2 className="test">A propos :</h2>
                            <p>{items[3]}</p>
                        </div>
                    </div>
                </div>
            );
        }


    }
}

export default Artist_detail;