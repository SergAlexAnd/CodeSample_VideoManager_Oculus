export interface GeneralRecord {
  uid: string;
}

declare module '*.png' {
  const value: string;
  export default value;
}
