import asyncio
import json
import os

import aiohttp
from aiohttp import web

# Set to keep track of connected clients
connected_clients = set()
clients_names = []


async def on_connection(request):
    # Upgrade the HTTP connection to WebSocket
    websocket = web.WebSocketResponse()
    await websocket.prepare(request)

    # Register the new client
    connected_clients.add(websocket)
    try:
        # Send the list of player names to the new client
        await websocket.send_json({'players': clients_names})

        while True:
            # Receive a message from the client
            message = await websocket.receive()

            if message.type == aiohttp.WSMsgType.TEXT:
                data = json.loads(message.data)
                print(f"< Received: {data}")
                
                if 'playerName' in data:
                    name = data['playerName']
                    if name not in clients_names:
                        clients_names.append(name)
                        # Forward the updated player list to all connected clients
                        for client in connected_clients:
                            await client.send_json({'players': clients_names})
                            print(f"< Forwarded: {json.dumps(clients_names)}")
                
                if 'spinningDegree' in data:
                    spinningDegree = data['spinningDegree']
                    # Forward the spinning degree to all connected clients
                    for client in connected_clients:
                        response = json.dumps({'spinningDegree': spinningDegree})
                        await client.send_str(response)
                        print(f"< Forwarded: {response}")

                if 'showImage' in data:
                    showImage = data['showImage']
                    # Forward the showImage flag to all connected clients
                    for client in connected_clients:
                        response = json.dumps({'showImage': showImage})
                        await client.send_str(response)
                        print(f"< Forwarded: {response}")

            elif message.type == aiohttp.WSMsgType.ERROR:
                print(f"WebSocket error: {websocket.exception()}")

    except aiohttp.WSClientError as e:
        print(f"Connection closed with error: {e}")
    finally:
        # Unregister the client when it disconnects
        connected_clients.remove(websocket)
        print("Connection closed")

    return websocket

async def on_http_connection(request):
    return web.Response(text="OK")

async def main():
    # Start the WebSocket server
    print('Instatiating web server...')
    
   # HTTP server
    app = web.Application()
    app.router.add_get("/", on_http_connection)
    app.router.add_get('/ws', on_connection)

    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, "0.0.0.0", PORT)
    await site.start()

    print(f"Server running on port {PORT}")
    await asyncio.Future()  # Run forever


if __name__ == "__main__":
    PORT = int(os.environ.get("PORT", 8765))
    asyncio.run(main())
