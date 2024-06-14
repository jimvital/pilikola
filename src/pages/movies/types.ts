import React from "react";

export interface IMultiSelect {
  selectedItems: any[];
  setSelectedItems: React.Dispatch<React.SetStateAction<any[]>>;
}

export interface IWatched {
  watchedMovies: any[];
  setWatchedMovies: React.Dispatch<React.SetStateAction<any[]>>;
}
