package main

import (
	"fmt"
	"io/ioutil"
	"os"

	"github.com/jpillora/opts"
	"google.golang.org/protobuf/encoding/protojson"
	"google.golang.org/protobuf/proto"

	tadl "github.com/millergarym/pbadl/testdata/gen-adl/phadl/testunion"
	tpb "github.com/millergarym/pbadl/testdata/gen-adl/teststruct"
)

// TestCase struct
type TestCase struct {
	Val proto.Message
	Msg string
	Err bool
}

var testcases = []TestCase{
	{
		Msg: "001 ProductType",
		Val: &tpb.ProductType{
			A: "abc",
			B: "d goldfish",
			X: 1,
			Y: -1,
		},
	},
	{
		Msg: "kind A string",
		Val: &tadl.ADLSumType{
			Union: &tadl.ADLSumType_A{A: "str"},
		},
	},
	{
		Msg: "kind X int",
		Val: &tadl.ADLSumType{
			Union: &tadl.ADLSumType_X{X: 1},
		},
	},
	{
		Msg: "kind Z void",
		Val: &tadl.ADLSumType{
			Union: &tadl.ADLSumType_Z{},
		},
	},
	{
		Msg: "kind X max int",
		Val: &tadl.ADLSumType{
			Union: &tadl.ADLSumType_X{X: 1<<53 - 1},
			// Union: &tadl.ADLSumType_X{X: math.MaxInt64},
		},
		// val: { kind: "X", value: 9223372036854775807 },
		//  9223372036854776000
	},
	{
		Msg: "kind X max neg int",
		Val: &tadl.ADLSumType{
			Union: &tadl.ADLSumType_X{X: -1<<53 + 1},
		},
		// val: { kind: "X", value: -9223372036854775808 },
	},
}

type root struct {
	adl proto.Message
}

type count struct {
}

type emmit struct {
	Index   int `opts:"mode=arg"`
	Verbose bool
}
type consume struct {
	Index   int `opts:"mode=arg"`
	JSON    string
	Verbose bool
	adl     proto.Message
}

func main() {
	r := root{
		adl: &tadl.ADLSumType{},
	}
	ro := opts.New(&r).Name("002").
		EmbedGlobalFlagSet().
		Complete().
		AddCommand(opts.New(&count{}).Name("count")).
		AddCommand(opts.New(&emmit{}).Name("emmit")).
		AddCommand(opts.New(&consume{
			adl: &tadl.ADLSumType{},
		}).Name("consume")).
		Parse()
	err := ro.Run()
	if err != nil {
		fmt.Fprintf(os.Stderr, "run error %v\n", err)
		os.Exit(2)
	}
}

func (cmd *count) Run() {
	fmt.Printf("%d", len(testcases))
}

func (cmd *emmit) Run() {
	idx := cmd.Index - 1
	if idx < 0 || idx > len(testcases) {
		fmt.Fprintf(os.Stderr, "Invalid index\n")
		os.Exit(1)
	}
	out, err := protojson.MarshalOptions{
		EmitUnpopulated: true,
		Indent:          " ",
		UseRawNumeric:   true,
		UseSpecialEmpty: true,
	}.Marshal(testcases[idx].Val)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Marshal error : %v\n", err)
		os.Exit(1)
	}
	fmt.Print(string(out))
	if cmd.Verbose {
		fmt.Fprintf(os.Stderr, "%s", testcases[idx].Msg)
	}
}

func (cmd *consume) Run() {
	idx := cmd.Index - 1
	if idx < 0 || idx > len(testcases) {
		fmt.Fprintf(os.Stderr, "Invalid index\n")
		os.Exit(1)
	}
	var buf []byte
	if cmd.JSON != "" {
		buf = []byte(cmd.JSON)
	} else {
		buf, _ = ioutil.ReadAll(os.Stdin)
	}
	err := protojson.Unmarshal(buf, cmd.adl)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unmarshal error : %v\n", err)
		os.Exit(1)
	}
	if !proto.Equal(testcases[idx].Val, cmd.adl) {
		fmt.Fprintf(os.Stderr, "FAILED")
		fmt.Fprintf(os.Stderr, " %s", testcases[idx].Msg)
		fmt.Fprintf(os.Stderr, "\nexpect != received\n\t%+v\n\t%+v\n", testcases[idx].Val, cmd.adl)
		os.Exit(1)
	}
	if cmd.Verbose {
		fmt.Fprintf(os.Stderr, "PASSED")
		fmt.Fprintf(os.Stderr, " %s", testcases[idx].Msg)
	}
}

func (cmd *root) Run() {
	var buf []byte
	if len(os.Args) == 2 {
		buf = []byte(os.Args[1])
	} else {
		buf, _ = ioutil.ReadAll(os.Stdin)
	}
	err := protojson.Unmarshal(buf, cmd.adl)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unmarshal error : %v\n", err)
		os.Exit(1)
	}
	out, err := protojson.MarshalOptions{
		EmitUnpopulated: true,
		Indent:          " ",
		UseRawNumeric:   true,
		UseSpecialEmpty: true,
	}.Marshal(cmd.adl)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Marshal error : %v\n", err)
		os.Exit(1)
	}
	fmt.Print(string(out))
}
