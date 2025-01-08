import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTI1ZWNmODk1MmUwM2Y0ZDY5MzI2NTViZDIwOTQxNiIsIm5iZiI6MTczNDUxMzEwMS40Nywic3ViIjoiNjc2MjkxY2RlMTRlM2JjZmE3NGEyNDQwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ntvPkuUHZGRVzNgtKFf4CO_vvHdyON2aM1yQwGyVDZk'
      }
})
export default instance;