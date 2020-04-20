module github.com/millergarym/pbadl

go 1.13

// replace google.golang.org/protobuf => /home/garym/go/src/github.com/protocolbuffers/protobuf-go

replace google.golang.org/protobuf v1.20.1-0.20200309200217-e05f789c0967 => github.com/millergarym/protobuf-go v1.21.2

require (
	github.com/golang/protobuf v1.4.0-rc.4
	github.com/golangq/q v1.0.7
	github.com/jpillora/opts v1.1.2
	google.golang.org/protobuf v1.20.1-0.20200309200217-e05f789c0967
)
