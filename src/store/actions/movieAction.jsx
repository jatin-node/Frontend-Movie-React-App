export {removemovie} from "../reducers/movieSlice";
import axios from "../../utils/axios";
import { loadmovie } from "../reducers/movieSlice";

export const getMovieDetails = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/movie/${id}`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const translations = await axios.get(`/movie/${id}/translations`);
    const external = await axios.get(`/movie/${id}/external_ids`);
    const watchProviders = await axios.get(`/movie/${id}/watch/providers`);


    let data = {
      detail: detail.data,
      videos: videos.data.results.find(t=>t.type === "Trailer"),
      similar: similar.data.results,
      recommendations: recommendations.data.results,
      translations: translations.data.translations
        .filter((t) => t.iso_3166_1 === "IN" || t.iso_3166_1 === "US")
        .map((t) => t.english_name),
      external: external.data,
      watchProviders: watchProviders.data.results.IN,
    };
    console.log(data);
    dispatch(loadmovie(data));

  } catch (error) {
    console.log("Error:", error);
  }
};
