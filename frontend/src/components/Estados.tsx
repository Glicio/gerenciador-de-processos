import React from "react";

interface EstadoInterface {
  toggleSelf(): void;
}

export default function Estados(props: EstadoInterface) {
  const { toggleSelf } = props;
  return (
    <div
      className="modal-container"
      onMouseDown={(e) =>
        (e.target as Element).className === "modal-container" && toggleSelf()
      }
    >
      <div className="container pop-up-anim">
        <div className="side-menu">
          <h3
            style={{
              margin: "0",
              padding: "0",
              textAlign: "center",
              width: "100%",
              fontSize: "small"
            }}
          >
            Estados do processo
          </h3>
          <div className="divisor" style={{ margin: "0.5rem auto" }}></div>
          <button className="side-menu-button">Adicionar</button>
        </div>
        <div className="content">
            <div className="credores-table-container">
                <table className="credores-table">
                    <thead>
                        <tr>
                            <th>
                                Descrição
                            </th>
                            <th>
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
}
