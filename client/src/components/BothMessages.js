import React from 'react';

export default function BothMessages({ user2, theirMessages, yourMessages }) {
    return (
        <div style={{ display: "inline" }}>
            <div style={{ float: "left", marginLeft: "200px" }}>
                <h3>{user2}'s Messages</h3>
                {theirMessages.map((message) => (
                    < div >
                        <p>{message.body}</p>
                    </div>
                ))}
            </div>
            <div style={{ float: "right", marginRight: "200px" }}>
                <h3>Your Messages</h3>
                {yourMessages.map((message) => (
                    <div>
                        <p>{message.body}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
