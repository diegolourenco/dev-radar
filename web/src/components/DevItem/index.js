import React from "react";

import "./styles.css";

function DevItem({ dev, onEdit, onDestroy }) {
  function handleEditDev(dev) {
    onEdit(dev);
  }
  async function handleDestroyDev(dev) {
    await onDestroy(dev);
  }

  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(", ")}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <div className="user-footer">
        <a
          href={`https://github.com/${dev.github_username}`}
          target="_blank"
          rel="nofollow noreferrer noopener"
        >
          Acessar perfil no Github
        </a>
        <div className="user-button">
          <button title="Editar usuário" onClick={() => handleEditDev(dev)}>
            <i className="fas fa-user-edit"></i>
          </button>
          <button title="Remover usuário" onClick={() => handleDestroyDev(dev)}>
            <i className="fas fa-user-minus"></i>
          </button>
        </div>
      </div>
    </li>
  );
}
export default DevItem;
