import React from 'react'

export default function OneMessage({ user2, messages }) {
    return (
        <div style={{ float: "left", marginLeft: "200px" }}>
            <h3>{user2}'s Messages</h3>
            {messages.map((message) => (
                < div >
                    <p>{message.body}</p>
                </div>
            ))}
        </div>
    )
}