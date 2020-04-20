package main

import (
	"os/exec"
	"strings"
	"testing"

	"google.golang.org/protobuf/encoding/protojson"
	"google.golang.org/protobuf/proto"

	tadl "github.com/millergarym/pbadl/testdata/gen-adl/phadl/testunion"
	tpb "github.com/millergarym/pbadl/testdata/gen-adl/teststruct"
)

var mo = protojson.MarshalOptions{
	EmitUnpopulated: true,
	Indent:          " ",
	UseRawNumeric:   true,
	UseSpecialEmpty: true,
}

func Test001(t *testing.T) {
	tests := []testcase{
		{
			Msg: "001 ProductType",
			Val: &tpb.ADLProductType{
				A: "abc",
				B: "d goldfish",
				X: 1,
				Y: -1,
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.Msg, func(t *testing.T) {
			roundtrip(
				tt,
				t,
				&tpb.ADLProductType{},
				"teststruct",
				"ADLProductType",
			)
		})
	}
}

type testcase struct {
	Val proto.Message
	Msg string
	Err bool
}

func Test002(t *testing.T) {
	tests := []testcase{
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
	for _, tt := range tests {
		t.Run(tt.Msg, func(t *testing.T) {
			roundtrip(
				tt,
				t,
				&tadl.ADLSumType{},
				"phadl.testunion",
				"ADLSumType",
			)
		})
	}
}

func roundtrip(tt testcase, t *testing.T, adl proto.Message, module, name string) {
	out, err := mo.Marshal(tt.Val)
	if err != nil {
		t.Errorf("Marshal error : %v\n", err)
		return
	}
	cmd := exec.Command("node", "ts/build/main.js", "roundtriptexpr",
		module, name)
	// "phadl.testunion",
	// "ADLSumType")
	cmd.Stdin = strings.NewReader(string(out))
	in, err := cmd.CombinedOutput()
	if err != nil {
		t.Errorf("error from typescript : %v '%s'\n", err, string(in))
		return
	}
	// adl := &tadl.ADLSumType{}
	err = protojson.Unmarshal(in, adl)
	if err != nil {
		t.Errorf("Unmarshal error : %v\n", err)
		return
	}
	if !proto.Equal(tt.Val, adl) {
		t.Errorf("\nexpect != received\n\t%+v\n\t%+v\n", tt.Val, adl)
		return
	}
}

// TODO
// func TestArrayRoundtripGoTsGo(t *testing.T) {}
