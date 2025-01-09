export {removeperson} from "../reducers/personSlice";
import axios from "../../utils/axios";
import { loadperson } from "../reducers/personSlice";

export const getPersonDetails = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/person/${id}`);
    const external = await axios.get(`/person/${id}/external_ids`);
    const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
    const tvCredits = await axios.get(`/person/${id}/tv_credits`);
    const movieCredits = await axios.get(`/person/${id}/movie_credits`);


    let data = {
      detail: detail.data,
      external: external.data,
      combinedCredits: combinedCredits.data,
      tvCredits: tvCredits.data,
      movieCredits:movieCredits.data
    };
    dispatch(loadperson(data));

  } catch (error) {
    console.log("Error:", error);
  }
};
