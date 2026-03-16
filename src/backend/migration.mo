import Map "mo:core/Map";

module {
  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    imageUrl : Text;
    price : Text;
    category : Text;
    affiliateLink : Text;
    featured : Bool;
  };

  type OldActor = {
    products : Map.Map<Nat, Product>;
  };

  type NewActor = {
    products : Map.Map<Nat, Product>;
    nextId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    { old with nextId = 1 };
  };
};
