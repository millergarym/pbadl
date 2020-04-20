/* @generated from adl module phadl.testunion */

import * as ADL from './../runtime/adl';

export interface ADLSumType_A {
  kind: 'A';
  value: string;
}
export interface ADLSumType_B {
  kind: 'B';
  value: string;
}
export interface ADLSumType_X {
  kind: 'X';
  value: number;
}
export interface ADLSumType_Y {
  kind: 'Y';
  value: number;
}
export interface ADLSumType_Z {
  kind: 'Z';
}

export type ADLSumType = ADLSumType_A | ADLSumType_B | ADLSumType_X | ADLSumType_Y | ADLSumType_Z;

const ADLSumType_AST : ADL.ScopedDecl =
  {"moduleName":"phadl.testunion","decl":{"annotations":[],"type_":{"kind":"union_","value":{"typeParams":[],"fields":[{"annotations":[],"serializedName":"A","default":{"kind":"nothing"},"name":"A","typeExpr":{"typeRef":{"kind":"primitive","value":"String"},"parameters":[]}},{"annotations":[],"serializedName":"B","default":{"kind":"nothing"},"name":"B","typeExpr":{"typeRef":{"kind":"primitive","value":"String"},"parameters":[]}},{"annotations":[],"serializedName":"X","default":{"kind":"nothing"},"name":"X","typeExpr":{"typeRef":{"kind":"primitive","value":"Int64"},"parameters":[]}},{"annotations":[],"serializedName":"Y","default":{"kind":"nothing"},"name":"Y","typeExpr":{"typeRef":{"kind":"primitive","value":"Int64"},"parameters":[]}},{"annotations":[],"serializedName":"Z","default":{"kind":"nothing"},"name":"Z","typeExpr":{"typeRef":{"kind":"primitive","value":"Void"},"parameters":[]}}]}},"name":"ADLSumType","version":{"kind":"nothing"}}};

export const snADLSumType: ADL.ScopedName = {moduleName:"phadl.testunion", name:"ADLSumType"};

export function texprADLSumType(): ADL.ATypeExpr<ADLSumType> {
  return {value : {typeRef : {kind: "reference", value : snADLSumType}, parameters : []}};
}

export const _AST_MAP: { [key: string]: ADL.ScopedDecl } = {
  "phadl.testunion.ADLSumType" : ADLSumType_AST
};
