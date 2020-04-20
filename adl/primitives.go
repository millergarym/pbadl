package adl

import (
	"errors"

	"google.golang.org/protobuf/types/descriptorpb"
)

var (
	adlTypeToPB = map[string]descriptorpb.FieldDescriptorProto_Type{
		"Int8":       descriptorpb.FieldDescriptorProto_TYPE_SINT32,
		"Int16":      descriptorpb.FieldDescriptorProto_TYPE_SINT32,
		"Int32":      descriptorpb.FieldDescriptorProto_TYPE_SINT32,
		"Int64":      descriptorpb.FieldDescriptorProto_TYPE_SINT64,
		"Word8":      descriptorpb.FieldDescriptorProto_TYPE_UINT32,
		"Word16":     descriptorpb.FieldDescriptorProto_TYPE_UINT32,
		"Word32":     descriptorpb.FieldDescriptorProto_TYPE_UINT32,
		"Word64":     descriptorpb.FieldDescriptorProto_TYPE_UINT64,
		"Bool":       descriptorpb.FieldDescriptorProto_TYPE_BOOL,
		"Float":      descriptorpb.FieldDescriptorProto_TYPE_FLOAT,
		"Double":     descriptorpb.FieldDescriptorProto_TYPE_DOUBLE,
		"String":     descriptorpb.FieldDescriptorProto_TYPE_STRING,
		"ByteVector": descriptorpb.FieldDescriptorProto_TYPE_BYTES,
		// "Void":           0,
		// "Json":           0,
		// "`Vector<T>`":    0,
		// "`StringMap<T>`": 0,
		// "`Nullable<T>`":  0,
	}
)

// MapPrimitive converts adl primative to proto type id
func MapPrimitive(adltype string) (id descriptorpb.FieldDescriptorProto_Type, typeName string, dependency string, err error) {
	ex := false
	if id, ex = adlTypeToPB[adltype]; ex {
		return
	}
	if adltype == "Void" {
		id = descriptorpb.FieldDescriptorProto_TYPE_MESSAGE
		typeName = ".google.protobuf.Empty"
		dependency = "google/protobuf/empty.proto"
		return
	}
	err = errors.New("no such type")
	return
}

// EmptyMesaage message proto type id
func EmptyMesaage() (typeIdx descriptorpb.FieldDescriptorProto_Type, typeName string, dependency string) {
	typeIdx = descriptorpb.FieldDescriptorProto_TYPE_MESSAGE
	typeName = ".google.protobuf.Empty"
	dependency = "google/protobuf/empty.proto"
	return
}

// descriptorpb.FieldDescriptorProto_TYPE_INT64,
// descriptorpb.FieldDescriptorProto_TYPE_INT32 ,
// descriptorpb.FieldDescriptorProto_TYPE_FIXED64,
// descriptorpb.FieldDescriptorProto_TYPE_FIXED32,
// // Tag-delimited aggregate.
// // Group type is deprecated and not supported in proto3. However, Proto3
// // implementations should still be able to parse the group wire format and
// // treat group fields as unknown fields.
// descriptorpb.FieldDescriptorProto_TYPE_GROUP ,
// descriptorpb.FieldDescriptorProto_TYPE_MESSAGE, // Length-delimited aggregate.
// New in version 2.
// descriptorpb.FieldDescriptorProto_TYPE_ENUM   ,
// descriptorpb.FieldDescriptorProto_TYPE_SFIXED32,
// descriptorpb.FieldDescriptorProto_TYPE_SFIXED64,
