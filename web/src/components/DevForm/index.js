import React, { useState, useEffect } from "react";

import "./styles.css";

function DevForm({ onSubmit, onUpdate, onCancel, dev }) {
  const [devEditable, setDevEditable] = useState("");
  const [_id, setId] = useState("");
  const [github_username, setGithubUsername] = useState("");
  const [avatar_url, setAvatarUrl] = useState("");
  const [name, setName] = useState("");
  const [techs, setTechs] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      err => {
        console.log(err);
      },
      { timeout: 30000 }
    );
  }, []);

  useEffect(() => {
    if (dev) {
      setDevEditable(true);
      setId(dev._id);
      setGithubUsername(dev.github_username);
      setName(dev.name);
      setAvatarUrl(dev.avatar_url);
      setTechs(dev.techs.join(", "));
      setLatitude(dev.location.coordinates[1]);
      setLongitude(dev.location.coordinates[0]);
    }
  }, [dev]);

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      github_username,
      techs,
      latitude,
      longitude
    });

    setGithubUsername("");
    setTechs("");
  }

  async function handleUpdate(e) {
    e.preventDefault();
    await onUpdate({
      _id,
      avatar_url,
      name,
      techs,
      latitude,
      longitude
    });
    handleCancel();
  }

  function handleCancel() {
    onCancel(true);
    setDevEditable(false);
    setId("");
    setGithubUsername("");
    setName("");
    setAvatarUrl("");
    setTechs("");
  }

  return (
    <>
      <div className="d-flex">
        <i
          className={`fas fa-chevron-left ${!devEditable ? "d-none" : ""}`}
          onClick={handleCancel}
        ></i>
        <strong>{devEditable ? "Editar" : "Cadastrar"}</strong>
      </div>
      <form onSubmit={devEditable ? handleUpdate : handleSubmit}>
        <div className="input-block">
          <label htmlFor="github_username">Usuário do Github</label>
          <input
            name="github_username"
            id="github_username"
            required
            value={github_username}
            disabled={devEditable ? true : false}
            onChange={e => setGithubUsername(e.target.value)}
          />
        </div>

        <div className={`input-block ${devEditable ? "" : "d-none"}`}>
          <label htmlFor="avatar_url">Avatar</label>
          <input
            name="avatar_url"
            id="avatar_url"
            value={avatar_url}
            disabled={devEditable ? false : true}
            onChange={e => setAvatarUrl(e.target.value)}
          />
        </div>

        <div className={`input-block ${devEditable ? "" : "d-none"}`}>
          <label htmlFor="name">Nome</label>
          <input
            name="name"
            id="name"
            value={name}
            disabled={devEditable ? false : true}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="techs">Tecnologias</label>
          <input
            name="techs"
            id="techs"
            required
            value={techs}
            onChange={e => setTechs(e.target.value)}
          />
        </div>
        <div className="input-group">
          <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input
              type="number"
              name="latitude"
              id="latitude"
              required
              value={latitude}
              onChange={e => setLatitude(e.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="longitude">Longitude</label>
            <input
              type="number"
              name="longitude"
              id="longitude"
              required
              value={longitude}
              onChange={e => setLongitude(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">Salvar</button>
      </form>
    </>
  );
}

export default DevForm;
