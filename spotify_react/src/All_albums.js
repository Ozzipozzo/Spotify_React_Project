import React from "react";
import { Link } from "react-router-dom";

class All_Albums extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      page: 1,
      limit: 13,
      offset: 13,
    };
  }

  async componentDidMount() {
    fetch("http://localhost/dev_env/spotify_project/spotify_react/src/api.php")
      .then((res) => res.json())
      .then(
        (result) => {
          // console.log(result);
          let test = result.albums_full;
          let maxLength = Object.keys(test).length;
          this.setState({
            isLoaded: true,
            items: test,
            maxLength: maxLength,
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

  pageValueChange = (event) => {
    this.setState({
      page: parseInt(event.target.innerHTML),
    });
  };

  paging = () => {
    const items = this.state.items;
    let dataLength = Object.keys(items).length - 1;
    let itemsLimit = [];
    let currentOffset = this.state.offset * (this.state.page - 1);
    if (!(currentOffset + this.state.limit > dataLength - this.state.limit)) {
      for (let i = currentOffset; i <= this.state.limit + currentOffset; i++) {
        if (typeof items[i] == "undefined") {
          continue;
        }
        itemsLimit.push(items[i]);
      }
      let path = "/Album_detail/";
      let composant = (
        <div>
          <div className="album-container">
            {itemsLimit.map((key) => (
              <div className="albumList">
                <Link className="album" to={path + key["id"]}>
                  <img src={key["cover_small"]}></img>
                  {key["name"]}
                </Link>
              </div>
            ))}
          </div>
          <div className="albumPages">
            {this.state.page - 3 < 0 ? null : (
              <button onClick={this.pageValueChange}>
                {this.state.page - 2}
              </button>
            )}
            {this.state.page - 2 < 0 ? null : (
              <button onClick={this.pageValueChange}>
                {this.state.page - 1}
              </button>
            )}
            <button onClick={this.pageValueChange}>{this.state.page}</button>
            {this.state.page * this.state.limit >
            this.state.maxLength ? null : (
              <button onClick={this.pageValueChange}>
                {this.state.page + 1}
              </button>
            )}
            {(this.state.page + 1) * this.state.limit >
            this.state.maxLength ? null : (
              <button onClick={this.pageValueChange}>
                {this.state.page + 2}
              </button>
            )}
          </div>
        </div>
      );
      return composant;
    }
  };

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
      return this.paging();
    }
  }
}

export default All_Albums;