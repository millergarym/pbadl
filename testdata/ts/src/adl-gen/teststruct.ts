/* @generated from adl module teststruct */

import * as ADL from './runtime/adl';

export interface ADLProductType {
  A: string;
  B: string;
  X: number;
  Y: number;
}

export function makeADLProductType(
  input: {
    A: string,
    B: string,
    X: number,
    Y: number,
  }
): ADLProductType {
  return {
    A: input.A,
    B: input.B,
    X: input.X,
    Y: input.Y,
  };
}

const ADLProductType_AST : ADL.ScopedDecl =
  {"moduleName":"teststruct","decl":{"annotations":[],"type_":{"kind":"struct_","value":{"typeParams":[],"fields":[{"annotations":[],"serializedName":"A","default":{"kind":"nothing"},"name":"A","typeExpr":{"typeRef":{"kind":"primitive","value":"String"},"parameters":[]}},{"annotations":[],"serializedName":"B","default":{"kind":"nothing"},"name":"B","typeExpr":{"typeRef":{"kind":"primitive","value":"String"},"parameters":[]}},{"annotations":[],"serializedName":"X","default":{"kind":"nothing"},"name":"X","typeExpr":{"typeRef":{"kind":"primitive","value":"Int64"},"parameters":[]}},{"annotations":[],"serializedName":"Y","default":{"kind":"nothing"},"name":"Y","typeExpr":{"typeRef":{"kind":"primitive","value":"Int64"},"parameters":[]}}]}},"name":"ADLProductType","version":{"kind":"nothing"}}};

export const snADLProductType: ADL.ScopedName = {moduleName:"teststruct", name:"ADLProductType"};

export function texprADLProductType(): ADL.ATypeExpr<ADLProductType> {
  return {value : {typeRef : {kind: "reference", value : snADLProductType}, parameters : []}};
}

export const _AST_MAP: { [key: string]: ADL.ScopedDecl } = {
  "teststruct.ADLProductType" : ADLProductType_AST
};
