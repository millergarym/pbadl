adlc typescript \
    --outputdir=ts/src/adl-gen \
    --manifest=ts/src/adl-gen/.manifest \
    --generate-transitive \
    --include-rt \
    --include-resolver \
    --runtime-dir runtime \
    `find . -name *.adl` 

mkdir -p gen-adl

( cd 001
protoc -I ../../proto -I . --pbadl_out=paths=source_relative:../gen-adl \
    teststruct/pbadl.proto \
    teststruct/struct.proto
)
( cd 002
protoc -I ../../proto -I . --pbadl_out=paths=source_relative:../gen-adl \
    testunion/pbadl.proto \
    testunion/union.proto
)
