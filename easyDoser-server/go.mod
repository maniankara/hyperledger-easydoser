module easydoser.com/easyDoser-server

go 1.12

require (
	easydoser.com/commands v0.0.0
	github.com/gorilla/mux v1.7.4

)

replace easydoser.com/commands => ./commands
