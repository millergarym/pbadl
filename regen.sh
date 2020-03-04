#(WD=`pwd`; cd testdata/001; protoc -I $WD/proto --go_out=paths=source_relative:$WD/pb-gen teststruct/struct.proto teststruct/pbadl.proto)
(WD=`pwd`; cd testdata/001; protoc -I$WD/proto -I. --go_out=paths=source_relative:$WD/pb-gen teststruct/pbadl.proto)
(WD=`pwd`; cd proto; protoc --go_out=paths=source_relative:$WD/pb-gen ext/ext.proto)
