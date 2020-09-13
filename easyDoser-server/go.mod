module easydoser.com/easyDoser-server

go 1.14

require (
	easydoser.com/commands v0.0.0
	github.com/gorilla/mux v1.8.0

)

replace easydoser.com/commands => ./commands
