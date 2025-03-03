import { NextRequest,NextResponse } from "next/server";
const timetableData=require("./TimeTable.json")
export function GET(request:NextRequest):NextResponse{
  // console.log(timetableData)
  return NextResponse.json(timetableData)
}