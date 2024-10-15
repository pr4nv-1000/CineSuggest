import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const advancedMediaEndpoints = {
  search: ({
    mediaType,
    genres,
    year,
    releaseDateFrom,
    releaseDateTo,
    voteAverageFrom,
    voteAverageTo,
    language,
    runtimeFrom,
    runtimeTo,
    certification,
    sortBy
  }) => {
    // Base URL for either movie or tv using the discover endpoint
    let url = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=b3eeb4de821b9b42cbc6b880a936afdf`;

    // Year filter
    if (year) {
      url += `&primary_release_year=${year}`; // Apply the release year filter
    }

    // Genre filter
    if (genres && genres.length > 0) {
      url += `&with_genres=${genres.join(",")}`; // Apply genre filter
    }

    // Release date range
    if (releaseDateFrom) {
      url += `&release_date.gte=${releaseDateFrom}`;
    }
    if (releaseDateTo) {
      url += `&release_date.lte=${releaseDateTo}`;
    }

    // Vote average filter
    if (voteAverageFrom) {
      url += `&vote_average.gte=${voteAverageFrom}`;
    }
    if (voteAverageTo) {
      url += `&vote_average.lte=${voteAverageTo}`;
    }

    // Language filter
    if (language) {
      url += `&with_original_language=${language}`;
    }

    // Runtime filter
    if (runtimeFrom) {
      url += `&with_runtime.gte=${runtimeFrom}`;
    }
    if (runtimeTo) {
      url += `&with_runtime.lte=${runtimeTo}`;
    }

    // Certification filter (e.g., PG, R)
    if (certification) {
      url += `&certification_country=US&certification=${certification}`;
    }

    // Sorting (e.g., by popularity, release date)
    if (sortBy) {
      url += `&sort_by=${sortBy}`;
    }

    return url;
  }
};

const advancedMediaApi = {
  // Advanced search method with extended filters
  search: async ({
    mediaType,
    genres,
    year,
    releaseDateFrom,
    releaseDateTo,
    voteAverageFrom,
    voteAverageTo,
    language,
    runtimeFrom,
    runtimeTo,
    certification,
    sortBy
  }) => {
    try {
      // Generate the advanced URL based on filters
      const url = advancedMediaEndpoints.search({
        mediaType,
        genres,
        year,
        releaseDateFrom,
        releaseDateTo,
        voteAverageFrom,
        voteAverageTo,
        language,
        runtimeFrom,
        runtimeTo,
        certification,
        sortBy
      });

      // Make the API call
      const response = await publicClient.get(url);

      return { response };
    } catch (err) {
      return { err };
    }
  },

  // Get advanced details method (you can expand this with additional logic if needed)
  getDetail: async ({ mediaType, mediaId }) => {
    try {
      const response = await privateClient.get(
        `${mediaType}/detail/${mediaId}?api_key=YOUR_API_KEY`
      );

      return { response };
    } catch (err) {
      return { err };
    }
  }
};

export default advancedMediaApi;
