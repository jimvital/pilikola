export interface IMultiSelect {
  selectedItems: unknown[];
  setSelectedItems: (value: unknown[]) => void;
}

export interface IWatched {
  watchedMovies: unknown[];
  setWatchedMovies: (value: unknown[]) => void;
}
