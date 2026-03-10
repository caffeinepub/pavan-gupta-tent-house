import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";

actor {
  type Inquiry = {
    name : Text;
    phone : Text;
    message : Text;
    eventDate : Time.Time;
  };

  type BusinessInfo = {
    name : Text;
    address : Text;
    phone : Text;
    yearsExperience : Nat;
    customersServed : Nat;
  };

  let inquiries = List.empty<Inquiry>();

  let businessInfo : BusinessInfo = {
    name = "New Arzi Tent House & Marriage Garden";
    address = "Sidhoura, Block - Malahi Bazar Road, West Champaran, Bihar.";
    phone = "9955762602";
    yearsExperience = 15;
    customersServed = 400;
  };

  public shared ({ caller }) func submitInquiry(name : Text, phone : Text, message : Text, eventDate : Time.Time) : async () {
    if (name.isEmpty() or phone.isEmpty()) {
      Runtime.trap("Name and phone cannot be empty");
    };

    let inquiry : Inquiry = {
      name;
      phone;
      message;
      eventDate;
    };
    inquiries.add(inquiry);
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    inquiries.toArray();
  };

  public query ({ caller }) func getBusinessInfo() : async BusinessInfo {
    businessInfo;
  };
};
