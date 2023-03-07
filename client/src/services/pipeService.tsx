import axios from "axios";
import Pipe from "../models/Pipe";

export const pipeService = () => {
  const getPipes = async () => {
    await axios
      .get<Array<Pipe>>("Pipe")
      .then((response) => {
        return response.data as Array<Pipe>;
      })
      .catch((error) => {
        if (error.response.status === 403) {
          alert("Your access is not allowed.");
        } else console.error("There was an error", error);
      });
  };

  const postPipes = async (name: string) => {
    const config = { headers: { "Content-Type": "application/json" } };
    await axios
      .post<any>("Pipe", name, config)
      .then((response) => {
        console.log(response.status);
        return response.status;
      })
      .catch((error) => {
        console.error("There was an error", error);
      });
  };

  const deletePipe = async (id: string) => {
    await axios
      .delete<any>(`Pipe/${id}`)
      .then((response) => {
        console.log(response.status);
        return response.status;
      })
      .catch((error) => {
        console.error("There was an error", error);
      });
  };

  const putPipes = async (id: string, name: string) => {
    const config = { headers: { "Content-Type": "application/json" } };
    await axios
      .put<any>(`Pipe/${id}`, name, config)
      .then((response) => {
        console.log(response.status);
        return(response.data)
      })
      .catch((error) => {
        console.error("There was an error", error);
      });
  };

  const getPipe = async (id: string) => {
    await axios
      .get<Pipe>(`Pipe/${id}`)
      .then((response) => {
        return(response.data.name)
      })
      .catch((error) => {
        console.log(error);
        if (error.response.statusCode === 401) {
          alert("Unauthorized");
        }
      });
  };
};
