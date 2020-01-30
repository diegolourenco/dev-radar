import React, { useState, useEffect } from "react";
import API from "./services/api";

import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";

import DevForm from "./components/DevForm";
import DevItem from "./components/DevItem";

function App() {
  const [devs, setDevs] = useState([]);
  const [dev, setDev] = useState("");

  useEffect(() => {
    async function loadDevs() {
      const response = await API.get("/devs");
      setDevs(response.data);
    }

    loadDevs();
  }, [dev]);

  async function handleAddDev(data) {
    const response = await API.post("/devs", data);
    setDevs([...devs, response.data]);
  }

  function handleEditDev(data) {
    setDev(data);
  }

  function handleCancelEdit() {
    setDev("");
  }

  async function handleUpdateDev(data) {
    await API.put(`/devs/${data._id}`, data);
    setDev("");
  }
  async function handleDestroyDev(data) {
    await API.delete(`/devs/${data._id}`);
    setDevs(devs.filter(dev => dev !== data));
  }

  return (
    <div id="app">
      <aside>
        <DevForm
          onSubmit={handleAddDev}
          onUpdate={handleUpdateDev}
          onCancel={handleCancelEdit}
          dev={dev}
        />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem
              key={dev._id}
              dev={dev}
              onEdit={handleEditDev}
              onDestroy={handleDestroyDev}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
