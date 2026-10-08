"use server";

import GetAddresses from "../../../services/addresess/getaddress.service";

export default async function getAddressesAction() {
  try {
    const addresses = await GetAddresses();

    return {
      success: true,
      data: addresses,
    };
  } catch (error: any) {

    return {
      success: false,
      data: [],
      message: error?.message || "Failed to get addresses",
    };
  }
}