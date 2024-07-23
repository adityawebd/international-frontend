import { useState } from 'react';
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import Customer from '../../../utils/models/customer';
import { connect } from '../../../utils/config/dbConfig';


connect();

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password, phoneNumber, address, city, postalCode, country, region } = await request.json();

    const user = await Customer.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    console.log( firstName, lastName, email, password, phoneNumber, address, city, postalCode, country, region)

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new Customer({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      city,
      postalCode,
      country,
      region
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
