import { NextResponse } from 'next/server'
import { MasterOptions } from '@/app/api'
import { pool } from '@/core/lib/mysql'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const activityId = searchParams.get('activityId')

  try {
    const rows: MasterOptions[] = await pool.query(
      'SELECT value, label, activityId FROM sub_activities WHERE activityId = ?',
      [activityId]
    )
    if (rows.length > 0) {
      return NextResponse.json(rows)
    } else {
      return NextResponse.json({ message: 'No records found' }, { status: 404 })
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error fetching data' }, { status: 500 })
  }
}
