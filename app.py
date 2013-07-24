#!/usr/bin/env python

from twisted.web.static import File
from twisted.web.server import Site
from twisted.internet import reactor
from executioner.api import ExecutionerApiHandler

root = File("executioner/www")  # Server folder www as static files
index = File("executioner/www/index.html")
root.putChild("api", ExecutionerApiHandler())  # Let Api handler process /api
root.putChild("results", index)  # Let Api handler process /api

SERVER_PORT = 9000
BIND_ADDR = "localhost"

factory = Site(root)
reactor.listenTCP(SERVER_PORT, factory, interface=BIND_ADDR)
print "Listening on url: http://" + BIND_ADDR + ":" + str(SERVER_PORT) + "/"
reactor.run()
