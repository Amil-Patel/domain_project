import { StyleSheet } from "react-native";
const primaryColor = "#56BC1F";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 45,
    paddingHorizontal: 13,
  },
  serchIcon: {
    marginLeft: "86%",
    // height:200,
    // width:100
  },
  headingTitle: {
    fontSize: 34,
    fontWeight: "500",
  },
  maincustomer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  customerLogo: {
    flex: 0,
    width: 45,
    backgroundColor: primaryColor,
    height: 45,
    borderRadius: 100,
    paddingTop: 3,
    alignItems: "center",
  },
  customerName: {
    justifyContent: "center",
    marginLeft: 10,
  },
  searchcontainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  backIcon: {
    width: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  searchInput: {
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderBottomColor: "grey",
    borderBottomWidth: 2,
    fontSize: 18,
  },
  textcontainer: {
    width: 320,
    paddingHorizontal: 10,
  },
  addIconMain: {
    position: "absolute",
    bottom: "4%",
    right: "7%",
  },
  addIcon: {
    backgroundColor: primaryColor,
    width: 60,
    height: 60,
    borderRadius: 100,
    paddingLeft: 14,
    paddingTop: 13,
  },
  mainAddContact: {
    flex: 0,
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  customerTitle: {
    textAlignVertical: "center",
    paddingHorizontal: 10,
    fontSize: 22,
    fontWeight: "500",
  },
  saveName: {
    fontSize: 15,
    backgroundColor: primaryColor,
    paddingHorizontal: 24,
    paddingVertical: 5,
    color: "white",
    borderRadius: 20,
    fontWeight: "500",
  },
  formMain: {
    marginTop: 30,
  },
  mainInputContainer: {
    flexDirection: "row",
    paddingHorizontal: 9,
    marginBottom: 20,
  },
  formInput: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1.4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginLeft: 15,
    fontSize: 18,
    borderRadius: 3,
  },
  singleInput: {
    marginLeft: 37,
  },
  errorText: {
    color: "red",
  },

  //loading spinner
  loading_container: {
    flex: 1,
    justifyContent: "center",
  },
  loading_horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },

  //this is my css start
  mainSale: {
    borderColor: "gray",
    borderWidth: 0.5,
    padding: 8,
    borderRadius: 3,
    marginTop: 13,
  },
  totalAmountMain: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saleText: {
    color: "white",
    backgroundColor: primaryColor,
    width: 42,
    paddingVertical: 4,
    paddingHorizontal: 7,
    borderRadius: 3,
    fontSize: 12,
  },

  mainAddBtn: {
    position: "absolute",
    bottom: "4%",
    right: "35%",
  },
  goaddSaleBtn: {
    backgroundColor: primaryColor,
    color: "white",
    width: 130,
    padding: 10,
    fontSize: 15,
    borderRadius: 3,
  },
  addSaleBtn: {
    backgroundColor: primaryColor,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 6,
    fontWeight: "500",
  },
  addMainHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropdown: {
    borderWidth: 0,
    borderBottomWidth: 0.5,
    paddingHorizontal: 0,
    fontSize: 28,
    fontWeight: "800",
    marginTop: 5,
  },
  topTwoInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  yearInput: {
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    width: 150,
    padding: 5,
    paddingHorizontal: 0,
    fontSize: 15,
    fontWeight: "500",
    color: "black",
  },

  amount: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  amountInput: {
    borderStyle: "dashed",
    borderColor: "gray",
    borderBottomWidth: 1.5,
    width: 150,
    fontSize: 18,
    color: 'black',
    textAlign: 'right'
  },

  //this is my css in new version
  mainViewCustomer: {
    marginTop: 5,
  },
  serviceInput:{
      marginTop:20,
  },
  lable: {
    fontSize: 15,
    fontWeight: "500",
  },
  notFoundText: {
    flex: 1,
    color: 'red',
    alignItems: "center",
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  name: {
    backgroundColor: '#90EE90',
    padding: 8,
    marginTop: 7,
    fontSize: 15,
    fontWeight: '600',
    borderRadius: 3,
    color: "black"
  },
  mainviewcusomerheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editInput: {
    borderColor: 'gray',
    borderWidth: 1,
  },
  viewSaleData: {
    fontSize: 16,
    fontWeight: '500',
    borderColor: 'gray',
    borderWidth: 0.3,
    padding: 10,
    color: 'black',
    marginTop: 5,
    borderRadius: 3,
  },
  viewSalebtns: {
    flex: 0,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    borderTopColor: 'gray',
    borderWidth: 0.3,
  },
  viewSalebtn: {
    width: 180,
    padding: 12,
    paddingHorizontal: 0,
  },
  btnColor: {
    backgroundColor: primaryColor,
  }

});

export { styles, primaryColor };
