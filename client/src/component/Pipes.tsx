import axios from "axios";
import { useState } from "react";
import Pipe from "../models/Pipe";
export const Pipes = () => {
  const [pipes, setPipes] = useState<Array<Pipe>>();
  const [pipeId, setPipeId] = useState("");
  const [Pipe, setPipe] = useState<Pipe>();
  const [createPipe, setCreatePipe] = useState("");
  const [updatePipeName, setUpdatePipeName] = useState("");
  const [updatePipeId, setUpdatePipeId] = useState("");
  const [deletePipeId, setDeletePipeId] = useState("");

  const getPipes = async () => {
    await axios
      .get<Array<Pipe>>("Pipe")
      .then((response) => {
        setPipes(response.data as Array<Pipe>);
        console.log(response.data);
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
      })
      .catch((error) => {
        console.error("There was an error", error);
      });
  };

  const getPipe = async (id: string) => {
    await axios
      .get<Pipe>(`Pipe/${id}`)
      .then((response) => {
        setPipe(response.data as Pipe);
        console.log("response " + response.data.name);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.statusCode === 401) {
          alert("Unauthorized");
        }
      });
  };

  const HandlePipeId = (event: any) => {
    setPipeId(event.target.value);
  };

  const HandleDeletePipeId = (event: any) => {
    setDeletePipeId(event.target.value);
  };

  const HandleCreatePipe = (event: any) => {
    setCreatePipe(event.target.value);
  };

  const HandleUpdatePipeId = (event: any) => {
    setUpdatePipeId(event.target.value);
  };

  const HandleUpdatePipeName = (event: any) => {
    setUpdatePipeName(event.target.value);
  };

  return (
    <div>
      <div>
        <h1> Get all pipes</h1>
        <button className="button" onClick={getPipes}>
          Get Pipes
        </button>
        <h2>
          {pipes?.map((item, index) => (
            <div key={index}>
              <div>
                Pipe; Name: {item.name}, Id: {item.id}
              </div>
            </div>
          ))}
        </h2>
      </div>
      <div>
        <h1> Create pipe</h1>
        <input
          type="text"
          id="CreatePipeName"
          name="message"
          placeholder="pipeName"
          onChange={HandleCreatePipe}
          value={createPipe}
        />
        <button className="button" onClick={() => postPipes(createPipe)}>
          Create pip
        </button>
      </div>
      <div>
        <h1> Update pipe</h1>
        <input
          type="text"
          id="UpdatePipeName"
          name="message"
          placeholder="pipeName"
          onChange={HandleUpdatePipeName}
          value={updatePipeName}
        />
        <input
          type="text"
          id="UpdatePipeId"
          name="message"
          placeholder="pipeId"
          onChange={HandleUpdatePipeId}
          value={updatePipeId}
        />
        <button
          className="button"
          onClick={() => putPipes(updatePipeId, updatePipeName)}
        >
          Update pip
        </button>
        <div>
          <h1>Delete pipe with id {pipeId}</h1>
          <input
            type="text"
            id="DeletePipe"
            name="message"
            placeholder="pipeId"
            onChange={HandleDeletePipeId}
            value={deletePipeId}
          />
          <button className="button" onClick={() => deletePipe(deletePipeId)}>
            Delete pipe
          </button>
        </div>
      </div>
      <div>
        <h1> Get pipe from id</h1>
        <input
          type="text"
          id="pipeId"
          name="message"
          onChange={HandlePipeId}
          value={pipeId}
        />
        <button className="button" onClick={() => getPipe(pipeId)}>
          Get pip from pip id
        </button>
        <h2>Pipe has name '{Pipe?.name ?? ""}'</h2>
      </div>
      <div></div>
    </div>
  );
};
