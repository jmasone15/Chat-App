import React from 'react'

export default function OneMessage({ messages }) {
    return (
        <div style={{ float: "right", marginRight: "200px" }}>
            <h3>Your Messages</h3>
            {messages.map((message) => (
                < div >
                    <p>{message.body}</p>
                </div>
            ))}
        </div>
    )
}
