/* @generated from adl */
import { declResolver, ScopedDecl } from "./runtime/adl";
import { _AST_MAP as phadl_importscope } from "./phadl/importscope";
import { _AST_MAP as phadl_testunion } from "./phadl/testunion";
import { _AST_MAP as sys_adlast } from "./sys/adlast";
import { _AST_MAP as sys_annotations } from "./sys/annotations";
import { _AST_MAP as sys_types } from "./sys/types";
import { _AST_MAP as teststruct } from "./teststruct";

export const ADL: { [key: string]: ScopedDecl } = {
  ...phadl_importscope,
  ...phadl_testunion,
  ...sys_adlast,
  ...sys_annotations,
  ...sys_types,
  ...teststruct,
};

export const RESOLVER = declResolver(ADL);
