import asyncio
import json
import os

import websockets

# Set to keep track of connected clients
connected_clients = set()
clients_names = []


async def on_conection(websocket_client):
    # Register the new client
    connected_clients.add(websocket_client)
    try:
        await websocket_client.send(json.dumps({'players': clients_names}))
        while True:
            # Receive a message from the current client
            message = await websocket_client.recv()
            data = json.loads(message)
            print(f"< Received: {data}")
            print(data)
            if 'playerName' in data:
                name = data['playerName']
                if name not in clients_names:
                    clients_names.append(name)
                    for client in connected_clients:
                        await client.send(json.dumps({'players': clients_names}))
                        print(f"< Forwarded: {json.dumps(clients_names)}")
            
            if 'spinningDegree' in data:
                spinningDegree = data['spinningDegree']
                for client in connected_clients:
                    response = json.dumps({'spinningDegree': spinningDegree})
                    await client.send(response)
                    print(f"< Forwarded: {response}")

            if 'showImage' in data:
                showImage = data['showImage']
                for client in connected_clients:
                    response = json.dumps({'showImage': showImage})
                    await client.send(response)
                    print(f"< Forwarded: {response}")
            
    except websockets.exceptions.ConnectionClosed:
        print("Connection closed")
    finally:
        # Unregister the client when it disconnects
        connected_clients.remove(websocket_client)

PORT = int(os.environ.get("PORT", 8765))

async def main():
    # Start the WebSocket server
    print('Websocket Server Instantiated.')
    async with websockets.serve(on_conection, "0.0.0.0", PORT):
        await asyncio.Future()  # Run forever


# Run the server
asyncio.run(main())
