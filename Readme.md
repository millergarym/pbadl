# Protobuf based ADL implementation

Work in progress

## Prerequisites

- [protoc](https://github.com/protocolbuffers/protobuf/releases)
- [ADL](https://github.com/timbod7/adl/releases)
- Go, yarn, node etc.


## Dev and Test

### Init or after changes to generator
```
cd protoc-gen-pbadl
go install
```

### on changes to test adl

```
cd testdata\ts
./gen-adl.sh
cd ts
yarn build
cd ..
go test -v
```
