import { axiosInstance } from "./index";

export const AddTheatre = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatre/add-theatre",
      payload
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

export const GetAllTheatres = async () => {
  try {
    const response = await axiosInstance.get("/api/theatre/get-all-theatres");
    return response.data;
  } catch (err) {
    return err;
  }
};

export const GetAllTheatresByOwner = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/theatre/get-all-theatres-by-owner"
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

export const UpdateTheatre = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/theatre/update-theatre",
      payload
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

export const DeleteTheatre = async (theatreId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/theatre/delete-theatre?theatreId=${theatreId}`
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

// Shows API

// To Add a new Show
export async function AddShow(payload) {
  try {
    const response = await axiosInstance.post("/api/theatre/add-show", payload);
    return response.data;
  } catch (err) {
    return err;
  }
}

// To get all the shows for a specific Theatre
export async function GetAllShowsByTheatre(payload) {
    try {
    const response = await axiosInstance.post(
      "/api/theatre/get-all-shows-by-theatre",
      payload
    );
    return response.data;
  } catch (err) {
    return err;
  }
}

// To Delete a Show

export async function DeleteShow(showId) {
  try {
    const response = await axiosInstance.delete(
      `/api/theatre/delete-show?showId=${showId}`
    );
    return response.data;
  } catch (err) {
    return err;
  }
}

// To get all the Theatres That Screen The given Movie
export async function GetAllTheatresByMovie(payload) {
  try {
    const response = await axiosInstance.post(
      "/api/theatre/get-all-theatres-by-movie",
      payload
    );
    return response.data;
  } catch (err) {
    return err.response;
  }
}

// To get show by id

export const GetShowById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatre/get-show-by-id",
      payload
    );
    return response.data;
  } catch (err) {
    return err.response;
  }
};
