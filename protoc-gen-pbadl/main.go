package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
	"path"
	"path/filepath"
	"strings"

	"github.com/millergarym/pbadl/adl"

	"github.com/golangq/q"
	"github.com/millergarym/pbadl/pb-gen/ext"

	gengo "google.golang.org/protobuf/cmd/protoc-gen-go/internal_gengo"
	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/encoding/protojson"
	"google.golang.org/protobuf/proto"

	// google.golang.org/protobuf/types/descriptorpb
	"google.golang.org/protobuf/types/descriptorpb"

	"google.golang.org/protobuf/types/pluginpb"
)

func main() {
	if err := run(); err != nil {
		fmt.Fprintf(os.Stderr, "%v\n", err)
	}
}

func dump(fdesc *descriptorpb.FileDescriptorProto) {
	// return
	out, err := protojson.MarshalOptions{
		// Multiline:     true,
		Indent:        "  ",
		UseProtoNames: true,
	}.Marshal(fdesc)
	if err != nil {
		q.Q("protojson %v\n", err)
	}
	q.Q("%v\n", string(out))
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
	wd, _ := os.Getwd()
	for _, fdesc := range req.ProtoFile {
		filename := fdesc.GetName()
		q.Q(filename)
		q.Q(wd)
		// dump(fdesc)
		adlc := proto.GetExtension(fdesc.Options, ext.E_AldcAstCli).(*ext.AdlcAstCli)
		if adlc != nil {
			tempd, err := ioutil.TempDir("", "phadl")
			if err != nil {
				return fmt.Errorf("can't create temp dir %v", err)
			}
			combOut := filepath.Join(tempd, "adl_ast.json")
			cmd := exec.Command("adlc")
			cmd.Args = append(cmd.Args, []string{
				"ast",
				"--combined-output=" + combOut,
			}...)
			cmd.Args = append(cmd.Args, adlc.File...)
			dir := filepath.Join(wd, path.Dir(fdesc.GetName()))
			cmd.Dir = dir
			q.Q(combOut)
			adlcO, err := cmd.CombinedOutput()
			if err != nil {
				fmt.Fprintf(os.Stderr, "adlc error\n%v\n%v\n", err, string(adlcO))
				continue
			}
			astf, err := os.Open(combOut)
			if err != nil {
				fmt.Fprintf(os.Stderr, "error opening generated adl ast %v %v\n", combOut, err)
				continue
			}
			modules := map[string]adl.Module{}
			json.NewDecoder(astf).Decode(&modules)
			q.Q(modules)
			syntax := "proto3"
			for _, modname := range adlc.Module {
				fmt.Fprintf(os.Stderr, "module %v\n", modname)
				gomodname := strings.ReplaceAll(modname, ".", "/")
				name := gomodname + "/" + adlc.File[0] // TODO
				req.FileToGenerate = append(req.FileToGenerate, name)
				pkg := modname
				gpkg := adlc.GoPackageBase + "/" + gomodname
				q.Q(pkg)
				// pkg := "github.com/millergarym/pbadl/testdata/001/teststruct"
				fdp := &descriptorpb.FileDescriptorProto{
					Name:    &name,
					Syntax:  &syntax,
					Package: &pkg,
					Options: &descriptorpb.FileOptions{
						GoPackage: &gpkg,
					},
				}
				req.ProtoFile = append(req.ProtoFile, fdp)
				module, ex := modules[modname]
				if !ex {
					fmt.Fprintf(os.Stderr, "no module %v\n", modname)
				}
				q.Q(module)
				for name, decl := range module.Decls {
					fmt.Fprintf(os.Stderr, "  name:%v decl:%v\n", name, decl)
					q.Q(name, decl)
					name := name
					dp := &descriptorpb.DescriptorProto{
						Name: &name,
					}
					switch {
					case decl.Type.Struct != nil:
						for i, fi := range decl.Type.Struct.Field {
							fidp := addField(i, fi, fdp)
							dp.Field = append(dp.Field, fidp)
						}
					case decl.Type.Union != nil:
						unionname := "union"
						unionidx := int32(len(dp.OneofDecl))
						dp.OneofDecl = append(dp.OneofDecl, &descriptorpb.OneofDescriptorProto{
							Name: &unionname,
						})
						for i, fi := range decl.Type.Union.Field {
							fidp := addField(i, fi, fdp)
							fidp.OneofIndex = &unionidx
							dp.Field = append(dp.Field, fidp)
						}
					case decl.Type.Type != nil:
					case decl.Type.Newtype != nil:
					}
					fdp.MessageType = append(fdp.MessageType, dp)
				}
				// dump(fdp)
			}
		} else {
			// fmt.Fprintf(os.Stderr, "no ext.AdlcAstCli for %v\n", filename)
		}

	}

	// req.FileToGenerate = append(req.FileToGenerate, "adlfiles")

	var flags flag.FlagSet
	opts := protogen.Options{
		ParamFunc: flags.Set,
	}

	// Working method to include needed imports dynamically (ie epmty.proto)
	// {
	// 	// call protoc for well known needed protos
	// 	tempd, err := ioutil.TempDir("", "protos")
	// 	if err != nil {
	// 		return fmt.Errorf("can't create temp dir %v", err)
	// 	}
	// 	combOut := filepath.Join(tempd, "empty.fds")
	// 	cmd := exec.Command("protoc")
	// 	cmd.Args = append(cmd.Args, []string{
	// 		"--descriptor_set_out=" + combOut,
	// 		"--include_source_info",
	// 		"google/protobuf/empty.proto",
	// 	}...)
	// 	q.Q(combOut)
	// 	protocO, err := cmd.CombinedOutput()
	// 	if err != nil {
	// 		fmt.Fprintf(os.Stderr, "adlc error\n%v\n%v\n", err, string(protocO))
	// 	}
	// 	fds, err := ioutil.ReadFile(combOut)
	// 	if err != nil {
	// 		fmt.Fprintf(os.Stderr, "error opening generated adl ast %v %v\n", combOut, err)
	// 	}
	// 	dfp := descriptorpb.FileDescriptorSet{}
	// 	err = proto.Unmarshal(fds, &dfp)
	// 	if err != nil {
	// 		fmt.Fprintf(os.Stderr, "error parsing proto %v\n", err)
	// 		q.Q(err)
	// 	}
	// 	// req.ProtoFile = append(req.ProtoFile, dfp.File[0])
	// 	nfiles := []*descriptorpb.FileDescriptorProto{dfp.File[0]}
	// 	nfiles = append(nfiles, req.ProtoFile...)
	// 	req.ProtoFile = nfiles
	// }

	gen, err := opts.New(req)
	if err != nil {
		return err
	}
	for _, f := range gen.Files {
		q.Q(f.Proto.GetName())
		if f.Generate {
			// dump(f.Proto)
			// q.Q(f)
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

func addField(i int, fi adl.Field, fdp *descriptorpb.FileDescriptorProto) *descriptorpb.FieldDescriptorProto {
	var err error
	n := int32(i + 1)
	name := fi.Name
	l := descriptorpb.FieldDescriptorProto_LABEL_OPTIONAL
	t := descriptorpb.FieldDescriptorProto_Type(0)
	tn := ""
	dep := ""
	switch {
	case fi.TypeExpr.TypeRef.Primitive != nil:
		t, tn, dep, err = adl.MapPrimitive(*fi.TypeExpr.TypeRef.Primitive)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Not impl - '%v' TypeRef.Primitive implemented\n", *fi.TypeExpr.TypeRef.Primitive)
			os.Exit(1)
		}
	case fi.TypeExpr.TypeRef.Reference != nil:
		fmt.Fprintf(os.Stderr, "Not impl -  TypeRef.Reference implemented\n")
		os.Exit(1)
	case fi.TypeExpr.TypeRef.TypeParam != nil:
		fmt.Fprintf(os.Stderr, "Not impl - TypeRef.TypeParam implemented\n")
		os.Exit(1)
	}
	fidp := &descriptorpb.FieldDescriptorProto{
		Name:     &name,
		Number:   &n,
		Label:    &l,
		Type:     &t,
		JsonName: &name,
	}
	if tn != "" {
		fidp.TypeName = &tn
	}
	if dep != "" {
		ex := false
		for _, d := range fdp.Dependency {
			if d == dep {
				ex = true
				break
			}
		}
		if !ex {
			fdp.Dependency = append(fdp.Dependency, dep)
		}
	}
	return fidp
}
