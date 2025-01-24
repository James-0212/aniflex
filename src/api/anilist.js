import axios from 'axios';

const API_URL = 'https://graphql.anilist.co';

// Fetch all available genres
export const fetchGenres = async () => {
  const query = `
    query {
      GenreCollection
    }
  `;

  try {
    const response = await axios.post(API_URL, { query });
    return response.data.data.GenreCollection;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
};

// Fetch anime by genre
export const fetchAnimeByGenre = async (genre) => {
  const query = `
    query ($genre: String) {
      Page {
        media(genre: $genre, type: ANIME) {
          id
          title {
            romaji
          }
          format
          coverImage {
            extraLarge
          }
        }
      }
    }
  `;

  const variables = {
    genre,
  };

  try {
    const response = await axios.post(API_URL, { query, variables });
    return response.data.data.Page.media;
  } catch (error) {
    console.error('Error fetching anime by genre:', error);
    return [];
  }
};

// Fetch top-rated anime (with customizable limit)
export const fetchTopRatedAnime = async (page = 1, perPage = 10) => {
  const query = `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        media(sort: SCORE_DESC, type: ANIME) {
          id
          title {
            romaji
          }
          description
          averageScore
          coverImage {
            extraLarge
          }
        }
      }
    }
  `;

  const variables = {
    page,
    perPage,
  };

  try {
    const response = await axios.post(API_URL, { query, variables });
    return response.data.data.Page.media; // Returns an array of top-rated anime
  } catch (error) {
    console.error('Error fetching top-rated anime:', error);
    return [];
  }
};

// Fetch trending anime (with customizable limit)
export const fetchTrendingAnime = async (page = 1, perPage = 10) => {
  const query = `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        media(sort: TRENDING_DESC, type: ANIME) {
          id
          title {
            romaji
          }
          description
          trending
          coverImage {
            extraLarge
          }
        }
      }
    }
  `;

  const variables = {
    page,
    perPage,
  };

  try {
    const response = await axios.post(API_URL, { query, variables });
    return response.data.data.Page.media; // Returns an array of trending anime
  } catch (error) {
    console.error('Error fetching trending anime:', error);
    return [];
  }
};

// Fetch anime details by ID
export const fetchAnimeDetails = async (id) => {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        title {
          romaji
          english
        }
        description
        averageScore
        episodes
        genres
        format
        coverImage {
          extraLarge
        }
        streamingEpisodes {
          title
          thumbnail
          url
        }
      }
    }
  `;

  const variables = {
    id,
  };

  try {
    const response = await axios.post(API_URL, { query, variables });
    return response.data.data.Media; // Returns detailed information about the anime
  } catch (error) {
    console.error('Error fetching anime details:', error);
    return null;
  }
};

// Search anime by query
export const searchAnime = async (query) => {
  const graphqlQuery = `
    query ($search: String) {
      Page(perPage: 10) {
        media(search: $search, type: ANIME) {
          id
          title {
            romaji
          }
          coverImage {
            extraLarge
          }
          averageScore
        }
      }
    }
  `;

  const variables = { search: query };

  try {
    const response = await axios.post(API_URL, { query: graphqlQuery, variables });
    return response.data.data.Page.media; // Returns an array of anime matching the search
  } catch (error) {
    console.error('Error searching anime:', error);
    return [];
  }
};
