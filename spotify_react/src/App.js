import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Album_detail from "./Album_detail.js";
import All_albums from "./All_albums.js";
import Albums from "./Albums.js";
import Artists from "./All_artists.js";
import Artist_detail from "./Artist_detail.js";
import Genres from "./Genres.js";
import Genres_detail from "./Genres_detail.js";
import Header from "./Header.js";
import Search from "./Search.js";
import "./index.css";
import "./App.css";
import "./Artists.css";
import "./Genres.css";
import "./Search.css";
import "./Album_detail.css";
import "./Artist_detail.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route path="/" component={Albums} exact />
            <Route path="/Artists" component={Artists} />
            <Route path="/Artist_detail/:id" component={Artist_detail} />
            <Route path="/Genres" component={Genres} />
            <Route path="/Albums" component={All_albums} />
            <Route path="/Search" component={Search} />
            <Route path="/Album_detail/:id" component={Album_detail} />
            <Route path="/Genres_detail/:id" component={Genres_detail} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;