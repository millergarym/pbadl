package main

import (
	"math"
	"reflect"
	"strings"
	"testing"

	"github.com/golang/protobuf/ptypes/empty"
	"google.golang.org/protobuf/encoding/protojson"
	"google.golang.org/protobuf/encoding/prototext"

	tadl "github.com/millergarym/pbadl/testdata/gen-adl/phadl/testunion"
	tpb "github.com/millergarym/pbadl/testdata/gen-adl/testunion"
)

func TestJSON(t *testing.T) {
	pb := tpb.SumType{
		Union: &tpb.SumType_A{A: "str"},
	}
	out, err := protojson.MarshalOptions{
		EmitUnpopulated: true,
	}.Marshal(&pb)
	if err != nil {
		t.Error(err)
	}
	adl := tadl.ADLSumType{}
	err = protojson.Unmarshal(out, &adl)
	if err != nil {
		t.Error(err)
	}

	pbtxt, _ := prototext.Marshal(&pb)
	adltxt, _ := prototext.Marshal(&adl)

	t.Log(string(pbtxt))
	if !reflect.DeepEqual(pbtxt, adltxt) {
		t.Errorf("\n\t'%+v'\n!=\n\t'%+v'\n", string(pbtxt), string(adltxt))
	}
}

func TestJSONMaxint(t *testing.T) {
	pb := tpb.SumType{
		Union: &tpb.SumType_X{X: math.MaxInt64},
	}
	out, err := protojson.MarshalOptions{
		EmitUnpopulated: true,
	}.Marshal(&pb)
	if err != nil {
		t.Error(err)
	}
	adl := tadl.ADLSumType{}
	err = protojson.Unmarshal(out, &adl)
	if err != nil {
		t.Error(err)
	}

	pbtxt, _ := prototext.Marshal(&pb)
	adltxt, _ := prototext.Marshal(&adl)

	t.Log(string(pbtxt))
	if !reflect.DeepEqual(pbtxt, adltxt) {
		t.Errorf("\n\t'%+v'\n!=\n\t'%+v'\n", string(pbtxt), string(adltxt))
	}
}

func TestJSONMinint(t *testing.T) {
	pb := tpb.SumType{
		Union: &tpb.SumType_X{X: math.MinInt64},
	}
	out, err := protojson.MarshalOptions{
		EmitUnpopulated: true,
	}.Marshal(&pb)
	if err != nil {
		t.Error(err)
	}
	adl := tadl.ADLSumType{}
	err = protojson.Unmarshal(out, &adl)
	if err != nil {
		t.Error(err)
	}

	pbtxt, _ := prototext.Marshal(&pb)
	adltxt, _ := prototext.Marshal(&adl)

	t.Log(string(pbtxt))
	if !reflect.DeepEqual(pbtxt, adltxt) {
		t.Errorf("\n\t'%+v'\n!=\n\t'%+v'\n", string(pbtxt), string(adltxt))
	}
}

func TestVoid(t *testing.T) {
	pb := tpb.SumType{
		Union: &tpb.SumType_Z{Z: &empty.Empty{}},
	}
	out, err := protojson.MarshalOptions{
		EmitUnpopulated: true,
	}.Marshal(&pb)
	if err != nil {
		t.Error(err)
	}
	adl := tadl.ADLSumType{}
	t.Log(string(out))
	err = protojson.Unmarshal(out, &adl)
	if err != nil {
		t.Error(err)
	}

	pbtxt, _ := prototext.Marshal(&pb)
	adltxt, _ := prototext.Marshal(&adl)

	t.Log(string(pbtxt))
	if !reflect.DeepEqual(pbtxt, adltxt) {
		t.Errorf("\n\t'%+v'\n!=\n\t'%+v'\n", string(pbtxt), string(adltxt))
	}
}

func TestVoid02(t *testing.T) {
	adl := tpb.SumType{}
	err := protojson.Unmarshal([]byte(`"Z"`), &adl)
	if err != nil {
		t.Error(err)
	}

	adltxt, _ := protojson.MarshalOptions{EmitUnpopulated: true}.Marshal(&adl)

	pbtxt := `{"Z":{}}`

	t.Log(string(pbtxt))
	if pbtxt != string(adltxt) {
		t.Errorf("\n\t'%+v'\n!=\n\t'%+v'\n", string(pbtxt), string(adltxt))
	}
}

func TestVoid03(t *testing.T) {
	adl := tadl.ADLSumType{}
	err := protojson.Unmarshal([]byte(`"Z"`), &adl)
	if err != nil {
		t.Error(err)
	}
	adltxt, _ := protojson.MarshalOptions{EmitUnpopulated: true}.Marshal(&adl)
	pbtxt := `{"Z":{}}`
	t.Log(string(pbtxt))
	if pbtxt != string(adltxt) {
		t.Errorf("\n\t'%+v'\n!=\n\t'%+v'\n", string(pbtxt), string(adltxt))
	}
}

func TestVoid04(t *testing.T) {
	{
		adl := tpb.ProductType1{
			S: &tpb.SumType{
				Union: &tpb.SumType_Z{Z: &empty.Empty{}},
			},
		}
		out, err := protojson.MarshalOptions{EmitUnpopulated: true}.Marshal(&adl)
		t.Log(err, string(out))
	}

	adl := tpb.ProductType1{}
	err := protojson.Unmarshal([]byte(`{"S":{"Z"}}`), &adl)
	if err != nil {
		t.Error(err)
	}
	adltxt, _ := protojson.MarshalOptions{EmitUnpopulated: true}.Marshal(&adl)
	pbtxt := `{"S":{"Z":{}}}`
	t.Log(string(pbtxt))
	if pbtxt != string(adltxt) {
		t.Errorf("\n\t'%+v'\n!=\n\t'%+v'\n", string(pbtxt), string(adltxt))
	}
}

func TestVoid05(t *testing.T) {
	{
		adl := tpb.ProductType2{
			S: &tpb.SumType{
				Union: &tpb.SumType_Z{Z: &empty.Empty{}},
			},
			T: &tpb.SumType{
				Union: &tpb.SumType_Y{Y: 42},
			},
		}
		out, err := protojson.MarshalOptions{EmitUnpopulated: true}.Marshal(&adl)
		t.Log(err, string(out))
	}

	adl := tpb.ProductType2{}
	err := protojson.Unmarshal([]byte(`{"S":{"Z"},"T":{"Y":42}}`), &adl)
	if err != nil {
		t.Error(err)
	}
	adltxt, _ := protojson.MarshalOptions{EmitUnpopulated: true}.Marshal(&adl)
	pbtxt := `{"S":{"Z":{}},"T":{"Y":"42"}}`
	t.Log(string(pbtxt))
	if pbtxt != strings.ReplaceAll(string(adltxt), " ", "") {
		t.Errorf("\n\t'%+v'\n!=\n\t'%+v'\n", string(pbtxt), string(adltxt))
	}
}
