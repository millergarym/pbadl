// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.20.1-devel
// 	protoc        v3.11.4
// source: testunion/pbadl.proto

package testunion

import (
	proto "github.com/golang/protobuf/proto"
	_ "github.com/golang/protobuf/ptypes/empty"
	_ "github.com/millergarym/pbadl/pb-gen/ext"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

// This is a compile-time assertion that a sufficiently up-to-date version
// of the legacy proto package is being used.
const _ = proto.ProtoPackageIsVersion4

var File_testunion_pbadl_proto protoreflect.FileDescriptor

var file_testunion_pbadl_proto_rawDesc = []byte{
	0x0a, 0x15, 0x74, 0x65, 0x73, 0x74, 0x75, 0x6e, 0x69, 0x6f, 0x6e, 0x2f, 0x70, 0x62, 0x61, 0x64,
	0x6c, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x0d, 0x65, 0x78, 0x74, 0x2f, 0x65, 0x78, 0x74,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x1b, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2f, 0x65, 0x6d, 0x70, 0x74, 0x79, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x42, 0x74, 0x82, 0xa6, 0x1d, 0x41, 0x42, 0x09, 0x75, 0x6e, 0x69, 0x6f, 0x6e,
	0x2e, 0x61, 0x64, 0x6c, 0x52, 0x0f, 0x70, 0x68, 0x61, 0x64, 0x6c, 0x2e, 0x74, 0x65, 0x73, 0x74,
	0x75, 0x6e, 0x69, 0x6f, 0x6e, 0x5a, 0x23, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f,
	0x6d, 0x2f, 0x6d, 0x69, 0x6c, 0x6c, 0x65, 0x72, 0x67, 0x61, 0x72, 0x79, 0x6d, 0x2f, 0x70, 0x62,
	0x61, 0x64, 0x6c, 0x2f, 0x70, 0x62, 0x2d, 0x67, 0x65, 0x6e, 0x5a, 0x2d, 0x67, 0x69, 0x74, 0x68,
	0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x6d, 0x69, 0x6c, 0x6c, 0x65, 0x72, 0x67, 0x61, 0x72,
	0x79, 0x6d, 0x2f, 0x70, 0x62, 0x61, 0x64, 0x6c, 0x2f, 0x70, 0x62, 0x2d, 0x67, 0x65, 0x6e, 0x2f,
	0x74, 0x65, 0x73, 0x74, 0x75, 0x6e, 0x69, 0x6f, 0x6e, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x33,
}

var file_testunion_pbadl_proto_goTypes = []interface{}{}
var file_testunion_pbadl_proto_depIdxs = []int32{
	0, // [0:0] is the sub-list for method output_type
	0, // [0:0] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_testunion_pbadl_proto_init() }
func file_testunion_pbadl_proto_init() {
	if File_testunion_pbadl_proto != nil {
		return
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_testunion_pbadl_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   0,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_testunion_pbadl_proto_goTypes,
		DependencyIndexes: file_testunion_pbadl_proto_depIdxs,
	}.Build()
	File_testunion_pbadl_proto = out.File
	file_testunion_pbadl_proto_rawDesc = nil
	file_testunion_pbadl_proto_goTypes = nil
	file_testunion_pbadl_proto_depIdxs = nil
}
