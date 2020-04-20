mkdir pb-gen
(WD=`pwd`; cd proto; protoc --go_out=paths=source_relative:$WD/pb-gen ext/ext.proto)
