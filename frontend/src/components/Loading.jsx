import React from 'react'

export default function Loading() {
    return <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: "99999",
        backgroundColor: "rgba(0, 0, 0, 0.53)",
        color: "white"
    }}>
        Carregando...
    </div>

}