export {removetv} from "../reducers/tvSlice";
import axios from "../../utils/axios";
import { loadtv } from "../reducers/tvSlice";

export const getTvDetails = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/tv/${id}`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const translations = await axios.get(`/tv/${id}/translations`);
    const external = await axios.get(`/tv/${id}/external_ids`);
    const watchProviders = await axios.get(`/tv/${id}/watch/providers`);

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
    dispatch(loadtv(data));

  } catch (error) {
    console.log("Error:", error);
  }
};
