package main

import (
	"bytes"
	"compress/gzip"
	"flag"
	"fmt"
	"io"
	"io/ioutil"
	"os"

	gengo "google.golang.org/protobuf/cmd/protoc-gen-go/internal_gengo"
	"google.golang.org/protobuf/compiler/protogen"

	"github.com/millergarym/pbadl/pb-gen/teststruct"
	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/types/descriptorpb"
)

func main() {
	gzipIn, _ := ((*teststruct.ProductType)(nil)).Descriptor()
	gzipBytes := bytes.NewReader(gzipIn)
	gr, err := gzip.NewReader(gzipBytes)
	if err != nil {
		fmt.Printf("%v", err)
		os.Exit(1)
	}
	in, _ := ioutil.ReadAll(gr)
	req := &descriptorpb.FileDescriptorProto{}
	if err := proto.Unmarshal(in, req); err != nil {
		fmt.Printf("%v", err)
		os.Exit(1)
	}
	name, number, label := "abc", int32(1), descriptorpb.FieldDescriptorProto_LABEL_REQUIRED
	_type := descriptorpb.FieldDescriptorProto_TYPE_STRING
	// typename, extendee, defaultvalue, oneofindex
	jsonname, options := "abc", ((*descriptorpb.FieldOptions)(nil))
	req.MessageType[0].Field = append(req.MessageType[0].Field, &descriptorpb.FieldDescriptorProto{
		Name:     &name,
		Number:   &number,
		Label:    &label,
		Type:     &_type,
		JsonName: &jsonname,
		Options:  options,
	})
	// fmt.Printf("%+v\n", req)

	go func() {
		var flags flag.FlagSet
		protogen.Options{
			ParamFunc: flags.Set,
		}.Run(func(gen *protogen.Plugin) error {
			for _, f := range gen.Files {
				if f.Generate {
					gengo.GenerateFile(gen, f)
				}
			}
			return nil
		})
	}()

	mod, err := proto.Marshal(req)
	if err != nil {
		fmt.Printf("%v", err)
		os.Exit(1)
	}

	io.Copy(os.Stdin, bytes.NewReader(mod))
}
