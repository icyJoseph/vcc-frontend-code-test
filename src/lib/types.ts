type BodyType = "suv" | "estate" | "sedan";
type ModelType = "plug-in hybrid" | "pure electric";

// interface would be just fine -
// for this type of project either is ok
export type Car = {
  id: string;
  modelName: string;
  bodyType: BodyType;
  modelType: ModelType;
  imageUrl: string;
};
