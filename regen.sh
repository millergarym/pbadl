(WD=`pwd`; cd testdata/001; protoc --go_out=paths=source_relative:$WD/pb-gen teststruct/struct.proto)
