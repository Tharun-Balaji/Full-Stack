import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetAllTheatresByMovie } from "../../apiCalls/theatres";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";
import moment from "moment";

export default function TheatresForMovie() {
  const params = useParams();
  const dispatch = useDispatch();
  const queryDate = new URLSearchParams(window.location.search).get("date");
  const [theatres, setTheatres] = useState([]);
  const [date, setDate] = useState(queryDate || moment().format("YYYY-MM-DD"));

  async function getTheatres(){
    try {
      dispatch(ShowLoading());
      const response = await GetAllTheatresByMovie({
        date,
        movieId: params.id,
      });
      if (response.success) {
        setTheatres(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    console.log({ queryDate, params });
    getTheatres();
  }, []);

  console.log(theatres);

  return <div>Theatres for movie</div>;
}