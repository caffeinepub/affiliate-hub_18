import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Migration "migration";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

(with migration = Migration.run)
actor {
  // Include Authentication System
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

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

  module Product {
    public func compareByName(p1 : Product, p2 : Product) : Order.Order {
      Text.compare(p1.name, p2.name);
    };
  };

  public type UserProfile = {
    name : Text;
  };

  let products = Map.empty<Nat, Product>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  var nextId = 1;

  public shared ({ caller }) func seed() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can seed data");
    };
    
    if (products.size() > 0) {
      return;
    };
    
    products.clear();
    nextId := 1;
    let sampleProducts : [Product] = [
      {
        id = 1;
        name = "Silk Floral Scarf";
        description = "Lightweight 100% silk scarf with hand-painted floral motifs";
        imageUrl = "/assets/generated/product-scarf.jpg";
        price = "$89";
        category = "Fashion";
        affiliateLink = "https://example.com/silk-scarf";
        featured = true;
      },
      {
        id = 2;
        name = "Cashmere Turtleneck";
        description = "Soft Grade-A cashmere in timeless neutral tones";
        imageUrl = "/assets/generated/product-cashmere.jpg";
        price = "$195";
        category = "Fashion";
        affiliateLink = "https://example.com/cashmere";
        featured = false;
      },
      {
        id = 3;
        name = "Linen Relaxed Blazer";
        description = "Breathable linen blazer, perfect for layering all seasons";
        imageUrl = "/assets/generated/product-blazer.jpg";
        price = "$145";
        category = "Fashion";
        affiliateLink = "https://example.com/blazer";
        featured = true;
      },
      {
        id = 4;
        name = "Leather Crossbody Bag";
        description = "Genuine full-grain leather with adjustable strap";
        imageUrl = "/assets/generated/product-bag.jpg";
        price = "$220";
        category = "Fashion";
        affiliateLink = "https://example.com/leather-bag";
        featured = false;
      },
      {
        id = 5;
        name = "Ceramic Bud Vase Set";
        description = "Set of 3 hand-thrown ceramic vases in matte earth tones";
        imageUrl = "/assets/generated/product-vase.jpg";
        price = "$68";
        category = "Home Decor";
        affiliateLink = "https://example.com/ceramic-vases";
        featured = true;
      },
      {
        id = 6;
        name = "Linen Throw Pillow";
        description = "Stonewashed linen pillow cover with hidden zip, 50x50cm";
        imageUrl = "/assets/generated/product-pillow.jpg";
        price = "$45";
        category = "Home Decor";
        affiliateLink = "https://example.com/linen-pillow";
        featured = false;
      },
      {
        id = 7;
        name = "Soy Wax Candle";
        description = "Hand-poured with jasmine & sandalwood essential oils, 40hr burn";
        imageUrl = "/assets/generated/product-candle.jpg";
        price = "$34";
        category = "Home Decor";
        affiliateLink = "https://example.com/soy-candle";
        featured = true;
      },
      {
        id = 8;
        name = "Rattan Wall Mirror";
        description = "Natural rattan frame, sunburst design, 60cm diameter";
        imageUrl = "/assets/generated/product-mirror.jpg";
        price = "$120";
        category = "Home Decor";
        affiliateLink = "https://example.com/rattan-mirror";
        featured = false;
      },
      {
        id = 9;
        name = "Merino Wool Wrap";
        description = "Extra-fine merino in dusty rose, sage, and oatmeal";
        imageUrl = "/assets/generated/product-wrap.jpg";
        price = "$110";
        category = "Fashion";
        affiliateLink = "https://example.com/merino-wrap";
        featured = true;
      },
      {
        id = 10;
        name = "Woven Seagrass Basket";
        description = "Handwoven storage basket, ideal for blankets or plants";
        imageUrl = "/assets/generated/product-basket.jpg";
        price = "$55";
        category = "Home Decor";
        affiliateLink = "https://example.com/seagrass-basket";
        featured = false;
      },
    ];

    for (product in sampleProducts.values()) {
      products.add(product.id, product);
    };
    nextId := 11;
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray().sort(Product.compareByName);
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    products.values().toArray().filter(
      func(product) { product.category == category }
    ).sort(Product.compareByName);
  };

  public query ({ caller }) func getFeaturedProducts() : async [Product] {
    products.values().toArray().filter(
      func(product) { product.featured }
    ).sort(Product.compareByName);
  };

  public shared ({ caller }) func addProduct(
    name : Text,
    description : Text,
    imageUrl : Text,
    price : Text,
    category : Text,
    affiliateLink : Text,
    featured : Bool,
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    let product : Product = {
      id = nextId;
      name;
      description;
      imageUrl;
      price;
      category;
      affiliateLink;
      featured;
    };
    products.add(nextId, product);
    nextId += 1;
    product.id;
  };

  public shared ({ caller }) func updateProduct(
    id : Nat,
    name : Text,
    description : Text,
    imageUrl : Text,
    price : Text,
    category : Text,
    affiliateLink : Text,
    featured : Bool,
  ) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    switch (products.get(id)) {
      case (null) { false };
      case ( ? _ ) {
        let updatedProduct : Product = {
          id;
          name;
          description;
          imageUrl;
          price;
          category;
          affiliateLink;
          featured;
        };
        products.add(id, updatedProduct);
        true;
      };
    };
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    switch (products.get(id)) {
      case (null) { false };
      case ( ? _ ) {
        products.remove(id);
        true;
      };
    };
  };

  public query ({ caller }) func getProductCount() : async Nat {
    products.size();
  };

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };
};
