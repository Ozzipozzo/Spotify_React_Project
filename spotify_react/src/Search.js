import React from "react";
import { Link } from "react-router-dom";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      page: 1,
      limit: 13,
      offset: 13,
      maxLength: 0,
      name: "",
      selectedOption: "albums_full",
      searchResults: [],
    };
  }

  async componentDidMount() {
    const response = await fetch(
      "http://localhost/dev_env/spotify_project/spotify_react/src/api.php"
    );
    const json = await response.json();
    this.setState({ items: json });
  }

  handleSearch = (e) => {
    e.preventDefault();
    const name = this.state.name;
    if (name === "") {
      return null;
    }
    this.setState({ searchResults: [] });
    const searchResults = [];
    const data = this.state.items;
    let dataCopy = [];

    switch (this.state.selectedOption) {
      case "albums_full":
        Object.keys(data.albums_full).forEach(function (key, value) {
          dataCopy.push(data.albums_full[key]);
        });
        dataCopy.forEach((element) => {
          if (element.name.startsWith(name)) {
            searchResults.push(element);
            this.setState({
              searchResults: searchResults,
              maxLength: Object.keys(searchResults).length,
            });
          }
        });
        break;

      case "artists_full":
        Object.keys(data.artists_full).forEach(function (key, value) {
          dataCopy.push(data.artists_full[key]);
        });
        dataCopy.forEach((element) => {
          if (element.name.startsWith(name)) {
            searchResults.push(element);
            this.setState({
              searchResults: searchResults,
              maxLength: Object.keys(searchResults).length,
            });
          }
        });
        break;

      case "tracks":
        Object.keys(data.tracks).forEach(function (key, value) {
          dataCopy.push(data.tracks[key]);
        });
        dataCopy.forEach((element) => {
          if (element.name.startsWith(name)) {
            searchResults.push(element);
            this.setState({
              searchResults: searchResults,
              maxLength: Object.keys(searchResults).length,
            });
          }
        });
        break;

      default:
        break;
    }
  };

  handleInput = (event) => {
    this.setState({ name: event.target.value });
  };

  onValueChange = (event) => {
    this.setState({
      selectedOption: event.target.value,
      searchResults: [],
      page: 1,
      maxLength: 0,
    });
  };

  pageValueChange = (event) => {
    this.setState({
      page: parseInt(event.target.innerHTML),
    });
    console.log(this.state.page);
  };

  switchRenderByFilter = () => {
    const filter = this.state.selectedOption;
    let data = [];
    data = this.state.searchResults;
    let component;
    let path;
    let dataLength;
    let itemsLimit = [];
    let currentOffset;
    switch (filter) {
      case "albums_full":
        dataLength = Object.keys(data).length;
        currentOffset = this.state.offset * (this.state.page - 1);
        for (
          let i = currentOffset;
          i <= this.state.limit + currentOffset;
          i++
        ) {
          if (typeof data[i] == "undefined") {
            continue;
          }
          itemsLimit.push(data[i]);
        }
        path = "Album_detail/";
        component = (
          <div>
            <div className="album-container">
              {itemsLimit.map((key, value) => (
                <div className="albumList">
                  <Link className="album" to={path + key["id"]}>
                    <img src={key["cover_small"]} alt="album cover"></img>
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
              {this.state.maxLength === 0 ? null : (
                <button onClick={this.pageValueChange}>
                  {this.state.page}
                </button>
              )}
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

        break;

      case "artists_full":
        dataLength = Object.keys(data).length;
        currentOffset = this.state.offset * (this.state.page - 1);
        for (
          let i = currentOffset;
          i <= this.state.limit + currentOffset;
          i++
        ) {
          if (typeof data[i] == "undefined") {
            continue;
          }
          itemsLimit.push(data[i]);
        }
        path = "Artist_detail/";
        component = (
          <div>
            <div className="album-container">
              {itemsLimit.map((key, value) => (
                <div className="albumList">
                  <Link className="album" to={path + key["id"]}>
                    <p>{key["name"]}</p>
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
              {this.state.maxLength === 0 ? null : (
                <button onClick={this.pageValueChange}>
                  {this.state.page}
                </button>
              )}
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

        break;

      case "tracks":
        dataLength = Object.keys(data).length;
        currentOffset = this.state.offset * this.state.page;
        for (
          let i = currentOffset;
          i <= this.state.limit + currentOffset;
          i++
        ) {
          if (typeof data[i] == "undefined") {
            continue;
          }
          itemsLimit.push(data[i]);
        }
        path = "/Album_detail/";
        component = (
          <div>
            <div className="album-container">
              {itemsLimit.map((key, value) => (
                <div className="albumList">
                  <Link className="album" to={path + key["id"]}>
                    <p key={key["name"]}>{key["name"]}</p>
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
              {this.state.maxLength === 0 ? null : (
                <button onClick={this.pageValueChange}>
                  {this.state.page}
                </button>
              )}
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
        break;

      default:
        break;
    }
    return component;
  };

  render() {
    return (
      <div>
        <div className="search">
          <form onSubmit={this.formSubmit}>
            <div className="selectOption">
              <select
                name="selectedOption"
                id="selectedOption"
                onChange={this.onValueChange}
              >
                <option value="albums_full">Albums</option>
                <option value="artists_full">Artists</option>
                <option value="tracks">Tracks</option>
              </select>
            </div>
            <input
              onChange={this.handleInput}
              type="text"
              placeholder="Search..."
            />
            <button onClick={this.handleSearch}>Search</button>
          </form>
        </div>
        {this.switchRenderByFilter()}
      </div>
    );
  }
}
export default Search;