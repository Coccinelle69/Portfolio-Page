import { NextResponse } from "next/server";
import User from "@/app/models/users";
import connectDB from "@/app/models/connection";
import moment from "moment-timezone";

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const myEmail = process.env.FROM_EMAIL;
const templateId = process.env.TEMPLATE_ID;

export async function POST(req, res) {
  const { emailClient, subject, message, name, lastName, phone } =
    await req.json();
  console.log(emailClient, subject, message, name, lastName, phone);
  try {
    const emailData = {
      personalizations: [
        {
          to: [{ email: emailClient }],
        },
      ],
      from: { email: myEmail },
      template_id: templateId,
      dynamic_template_data: {
        // Include any dynamic data to populate in the template
        name: name,
      },
    };
    const msgToSelf = {
      to: myEmail,
      from: myEmail,
      subject: `Client sent <Subject: ${subject}>`,
      text: message,
      html: `<strong>
      Client mail: ${emailClient} says: 
      ${message}</strong>`,
    };

    sgMail
      .send(emailData)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });

    sgMail
      .send(msgToSelf)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });

    await connectDB();

    console.log("database");

    const existingUser = await User.findOne({
      email: emailClient,
    });

    const targetTimeZone = "Europe/Paris"; // Target timezone (+1)
    const formattedDate = moment()
      .tz(targetTimeZone)
      .format("YYYY-MM-DD HH:mm");

    let newMessage = {
      subject,
      message,
      date: formattedDate,
    };

    if (existingUser) {
      await User.findOneAndUpdate(
        { email: emailClient },
        { $push: { message: newMessage } },
        { new: true, useFindAndModify: false }
      );
      return NextResponse.json({ success: true, existingUser });
    } else {
      const newUser = await new User({
        name,
        lastName,
        phone,
        email: emailClient,
        message: [newMessage],
      }).save();
      return NextResponse.json({ success: true, user: newUser });
    }
  } catch (error) {
    return NextResponse.json({ error });
  }
}
