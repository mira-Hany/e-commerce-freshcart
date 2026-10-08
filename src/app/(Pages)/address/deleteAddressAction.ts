"use server";

import deleteaddress from "../../../services/addresess/deleteaddress.service";

export default async function deleteAddressAction(
  addressId: string
) {
  try {
    const response = await deleteaddress(addressId);

    return {
      success: true,
      data: response,
    };
  } catch (error: any) {

    return {
      success: false,
      message: error?.message || "Failed to delete address",
    };
  }
}