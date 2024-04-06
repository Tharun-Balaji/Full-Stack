import { Table, message } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DeleteMovie, GetAllMovies } from "../../apiCalls/movies";
import Button from "../../components/Button";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";
import MovieForm from "./MovieForm";

// console.log(Button)
export default function MovieList() {

  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);
  const [showMovieFormModal, setShowMovieFormModal] = useState(false);
  const [formType, setFormType] = useState("add");
  const [selectedMovie, setSelectedMovie] = useState(null);


  async function getData() {
    try {
      dispatch(ShowLoading());
      const response = await GetAllMovies();
      if (response.success) {
        setMovies(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  async function handleDelete   (movieId) {
    try {
      dispatch(ShowLoading());
      const response = await DeleteMovie(movieId);
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };


  useEffect(()=>{
    getData();
  },[])

  const columns = [
    {
      title: "Poster",
      dataIndex: "poster",
      render: (posterLink) => {
        // All your data manipulations.
        return (
          <img
            src={posterLink}
            alt="poster"
            height="60"
            width="80"
            className="br-1"
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "title",
    },

    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      render: (text, record) => {
        return moment(record.releaseDate).format("DD-MM-YYYY");
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-1">
            <i
              className="ri-delete-bin-line"
              onClick={() => {
                handleDelete(record._id);
              }}
            ></i>
            <i
              className="ri-pencil-line"
              onClick={() => {
                setSelectedMovie(record);
                setFormType("edit");
                setShowMovieFormModal(true);
              }}
            ></i>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex justify-end mb-1">
        <Button
          title="Add Movie"
          variant="outlined"
          onClick={() => {
            setShowMovieFormModal(true);
            setFormType("add");
            console.log(showMovieFormModal,formType)
          }}
        />
        </div>
      <Table columns={columns} dataSource={movies} />
      {showMovieFormModal && (
        <MovieForm
          formType={formType}
          setShowMovieFormModal={setShowMovieFormModal}
          showMovieFormModal={showMovieFormModal}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          getData={getData}
        />
      )}
    </div>
  );
}
