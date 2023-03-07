// Makes sure to return unknown from running a `JSON.parse` operation
export const parseJSON = (stream: string): unknown => JSON.parse(stream);
