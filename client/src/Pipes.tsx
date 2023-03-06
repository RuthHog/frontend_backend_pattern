import axios from "axios";
import { useState } from "react";
import Pipe from "./Pipe";
export const Pipes = () => {
  const [pipes, setPipes] = useState<Array<Pipe>>();
  const [pipeId, setPipeId] = useState("");
  const [Pipe, setPipe] = useState<Pipe>();
  const [pipeName, setPipeName] = useState("");

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

  const HandlePipeName = (event: any) => {
    setPipeName(event.target.value);
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
        <h1> Create pip</h1>
        <input
          type="text"
          id="PipeName"
          name="message"
          placeholder="pipeName"
          onChange={HandlePipeName}
          value={pipeName}
        />
        <button className="button" onClick={() => postPipes(pipeName)}>
          Create pip
        </button>
      </div>
      <div>
        <h1> Update pipe</h1>
        <input
          type="text"
          id="PipeName"
          name="message"
          placeholder="pipeName"
          onChange={HandlePipeName}
          value={pipeName}
        />
        <input
          type="text"
          id="PipeId"
          name="message"
          placeholder="pipeId"
          onChange={HandlePipeId}
          value={pipeId}
        />
        <button className="button" onClick={() => putPipes(pipeId, pipeName)}>
          Update pip
        </button>
        <div>
          <h1>Delete pipe with id {pipeId}</h1>
          <input
            type="text"
            id="PipeId"
            name="message"
            placeholder="pipeId"
            onChange={HandlePipeId}
            value={pipeId}
          />
          <button className="button" onClick={() => deletePipe(pipeId)}>
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
