import {NextResponse } from "next/server";
import timetableData from "./TimeTable.json";
export function GET(): NextResponse {
  return NextResponse.json(timetableData);
}