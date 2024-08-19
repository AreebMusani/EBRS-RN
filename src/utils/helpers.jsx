const searchSongs = (songList, query) => {
  return songList.filter(item => {
    const searchTerm = query.toLowerCase();
    return (
      item?.title?.toLowerCase().includes(searchTerm) ||
      item?.artist?.toLowerCase().includes(searchTerm)
    );
  });
};

export {searchSongs};
