package main

import (
	"flag"
	"fmt"
	"io/ioutil"
	"os"

	"github.com/golangq/q"
	"github.com/millergarym/pbadl/pb-gen/ext"

	gengo "google.golang.org/protobuf/cmd/protoc-gen-go/internal_gengo"
	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/types/pluginpb"
)

func main() {
	if err := run(); err != nil {
		fmt.Fprintf(os.Stderr, "%v\n", err)
	}
}

func run() error {
	if len(os.Args) > 1 {
		return fmt.Errorf("unknown argument %q (this program should be run by protoc, not directly)", os.Args[1])
	}
	in, err := ioutil.ReadAll(os.Stdin)
	if err != nil {
		return err
	}

	req := &pluginpb.CodeGeneratorRequest{}
	if err := proto.Unmarshal(in, req); err != nil {
		return err
	}
	for _, fdesc := range req.ProtoFile {
		filename := fdesc.GetName()
		q.Q(filename)
		adlc := proto.GetExtension(fdesc.Options, ext.E_AldcAstCli).(*ext.AdlcAstCli)
		if adlc != nil {
			q.Q(adlc.Searchdir)
		}

	}

	// req.FileToGenerate = append(req.FileToGenerate, "adlfiles")

	var flags flag.FlagSet
	opts := protogen.Options{
		ParamFunc: flags.Set,
	}

	gen, err := opts.New(req)
	if err != nil {
		return err
	}
	for _, f := range gen.Files {
		q.Q(f.Proto.GetName())
		if f.Generate {
			q.Q(f.Proto.GetName())
			gengo.GenerateFile(gen, f)
		}
	}
	// if err := f(gen); err != nil {
	// 		// Errors from the plugin function are reported by setting the
	// 		// error field in the CodeGeneratorResponse.
	// 		//
	// 		// In contrast, errors that indicate a problem in protoc
	// 		// itself (unparsable input, I/O errors, etc.) are reported
	// 		// to stderr.
	// 		gen.Error(err)
	// 	}
	resp := gen.Response()
	out, err := proto.Marshal(resp)
	if err != nil {
		return err
	}
	if _, err := os.Stdout.Write(out); err != nil {
		return err
	}

	return nil
}
