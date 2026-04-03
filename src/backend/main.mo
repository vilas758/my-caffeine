import Map "mo:core/Map";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Blob "mo:core/Blob";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Int "mo:core/Int";

import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import Storage "blob-storage/Storage";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();

  include MixinStorage();

  include MixinAuthorization(accessControlState);

  // User profile type
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // User profile management
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

  // Type definitions
  type PortfolioCategory = {
    #wedding;
    #family;
    #maternity;
    #individual;
    #event;
    #other : Text;
  };

  type AlbumSize = {
    #small;
    #medium;
    #large;
  };

  type PortfolioItem = {
    title : Text;
    description : Text;
    category : PortfolioCategory;
    image : Storage.ExternalBlob;
    createdAt : Time.Time;
  };

  public type AlbumPackage = {
    name : Text;
    description : Text;
    size : AlbumSize;
    price : Nat;
    features : [Text];
    createdAt : Time.Time;
  };

  type ContactInquiry = {
    name : Text;
    email : Text;
    message : Text;
    createdAt : Time.Time;
  };

  module PortfolioItem {
    public func compare(portfolioItem1 : PortfolioItem, portfolioItem2 : PortfolioItem) : Order.Order {
      Int.compare(portfolioItem2.createdAt, portfolioItem1.createdAt);
    };
  };

  module AlbumPackage {
    public func compare(albumPackage1 : AlbumPackage, albumPackage2 : AlbumPackage) : Order.Order {
      Int.compare(albumPackage2.createdAt, albumPackage1.createdAt);
    };
  };

  module ContactInquiry {
    public func compare(contactInquiry1 : ContactInquiry, contactInquiry2 : ContactInquiry) : Order.Order {
      Int.compare(contactInquiry2.createdAt, contactInquiry1.createdAt);
    };
  };

  // Storage
  let portfolioItems = Map.empty<Text, PortfolioItem>();
  let albumPackages = Map.empty<Text, AlbumPackage>();
  let contactInquiries = Map.empty<Text, ContactInquiry>();

  var nextId = 1;

  // Portfolio management
  public shared ({ caller }) func createPortfolioItem(input : PortfolioItem) : async Text {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create portfolio items");
    };
    let id = nextId.toText();
    let item : PortfolioItem = {
      input with id;
      createdAt = Time.now();
    };
    portfolioItems.add(id, item);
    nextId += 1;
    id;
  };

  public query ({ caller }) func getPortfolioItem(id : Text) : async ?PortfolioItem {
    portfolioItems.get(id);
  };

  public query ({ caller }) func getAllPortfolioItems() : async [PortfolioItem] {
    portfolioItems.values().toArray().sort();
  };

  public shared ({ caller }) func updatePortfolioItem(id : Text, item : PortfolioItem) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update portfolio items");
    };
    if (not portfolioItems.containsKey(id)) {
      Runtime.trap("Portfolio item not found");
    };
    portfolioItems.add(id, item);
  };

  public shared ({ caller }) func deletePortfolioItem(id : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete portfolio items");
    };
    if (not portfolioItems.containsKey(id)) {
      Runtime.trap("Portfolio item not found");
    };
    portfolioItems.remove(id);
  };

  // Album package management
  public shared ({ caller }) func createAlbumPackage(pkg : AlbumPackage) : async Text {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create album packages");
    };
    let id = nextId.toText();
    let package : AlbumPackage = {
      pkg with id;
      createdAt = Time.now();
    };
    albumPackages.add(id, package);
    nextId += 1;
    id;
  };

  public query ({ caller }) func getAlbumPackage(id : Text) : async ?AlbumPackage {
    albumPackages.get(id);
  };

  public query ({ caller }) func getAllAlbumPackages() : async [AlbumPackage] {
    albumPackages.values().toArray().sort();
  };

  public shared ({ caller }) func updateAlbumPackage(id : Text, pkg : AlbumPackage) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update album packages");
    };
    if (not albumPackages.containsKey(id)) {
      Runtime.trap("Album package not found");
    };
    albumPackages.add(id, pkg);
  };

  public shared ({ caller }) func deleteAlbumPackage(id : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete album packages");
    };
    if (not albumPackages.containsKey(id)) {
      Runtime.trap("Album package not found");
    };
    albumPackages.remove(id);
  };

  // Contact inquiries
  public shared ({ caller }) func submitInquiry(input : ContactInquiry) : async Text {
    let id = nextId.toText();
    let inquiry : ContactInquiry = {
      input with id;
      createdAt = Time.now();
    };
    contactInquiries.add(id, inquiry);
    nextId += 1;
    id;
  };

  public shared ({ caller }) func getContactInquiry(id : Text) : async ?ContactInquiry {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view contact inquiries");
    };
    contactInquiries.get(id);
  };

  public shared ({ caller }) func getAllContactInquiries() : async [ContactInquiry] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list all contact inquiries");
    };
    contactInquiries.values().toArray().sort();
  };

  public shared ({ caller }) func deleteContactInquiry(id : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete contact inquiries");
    };
    if (not contactInquiries.containsKey(id)) {
      Runtime.trap("Contact inquiry not found");
    };
    contactInquiries.remove(id);
  };

  public query ({ caller }) func searchPortfolioItemsByTitle(search : Text) : async [PortfolioItem] {
    let lowerSearch = search.trim(#char ' ').toLower();
    portfolioItems.values().toArray().sort().filter(
      func(item) {
        item.title.toLower().contains(#text lowerSearch);
      }
    );
  };

  public query ({ caller }) func getPortfolioItemsByCategory(category : PortfolioCategory) : async [PortfolioItem] {
    portfolioItems.values().toArray().sort().filter(
      func(item) {
        item.category == category;
      }
    );
  };

  public query ({ caller }) func getAlbumPackagesBySize(size : AlbumSize) : async [AlbumPackage] {
    albumPackages.values().toArray().sort().filter(
      func(pkg) {
        pkg.size == size;
      }
    );
  };

  // Admin utilities
  public shared ({ caller }) func clearPortfolioItems() : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can clear portfolio items");
    };
    portfolioItems.clear();
  };

  public shared ({ caller }) func clearAlbumPackages() : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can clear album packages");
    };
    albumPackages.clear();
  };

  public shared ({ caller }) func clearContactInquiries() : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can clear contact inquiries");
    };
    contactInquiries.clear();
  };
};
