module easydoser.com/easyDoser-server
go 1.14

require (
   github.com/gorilla/mux v1.7.4
   easydoser.com/commands v0.0.0

)
replace (
   easydoser.com/commands => ./commands
)